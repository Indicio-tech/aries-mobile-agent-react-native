import {
  Agent,
  AutoAcceptCredential,
  ConsoleLogger,
  HttpOutboundTransport,
  LogLevel,
  MediatorPickupStrategy,
  WsOutboundTransport,
} from '@aries-framework/core'
import { agentDependencies } from '@aries-framework/react-native'
import { useNavigation } from '@react-navigation/core'
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, Platform } from 'react-native'
import { Config } from 'react-native-config'
import Toast from 'react-native-toast-message'

import indyLedgers from '../../configs/ledgers/indy'
import { ToastType } from '../components/toast/BaseToast'
import { myLabel } from '../constants'
import { useAuth } from '../contexts/auth'
import { useConfiguration } from '../contexts/configuration'
import { DispatchAction } from '../contexts/reducers/store'
import { useStore } from '../contexts/store'
import { useTheme } from '../contexts/theme'
import NameCreate from '../screens/NameCreate'
import Onboarding from '../screens/Onboarding'
import { createCarouselStyle } from '../screens/OnboardingPages'
import PinCreate from '../screens/PinCreate'
import PinEnter from '../screens/PinEnter'
import { AuthenticateStackParams, Screens, Stacks } from '../types/navigators'
import { WalletSecret } from '../types/security'

import ConnectStack from './ConnectStack'
import ContactStack from './ContactStack'
import DeliveryStack from './DeliveryStack'
import NotificationStack from './NotificationStack'
import SettingStack from './SettingStack'
import TabStack from './TabStack'
import { createDefaultStackOptions } from './defaultStackOptions'

interface RootStackProps {
  agent: Agent | undefined
  setAgent: React.Dispatch<React.SetStateAction<Agent | undefined>>
}

const RootStack: React.FC<RootStackProps> = (props: RootStackProps) => {
  const { agent, setAgent } = props
  const [state, dispatch] = useStore()
  const { t } = useTranslation()
  const navigation = useNavigation<StackNavigationProp<AuthenticateStackParams>>()
  const { authenticated, getWalletCredentials } = useAuth()

  const [initAgentInProcess, setInitAgentInProcess] = useState(false)

  const theme = useTheme()
  const defaultStackOptions = createDefaultStackOptions(theme)
  const OnboardingTheme = theme.OnboardingTheme
  const { pages, terms, privacy, splash } = useConfiguration()
  let name: string

  const onTutorialCompleted = () => {
    dispatch({
      type: DispatchAction.DID_COMPLETE_TUTORIAL,
    })
    navigation.navigate(Screens.Terms)
  }

  const initAgent = async (predefinedSecret?: WalletSecret | null): Promise<string | undefined> => {
    if (initAgentInProcess) {
      return
    }

    if (!predefinedSecret) {
      dispatch({ type: DispatchAction.LOADING_ENABLED })
    }

    // Flag to protect the init process from being duplicated
    setInitAgentInProcess(true)

    try {
      const credentials = await getWalletCredentials()

      if (!credentials?.id || !credentials.key) {
        Alert.alert('Error', 'Cannot find wallet id/secret!')
        Toast.hide()
        return
      }

      if (state.onboarding.didCreateDisplayName) {
        name = state.user.firstName + ' ' + state.user.lastName
      } else name = myLabel

      const newAgent = new Agent(
        {
          label: name,
          mediatorConnectionsInvite: Config.MEDIATOR_URL,
          mediatorPickupStrategy: MediatorPickupStrategy.PickUpV2,
          walletConfig: { id: credentials.id, key: credentials.key },
          autoAcceptConnections: true,
          autoAcceptCredentials: AutoAcceptCredential.ContentApproved,
          logger: new ConsoleLogger(LogLevel.trace),
          indyLedgers,
          connectToIndyLedgersOnStartup: Platform.OS === 'android',
          autoUpdateStorageOnStartup: true,
        },
        agentDependencies
      )

      const wsTransport = new WsOutboundTransport()
      const httpTransport = new HttpOutboundTransport()

      newAgent.registerOutboundTransport(wsTransport)
      newAgent.registerOutboundTransport(httpTransport)

      await newAgent.initialize()
      setAgent(newAgent) // -> This will set the agent in the global provider

      dispatch({ type: DispatchAction.LOADING_DISABLED })
    } catch (e: unknown) {
      Toast.show({
        type: ToastType.Error,
        text1: t('Global.Failure'),
        text2: (e as Error)?.message || t('Error.Unknown'),
        visibilityTime: 2000,
        position: 'bottom',
      })
      return `${e}`
    }

    setInitAgentInProcess(false)
  }

  useEffect(() => {
    const initialized = agent?.isInitialized
    if (authenticated && !initialized) {
      initAgent()
    }
  }, [authenticated])

  const authStack = () => {
    const Stack = createStackNavigator()

    return (
      <Stack.Navigator initialRouteName={Screens.Splash} screenOptions={{ ...defaultStackOptions, headerShown: false }}>
        <Stack.Screen name={Screens.EnterPin}>{(props) => <PinEnter {...props} />}</Stack.Screen>
      </Stack.Navigator>
    )
  }

  const mainStack = () => {
    const Stack = createStackNavigator()

    return (
      <Stack.Navigator initialRouteName={Screens.Splash} screenOptions={{ ...defaultStackOptions, headerShown: false }}>
        <Stack.Screen name={Stacks.TabStack} component={TabStack} />
        <Stack.Screen name={Stacks.ConnectStack} component={ConnectStack} />
        <Stack.Screen name={Stacks.SettingStack} component={SettingStack} />
        <Stack.Screen name={Stacks.ContactStack} component={ContactStack} />
        <Stack.Screen name={Stacks.NotificationStack} component={NotificationStack} />
        <Stack.Screen name={Stacks.ConnectionStack} component={DeliveryStack} />
      </Stack.Navigator>
    )
  }

  const onboardingStack = () => {
    const Stack = createStackNavigator()
    const carousel = createCarouselStyle(OnboardingTheme)
    return (
      <Stack.Navigator initialRouteName={Screens.Splash} screenOptions={{ ...defaultStackOptions, headerShown: false }}>
        <Stack.Screen name={Screens.Splash} component={splash} />
        <Stack.Screen
          name={Screens.Onboarding}
          options={() => ({
            title: t('Screens.Onboarding'),
            headerTintColor: OnboardingTheme.headerTintColor,
            headerShown: true,
            gestureEnabled: false,
            headerLeft: () => false,
          })}
        >
          {(props) => (
            <Onboarding
              {...props}
              nextButtonText={'Next'}
              previousButtonText={'Back'}
              pages={pages(onTutorialCompleted, OnboardingTheme)}
              style={carousel}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name={Screens.Privacy}
          options={() => ({
            title: t('Screens.Privacy'),
            headerTintColor: OnboardingTheme.headerTintColor,
            headerShown: true,
            headerLeft: () => false,
            rightLeft: () => false,
          })}
          component={privacy}
        />
        <Stack.Screen
          name={Screens.Terms}
          options={() => ({
            title: t('Screens.Terms'),
            headerTintColor: OnboardingTheme.headerTintColor,
            headerShown: true,
            headerLeft: () => false,
            rightLeft: () => false,
          })}
          component={terms}
        />
        <Stack.Screen name={Screens.NameCreate} component={NameCreate} />
        <Stack.Screen name={Screens.CreatePin} component={PinCreate} />
      </Stack.Navigator>
    )
  }

  if (state.onboarding.didAgreeToTerms && state.onboarding.didCompleteTutorial && state.onboarding.didCreatePIN) {
    return authenticated ? mainStack() : authStack()
  }

  return onboardingStack()
}

export default RootStack

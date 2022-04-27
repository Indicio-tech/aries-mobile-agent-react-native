import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import Scan from '../screens/Scan'
import QRType from '../screens/QRType'
import DisplayCode from '../screens/DisplayCode'
import { ConnectStackParams, Screens } from '../types/navigators'
import { useThemeContext } from '../utils/themeContext'

import { createDefaultStackOptions } from './defaultStackOptions'

const ConnectStack: React.FC = () => {
  const Stack = createStackNavigator<ConnectStackParams>()
  const theme = useThemeContext()
  const defaultStackOptions = createDefaultStackOptions(theme)
  return (
    <Stack.Navigator screenOptions={{ ...defaultStackOptions }}>
      <Stack.Screen name={Screens.QRType} component={QRType} />
      <Stack.Screen name={Screens.Scan} component={Scan} options={{ presentation: 'modal', headerShown: false }} />
      <Stack.Screen name={Screens.DisplayCode} component={DisplayCode} options={{ presentation: 'modal', headerShown: false }} />
    </Stack.Navigator>
  )
}

export default ConnectStack

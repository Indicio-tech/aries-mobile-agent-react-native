import { CredentialState } from '@aries-framework/core'
import { useCredentialById } from '@aries-framework/react-hooks'
import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import CredentialPending from '../assets/img/credential-pending.svg'
import CredentialSuccess from '../assets/img/credential-success.svg'
import Button, { ButtonType } from '../components/buttons/Button'
import { Screens, TabStacks } from '../types/navigators'
import { testIdWithKey } from '../utils/testable'
import { useThemeContext } from '../utils/themeContext'

const connectionTimerDelay = 5000 // in ms

enum DeliveryStatus {
  Pending,
  Completed,
  Declined,
}

export interface CredentialOfferAcceptProps {
  visible: boolean
  credentialId: string
}

const CredentialOfferAccept: React.FC<CredentialOfferAcceptProps> = ({ visible, credentialId }) => {
  const { t } = useTranslation()
  const [shouldShowDelayMessage, setShouldShowDelayMessage] = useState<boolean>(false)
  const [credentialDeliveryStatus, setCredentialDeliveryStatus] = useState<DeliveryStatus>(DeliveryStatus.Pending)
  const [timerDidFire, setTimerDidFire] = useState<boolean>(false)
  const [timer, setTimer] = useState<NodeJS.Timeout>()
  const credential = useCredentialById(credentialId)
  const navigation = useNavigation()
  const { ColorPallet, TextTheme } = useThemeContext()
  const imageDisplayOptions = {
    fill: ColorPallet.notification.infoText,
    height: 250,
    width: 250,
  }
  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: ColorPallet.brand.primaryBackground,
    },
    image: {
      marginVertical: 66,
    },
    messageContainer: {
      marginHorizontal: 25,
      alignItems: 'center',
    },
    messageText: {
      fontWeight: 'normal',
      textAlign: 'center',
      marginTop: 90,
    },
    controlsContainer: {
      marginHorizontal: 25,
    },
    controlsMessageText: {
      textAlign: 'center',
      marginBottom: 30,
    },
  })

  if (!credential) {
    throw new Error('Unable to fetch credential from AFJ')
  }

  const onBackToHomeTouched = () => {
    navigation.getParent()?.navigate(TabStacks.HomeStack, { screen: Screens.Home })
  }

  const onDoneTouched = () => {
    navigation.getParent()?.navigate(TabStacks.CredentialStack, { screen: Screens.Credentials })
  }

  useEffect(() => {
    if (credential.state === CredentialState.CredentialReceived || credential.state === CredentialState.Done) {
      timer && clearTimeout(timer)
      setCredentialDeliveryStatus(DeliveryStatus.Completed)
    }
  }, [credential])

  useEffect(() => {
    if ((timerDidFire || credentialDeliveryStatus !== DeliveryStatus.Pending) && !visible) {
      return
    }

    const timer = setTimeout(() => {
      setShouldShowDelayMessage(true)
      setTimerDidFire(true)
    }, connectionTimerDelay)

    setTimer(timer)

    return () => {
      timer && clearTimeout(timer)
    }
  }, [visible])

  return (
    <Modal visible={visible} transparent={true} animationType={'none'}>
      <SafeAreaView style={[styles.container]}>
        {credentialDeliveryStatus === DeliveryStatus.Pending && (
          <View style={[styles.messageContainer]}>
            <Text style={[TextTheme.headingThree, styles.messageText]} testID={testIdWithKey('CredentialOnTheWay')}>
              {t('CredentialOffer.CredentialOnTheWay')}
            </Text>
            <CredentialPending style={[styles.image]} {...imageDisplayOptions} />
          </View>
        )}

        {credentialDeliveryStatus === DeliveryStatus.Completed && (
          <View style={[styles.messageContainer]}>
            <Text
              style={[TextTheme.headingThree, styles.messageText]}
              testID={testIdWithKey('CredentialAddedToYourWallet')}
            >
              {t('CredentialOffer.CredentialAddedToYourWallet')}
            </Text>
            <CredentialSuccess style={[styles.image]} {...imageDisplayOptions} />
          </View>
        )}

        {shouldShowDelayMessage && (
          <View style={[styles.controlsContainer]}>
            {credentialDeliveryStatus !== DeliveryStatus.Completed && (
              <>
                <Text style={[TextTheme.normal, styles.controlsMessageText]} testID={testIdWithKey('TakingTooLong')}>
                  {t('Connection.TakingTooLong')}
                </Text>
                <Button
                  title={t('Loading.BackToHome')}
                  accessibilityLabel={t('Loading.BackToHome')}
                  testID={testIdWithKey('BackToHome')}
                  onPress={onBackToHomeTouched}
                  buttonType={ButtonType.Secondary}
                />
              </>
            )}
          </View>
        )}

        {credentialDeliveryStatus === DeliveryStatus.Completed && (
          <View style={[styles.controlsContainer]}>
            <Button
              title={t('Global.Done')}
              accessibilityLabel={t('Global.Done')}
              testID={testIdWithKey('Done')}
              onPress={onDoneTouched}
              buttonType={ButtonType.Primary}
            />
          </View>
        )}
      </SafeAreaView>
    </Modal>
  )
}

export default CredentialOfferAccept

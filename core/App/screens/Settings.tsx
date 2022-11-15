import { useAgent } from '@aries-framework/react-hooks'
import { StackScreenProps } from '@react-navigation/stack'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { getVersion, getBuildNumber } from 'react-native-device-info'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { uiConfig } from '../../configs/uiConfig'
import { SafeAreaScrollView } from '../components'
import ConfirmModal from '../components/modals/ConfirmModal'
import { useAuth } from '../contexts/auth'
import { DispatchAction } from '../contexts/reducers/store'
import { useStore } from '../contexts/store'
import { useTheme } from '../contexts/theme'
import { resetWalletSecret } from '../services/keychain'
import { Screens, SettingStackParams, Stacks } from '../types/navigators'
import { testIdWithKey } from '../utils/testable'

type SettingsProps = StackScreenProps<SettingStackParams>

const Settings: React.FC<SettingsProps> = ({ navigation }) => {
  const { agent } = useAgent()
  const { setAuthenticated, clearWalletSecretAppState } = useAuth()
  const [state, dispatch] = useStore()
  const { t } = useTranslation()
  const { borderRadius, SettingsTheme, ColorPallet } = useTheme()
  const [modalVisible, setModalVisible] = useState<boolean>(false)

  const styles = StyleSheet.create({
    parent: {
      height: '100%',
      justifyContent: 'space-between',
    },
    container: {
      width: '100%',
      padding: 5,
    },
    groupHeader: {
      ...SettingsTheme.groupHeader,
      paddingBottom: 8,
    },
    rowGroup: {
      flexDirection: 'column',
      borderRadius: borderRadius,
      backgroundColor: SettingsTheme.groupBackground,
      padding: 16,
      marginBottom: 6,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 3,
    },
    subHeader: {
      ...SettingsTheme.subHeader,
    },
    resetContainer: {
      width: '100%',
      paddingVertical: 10,
      alignItems: 'center',
    },
    resetButton: {
      ...SettingsTheme.resetButton,
      width: '93%',
      paddingVertical: 12,
      textAlign: 'center',
    },
  })

  const resetApp = async () => {
    if (!agent) {
      throw new Error('Agent is undefined')
    }
    const keychainClear = await resetWalletSecret()
    clearWalletSecretAppState()
    if (!keychainClear) {
      throw new Error('Keychain was not succesfully cleared')
    }
    await agent.shutdown()
    await agent.wallet.delete()
    setModalVisible(false)
    setAuthenticated(false)
    dispatch({
      type: DispatchAction.RESET_ONBOARDING,
    })
  }

  return (
    <View style={styles.parent}>
      <View style={styles.container}>
        <View style={styles.rowGroup}>
          <Text style={styles.groupHeader}>{t('Settings.UserSettings')}</Text>
          <Text style={styles.subHeader}>Name</Text>
          <TouchableOpacity
            accessible={true}
            accessibilityLabel={'Name'}
            testID={testIdWithKey('Display Name')}
            style={styles.row}
            onPress={() => navigation.navigate(Screens.NameUpdate)}
          >
            <Text style={SettingsTheme.text}>{state.user.firstName + ' ' + state.user.lastName}</Text>
            <Icon name={'edit'} size={20} color={SettingsTheme.iconColor} />
          </TouchableOpacity>
        </View>

        <View style={styles.rowGroup}>
          <Text style={styles.groupHeader}>{t('Settings.Preferences')}</Text>
          <TouchableOpacity
            accessible={true}
            accessibilityLabel={t('Settings.Language')}
            testID={testIdWithKey('Language')}
            style={styles.row}
            onPress={() => navigation.navigate(Screens.Language)}
          >
            <Text style={SettingsTheme.text}>{t('Settings.Language')}</Text>
            <Icon name={'chevron-right'} size={25} color={SettingsTheme.iconColor} />
          </TouchableOpacity>
        </View>

        <View style={styles.rowGroup}>
          <Text style={styles.groupHeader}>{t('Settings.About')}</Text>
          <View style={styles.row}>
            <Text style={SettingsTheme.text} testID={testIdWithKey('VersionLabel')}>
              {t('Settings.Version')}
            </Text>
            <Text style={SettingsTheme.text} testID={testIdWithKey('Version')}>{`${getVersion()}`}</Text>
          </View>
          <View style={styles.row}>
            <Text style={SettingsTheme.text} testID={testIdWithKey('BuildLabel')}>
              {t('Settings.Build')}
            </Text>
            <Text style={SettingsTheme.text} testID={testIdWithKey('Build')}>{`${getBuildNumber()}`}</Text>
          </View>

          {!uiConfig.fiveTabDisplay && (
            <TouchableOpacity
              accessible={true}
              accessibilityLabel={t('RootStack.Contacts')}
              testID={testIdWithKey('Contacts')}
              style={styles.row}
              onPress={() =>
                navigation
                  .getParent()
                  ?.navigate(Stacks.ContactStack, { screen: Screens.Contacts, params: { navigation: navigation } })
              }
            >
              <Text style={SettingsTheme.text}>{t('RootStack.Contacts')}</Text>
              <Icon name={'chevron-right'} size={25} color={SettingsTheme.iconColor} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.resetContainer}>
        <TouchableOpacity
          accessible={true}
          accessibilityLabel={t('Settings.ResetWallet')}
          testID={testIdWithKey('Language')}
          style={[styles.resetButton, { flexDirection: 'column' }]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={[SettingsTheme.resetText, { textAlign: 'center' }]}>{t('Settings.ResetWallet')}</Text>
        </TouchableOpacity>
      </View>
      {modalVisible && (
        <ConfirmModal
          title={t('Settings.ResetTitle')}
          body={t('Settings.ResetBody')}
          confirm={t('Settings.ResetConfirm')}
          abort={t('Settings.ResetAbort')}
          confirmButtonStyles={[{ backgroundColor: ColorPallet.semantic.error }]}
          confirmSubmit={() => resetApp()}
          abortSubmit={() => setModalVisible(false)}
        />
      )}
    </View>
  )
}

export default Settings

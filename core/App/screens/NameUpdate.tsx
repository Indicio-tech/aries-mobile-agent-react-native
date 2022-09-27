import { useNavigation } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Button, { ButtonType } from '../components/buttons/Button'
import TextInput from '../components/inputs/TextInput'
import { DispatchAction } from '../contexts/reducers/store'
import { StoreContext } from '../contexts/store'
import { useTheme } from '../contexts/theme'
import { SettingStackParams, Screens } from '../types/navigators'

const NameUpdate: React.FC = () => {
  const { t } = useTranslation()
  const { ColorPallet, TextTheme } = useTheme()
  const [state, dispatch] = useContext(StoreContext)
  const [firstName, onChangeFirstName] = useState('')
  const [lastName, onChangeLastName] = useState('')
  const [buttonsActive, setButtonsActive] = useState(false)
  const navigation = useNavigation<StackNavigationProp<[SettingStackParams]>>()

  const styles = StyleSheet.create({
    title: {
      ...TextTheme.normal,
      fontSize: 16,
    },
    warningText: {
      ...TextTheme.normal,
      fontSize: 14,
      fontWeight: 'bold',
      paddingRight: 10,
    },
    text: {
      ...TextTheme.normal,
      marginBottom: 10,
      fontSize: 12,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 12,
    },
  })

  const isValid = (name: string) => {
    if (name.length >= 2) {
      return true
    } else return false
  }

  useEffect(() => {
    if (isValid(firstName) && isValid(lastName)) {
      setButtonsActive(true)
    } else {
      setButtonsActive(false)
    }
  }, [firstName, lastName])

  const setDisplayName = () => {
    try {
      dispatch({
        type: DispatchAction.FIRST_NAME_UPDATED,
        payload: [firstName],
      })
      dispatch({
        type: DispatchAction.LAST_NAME_UPDATED,
        payload: [lastName],
      })
      dispatch({
        type: DispatchAction.DID_CREATE_DISPLAY_NAME,
      })
      navigation.navigate(Screens.Settings)
    } catch {
      // dispatch error
    }
  }

  return (
    <SafeAreaView>
      <View style={{ padding: 20 }}>
        <Text style={styles.title}>{t("DisplayName.NewName")}</Text>
        <View style={styles.row}>
          <Icon name={'alert-circle'} size={26} color={ColorPallet.notification.infoIcon} style={{ marginRight: 10 }} />
          <Text style={styles.warningText}>
            {t("DisplayName.Warning")}
          </Text>
        </View>
        <Text style={styles.text}>
          {t("DisplayName.RecommendedName")}
        </Text>
        <TextInput label={t("DisplayName.First")} onChangeText={onChangeFirstName} value={firstName} placeholder={t("DisplayName.First")} />
        <TextInput label={t("DisplayName.Last")} onChangeText={onChangeLastName} value={lastName} placeholder={t("DisplayName.Last")} />
        <Button
          title={t('Global.Confirm')}
          buttonType={ButtonType.Primary}
          onPress={() => setDisplayName()}
          disabled={!buttonsActive}
        />
      </View>
    </SafeAreaView>
  )
}

export default NameUpdate

import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Keyboard, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import { SafeAreaView } from 'react-native-safe-area-context'

import Button, { ButtonType } from '../components/buttons/Button'
import TextInput from '../components/inputs/TextInput'
import Label from '../components/texts/Label'
import { StoreContext } from '../contexts/store'
import AlertModal from '../components/modals/AlertModal'
import { AuthenticateStackParams, Screens } from '../types/navigators'
import { useTheme } from '../contexts/theme'
import { testIdWithKey } from '../utils/testable'
import { DispatchAction } from '../contexts/reducers/store'

const NameCreate: React.FC = () => {
  const { t } = useTranslation()
  const [state, dispatch] = useContext(StoreContext)
  const navigation = useNavigation<StackNavigationProp<[AuthenticateStackParams]>>()

  const isValid = (name: string) => {
    if (name.length >= 2) {
      return true
    } else return false
  }

  const setDisplayName = (name: string) => {
    try {
      if (isValid(name) == true) {
        dispatch({
          type: DispatchAction.FIRST_NAME_UPDATED,
          payload: [name]
        })
        dispatch({
          type: DispatchAction.DID_CREATE_DISPLAY_NAME
        })
        navigation.navigate(Screens.CreatePin)
      }
      else {
        // name error
      }
    }
    catch {
      // dispatch error
    }
  }


  return (
    <SafeAreaView>
      <View>
        <Text>Please enter your name.</Text>
        <TextInput label="First name" />
        <TextInput label="Last name" />
        <Label title="You can update this at any time in your settings"  />
      </View>
    </SafeAreaView>
  )
}

export default NameCreate
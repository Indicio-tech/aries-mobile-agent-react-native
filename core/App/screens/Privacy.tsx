import { useNavigation } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, StyleSheet, Text, View, Linking } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import Button, { ButtonType } from '../components/buttons/Button'
import CheckBoxRow from '../components/inputs/CheckBoxRow'
import HighlightTextBox from '../components/texts/HighlightTextBox'
import InfoTextBox from '../components/texts/InfoTextBox'
import { DispatchAction } from '../contexts/reducers/store'
import { useStore } from '../contexts/store'
import { useTheme } from '../contexts/theme'
import { AuthenticateStackParams, Screens } from '../types/navigators'
import { testIdWithKey } from '../utils/testable'

const Privacy: React.FC = () => {
  const [, dispatch] = useStore()
  const [checked, setChecked] = useState(false)
  const { t } = useTranslation()
  const navigation = useNavigation<StackNavigationProp<AuthenticateStackParams>>()
  const { OnboardingTheme, ColorPallet, borderRadius } = useTheme()
  const onSubmitPressed = () => {
    dispatch({
      type: DispatchAction.DID_AGREE_TO_PRIVACY,
    })

    navigation.navigate(Screens.Terms)
  }
  const style = StyleSheet.create({
    scrollView: {
      // backgroundColor: ColorPallet.grayscale.veryLightGrey,
      padding: 10,
      borderRadius,
    },
    container: {
      ...OnboardingTheme.container,
      margin: 10,
      flex: 1,
    },
    bodyText: {
      ...OnboardingTheme.bodyText,
      marginVertical: 5,
    },
    controls: {
      marginVertical: 15,
    },
    bold: {
      ...OnboardingTheme.bodyText,
      fontWeight: 'bold',
      marginVertical: 5,
    },
    header: {
      marginVertical: 10,
    },
    link: {
      color: ColorPallet.brand.highlight,
    },
  })
  const onBackPressed = () => {
    //TODO:(jl) goBack() does not unwind the navigation stack but rather goes
    //back to the splash screen. Needs fixing before the following code will
    //work as expected.

    // if (nav.canGoBack()) {
    //   nav.goBack()
    // }

    navigation.navigate(Screens.Onboarding)
  }

  return (
    <SafeAreaView style={style.container}>
      <ScrollView style={style.scrollView}>
        <InfoTextBox>Please agree to the terms and conditions below before using this application.</InfoTextBox>
        <Text style={[style.bodyText, { marginTop: 20, marginBottom: 20 }]}>
          <Text style={[style.bodyText, { fontWeight: 'bold' }]}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>{' '}
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
          in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Text>
        <HighlightTextBox>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui</HighlightTextBox>
        <Text style={[style.bodyText, { marginTop: 20 }]}>
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
          in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </Text>
        <View style={[style.controls]}>
          <CheckBoxRow
            title={t('Terms.Attestation')}
            accessibilityLabel={t('Terms.IAgree')}
            testID={testIdWithKey('IAgree')}
            checked={checked}
            onPress={() => setChecked(!checked)}
          />
          <View style={[{ paddingTop: 10 }]}>
            <Button
              title={t('Global.Continue')}
              accessibilityLabel={t('Global.Continue')}
              testID={testIdWithKey('Continue')}
              disabled={!checked}
              onPress={onSubmitPressed}
              buttonType={ButtonType.Primary}
            />
          </View>
          <View style={[{ paddingTop: 10 }]}>
            <Button
              title={t('Global.Back')}
              accessibilityLabel={t('Global.Back')}
              testID={testIdWithKey('Back')}
              onPress={onBackPressed}
              buttonType={ButtonType.Secondary}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Privacy
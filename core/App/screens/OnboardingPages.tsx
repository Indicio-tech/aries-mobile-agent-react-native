import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, View } from 'react-native'
import { SvgProps } from 'react-native-svg'

import AppLogo from '../assets/img/app-logo.svg'
import CredentialList from '../assets/img/credential-list.svg'
import ScanShare from '../assets/img/scan-share.svg'
import SecureCredential from '../assets/img/secure-credential.svg'
import SecureImage from '../assets/img/secure-image.svg'
import SecureMessage from '../assets/img/secure-message.svg'
import Button, { ButtonType } from '../components/buttons/Button'
import { GenericFn } from '../types/fn'
import { testIdWithKey } from '../utils/testable'

import { OnboardingStyleSheet } from './Onboarding'

export const createCarouselStyle = (OnboardingTheme: any): OnboardingStyleSheet => {
  return StyleSheet.create({
    container: {
      ...OnboardingTheme.container,
      flex: 1,
      alignItems: 'center',
    },
    carouselContainer: {
      ...OnboardingTheme.carouselContainer,
      flexDirection: 'column',
    },
    pagerContainer: {
      flexShrink: 2,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 35,
    },
    pagerDot: {
      ...OnboardingTheme.pagerDot,
      borderWidth: 1,
      borderStyle: 'solid',
    },
    pagerDotActive: {
      ...OnboardingTheme.pagerDotActive,
    },
    pagerDotInactive: {
      ...OnboardingTheme.pagerDotInactive,
    },
    pagerPosition: {
      position: 'relative',
      top: 0,
    },
    pagerNavigationButton: {
      ...OnboardingTheme.pagerNavigationButton,
      fontSize: 18,
      fontWeight: 'bold',
    },
  })
}

export const createStyles = (OnboardingTheme: any) => {
  return StyleSheet.create({
    headerText: {
      ...OnboardingTheme.headerText,
    },
    bodyText: {
      ...OnboardingTheme.bodyText,
      flexShrink: 1,
    },
    point: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 20,
      marginTop: 10,
      marginRight: 20,
      marginBottom: 10,
    },
    icon: {
      marginRight: 10,
    },
  })
}

const createImageDisplayOptions = (OnboardingTheme: any) => {
  return {
    ...OnboardingTheme.imageDisplayOptions,
    height: 180,
    width: 180,
  }
}

const customPages = (onTutorialCompleted: GenericFn, OnboardingTheme: any) => {
  const { t } = useTranslation()
  const styles = createStyles(OnboardingTheme)
  const imageDisplayOptions = createImageDisplayOptions(OnboardingTheme)
  return (
    <>
      <View style={{ marginTop: 'auto', marginBottom: 20, paddingHorizontal: 20 }}>
        <Button
          title={t('Global.GetStarted')}
          accessibilityLabel={t('Global.GetStarted')}
          testID={testIdWithKey('GetStarted')}
          onPress={onTutorialCompleted}
          buttonType={ButtonType.Primary}
        />
      </View>
    </>
  )
}

const guides: Array<{ image: React.FC<SvgProps>; title: [string, React.FC<SvgProps>]; body: string }> = [
  {
    image: AppLogo,
    title: 'Welcome to' + AppLogo,
    body: "It's more than just a wallet",
  },
  {
    image: SecureCredential,
    title: 'Secure your personal information',
    body: 'Decide what you share\nand who you share it with',
  },
  {
    image: SecureMessage,
    title: 'Connect and message with confidence',
    body: 'Trust your digital connections',
  },
]

const createPageWith = (image: React.FC<SvgProps>, title: string, body: string, OnboardingTheme: any) => {
  const styles = createStyles(OnboardingTheme)
  const imageDisplayOptions = createImageDisplayOptions(OnboardingTheme)
  return (
    <>
      <View style={{ alignItems: 'center', marginTop: 10 }}>{image(imageDisplayOptions)}</View>
      <View style={{ marginLeft: 20, marginRight: 20, marginTop: 30 }}>
        <Text style={[styles.headerText, { fontSize: 40, textAlign: 'center' }]} testID={testIdWithKey('HeaderText')}>
          {title}
        </Text>
        <Text style={[styles.bodyText, { marginTop: 30, textAlign: 'center' }]} testID={testIdWithKey('BodyText')}>
          {body}
        </Text>
      </View>
    </>
  )
}

const OnboardingPages = (onTutorialCompleted: GenericFn, OnboardingTheme: any): Array<Element> => {
  return [
    ...guides.map((g) => createPageWith(g.image, g.title, g.body, OnboardingTheme)),
    customPages(onTutorialCompleted, OnboardingTheme),
  ]
}

export default OnboardingPages

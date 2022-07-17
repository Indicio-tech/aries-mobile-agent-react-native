import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, View } from 'react-native'
import { SvgProps } from 'react-native-svg'

import AppLogo from '../assets/img/app-logo.svg'
import HoldrLogo from '../assets/img/holdr-logo.svg'
import IndicioLogo from '../assets/img/indicio-logo.svg'
import SecureCredential from '../assets/img/secure-credential.svg'
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
      marginTop: 10,
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

export const createDisplayStyle = (OnboardingTheme: any) => {
  return StyleSheet.create({
    headerText: {
      ...OnboardingTheme.headerText,
      textAlign: 'center',
      width: '100%',
    },
    bodyText: {
      ...OnboardingTheme.bodyText,
      textAlign: 'center',
      width: '100%',
    },
    small: {
      height: 100,
      width: 100,
    },
    medium: {
      height: 200,
      width: 200,
    },
    wide: {
      height: 80,
      width: 220,
    },
  })
}

export const createStyles = (OnboardingTheme: any) => {
  return StyleSheet.create({
    image: {},
    container: {},
    header: {},
    body: {},
    footer: {},
  })
}

const completeOnboarding = (onTutorialCompleted: GenericFn, OnboardingTheme: any) => {
  const { t } = useTranslation()
  const styles = createDisplayStyle(OnboardingTheme)
  return (
    <>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <View
          style={{
            flex: 2,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {SecureMessage(styles.medium)}
        </View>
        <View
          style={{
            flex: 1,
            width: '100%',
            alignContent: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={[styles.headerText]} testID={testIdWithKey('HeaderText')}>
            Connect and{'\n'}message with{'\n'}confidence
          </Text>
        </View>
        <View
          style={{
            flex: 2,
            width: '100%',
            alignContent: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text style={[styles.bodyText, { marginTop: 20 }]} testID={testIdWithKey('BodyText')}>
            Trust your digital connections
          </Text>
          <View style={{ marginTop: 'auto', marginBottom: 20, paddingHorizontal: 20 }}>
            <Button
              title={t('Global.GetStarted')}
              accessibilityLabel={t('Global.GetStarted')}
              testID={testIdWithKey('GetStarted')}
              onPress={onTutorialCompleted}
              buttonType={ButtonType.Primary}
            />
          </View>
        </View>
      </View>
    </>
  )
}

interface GuideProps {
  image: React.FC<SvgProps>
  title: string
  titleImage?: React.FC<SvgProps>
  body: string
  footerImage?: React.FC<SvgProps>
  button?: unknown
}

const guides: Array<GuideProps> = [
  {
    image: AppLogo,
    title: 'Welcome to',
    titleImage: HoldrLogo,
    body: "It's more than just a digital wallet",
    footerImage: IndicioLogo,
  },
  {
    image: SecureCredential,
    title: 'Secure your\npersonal\ninformation',
    body: 'Decide what you share\nand who you share it with',
  },
]

const createPageWith = (props: GuideProps, OnboardingTheme: any) => {
  const styles = createDisplayStyle(OnboardingTheme)
  return (
    <>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <View style={{ flex: 2, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
          {props.image(styles.medium)}
        </View>
        <View
          style={{
            flex: 1,
            width: '100%',
            alignContent: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={[styles.headerText]} testID={testIdWithKey('HeaderText')}>
            {props.title}
          </Text>
          {props.titleImage ? (
            <View
              style={{
                alignItems: 'center',
                width: '100%',
              }}
            >
              {props.titleImage(styles.wide)}
            </View>
          ) : (
            <></>
          )}
        </View>
        <View
          style={{
            flex: 2,
            width: '100%',
            alignContent: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text style={[styles.bodyText, { marginTop: 30 }]} testID={testIdWithKey('BodyText')}>
            {props.body}
          </Text>
          {props.footerImage ? <View style={{ alignItems: 'center' }}>{props.footerImage(styles.small)}</View> : <></>}
        </View>
      </View>
    </>
  )
}

const OnboardingPages = (onTutorialCompleted: GenericFn, OnboardingTheme: any): Array<Element> => {
  return [
    ...guides.map((guide) => createPageWith(guide, OnboardingTheme)),
    completeOnboarding(onTutorialCompleted, OnboardingTheme),
  ]
}

export default OnboardingPages

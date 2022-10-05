import { StyleSheet } from 'react-native'

import { OnboardingStyleSheet } from '../../screens/Onboarding'

const Carousel = () => {
  const styles = (OnboardingTheme: any): OnboardingStyleSheet => {
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
        backgroundColor: 'blue',
      },
      pagerDot: {
        ...OnboardingTheme.pagerDot,
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
}

export default Carousel

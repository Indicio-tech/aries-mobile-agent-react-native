import { StyleSheet } from 'react-native'

interface FontAttributes {
  fontFamily?: string
  fontStyle?: 'normal' | 'italic'
  fontSize: number
  fontWeight: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'
  color: string
}

interface InputAttributes {
  padding?: number
  borderRadius?: number
  fontSize?: number
  backgroundColor?: string
  color?: string
  borderWidth?: number
  borderColor?: string
}

interface Inputs {
  label: FontAttributes
  textInput: InputAttributes
  inputSelected: InputAttributes
  singleSelect: InputAttributes
  singleSelectText: FontAttributes
  singleSelectIcon: InputAttributes
  checkBoxColor: InputAttributes
  checkBoxText: FontAttributes
}

interface TextTheme {
  headingOne: FontAttributes
  headingTwo: FontAttributes
  headingThree: FontAttributes
  headingFour: FontAttributes
  normal: FontAttributes
  label: FontAttributes
  labelTitle: FontAttributes
  labelSubtitle: FontAttributes
  labelText: FontAttributes
  caption: FontAttributes
  title: FontAttributes
}

interface BrandColors {
  primary: string
  primaryDisabled: string
  secondary: string
  secondaryDisabled: string
  highlight: string
  primaryBackground: string
  secondaryBackground: string
  link: string
}

interface SemanticColors {
  error: string
  success: string
  focus: string
}

interface NotificationColors {
  success: string
  successBorder: string
  successIcon: string
  successText: string
  info: string
  infoBorder: string
  infoIcon: string
  infoText: string
  warn: string
  warnBorder: string
  warnIcon: string
  warnText: string
  error: string
  errorBorder: string
  errorIcon: string
  errorText: string
}

interface GrayscaleColors {
  black: string
  darkGrey: string
  mediumGrey: string
  lightGrey: string
  veryLightGrey: string
  white: string
}

interface ColorPallet {
  brand: BrandColors
  semantic: SemanticColors
  notification: NotificationColors
  grayscale: GrayscaleColors
}

export const borderRadius = 10
export const heavyOpacity = 0.7
export const lightOpacity = 0.35
export const zeroOpacity = 0.0
export const borderWidth = 2

const BrandColors: BrandColors = {
  primary: '#FF6701',
  primaryDisabled: `rgba(255, 103, 1, ${lightOpacity})`,
  secondary: '#333545',
  secondaryDisabled: `rgba(51, 53, 69, ${heavyOpacity})`,
  highlight: '#CF0022',
  primaryBackground: '#FFFFFF',
  secondaryBackground: '#333545',
  link: '#000000',
}

const SemanticColors: SemanticColors = {
  error: '#D8292F',
  success: '#2E8540',
  focus: '#3399FF',
}

const NotificationColors: NotificationColors = {
  success: '#dff0d8',
  successBorder: '#d8e9c6',
  successIcon: '#2f451f',
  successText: '#2f451f',
  info: `#62627F`,
  infoBorder: '#333545',
  infoIcon: '#FFFFFF',
  infoText: '#FFFFFF',
  warn: '#f9e9c6',
  warnBorder: '#fae6cc',
  warnIcon: '#6c3f00',
  warnText: '#6c3f00',
  error: '#f2dfde',
  errorBorder: '#ebcccd',
  errorIcon: '#a13522',
  errorText: '#a13522',
}

const GrayscaleColors: GrayscaleColors = {
  black: '#000000',
  darkGrey: '#313132',
  mediumGrey: '#606060',
  lightGrey: '#D3D3D3',
  veryLightGrey: '#F2F2F2',
  white: '#FFFFFF',
}

export const ColorPallet: ColorPallet = {
  brand: BrandColors,
  semantic: SemanticColors,
  notification: NotificationColors,
  grayscale: GrayscaleColors,
}

export const TextTheme: TextTheme = {
  headingOne: {
    fontSize: 38,
    fontWeight: 'bold',
    color: ColorPallet.grayscale.darkGrey,
  },
  headingTwo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: ColorPallet.grayscale.darkGrey,
  },
  headingThree: {
    fontSize: 26,
    fontWeight: 'bold',
    color: ColorPallet.grayscale.darkGrey,
  },
  headingFour: {
    fontSize: 21,
    fontWeight: 'bold',
    color: ColorPallet.grayscale.darkGrey,
  },
  normal: {
    fontSize: 18,
    fontWeight: 'normal',
    color: ColorPallet.grayscale.white,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: ColorPallet.grayscale.darkGrey,
  },
  labelTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: ColorPallet.grayscale.darkGrey,
  },
  labelSubtitle: {
    fontSize: 14,
    fontWeight: 'normal',
    color: ColorPallet.grayscale.darkGrey,
  },
  labelText: {
    fontSize: 10,
    fontWeight: 'normal',
    fontStyle: 'italic',
    color: ColorPallet.grayscale.darkGrey,
  },
  caption: {
    fontSize: 14,
    fontWeight: 'normal',
    color: ColorPallet.grayscale.darkGrey,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: ColorPallet.notification.infoText,
  },
}

export const Inputs: Inputs = StyleSheet.create({
  label: {
    ...TextTheme.label,
  },
  textInput: {
    padding: 10,
    borderRadius: 15,
    fontSize: 16,
    backgroundColor: ColorPallet.brand.primaryBackground,
    color: ColorPallet.brand.secondary,
    borderWidth: 2,
    borderColor: ColorPallet.brand.secondary,
  },
  inputSelected: {
    borderColor: ColorPallet.brand.primary,
  },
  singleSelect: {
    padding: 12,
    borderRadius: borderRadius * 2,
    backgroundColor: ColorPallet.brand.secondaryBackground,
  },
  singleSelectText: {
    ...TextTheme.normal,
  },
  singleSelectIcon: {
    color: ColorPallet.grayscale.white,
  },
  checkBoxColor: {
    color: ColorPallet.brand.primary,
  },
  checkBoxText: {
    ...TextTheme.normal,
    color: ColorPallet.brand.primary,
  },
})

export const Buttons = StyleSheet.create({
  primary: {
    padding: 16,
    borderRadius: 10,
    backgroundColor: ColorPallet.brand.primary,
  },
  primaryDisabled: {
    padding: 16,
    borderRadius: 10,
    backgroundColor: ColorPallet.brand.primaryDisabled,
  },
  primaryText: {
    ...TextTheme.normal,
    fontWeight: 'bold',
    color: ColorPallet.grayscale.white,
    textAlign: 'center',
  },
  primaryTextDisabled: {
    ...TextTheme.normal,
    fontWeight: 'bold',
    color: ColorPallet.grayscale.white,
    textAlign: 'center',
  },
  secondary: {
    padding: 16,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: ColorPallet.brand.primary,
  },
  secondaryDisabled: {
    padding: 16,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: ColorPallet.brand.secondaryDisabled,
  },
  secondaryText: {
    ...TextTheme.normal,
    fontWeight: 'bold',
    color: ColorPallet.brand.primary,
    textAlign: 'center',
  },
  secondaryTextDisabled: {
    ...TextTheme.normal,
    fontWeight: 'bold',
    color: ColorPallet.brand.secondaryDisabled,
    textAlign: 'center',
  },
})

export const ListItems = StyleSheet.create({
  credentialBackground: {
    backgroundColor: ColorPallet.brand.secondaryBackground,
  },
  credentialTitle: {
    ...TextTheme.headingFour,
    color: ColorPallet.grayscale.white,
  },
  credentialDetails: {
    ...TextTheme.caption,
    color: ColorPallet.grayscale.white,
  },
  emptyList: {
    ...TextTheme.normal,
    color: ColorPallet.brand.secondary,
  },
  contactBackground: {
    backgroundColor: ColorPallet.grayscale.lightGrey,
  },
  contactIconBackground: {
    backgroundColor: ColorPallet.brand.primary,
  },
  contactIcon: {
    color: ColorPallet.grayscale.white,
  },
  contactTitle: {
    color: ColorPallet.brand.secondary,
  },
  contactDate: {
    color: ColorPallet.brand.secondary,
  },
})

export const TabTheme = {
  tabBarStyle: {
    height: 60,
    backgroundColor: ColorPallet.brand.secondaryBackground,
    shadowOffset: { width: 0, height: -3 },
    shadowRadius: 6,
    shadowColor: ColorPallet.grayscale.black,
    shadowOpacity: 0.1,
    borderTopWidth: 0,
    paddingBottom: 0,
  },
  tabBarActiveTintColor: ColorPallet.brand.primary,
  tabBarInactiveTintColor: ColorPallet.notification.infoText,
  tabTextStyle: {
    ...TextTheme.label,
    fontWeight: 'normal',
    paddingBottom: 5,
  },
  focusTabIconStyle: {
    height: 60,
    width: 60,
    backgroundColor: ColorPallet.brand.primary,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
}

export const NavigationTheme = {
  dark: true,
  colors: {
    primary: ColorPallet.brand.primary,
    background: ColorPallet.brand.primaryBackground,
    card: ColorPallet.brand.secondary,
    text: ColorPallet.grayscale.white,
    border: ColorPallet.grayscale.white,
    notification: ColorPallet.grayscale.white,
  },
}

export const HomeTheme = StyleSheet.create({
  welcomeHeader: {
    ...TextTheme.headingOne,
    color: ColorPallet.brand.secondary,
  },
  credentialMsg: {
    ...TextTheme.normal,
    color: ColorPallet.brand.secondary,
  },
  notificationsHeader: {
    ...TextTheme.headingThree,
    color: ColorPallet.brand.secondary,
  },
  noNewUpdatesText: {
    ...TextTheme.normal,
  },
})

export const SettingsTheme = {
  groupHeader: {
    ...TextTheme.normal,
    marginBottom: 8,
  },
  groupBackground: ColorPallet.brand.secondaryBackground,
  iconColor: ColorPallet.grayscale.white,
  text: {
    ...TextTheme.normal,
    color: ColorPallet.grayscale.white,
  },
}

export const ChatTheme = {
  leftBubble: {
    backgroundColor: ColorPallet.brand.secondaryBackground,
    borderRadius: 20,
    padding: 4,
    marginLeft: -4,
  },
  rightBubble: {
    backgroundColor: ColorPallet.brand.primary,
    borderRadius: 20,
    padding: 4,
    marginRight: 4,
  },
  leftText: {
    color: ColorPallet.grayscale.white,
    fontSize: TextTheme.normal.fontSize,
  },
  rightText: {
    color: ColorPallet.grayscale.white,
    fontSize: TextTheme.normal.fontSize,
  },
  inputToolbar: {
    backgroundColor: ColorPallet.grayscale.lightGrey,
    shadowColor: ColorPallet.brand.primaryDisabled,
    borderRadius: 10,
  },
  inputText: {
    lineHeight: undefined,
    fontWeight: '500',
    fontSize: TextTheme.normal.fontSize,
  },
  placeholderText: ColorPallet.grayscale.darkGrey,
  sendContainer: {
    marginBottom: 4,
    paddingHorizontal: 4,
    justifyContent: 'center',
  },
  sendEnabled: ColorPallet.brand.primary,
  sendDisabled: ColorPallet.brand.primaryDisabled,
}

export const OnboardingTheme = {
  container: {
    backgroundColor: ColorPallet.brand.primaryBackground,
  },
  carouselContainer: {
    backgroundColor: ColorPallet.brand.primaryBackground,
  },
  pagerDot: {
    borderColor: ColorPallet.brand.primary,
  },
  pagerDotActive: {
    color: ColorPallet.brand.secondary,
  },
  pagerDotInactive: {
    color: ColorPallet.brand.primary,
  },
  pagerNavigationButton: {
    color: ColorPallet.brand.primary,
  },
  headerText: {
    color: ColorPallet.grayscale.darkGrey,
    fontSize: 32,
    fontWeight: 'bold',
  },
  bodyText: {
    fontSize: 18,
    fontWeight: 'normal',
    color: ColorPallet.grayscale.darkGrey,
  },
  imageDisplayOptions: {
    fill: ColorPallet.grayscale.lightGrey,
  },
}

export interface Theme {
  ColorPallet: ColorPallet
  TextTheme: TextTheme
  Inputs: Inputs
  Buttons: any
  ListItems: any
  TabTheme: any
  NavigationTheme: any
  HomeTheme: any
  SettingsTheme: any
  ChatTheme: any
  OnboardingTheme: any
  heavyOpacity: any
  borderRadius: any
  borderWidth: typeof borderWidth
}

export const defaultTheme: Theme = {
  ColorPallet,
  TextTheme,
  Inputs,
  Buttons,
  ListItems,
  TabTheme,
  NavigationTheme,
  HomeTheme,
  SettingsTheme,
  ChatTheme,
  OnboardingTheme,
  heavyOpacity,
  borderRadius,
  borderWidth,
}

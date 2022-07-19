import { StyleSheet } from 'react-native'

interface FontAttributes {
  fontFamily: string
  fontStyle?: 'normal' | 'italic'
  fontSize: number
  fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'
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

interface Assets {
  img: {
    logoLarge: any
  }
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
  secondaryBackground: '#62627F',
  link: '#FD9A25',
}

const SemanticColors: SemanticColors = {
  error: '#D8292F',
  success: '#2E8540',
  focus: '#3399FF',
}

const NotificationColors: NotificationColors = {
  success: '#606060',
  successBorder: '#d8e9c6',
  successIcon: '#35A700',
  successText: '#d8e9c6',
  info: '#62627F',
  infoBorder: '#FAD744',
  infoIcon: '#FAD744',
  infoText: '#FFFFFF',
  warn: '#f9e9c6',
  warnBorder: '#FF6701',
  warnIcon: '#FF6701',
  warnText: '#6c3f00',
  error: '#f2dfde',
  errorBorder: '#CF0022',
  errorIcon: '#CF0022',
  errorText: '#CF0022',
}

const GrayscaleColors: GrayscaleColors = {
  black: '#202020',
  darkGrey: '#313132',
  mediumGrey: '#606060',
  lightGrey: '#D3D3D3',
  veryLightGrey: '#F2F2F2',
  white: '#FCFCFC',
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
    color: ColorPallet.grayscale.darkGrey,
    fontFamily: 'SourceSansPro-Bold',
  },
  headingTwo: {
    fontSize: 32,
    color: ColorPallet.grayscale.darkGrey,
    fontFamily: 'SourceSansPro-Bold',
  },
  headingThree: {
    fontSize: 26,
    color: ColorPallet.grayscale.darkGrey,
    fontFamily: 'SourceSansPro-Bold',
  },
  headingFour: {
    fontSize: 21,
    color: ColorPallet.grayscale.darkGrey,
    fontFamily: 'SourceSansPro-Bold',
  },
  normal: {
    fontSize: 18,
    fontWeight: 'normal',
    color: ColorPallet.grayscale.darkGrey,
    fontFamily: 'SourceSansPro-Regular',
  },
  label: {
    fontSize: 14,
    color: ColorPallet.grayscale.darkGrey,
    fontFamily: 'SourceSansPro-Bold',
  },
  labelTitle: {
    fontSize: 16,
    color: ColorPallet.grayscale.darkGrey,
    fontFamily: 'SourceSansPro-Bold',
  },
  labelSubtitle: {
    fontSize: 14,
    fontWeight: 'normal',
    color: ColorPallet.grayscale.darkGrey,
    fontFamily: 'SourceSansPro-Regular',
  },
  labelText: {
    fontSize: 10,
    fontWeight: 'normal',
    fontStyle: 'italic',
    color: ColorPallet.grayscale.darkGrey,
    fontFamily: 'SourceSansPro-Regular',
  },
  caption: {
    fontSize: 14,
    fontWeight: 'normal',
    color: ColorPallet.grayscale.darkGrey,
    fontFamily: 'SourceSansPro-Regular',
  },
  title: {
    fontSize: 20,
    color: ColorPallet.notification.infoText,
    fontFamily: 'SourceSansPro-Bold',
  },
}

export const Inputs: Inputs = StyleSheet.create({
  label: {
    ...TextTheme.label,
  },
  textInput: {
    padding: 10,
    borderRadius,
    fontSize: 16,
    backgroundColor: ColorPallet.brand.primaryBackground,
    color: ColorPallet.brand.secondary,
    borderWidth: 2,
    borderColor: ColorPallet.brand.secondary,
    fontFamily: 'SourceSansPro-Regular',
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
    color: ColorPallet.grayscale.white,
  },
  singleSelectIcon: {
    color: ColorPallet.grayscale.white,
  },
  checkBoxColor: {
    color: ColorPallet.notification.infoIcon,
  },
  checkBoxText: {
    ...TextTheme.normal,
    color: ColorPallet.brand.primary,
  },
})

export const Buttons = StyleSheet.create({
  primary: {
    padding: 16,
    borderRadius: 6,
    backgroundColor: ColorPallet.brand.primary,
  },
  primaryDisabled: {
    padding: 16,
    borderRadius: 6,
    backgroundColor: ColorPallet.brand.primaryDisabled,
  },
  primaryText: {
    ...TextTheme.normal,
    fontFamily: 'SourceSansPro-Bold',
    color: ColorPallet.grayscale.white,
    textAlign: 'center',
  },
  primaryTextDisabled: {
    ...TextTheme.normal,
    fontFamily: 'SourceSansPro-Bold',
    color: ColorPallet.grayscale.white,
    textAlign: 'center',
  },
  secondary: {
    padding: 16,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: ColorPallet.brand.primary,
  },
  secondaryDisabled: {
    padding: 16,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: ColorPallet.brand.secondaryDisabled,
  },
  secondaryText: {
    ...TextTheme.normal,
    fontFamily: 'SourceSansPro-Bold',
    color: ColorPallet.brand.primary,
    textAlign: 'center',
  },
  secondaryTextDisabled: {
    ...TextTheme.normal,
    fontFamily: 'SourceSansPro-Bold',
    color: ColorPallet.brand.secondaryDisabled,
    textAlign: 'center',
  },
  connectButton: {
    backgroundColor: ColorPallet.grayscale.lightGrey,
    padding: 20,
    marginHorizontal: 15,
    borderRadius: 25,
  },
  connectButtonText: {
    ...TextTheme.normal,
    color: ColorPallet.grayscale.darkGrey,
  },
})

export const ListItems = StyleSheet.create({
  credentialBackground: {
    backgroundColor: ColorPallet.grayscale.lightGrey,
  },
  credentialTitle: {
    ...TextTheme.headingFour,
  },
  credentialDetails: {
    ...TextTheme.caption,
  },
  credentialOfferBackground: {
    backgroundColor: ColorPallet.grayscale.lightGrey,
  },
  credentialOfferTitle: {
    ...TextTheme.headingThree,
  },
  credentialOfferDetails: {
    ...TextTheme.normal,
  },
  revoked: {
    backgroundColor: ColorPallet.grayscale.darkGrey,
    // borderColor: ColorPallet.notification.errorBorder,
  },
  contactBackground: {
    backgroundColor: ColorPallet.grayscale.lightGrey,
  },
  credentialIconColor: {
    color: ColorPallet.notification.infoText,
  },
  contactTitle: {
    color: ColorPallet.grayscale.darkGrey,
  },
  contactDate: {
    color: ColorPallet.grayscale.darkGrey,
    marginTop: 10,
  },
  contactIconBackground: {
    backgroundColor: ColorPallet.brand.primary,
  },
  contactIcon: {
    color: ColorPallet.grayscale.white,
  },
  recordAttributeLabel: {
    ...TextTheme.normal,
  },
  recordContainer: {
    backgroundColor: ColorPallet.grayscale.lightGrey,
  },
  recordBorder: {
    borderBottomColor: ColorPallet.grayscale.white,
  },
  recordLink: {
    color: ColorPallet.brand.link,
  },
  recordAttributeText: {
    ...TextTheme.normal,
  },
  proofIcon: {
    ...TextTheme.headingOne,
  },
  proofError: {
    color: ColorPallet.semantic.error,
  },
  proofListItem: {
    paddingHorizontal: 25,
    paddingTop: 16,
    backgroundColor: ColorPallet.grayscale.lightGrey,
    borderTopColor: ColorPallet.brand.secondaryBackground,
    borderBottomColor: ColorPallet.brand.secondaryBackground,
    borderTopWidth: 2,
    borderBottomWidth: 2,
  },
  avatarText: {
    ...TextTheme.headingTwo,
    fontWeight: 'normal',
  },
  avatarCircle: {
    borderRadius: TextTheme.headingTwo.fontSize,
    borderColor: TextTheme.headingTwo.color,
    width: TextTheme.headingTwo.fontSize * 2,
    height: TextTheme.headingTwo.fontSize * 2,
  },
  emptyList: {
    ...TextTheme.normal,
  },
})

export const TabTheme = {
  tabBarStyle: {
    height: 60,
    backgroundColor: ColorPallet.brand.secondary,
    shadowOffset: { width: 0, height: -3 },
    shadowRadius: 6,
    shadowColor: ColorPallet.grayscale.black,
    shadowOpacity: 0.1,
    borderTopWidth: 0,
    paddingBottom: 0,
  },
  tabBarActiveTintColor: ColorPallet.brand.link,
  tabBarInactiveTintColor: ColorPallet.notification.infoText,
  tabBarTextStyle: {
    ...TextTheme.label,
    fontFamily: 'SourceSansPro-Normal',
    marginBottom: 5,
  },
  tabBarButtonIconStyle: {
    color: ColorPallet.notification.infoText,
  },
  focusTabIconStyle: {
    height: 60,
    width: 60,
    backgroundColor: ColorPallet.brand.primary,
    top: -20,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  focusTabActiveTintColor: {
    backgroundColor: ColorPallet.grayscale.mediumGrey,
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
  },
  credentialMsg: {
    ...TextTheme.normal,
  },
  notificationsHeader: {
    ...TextTheme.headingThree,
  },
  noNewUpdatesText: {
    ...TextTheme.normal,
    color: ColorPallet.notification.infoText,
  },
  link: {
    ...TextTheme.normal,
    color: ColorPallet.brand.link,
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
    ...TextTheme.caption,
    color: ColorPallet.grayscale.white,
  },
}

export const ChatTheme = {
  leftBubble: {
    backgroundColor: ColorPallet.grayscale.lightGrey,
    borderRadius: 20,
    padding: 4,
    marginLeft: -4,
  },
  rightBubble: {
    backgroundColor: ColorPallet.brand.secondaryBackground,
    borderRadius: 20,
    padding: 4,
    marginRight: 4,
  },
  leftText: {
    color: ColorPallet.grayscale.black,
    fontSize: TextTheme.normal.fontSize,
    fontFamily: 'SourceSansPro-Regular',
  },
  rightText: {
    color: ColorPallet.grayscale.white,
    fontSize: TextTheme.normal.fontSize,
    fontFamily: 'SourceSansPro-Regular',
  },
  inputToolbar: {
    backgroundColor: ColorPallet.grayscale.veryLightGrey,
    shadowColor: ColorPallet.brand.primaryDisabled,
    borderRadius: 10,
  },
  inputText: {
    lineHeight: undefined,
    fontWeight: '500',
    fontSize: TextTheme.normal.fontSize,
    fontFamily: 'SourceSansPro-Regular',
  },
  placeholderText: ColorPallet.grayscale.lightGrey,
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
  headerTintColor: ColorPallet.grayscale.white,
  headerText: {
    color: ColorPallet.grayscale.darkGrey,
    fontSize: 32,
    fontFamily: 'SourceSansPro-bold',
  },
  bodyText: {
    fontSize: 18,
    fontFamily: 'SourceSansPro-Regular',
    color: ColorPallet.grayscale.darkGrey,
  },
  imageDisplayOptions: {
    fill: ColorPallet.grayscale.lightGrey,
  },
}

const LoadingTheme = {
  backgroundColor: ColorPallet.brand.primaryBackground,
}

const PinInputTheme = {
  cell: {
    backgroundColor: ColorPallet.grayscale.lightGrey,
    borderColor: ColorPallet.grayscale.lightGrey,
  },
  focusedCell: {
    backgroundColor: ColorPallet.grayscale.veryLightGrey,
    borderColor: ColorPallet.brand.link,
  },
  filledCell: {
    backgroundColor: ColorPallet.grayscale.veryLightGrey,
    borderColor: ColorPallet.grayscale.veryLightGrey,
  },
  cellText: {
    hidden: ColorPallet.brand.link,
    visible: ColorPallet.grayscale.black,
  },
  icon: {
    hide: ColorPallet.grayscale.lightGrey,
    show: ColorPallet.brand.link,
  },
}

export const Assets = {
  img: {
    logoLarge: {
      src: require('./assets/img/logo-large.png'),
      aspectRatio: 1,
      height: '33%',
      width: '33%',
      resizeMode: 'contain',
    },
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
  LoadingTheme: any
  PinInputTheme: any
  heavyOpacity: any
  borderRadius: any
  borderWidth: typeof borderWidth
  Assets: Assets
}

export const theme: Theme = {
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
  LoadingTheme,
  PinInputTheme,
  heavyOpacity,
  borderRadius,
  borderWidth,
  Assets,
}

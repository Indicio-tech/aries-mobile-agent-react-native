import { createContext, useContext } from 'react'

export const borderRadius = 10
export const heavyOpacity = 0.7
export const lightOpacity = 0.35
export const zeroOpacity = 0.0
export const borderWidth = 2

interface BrandColors {
  primary: string
  primaryDisabled: string
  secondary: string
  secondaryDisabled: string
  tertiary: string
  tertiaryDisabled: string
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

const BrandColors: BrandColors = {
  primary: '#FF6701',
  primaryDisabled: `rgba(255, 103, 1, ${lightOpacity})`,
  secondary: '#333545',
  secondaryDisabled: `rgba(51, 53, 69, ${heavyOpacity})`,
  tertiary: '#FF6701',
  tertiaryDisabled: `rgba(255, 103, 1, ${lightOpacity})`,
  highlight: '#CF0022',
  primaryBackground: '#FCFCFC',
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

//#AEAEAE, #F2F2F2
const GrayscaleColors: GrayscaleColors = {
  black: '#202020',
  darkGrey: '#313132',
  mediumGrey: '#606060',
  lightGrey: '#D3D3D3',
  veryLightGrey: '#EBEBEB',
  white: '#FCFCFC',
}

export const ColorPallet: ColorPallet = {
  brand: BrandColors,
  semantic: SemanticColors,
  notification: NotificationColors,
  grayscale: GrayscaleColors,
}

export interface Theme {
  ColorPallet: ColorPallet
}

const theme: Theme = {
  ColorPallet
}

export const ThemeContext = createContext<Theme>(theme)

export const ThemeProvider = ThemeContext.Provider

export const useTheme = () => useContext(ThemeContext)
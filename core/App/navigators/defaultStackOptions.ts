import { Theme } from '../theme'
import { useTranslation } from 'react-i18next'

export function createDefaultStackOptions({ ColorPallet }: Theme) {
  const { t } = useTranslation()
  return {
    headerTintColor: ColorPallet.grayscale.white,
    headerShown: true,
    headerBackTitleVisible: false,
    headerBackAccessibilityLabel: t('Global.Back'),
    headerTitleAlign: 'center',
    headerStyle: {
      elevation: 0,
      shadowOffset: { width: 0, height: 6 },
      shadowRadius: 6,
      shadowColor: ColorPallet.grayscale.black,
      shadowOpacity: 0.15,
      borderBottomWidth: 0,
    },
  }
}

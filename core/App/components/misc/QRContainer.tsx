import React, {FC} from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import QRCode from 'react-native-qrcode-svg'

import { useThemeContext } from '../../utils/themeContext'

interface QRContainerProps {
  value?: string
  size?: number
  color?: string
  containerStyle?: ViewStyle
}

const QRContainer: FC<QRContainerProps> = ({ value, size, color, containerStyle }) => {
  const { ColorPallet, borderRadius } = useThemeContext()
  const styles = StyleSheet.create({
    container: {
      padding: 15,
      backgroundColor: ColorPallet.grayscale.white,
      borderRadius,
    }
  })
  return (
    <>
      {value && (
        <View 
        style={[styles.container, containerStyle]}
        testID="QRContainer"
        children={<QRCode value={value} size={size} color={color} />}
        />
      )}
    </>
)}

export default QRContainer
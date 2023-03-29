import type { ConnectionRecord } from '@aries-framework/core'
import React from 'react'
import { View, StyleSheet, TouchableOpacity, ViewStyle, TextStyle, ColorValue } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { dateFormatOptions } from '../../constants'
import { useTheme } from '../../contexts/theme'
import Text from '../texts/Text'
import Title from '../texts/Title'
import { useTranslation } from 'react-i18next'

interface ContactItemProps {
  overrideStyles?: ContactItemStyles
  strings?: ContactItemStrings
  contactRecord: ConnectionRecord
  onPressCallback: () => void
}
interface ContactItemStrings {
  new: string
}
interface ContactItemStyles {
  outerContainer: ViewStyle,
  textContainer: ViewStyle,
  iconContainer: ViewStyle,
  contactTitle: TextStyle,
  contactDate: TextStyle,
  contactIcon: IconStyle,
  containerStyles: ViewStyle,
}
interface IconStyle {
  color: ColorValue
}


const ContactItem: React.FC<ContactItemProps> = ({overrideStyles, contactRecord, onPressCallback}) => {
const { t } = useTranslation()


const { ColorPallet } = useTheme()
const defaultStyles:ContactItemStyles = {
  outerContainer: {
    backgroundColor: ColorPallet.brand.secondaryBackground,
    marginTop: 15,
    marginHorizontal: 15,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 15,
  },
  iconContainer: {
    backgroundColor: ColorPallet.brand.primary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  contactTitle: {
    color: ColorPallet.grayscale.white,
  },
  contactDate: {
    color: ColorPallet.grayscale.white,
    marginTop: 10,
  },
  contactIcon: {
    color: ColorPallet.grayscale.white,
  },
  containerStyles: {}
}
let updatedStyles: ContactItemStyles = defaultStyles
  let keys = Object.keys(defaultStyles)
  keys.forEach((v: string) => {
    let key = v as keyof ContactItemStyles
    if (overrideStyles && overrideStyles?.[key]) {
      updatedStyles[key] = {
        ...defaultStyles[key],
        ...overrideStyles?.[key]
      }
    }
  })
const styles: ContactItemStyles = StyleSheet.create(updatedStyles)

return (
  <TouchableOpacity
    onPress={() =>
      onPressCallback()
    }
    style={styles.containerStyles}
  >
    <View key={contactRecord.id} style={styles.outerContainer}>
      <View style={styles.textContainer}>
        <Title style={styles.contactTitle}>{contactRecord?.alias || contactRecord?.theirLabel}</Title>
        <Text style={styles.contactDate}>{contactRecord.createdAt.toLocaleDateString('en-CA', dateFormatOptions)}</Text>
      </View>
      <View style={styles.iconContainer}>
        <Icon name="message" size={32} color={styles.contactIcon!.color} />
      </View>
    </View>
  </TouchableOpacity>
)
}
export default ContactItem
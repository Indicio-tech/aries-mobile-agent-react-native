import type { ConnectionRecord } from '@aries-framework/core'
import React from 'react'
import { View, StyleSheet, TouchableOpacity, ViewStyle, TextStyle, ColorValue } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { dateFormatOptions } from '../../constants'
import { useTheme } from '../../contexts/theme'
import Text from '../texts/Text'
import Title from '../texts/Title'
import { useTranslation } from 'react-i18next'
interface BaseProps <T> {
  overrideStyles: T
  // overrideStyles?: Partial<T> | undefined
}
interface ContactItemProps extends BaseProps<ContactItemStyles> {
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
const ContactItem: React.FC<ContactItemProps> = ({overrideStyles, strings, contactRecord, onPressCallback}) => {
  const { ListItems } = useTheme()
  const defaultStyles:ContactItemStyles = {
    outerContainer: {
      ...ListItems.contactBackground,
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
      ...ListItems.contactIconBackground,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      borderTopRightRadius: 15,
      borderBottomRightRadius: 15,
    },
    contactTitle: ListItems.contactTitle,
    contactDate: ListItems.contactDate,
    contactIcon: {
      color: ListItems.contactIcon.color,
    },
    containerStyles: {
    }
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
  const { t } = useTranslation()
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
        <Text>{strings?.new}</Text>
        <View style={styles.iconContainer}>
          <Icon name="message" size={32} color={styles.contactIcon!.color} />
        </View>
      </View>
    </TouchableOpacity>
  )
}
export default ContactItem
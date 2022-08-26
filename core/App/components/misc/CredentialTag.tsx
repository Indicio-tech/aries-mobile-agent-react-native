import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, View } from 'react-native'

import { useTheme } from '../../contexts/theme'

interface props {
  label: string
  textStyle: any
  containerStyle: any
}

const CredentialTag = (props: props) => {
  const t = useTranslation()
  const { TextTheme } = useTheme()

  const styles = StyleSheet.create({
    label: {
      ...TextTheme.labelTitle,
      color: props.textStyle,
    },
    container: {
      borderRadius: 15,
      paddingVertical: 5,
      paddingHorizontal: 10,
      backgroundColor: props.containerStyle,
    },
  })

  return (
    <View style={[styles.container, ...props.containerStyle]}>
      <Text style={[styles.label, ...props.textStyle]}>{props.label}</Text>
    </View>
  )
}

export default CredentialTag

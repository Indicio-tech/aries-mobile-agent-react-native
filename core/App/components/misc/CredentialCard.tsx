import { CredentialExchangeRecord as CredentialRecord } from '@aries-framework/core'
import { useConnectionById } from '@aries-framework/react-hooks'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { useTheme } from '../../contexts/theme'
import { GenericFn } from '../../types/fn'
import { parsedSchema } from '../../utils/helpers'
import { testIdWithKey } from '../../utils/testable'

import AvatarView from './AvatarView'
import CredentialTag from './CredentialTag'

interface CredentialCardProps {
  credential: CredentialRecord
  revoked?: boolean
  style?: ViewStyle
  onPress?: GenericFn
}

const CredentialCard: React.FC<CredentialCardProps> = ({
  credential,
  revoked = false,
  style = {},
  onPress = undefined,
}) => {
  const { t } = useTranslation()
  const { ColorPallet, ListItems } = useTheme()
  const connection = useConnectionById(credential.connectionId)
  const styles = StyleSheet.create({
    container: {
      ...ListItems.credentialBackground,
      width: '90%',
      aspectRatio: 1.586,
      justifyContent: 'space-between',
      borderRadius: 15,
      padding: 15,
    },
    topRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
    },
    bottomRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    wrapper: {
      width: '70%',
    },
  })
  return (
    <TouchableOpacity
      disabled={typeof onPress === 'undefined' ? true : false}
      onPress={onPress}
      style={[styles.container, style]}
      testID={testIdWithKey('ShowCredentialDetails')}
    >
      <></>
      <View style={styles.topRow} testID={testIdWithKey('CredentialCard')}>
        <AvatarView
          name={parsedSchema(credential).name}
          style={
            revoked
              ? {
                  backgroundColor: ColorPallet.brand.primaryBackground,
                }
              : { backgroundColor: ColorPallet.brand.primaryBackground }
          }
        />
        <Text style={ListItems.credentialIssuer} testID={testIdWithKey('CredentialIssued')}>
          {credential.createdAt.toLocaleDateString('en-CA')}
        </Text>
      </View>
      <View style={styles.bottomRow} testID={testIdWithKey('CredentialCard')}>
        <View style={styles.wrapper} testID={testIdWithKey('CredentialCard')}>
          <Text style={ListItems.credentialIssuer}>{connection.theirLabel}</Text>
          <Text numberOfLines={1} style={ListItems.credentialTitle} testID={testIdWithKey('CredentialName')}>
            {parsedSchema(credential).name}
          </Text>
        </View>
        <View>
          {!revoked && (
            <CredentialTag
              label={'Revoked'}
              textStyle={ColorPallet.grayscale.white}
              containerStyle={ColorPallet.grayscale.mediumGrey}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default CredentialCard
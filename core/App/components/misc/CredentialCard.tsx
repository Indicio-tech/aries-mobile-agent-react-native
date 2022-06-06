import { CredentialRecord } from '@aries-framework/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, View, ViewStyle } from 'react-native'
// import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { dateFormatOptions } from '../../constants'
import { useTheme } from '../../contexts/theme'
import { parsedSchema } from '../../utils/helpers'
import { testIdWithKey } from '../../utils/testable'

import AvatarView from './AvatarView'

interface CredentialCardProps {
  credential: CredentialRecord
  revoked?: boolean
  style?: ViewStyle
  connectionName?: string
}

const CredentialCard: React.FC<CredentialCardProps> = ({
  credential,
  revoked = false,
  style = {},
  connectionName = '',
}) => {
  const { t } = useTranslation()
  const { ListItems } = useTheme()
  const styles = StyleSheet.create({
    container: {
      ...ListItems.credentialBackground,
      minHeight: 125,
      justifyContent: 'center',
      borderRadius: 15,
      padding: 10,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    details: { flexGrow: 1, justifyContent: 'space-between' },
  })
  return (
    <View
      style={[
        styles.container,
        revoked && {
          ...ListItems.revoked,
        },
        style,
      ]}
    >
      <View style={styles.details}>
        <View style={styles.row}>
          <Icon name="card-account-details" size={30} color={ListItems.credentialIconColor.color} />
          <Text style={ListItems.credentialDetails} testID={testIdWithKey('CredentialIssued')}>
            {credential.createdAt.toLocaleDateString('en-CA', dateFormatOptions)}
          </Text>
        </View>
        <View>
          <Text style={ListItems.credentialDetails} testID={testIdWithKey('CredentialVersion')}>
            {connectionName}
          </Text>
          <View style={styles.row}>
            <Text style={ListItems.credentialTitle} testID={testIdWithKey('CredentialName')}>
              {parsedSchema(credential).name}
            </Text>
            {revoked && (
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                <View style={{ flexDirection: 'row', padding: 5, borderRadius: 10, backgroundColor: 'grey' }}>
                  <Icon
                    style={{ marginRight: 5, borderRadius: 50, backgroundColor: ListItems.revokedText.color }}
                    name="exclamation"
                    color="grey"
                    size={ListItems.credentialTitle.fontSize}
                  ></Icon>
                  <Text
                    style={[ListItems.credentialDetails, ListItems.revokedText, { fontWeight: 'bold' }]}
                    testID={testIdWithKey('CredentialRevoked')}
                  >
                    Revoked
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  )
}

export default CredentialCard

import React, { useState, useEffect } from 'react'
import { StyleSheet, useWindowDimensions, View, ViewStyle } from 'react-native'
import { ConnectionRecord, ConnectionState } from '@aries-framework/core'
import { useAgent, useConnectionById } from '@aries-framework/react-hooks'
import { useTranslation } from 'react-i18next'

import { testIdWithKey } from '../utils/testable'
import { Screens, TabStacks } from '../types/navigators'
import Button, { ButtonType } from '../components/buttons/Button'
import QRContainer from '../components/misc/QRContainer'

const DisplayCode = ({ navigation }) => {
  const { agent } = useAgent()
  const { t } = useTranslation()
  const {width} = useWindowDimensions()

  const [invitation, setInvitation] = useState({})
  const [value, setValue] = useState('placeholder')

  const connection = useConnectionById(invitation?.connectionRecord?.id)

  const styles = StyleSheet.create({
    outerContainer: {
      height: '100%',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    innerContainer: {}
  })

  const generateInvitation = async () => {
    const invitation = await agent?.connections.createConnection({
      autoAcceptConnection: true,
      myLabel: 'Holder+',
    })
    setInvitation(invitation)
  }

  useEffect(() => {
    generateInvitation()
  }, [])

  useEffect(() => {
    if (invitation?.invitation) {
      const url = invitation.invitation.toUrl({
        domain: agent.agentConfig.mediatorConnectionsInvite.split('?')[0],
      })
      console.log('URL: ', url)
      setValue(url)
    }
    console.log(invitation?.connectionRecord?.id)
  }, [invitation])

  useEffect(() => {
    console.log('connection: ', connection)
    if (connection?.state === ConnectionState.Complete) {
      navigation.navigate(TabStacks.ContactStack, { screen: Screens.Chat, params: { connectionId: connection?.id } })
    }
  }, [connection])

  

  return (
    <View style={styles.outerContainer}>
      <QRContainer value={value} containerStyle={styles.innerContainer} size={width - 100} />
      <Button 
        title={t('Global.Done')}
        accessibilityLabel={t('Global.Done')}
        testId={testIdWithKey('Done')}
        onPress={() => {navigation.goBack()}}
        buttonType={ButtonType.Primary}
      />
    </View>
  )
}

export default DisplayCode
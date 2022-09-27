import { Agent } from '@aries-framework/core'
import { useAgent } from '@aries-framework/react-hooks'
import { StackScreenProps } from '@react-navigation/stack'
import React, { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Barcode } from 'vision-camera-code-scanner'

import QRScanner from '../components/misc/QRScanner'
import { useStore } from '../contexts/store'
import { BifoldError, QrCodeScanError } from '../types/error'
import { TabStackParams, Screens, Stacks, TabStacks } from '../types/navigators'
import { isRedirection } from '../utils/helpers'

type ScanProps = StackScreenProps<TabStackParams>

const Scan: React.FC<ScanProps> = ({ navigation }) => {
  const { agent } = useAgent()
  const [state, dispatch] = useStore()
  const { t } = useTranslation()
  const [qrCodeScanError, setQrCodeScanError] = useState<QrCodeScanError | null>(null)

  const handleRedirection = async (url: string, agent?: Agent): Promise<void> => {
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      })
      const message = await res.json()
      await agent?.receiveMessage(message)
      navigation.getParent()?.navigate(Stacks.ConnectionStack, {
        screen: Screens.Connection,
        params: { threadId: message['@id'] },
      })
    } catch (err: unknown) {
      const error = new BifoldError(
        'Unable to accept connection',
        'There was a problem while accepting the connection redirection',
        (err as Error).message,
        1030
      )
      throw error
    }
  }

  const handleInvitation = async (url: string): Promise<void> => {
    try {
      const invitation = await agent?.oob.parseInvitation(url)
      if (!invitation) {
        throw new Error('Could not parse invitation from URL')
      }

      const record = await agent?.oob.receiveInvitation(invitation, {
        label: state.user.firstName + ' ' + state.user.lastName,
      })
      const connectionRecord = record?.connectionRecord
      if (!connectionRecord?.id) {
        throw new Error('Connection does not have an ID')
      }
      navigation.goBack()
      navigation.getParent()?.navigate(Stacks.ConnectionStack, {
        screen: Screens.Connection,
        params: { connectionId: connectionRecord.id },
      })
    } catch (err: unknown) {
      const error = new BifoldError(
        'Unable to accept connection',
        'There was a problem while accepting the connection.',
        (err as Error).message,
        1031
      )
      throw error
    }
  }

  const handleCodeScan = async (barcode: Barcode) => {
    setQrCodeScanError(null)
    try {
      const uri = barcode.displayValue
      if (uri) {
        if (isRedirection(uri)) {
          await handleRedirection(uri, agent)
        } else {
          await handleInvitation(uri)
        }
      }
    } catch (e: unknown) {
      const error = new QrCodeScanError(t('Scan.InvalidQrCode'), barcode.displayValue)
      setQrCodeScanError(error)
    }
  }

  return (
    <>
      {
        <QRScanner
          handleCodeScan={handleCodeScan}
          error={qrCodeScanError}
          enableCameraOnError={true}
          setQrCodeScanError={setQrCodeScanError}
        />
      }
    </>
  )
}

export default Scan

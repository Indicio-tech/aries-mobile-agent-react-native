import { useNavigation } from '@react-navigation/core'
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useWindowDimensions, Vibration, View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Camera, useCameraDevices } from 'react-native-vision-camera'
import { Barcode, useScanBarcodes, BarcodeFormat } from 'vision-camera-code-scanner'

import { useTheme } from '../../contexts/theme'
import { QrCodeScanError } from '../../types/error'

import QRScannerClose from './QRScannerClose'
import QRScannerTorch from './QRScannerTorch'

interface Props {
  handleCodeScan: (barcode: Barcode) => Promise<void>
  setQrCodeScanError: (error: QrCodeScanError | null) => void
  error?: QrCodeScanError | null
  enableCameraOnError?: boolean
}

const CameraViewContainer: React.FC<{ portrait: boolean }> = ({ portrait, children }) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: portrait ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {children}
    </View>
  )
}

const QRScanner: React.FC<Props> = ({ handleCodeScan, error, setQrCodeScanError }) => {
  const navigation = useNavigation()

  const [hasPermission, setHasPermission] = useState(false)
  const devices = useCameraDevices()
  const device = devices.back

  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  })

  const [cameraActive, setCameraActive] = useState(true)
  const [torchActive, setTorchActive] = useState(false)
  const { width, height } = useWindowDimensions()
  const portraitMode = height > width
  const { t } = useTranslation()
  const invalidQrCodes = new Set<string>()
  const { ColorPallet, TextTheme } = useTheme()
  const styles = StyleSheet.create({
    container: {
      height: '100%',
      width: '100%',
      backgroundColor: ColorPallet.grayscale.black,
      justifyContent: 'center',
      alignItems: 'center',
    },
    viewFinder: {
      width: 250,
      height: 250,
      borderRadius: 24,
      borderWidth: 2,
      borderColor: ColorPallet.grayscale.white,
    },
    viewFinderContainer: {
      flex: 0.5,
      justifyContent: 'center',
    },
    errorMessage: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 15,
      borderRadius: 10,
      backgroundColor: ColorPallet.brand.primaryBackground,
    },
    errorContainer: {
      flex: 0.2,
      justifyContent: 'flex-start',
    },
    scannerClose: {
      flex: 0.2,
    },
    torchContainer: {
      flex: 0.1,
      justifyContent: 'center',
    },
  })

  const handleScanError = () => {
    setQrCodeScanError(null)
    setCameraActive(true)
  }

  useEffect(() => {
    // eslint-disable-next-line prettier/prettier
    (async () => {
      const status = await Camera.requestCameraPermission()
      setHasPermission(status === 'authorized')
    })()
  }, [])

  useEffect(() => {
    if (cameraActive && barcodes[0]?.displayValue) {
      Vibration.vibrate()
      handleCodeScan(barcodes[0])
      return setCameraActive(false)
    }
  }, [barcodes])

  useEffect(() => {
    if (cameraActive && error) {
      Vibration.vibrate()
      return setCameraActive(false)
    }
  }, [error])

  return (
    device != null &&
    hasPermission && (
      <>
        <View style={styles.container}>
          <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            torch={torchActive ? 'on' : 'off'}
            frameProcessor={frameProcessor}
            frameProcessorFps={5}
          />
          <CameraViewContainer portrait={portraitMode}>
            <View style={styles.scannerClose}>
              <QRScannerClose
                onPress={() => {
                  navigation.goBack()
                }}
              ></QRScannerClose>
            </View>
            <View style={styles.viewFinderContainer}>
              <View style={styles.viewFinder} />
            </View>
            <View style={styles.errorContainer}>
              {error ? (
                <TouchableOpacity style={styles.errorMessage} onPress={() => handleScanError()}>
                  {/* <Icon style={styles.icon} name="cancel" size={30}></Icon> */}
                  <Text style={[TextTheme.caption, { fontSize: 16, color: ColorPallet.grayscale.white }]}>
                    {error.message}
                  </Text>
                  <Text style={[TextTheme.caption, { fontSize: 12, color: ColorPallet.grayscale.white }]}>
                    Tap to dismiss
                  </Text>
                </TouchableOpacity>
              ) : (
                <></>
              )}
            </View>
            <View style={styles.torchContainer}>
              <QRScannerTorch active={torchActive} onPress={() => setTorchActive(!torchActive)} />
            </View>
          </CameraViewContainer>
        </View>
      </>
    )
  )
}

export default QRScanner

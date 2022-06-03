/**
 * @format
 */
import 'react-native-gesture-handler'
// remove these when updated to react-native 0.65.0
import '@formatjs/intl-getcanonicallocales/polyfill'
import '@formatjs/intl-locale/polyfill'
import '@formatjs/intl-pluralrules/polyfill'
import '@formatjs/intl-pluralrules/locale-data/en' // locale-data for en
import '@formatjs/intl-displaynames/polyfill'
import '@formatjs/intl-displaynames/locale-data/en' // locale-data for en
import '@formatjs/intl-listformat/polyfill'
import '@formatjs/intl-listformat/locale-data/en' // locale-data for en
import '@formatjs/intl-numberformat/polyfill'
import '@formatjs/intl-numberformat/locale-data/en' // locale-data for en
import '@formatjs/intl-relativetimeformat/polyfill'
import '@formatjs/intl-relativetimeformat/locale-data/en' // locale-data for en
import '@formatjs/intl-datetimeformat/polyfill'
import '@formatjs/intl-datetimeformat/locale-data/en' // locale-data for en
import '@formatjs/intl-datetimeformat/add-all-tz' // Add ALL tz data

import firebase from '@react-native-firebase/app'
import messaging from '@react-native-firebase/messaging'
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { AppRegistry } from 'react-native'

import App from './App'
import { ColorPallet } from './App/theme'
import { name as appName } from './app.json'

/* eslint-disable no-console */
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  // eslint-disable-next-line no-undef
  console.log('Message received in background!', remoteMessage)
})

let options = {
  appId: '1:1056666176938:android:0a139411e74b783e1f6fd3',
  projectId: 'fir-aca-py',
  apiKey: 'AIzaSyD4167gVAB9-xYkK-DTFtG4erVI83JPo2M',
}
const defualtapp = firebase.initializeApp(options, 'test app')
defualtapp.finally((app) => {
  // eslint-disable-next-line no-undef
  console.log(app.messaging().getToken())
  app.messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    // eslint-disable-next-line no-undef
    console.log('Message received in background!', remoteMessage)
  })
})

const navigationTheme = {
  dark: true,
  colors: {
    primary: ColorPallet.brand.primary,
    background: ColorPallet.brand.primaryBackground,
    card: ColorPallet.brand.primary,
    text: ColorPallet.grayscale.white,
    border: ColorPallet.grayscale.white,
    notification: ColorPallet.grayscale.white,
  },
}

const Base = () => {
  return (
    <NavigationContainer theme={navigationTheme}>
      <App />
    </NavigationContainer>
  )
}

AppRegistry.registerComponent(appName, () => Base)

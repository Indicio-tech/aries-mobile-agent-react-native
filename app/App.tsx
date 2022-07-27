import {
  Agent,
  AgentProvider,
  AuthProvider,
  ConfigurationContext,
  ConfigurationProvider,
  StoreProvider,
  ThemeProvider,
  theme,
  initLanguages,
  initStoredLanguage,
  translationResources,
  ErrorModal,
  toastConfig,
  RootStack,
  OnboardingPages,
  Splash,
  Terms,
} from "aries-bifold";
import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import SplashScreen from "react-native-splash-screen";
import Toast from "react-native-toast-message";
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native'

const defaultConfiguration: ConfigurationContext = {
  pages: OnboardingPages,
  splash: Splash,
  terms: Terms,
};

initLanguages(translationResources);

const App = () => {
  initStoredLanguage();
  const [agent, setAgent] = useState<Agent | undefined>(undefined);

  useEffect(() => {
    // Hide the native splash / loading screen so that our
    // RN version can be displayed.
    SplashScreen.hide();
    registerNotifications();
  }, []);

  const notificationHandler = async (message:FirebaseMessagingTypes.RemoteMessage) => {
    console.log('received a message', message)
    //trigger notification with notifee
    notifee.displayNotification({
      title: 'Something else',
      body: 'custom notification',
      android: {
        channelId: 'defualt'
      },
    })
  }

  const registerNotifications = async () => {
    console.log('The token is: ', await messaging().getToken())
    messaging().setBackgroundMessageHandler(notificationHandler)
    messaging().onMessage(notificationHandler)
    await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });
  }

  return (
    <StoreProvider>
      <AgentProvider agent={agent}>
        <ThemeProvider value={theme}>
          <ConfigurationProvider value={defaultConfiguration}>
            <AuthProvider>
              <StatusBar
                barStyle="light-content"
                hidden={false}
                backgroundColor={theme.ColorPallet.brand.primary}
                translucent={false}
              />
              <ErrorModal />
              <RootStack setAgent={setAgent} />
              <Toast topOffset={15} config={toastConfig} />
            </AuthProvider>
          </ConfigurationProvider>
        </ThemeProvider>
      </AgentProvider>
    </StoreProvider>
  );
};

export default App;
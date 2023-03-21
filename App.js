import React, { useState, useEffect, useCallback } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import {
  ActionSheetProvider,
  connectActionSheet,
} from '@expo/react-native-action-sheet';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import ToogetherNavigation from './navigation/Navigation';
import { ContextProvider } from './context/ContextProvider';
import store from './store/store';

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        await Font.loadAsync({
          'poppins-regular': require('./assets/fonts/Poppins-Regular.ttf'),
          'poppins-bold': require('./assets/fonts/Poppins-Bold.ttf'),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    };

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <ActionSheetProvider>
        <ContextProvider>
          <View onLayout={onLayoutRootView} />
          <ToogetherNavigation theme="dark" />
        </ContextProvider>
      </ActionSheetProvider>
    </Provider>
  );
};

const ConnectedApp = connectActionSheet(App);

export default ConnectedApp;

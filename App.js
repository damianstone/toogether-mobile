import React, { useState, useEffect, useCallback } from 'react';
import { Provider } from 'react-redux';
import {
  ActionSheetProvider,
  connectActionSheet,
} from '@expo/react-native-action-sheet';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';

import ToogetherNavigation from './navigation/Navigation';
import store from './store/store';

SplashScreen.preventAutoHideAsync();

// FETCH FONTS
const fetchFonts = async () => {
  const loadedFonts = await Font.loadAsync({
    'poppins-regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'poppins-bold': require('./assets/fonts/Poppins-Bold.ttf'),
  });
  return loadedFonts;
};

const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  const stopSplash = async () => {
    try {
      await SplashScreen.hideAsync();
      setFontLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onError={(err) => console.warn(err)}
        onFinish={stopSplash}
        autoHideSplash
      />
    );
  }

  return (
    <Provider store={store}>
      <ActionSheetProvider>
        <ToogetherNavigation theme="dark" />
      </ActionSheetProvider>
    </Provider>
  );
};

const ConnectedApp = connectActionSheet(App);

export default ConnectedApp;

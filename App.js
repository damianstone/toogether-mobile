import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import {
  ActionSheetProvider,
  connectActionSheet,
} from '@expo/react-native-action-sheet';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { FontAwesome5 } from '@expo/vector-icons';

import ToogetherNavigation from './navigation/NavigationContainer';
import store from './store/store';
import 'react-native-gesture-handler';

function cacheFonts(fonts) {
  return fonts.map((font) => Font.loadAsync(font));
}

// FETCH FONTS
const fetchFonts = () => {
  return Font.loadAsync({
    'poppins-regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'poppins-bold': require('./assets/fonts/Poppins-Bold.ttf'),
  });
};

const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [appIsReady, setAppIsReady] = useState(false);

  // Load any resources or data that you need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        const fontAssets = cacheFonts([FontAwesome5.font]);

        await Promise.all([...fontAssets]);
      } catch (e) {
        // You might want to provide this error information to an error reporting service
        // eslint-disable-next-line no-console
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!appIsReady) {
    return null;
  }

  if (!fontLoaded) {
    return (
      <AppLoading
        // eslint-disable-next-line no-console
        onError={(err) => console.warn(err)}
        onFinish={() => {
          setFontLoaded(true);
        }}
        startAsync={fetchFonts}
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

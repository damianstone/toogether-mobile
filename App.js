import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import store from './store/store';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { Provider } from 'react-redux';
import {
  ActionSheetProvider,
  connectActionSheet,
} from '@expo/react-native-action-sheet';

import AppNavigation from './navigation/AppNavigation';
import Navigator from './navigation/Navigation';

// FETCH FONTS
const fetchFonts = () => {
  return Font.loadAsync({
    'poppins-regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'poppins-bold': require('./assets/fonts/Poppins-Bold.ttf'),
  });
};

const App = (props) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <Provider store={store}>
      <ActionSheetProvider>
        <Navigator theme="dark" />
      </ActionSheetProvider>
    </Provider>
  );
};

const ConnectedApp = connectActionSheet(App);

export default ConnectedApp;

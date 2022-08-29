import React, { useState } from 'react';
import { Provider } from 'react-redux';
import {
  ActionSheetProvider,
  connectActionSheet,
} from '@expo/react-native-action-sheet';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

import Navigator from './navigation/Navigation';
import store from './store/store';

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
        onError={(err) => console.log(err)}
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
        <Navigator theme="dark" />
      </ActionSheetProvider>
    </Provider>
  );
};

const ConnectedApp = connectActionSheet(App);

export default ConnectedApp;

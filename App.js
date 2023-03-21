import React, { useState, useEffect, useCallback } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import {
  ActionSheetProvider,
  connectActionSheet,
} from '@expo/react-native-action-sheet';
// import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import ToogetherNavigation from './navigation/Navigation';
import { ContextProvider } from './context/ContextProvider';
import store from './store/store';

SplashScreen.preventAutoHideAsync();
// const fetchFonts = async () => {

//   const loadedFonts = await Font.loadAsync({
//     'poppins-regular': require('./assets/fonts/Poppins-Regular.ttf'),
//     'poppins-bold': require('./assets/fonts/Poppins-Bold.ttf'),
//   });
//   return loadedFonts;
// };

const App = () => {
  //   const [fontLoaded, setFontLoaded] = useState(false);

  //   const stopSplash = async () => {
  //     try {
  //       await SplashScreen.hideAsync();
  //       setFontLoaded(true);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   if (!fontLoaded) {
  //     return (
  //       <AppLoading
  //         startAsync={fetchFonts}
  //         onError={(err) => console.warn(err)}
  //         onFinish={stopSplash}
  //         autoHideSplash
  //       />
  //     );
  //   }

  // -------------------------------------------
  // -------------------------------------------
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          'poppins-regular': require('./assets/fonts/Poppins-Regular.ttf'),
          'poppins-bold': require('./assets/fonts/Poppins-Bold.ttf'),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
    // return (
    //   <AppLoading
    //     // startAsync={fetchFonts}
    //     // onError={(err) => console.warn(err)}
    //     onFinish={onLayoutRootView}
    //     autoHideSplash
    //   />
    // );
  }


  // -------------------------------------------
  // -------------------------------------------

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
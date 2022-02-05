import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import groupReducer from './store/reducers/group';
import Navigation from './navigation/Navigation';

const rootReducer = combineReducers({
  groups: groupReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk)); 

const fetchFonts = () => {
  return Font.loadAsync({
    'poppins-regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'poppins-bold': require('./assets/fonts/Poppins-Bold.ttf'),
  });
};

const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  //if (!fontLoaded) {
  //  return (
  //    <AppLoading
  //      startAsync={fetchFonts}
  //      onFinish={() => {
  //        setFontLoaded(true);
  //      }}
  //      onError={(err) => console.log(err)}
  //    />
  //  );
  //}

  return (
    <Provider store={store}>
      <Navigation theme="dark" />
    </Provider>
  );
};

export default App;

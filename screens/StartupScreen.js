/* eslint-disable consistent-return */
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Colors from '../constants/Colors';

const jwt_decode = require('jwt-decode');

const StartupScreen = (props) => {
  useEffect(() => {
    const tryLogin = async () => {
      // get the user data as a promise
      const stored = await AsyncStorage.getItem('@userData');
      const userData = JSON.parse(stored);

      // if there is no user data
      if (!userData || !userData.has_account) {
        props.navigation.navigate('AuthStart');
        return;
      }

      if (userData && userData.has_account) {
        props.navigation.navigate('Swipe');
      }
    };
    tryLogin();
  }, []);

  return (
    <View style={styles.screen}>
      <ActivityIndicator color={Colors.orange} size="large" />
    </View>
  );
};

export default StartupScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.bg,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Colors from '../../constants/Colors';

const StartupScreen = (props) => {
  // Startup Screen to check if the user is logged in
  // check the AsyncStorage for a valid token
  // if there is a token, then we can go to the main screen

  useEffect(() => {
    const tryLogin = async () => {
      // get the user data as a promise
      const userData = await AsyncStorage.getItem('userData');

      // if there is no user data
      if (!userData) {
        props.navigation.navigate('Auth');
        return;
      }

      props.navigation.navigate('Swipe');
    };
    tryLogin();
  }, []);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.orange} />
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

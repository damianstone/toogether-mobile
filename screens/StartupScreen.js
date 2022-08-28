import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Colors from '../constants/Colors';

const StartupScreen = (props) => {
  // Startup Screen to check if the user is logged in
  // check the AsyncStorage for a valid token
  // if there is a token, then we can go to the main screen

  useEffect(() => {
    const tryLogin = async () => {
      // get the user data as a promise
      const stored = await AsyncStorage.getItem('@userData');
      const userData = JSON.parse(stored);

      // if there is no user data
      if (!userData || !userData.has_account) {
        props.navigation.navigate('Create');
        return;
      }

      if (userData && userData.has_account) {
        props.navigation.navigate('Swipe');
        return;
      }
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

import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Firebase from '../../Firebase/config';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import Colors from '../../constants/Colors';
import firebase from 'firebase';

const StartupScreen = (props) => {
  // Startup Screen to check if the user is logged in
  // check the AsyncStorage for a valid token
  // if there is a token, then we can go to the main screen

  firebase.auth().onAuthStateChanged(user => {
    if (user) props.navigation.navigate('Swipe');
    if(!user) props.navigation.navigate('Auth');
  })

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.orange} />
    </View>
  );
};

export default StartupScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

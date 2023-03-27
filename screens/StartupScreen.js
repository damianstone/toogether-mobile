/* eslint-disable consistent-return */
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authenticate } from '../store/actions/user';
import ActivityModal from '../components/UI/ActivityModal';
import Colors from '../constants/Colors';

const jwt_decode = require('jwt-decode');

const StartupScreen = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const tryLogin = async () => {
      // get the user data as a promise
      const userData = JSON.parse(await AsyncStorage.getItem('@userData'));

      if (userData && userData.has_account) {
        props.navigation.navigate('Swipe');
      } else {
        props.navigation.navigate('Auth');
      }

      // // if there is no user data
      // if (!userData || !userData.has_account) {
      //   console.log('NO AUTH');
      //   props.navigation.navigate('AuthStart');
      // }
    };
    tryLogin();
  }, []);

  return (
    <View style={styles.screen}>
      <ActivityModal
        loading
        title="Loading"
        size="small"
        activityColor="white"
        titleColor="white"
        activityWrapperStyle={{
          backgroundColor: 'transparent',
        }}
      />
    </View>
  );
};

export default StartupScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.bg,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

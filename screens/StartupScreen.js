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
        console.log(userData);
      } else {
        props.navigation.navigate('AuthStart');
      }

      if (userData && userData.has_account) {
        const decoded = jwt_decode(userData.token);
        
        if (decoded.exp < (Date.now() / 1000)) {
          console.log('Hacer logout');
        } else {
          console.log('Hacer Refresh');
        }
      }

      // // if there is no user data
      // if (!userData || !userData.has_account) {
      //   console.log('NO AUTH');
      //   props.navigation.navigate('AuthStart');
      // }
      // -------------------------------------------------
      // -------------------------------------------------

      // console.log(userData);

      // -------------------------------------------------
      // -------------------------------------------------
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

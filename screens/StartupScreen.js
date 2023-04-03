/* eslint-disable consistent-return */
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ActivityModal from '../components/UI/ActivityModal';
import Colors from '../constants/Colors';
import * as c from '../constants/user';
import { useDispatch } from 'react-redux';

const StartupScreen = (props) => {
  const dispatch = useDispatch();
  console.log('STARTUP SCREEN');
  useEffect(() => {
    const tryLogin = async () => {
      // get the user data as a promise
      const userData = JSON.parse(await AsyncStorage.getItem('@userData'));

      if (userData && userData.has_account) {
        props.navigation.navigate('Swipe');
        dispatch({ type: c.LOGIN });
      } else {
        dispatch({ type: c.DID_TRY_LOGIN });
        props.navigation.navigate('AuthStart');
      }
    };

    tryLogin();
  }, []);

  return (
    <View style={styles.screen}>
      <ActivityModal
        loading
        title="Loading startup screen"
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

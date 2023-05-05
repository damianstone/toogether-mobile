/* eslint-disable consistent-return */
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ActivityModal from '../components/UI/ActivityModal';
import Colors from '../constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import {
  authenticate,
  setDidTryLogin,
  refreshToken,
  logout,
} from '../store/actions/auth';

const jwt_decode = require('jwt-decode');

const StartupScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const isAuth = useSelector((state) => state.auth.isAuth);

  const checkToken = async () => {
    const userData = JSON.parse(await AsyncStorage.getItem('@userData'));

    if (userData && userData.has_account) {
      const currentTime = Date.now();

      if (!userData.token || !userData.refresh_token) {
        return dispatch(logout());
      }

      const token = jwt_decode(userData.token);
      const refresh = jwt_decode(userData.refresh_token);
      const isTokenExpired = token.exp < currentTime / 1000;
      const isRefreshExpired = refresh.exp < currentTime / 1000;

      if (isTokenExpired && !isRefreshExpired) {
        return dispatch(refreshToken());
      }

      if (isTokenExpired && isRefreshExpired) {
        return dispatch(logout());
      }

      return dispatch(authenticate(true));
    }

    // if there is no user data in the local storage, then the user is clearly not authenticated
    dispatch(setDidTryLogin(true));
    dispatch(authenticate(false));
    return;
  };

  useEffect(() => {
    checkToken();
  }, [isAuth]);

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

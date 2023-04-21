import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';

import { TooNavigator, AuthNavigator } from './TooNavigator';
import { refreshToken } from '../store/actions/auth';
import { authenticate, setDidTryLogin } from '../store/actions/auth';
import { logout } from '../store/actions/user';
import StartupScreen from '../screens/StartupScreen';

const jwt_decode = require('jwt-decode');

// This replaces the switch navigator
const AppNavigator = (props) => {
  const dispatch = useDispatch();

  const isAuth = useSelector((state) => state.auth.isAuth);
  const didTryLogin = useSelector((state) => state.auth.didTryLogin);

  const checkToken = async () => {
    const userData = JSON.parse(await AsyncStorage.getItem('@userData'));

    if (userData && userData.has_account) {
      const currentTime = Date.now();
      const tokenDecoded = jwt_decode(userData.token);
      const refreshTokenDecoded = jwt_decode(userData.refresh_token);
      const isTokenExpired = tokenDecoded.exp < currentTime / 1000;
      const isRefreshTokenExpired =
        refreshTokenDecoded.exp < currentTime / 1000;

      if (isTokenExpired && !isRefreshTokenExpired) {
        return await dispatch(refreshToken());
      }

      if (isTokenExpired && isRefreshTokenExpired) {
        return await dispatch(logout);
      }

      return dispatch(authenticate(true));
    }

    // if there is no user data in the local storage, then the user is clearly not authenticated
    dispatch(setDidTryLogin(true));
    dispatch(authenticate(false));
    return;
  };

  useEffect(() => {
    if (!didTryLogin) {
      checkToken();
    }
  }, [isAuth]);

  return (
    <NavigationContainer onStateChange={checkToken}>
      {isAuth && <TooNavigator />}
      {!isAuth && didTryLogin && <AuthNavigator />}
      {!isAuth && !didTryLogin && <StartupScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;

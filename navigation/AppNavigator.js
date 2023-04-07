import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';

import { TooNavigator, AuthNavigator } from './TooNavigator';
import {
  updateToken,
  logout,
  authenticate,
  authenticateLogin,
  authDidTryLogin,
  setIsAuth,
  setDidTryLogin,
} from '../store/actions/user';
import StartupScreen from '../screens/StartupScreen';

const jwt_decode = require('jwt-decode');

// This replaces the switch navigator
const AppNavigator = (props) => {
  const Stack = createStackNavigator();
  const dispatch = useDispatch();

  const isAuth = useSelector((state) => state.auth.isAuth);
  const didTryLogin = useSelector((state) => state.auth.didTryLogin);

  const token = useSelector(state => state);

  const checkToken = async () => {
    const userData = JSON.parse(await AsyncStorage.getItem('@userData'));

    // console.log('USER DATA ----> ', userData);

    if (userData && userData.has_account) {
      // Avoids possible ambiguity
      const currentTime = Date.now();
      const tokenDecoded = jwt_decode(userData.token);
      const refreshTokenDecoded = jwt_decode(userData.refresh_token);
      const isTokenExpired = tokenDecoded.exp < currentTime / 1000;
      const isRefreshTokenExpired =
        refreshTokenDecoded.exp < currentTime / 1000;

      if (isTokenExpired && isRefreshTokenExpired) {
        await dispatch(logout());
        return;
      }

      if (isTokenExpired && !isRefreshTokenExpired) {
        await dispatch(updateToken());
      }

      dispatch(authenticate(userData));
      dispatch(setDidTryLogin(true));
      await dispatch(setIsAuth(true));
      // if there is userData and the token is not expired, then the user is clearly authenticated
      return;
    }

    // if there is no user data in the local storage, then the user is clearly not authenticated
    dispatch(setDidTryLogin(true));
    await dispatch(setIsAuth(false))
  };

  useEffect(() => {
    checkToken();
  }, [isAuth]);

  // console.log('IS AUTH ---> ', isAuth);

  return (
    <NavigationContainer onStateChange={checkToken}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {isAuth && <Stack.Screen name="Home" component={TooNavigator} />}
        {!isAuth && didTryLogin && (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
        {!isAuth && !didTryLogin && (
          <Stack.Screen name="StartupScreen" component={StartupScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

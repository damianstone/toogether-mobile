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
} from '../store/actions/user';
import StartupScreen from '../screens/StartupScreen';

const jwt_decode = require('jwt-decode');

// This replaces the switch navigator
const AppNavigator = (props) => {
  const Stack = createStackNavigator();
  const dispatch = useDispatch();

  // Is auth
  // didTryLogin
  const [isAuth, setIsAuth] = useState(false);

  // const [didTryLogin, setDidTryLogin] = useState(false);

  // Change to isAuth
  const fullState = useSelector((state) => state);

  const state = useSelector((state) => state.auth.loginAuth);

  // Change to didTryLogin
  const didTryLogin = useSelector((state) => state.auth.didTryLogin);

  // console.log('APP NAVIGATOR');

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
        dispatch(authenticateLogin());
        dispatch(authDidTryLogin());
        setIsAuth(false);
        console.log('isAuth: ', state);
        console.log('didTryLogin: ', didTryLogin);
        return;
      }

      if (isTokenExpired && !isRefreshTokenExpired) {
        await dispatch(updateToken());
      }

      dispatch(authenticate(userData));
      // if there is userData and the token is not expired, then the user is clearly authenticated
      setIsAuth(true);
      console.log('isAuth: ', state);
      console.log('didTryLogin: ', didTryLogin);
      return;
    }

    // if there is no user data in the local storage, then the user is clearly not authenticated
    setIsAuth(false);
    dispatch(authenticateLogin());
    dispatch(authDidTryLogin());
    console.log('isAuth: ', state);
    console.log('didTryLogin: ', didTryLogin);
  };

  useEffect(() => {
    checkToken();
    console.log('REFRESH');
  }, [state, didTryLogin]);

  // console.log('IS AUTH ---> ', isAuth);

  return (
    <NavigationContainer onStateChange={checkToken}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {state && <Stack.Screen name="Home" component={TooNavigator} />}
        {!state && didTryLogin && (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
        {!state && !didTryLogin && (
          <Stack.Screen name="StartupScreen" component={StartupScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

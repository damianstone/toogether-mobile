import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationActions } from 'react-navigation'; // navigate outside of the navigator

import TooNavigation from './Navigation';
import { updateToken, logout } from '../store/actions/user';

const jwt_decode = require('jwt-decode');

const ToogetherNav = () => {
  const dispatch = useDispatch();
  const navRef = useRef();

  const checkToken = async () => {
    const userData = JSON.parse(await AsyncStorage.getItem('@userData'));

    if (userData) {
      console.log(userData);
      const tokenDecoded = jwt_decode(userData.token);
      const refreshTokenDecoded = jwt_decode(userData.refresh_token);
      const isTokenExpired = tokenDecoded.exp < Date.now() / 1000;
      const isRefreshTokenExpired = refreshTokenDecoded.exp < Date.now() / 1000;

      console.log('Change screen');
      console.log(tokenDecoded.exp, isTokenExpired, Date.now() / 1000);
      console.log(
        refreshTokenDecoded.exp,
        isRefreshTokenExpired,
        Date.now() / 1000
      );

      if (isTokenExpired && !isRefreshTokenExpired) {
        console.log('refresh');
        dispatch(updateToken());
      }

      if (isTokenExpired && isRefreshTokenExpired) {
        console.log('expired');
        dispatch(logout());
        navRef.current.dispatch(
          NavigationActions.navigate({
            routeName: 'AuthStart',
          })
        );
      }
    }
  };

  return (
    <TooNavigation onNavigationStateChange={() => checkToken()} ref={navRef} />
  );
};

export default ToogetherNav;

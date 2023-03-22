import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationActions } from 'react-navigation'; // navigate outside of the navigator

import TooNavigation from './Navigation';
import { updateToken, logout } from '../store/actions/user';

const jwt_decode = require('jwt-decode');

const ToogetherNav = (props) => {
  const dispatch = useDispatch();
  const navRef = useRef();

  useEffect(() => {
    const tryLogin = async () => {
      // TODO: CONTROL WHEN TO RENDER THIS

      const userData = JSON.parse(await AsyncStorage.getItem('@userData'));
      const tokenDecoded = jwt_decode(userData.token);
      // const refreshDecoded = jwt_decode(userData.refresh);
      const isTokenExpired = tokenDecoded.exp < Date.now() / 1000;
      // const isRefreshExpired = refreshDecoded.exp < Date.now() / 1000;

      if (isTokenExpired) {
        dispatch(logout());
        console.log('expired');
        navRef.current.dispatch(
          NavigationActions.navigate({
            routeName: 'AuthStart',
          })
        ); // go to the auth screen
      }

      // if (isTokenExpired && !isRefreshExpired) {
      //   dispatch(updateToken());
      // }
    };
    tryLogin();
  }, [navRef.current]);

  return <TooNavigation ref={navRef} />;
};

export default ToogetherNav;

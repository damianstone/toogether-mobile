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

  const tryLogin = async () => {
    const userData = JSON.parse(await AsyncStorage.getItem('@userData'));
    const tokenDecoded = jwt_decode(userData.token);
    const isTokenExpired = tokenDecoded.exp < Date.now() / 1000;
    
    console.log('Change screen');

    if (isTokenExpired) {
      dispatch(logout());
      console.log('expired');
      navRef.current.dispatch(
        NavigationActions.navigate({
          routeName: 'AuthStart',
        })
      )
    }
  }

  return (
    <TooNavigation
      onNavigationStateChange={ () => tryLogin() }
      ref={navRef}
    />
  )
};

export default ToogetherNav;

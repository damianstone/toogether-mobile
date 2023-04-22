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
  const isAuth = useSelector((state) => state.auth.isAuth);
  const didTryLogin = useSelector((state) => state.auth.didTryLogin);

  return (
    <NavigationContainer>
      {isAuth && <TooNavigator />}
      {!isAuth && didTryLogin && <AuthNavigator />}
      {!isAuth && !didTryLogin && <StartupScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;

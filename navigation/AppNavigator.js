import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { TooNavigator, AuthNavigator } from './TooNavigator';
import StartupScreen from '../screens/StartupScreen';

// This replaces the switch navigator
const AppNavigator = (props) => {
  const [isAuth, setIsAuth] = useState(true);

  // TODO: implement check token

  return (
    <NavigationContainer>
      {isAuth && <TooNavigator />}
      {!isAuth && <AuthNavigator />}
      {!isAuth && <StartupScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;

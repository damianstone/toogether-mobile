import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { TooNavigator, AuthNavigator } from './TooNavigator';
import StartupScreen from '../screens/StartupScreen';
import { createStackNavigator } from '@react-navigation/stack';

// This replaces the switch navigator
const AppNavigator = (props) => {
  const Stack = createStackNavigator();
  const [isAuth, setIsAuth] = useState(false);

  // TODO: implement check token

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} >
        <Stack.Screen name="Swipe" component={TooNavigator} />
        <Stack.Screen name="Auth" component={AuthNavigator} />
        <Stack.Screen name="StartScreen" component={StartupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

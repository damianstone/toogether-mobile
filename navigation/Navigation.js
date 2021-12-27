import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

import Login from '../screens/Login';
import Swipe from '../screens/Swipe';
import Matchs from '../screens/Matchs';
import Profile from '../screens/Profile';
import Chat from '../screens/Chat';
import Likes from '../screens/Likes';
import Colors from '../constants/Colors';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Colors.bg,
  },
  headerTitleStyle: {

  },
  headerBackTitleStyle: {
    fontFamily: 'poppins',
  },
  statusBarStyle: {
    Enumerator: 'light-content',
  },
  headerTintColor: Colors.white,
};

const toogetherNavigation = createStackNavigator(
  {
    Login: Login,
    Swipe: Swipe,
    Matchs: Matchs,
    Profile: Profile,
    Chat: Chat,
    Likes: Likes,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

export default createAppContainer(toogetherNavigation);

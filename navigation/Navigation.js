import React from 'react';
import { Platform, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../constants/Colors';

import AuthScreen from '../screens/Auth/AuthScreen';
import AuthStartScreen from '../screens/Auth/AuthStartScreen';
import AuthSucess from '../screens/Auth/AuthSuccess';
import ChatScreen from '../screens/ChatScreen';
import AddProfilePhotoScreen from '../screens/CreateProfile/AddProfilePhotoScreen';
import CreateProfileScreen from '../screens/CreateProfile/CreateProfileScreen';
import GroupScreen from '../screens/GroupScreen';
import LikesScreen from '../screens/LikesScreen';
import MyProfileScreen from '../screens/MyProfile/MyProfileScreen';
import SettingScreen from '../screens/MyProfile/SettingScreen';
import ProfileModalScreen from '../screens/profile/ProfileModalScreen';
import StartupScreen from '../screens/StartupScreen';
import SwipeScreen from '../screens/Swipe/SwipeScreen';

const defaultNavOptions = {
  headerMode: 'none',
  headerStyle: {
    backgroundColor: Colors.bg,
    shadowColor: 'transparent',
  },
  headerTitleStyle: {},
  headerBackTitleStyle: {},
  statusBarStyle: Colors.bg,
  headerTintColor: Colors.white,
};

const AuthNavigator = createStackNavigator(
  {
    AuthStart: AuthStartScreen,
    Auth: AuthScreen,
    Create: CreateProfileScreen,
    AddPhoto: AddProfilePhotoScreen,
    Success: AuthSucess,
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  }
);

const ChatNavigator = createStackNavigator(
  {
    Chat: ChatScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const SwipeNavigator = createStackNavigator(
  {
    Swipe: SwipeScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const LikeNavigator = createStackNavigator(
  {
    Likes: LikesScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const GroupNavigator = createStackNavigator(
  {
    Group: GroupScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const MyProfileNavigator = createStackNavigator(
  {
    MyProfile: {
      screen: MyProfileScreen,
      navigationOptions: {
        gestureDirection: 'horizontal-inverted',
      },
    },
    Setting: {
      screen: SettingScreen,
    },
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

// CREAR NAVBAR
const tabScreenCnfig = {
  // CONFIG
  Swipe: {
    screen: SwipeNavigator, // STACK NAVIGATOR
    navigationOptions: {
      // poner un icono en la navbar
      tabBarIcon: (tabInfo) => {
        return <AntDesign color={tabInfo.tintColor} name="home" size={25} />;
      },
      tabBarColor: Colors.orange,
      tabBarLabel: Platform.OS === 'android' ? <Text>Swipe</Text> : 'Swipe',
    },
  },
  Likes: {
    screen: LikeNavigator, // STACK NAVIGATOR
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <AntDesign color={tabInfo.tintColor} name="hearto" size={25} />;
      },
      tabBarColor: Colors.orange,
      tabBarLabel: Platform.OS === 'android' ? <Text>Likes</Text> : 'Likes',
    },
  },
  Group: {
    screen: GroupNavigator, // STACK NAVIGATOR
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <AntDesign color={tabInfo.tintColor} name="addusergroup" size={25} />
        );
      },
      tabBarColor: Colors.orange,
      tabBarLabel: Platform.OS === 'android' ? <Text>Create group</Text> : null,
    },
  },
};

// NAVBAR
// Poner secciones en la parte de abajo, en otras palabras lo que en el celular seria la navbar
const ToogetherTab =
  Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(tabScreenCnfig, {
        activeTintColor: Colors.orange,
        showLabel: false,
        shifting: true, // la navbar cambia de color al seleccion alguna opcion
        barStyle: {
          backgroundColor: Colors.bg,
          statusBarStyle: Colors.bg,
        },
        style: {
          backgroundColor: Colors.bg,
          borderTopWidth: 0,
        },
      })
    : createBottomTabNavigator(tabScreenCnfig, {
        tabBarOptions: {
          showLabel: false,
          activeTintColor: Colors.orange,
          labelStyle: {},
          tabStyle: {
            backgroundColor: Colors.bg,
            statusBarStyle: Colors.bg,
          },
          style: {
            backgroundColor: Colors.bg,
            borderTopWidth: 0,
          },
        },
      });

const HomeNavigator = createStackNavigator(
  {
    Main: ToogetherTab,
    Profile: ProfileModalScreen,
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

const AppNavigator = createStackNavigator(
  {
    Swipe: HomeNavigator,
    Chat: ChatNavigator,
    MyProfile: MyProfileNavigator,
  },
  {
    headerMode: 'none',
  }
);

const MainNavigator = createSwitchNavigator(
  {
    Startup: StartupScreen,
    Auth: AuthNavigator,
    Swipe: AppNavigator,
  },
  {
    initialRouteName: 'Startup',
  }
);

export default createAppContainer(MainNavigator);

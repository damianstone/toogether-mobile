import React from 'react';
import { View, Text, Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { AntDesign } from '@expo/vector-icons';

import Login from '../screens/login/Login';
import Swipe from '../screens/swipe/Swipe';
import Profile from '../screens/profile/Profile';
import Chat from '../screens/Chat';
import Likes from '../screens/Likes';
import Group from '../screens/Group';
import AuthSucess from '../screens/AuthSuccess';
import CreateUser from '../screens/user/CreateUser';
import Colors from '../constants/Colors';
import MyProfile from '../screens/myProfile/MyProfile';
import SettingScreen from '../screens/myProfile/SettingScreen';

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
    Auth: Login,
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  }
);

const ChatNavigator = createStackNavigator(
  {
    Chat: Chat,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const SwipeNavigator = createStackNavigator(
  {
    Swipe: Swipe,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const LikeNavigator = createStackNavigator(
  {
    Likes: Likes,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const GroupNavigator = createStackNavigator(
  {
    Group: Group,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const MyProfileNavigator = createStackNavigator(
  {
    MyProfile: {
      screen: MyProfile,
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
  //CONFIG
  Swipe: {
    screen: SwipeNavigator, // STACK NAVIGATOR
    navigationOptions: {
      // poner un icono en la navbar
      tabBarIcon: (tabInfo) => {
        return <AntDesign name="home" size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.orange,
      tabBarLabel: Platform.OS === 'android' ? <Text>Swipe</Text> : 'Swipe',
    },
  },
  Likes: {
    screen: LikeNavigator, // STACK NAVIGATOR
    navigationOptions: {
      tabBarLabel: 'Likes', // cambiar el nombre
      tabBarIcon: (tabInfo) => {
        return <AntDesign name="hearto" size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.orange,
      tabBarLabel: Platform.OS === 'android' ? <Text>Likes</Text> : 'Likes',
    },
  },
  Group: {
    screen: GroupNavigator, // STACK NAVIGATOR
    navigationOptions: {
      tabBarLabel: 'Groupppp', // cambiar el nombre
      tabBarIcon: (tabInfo) => {
        return (
          <AntDesign name="addusergroup" size={25} color={tabInfo.tintColor} />
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
    Profile: Profile,
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

const MainNavigator = createSwitchNavigator({
  Auth: AuthNavigator,
  Success: AuthSucess,
  Create: CreateUser,
  Swipe: AppNavigator,
});

export default createAppContainer(MainNavigator);

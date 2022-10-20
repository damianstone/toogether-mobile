import React from 'react';
import { Platform, Text } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {
  AntDesign,
  Ionicons,
  MaterialIcons,
  FontAwesome5,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import Colors from '../constants/Colors';

import ProfileModalScreen from '../screens/SwipeProfile/ProfileModalScreen';
import MatchScreen from '../screens/Match/MatchScreen';

import StartupScreen from '../screens/StartupScreen';
import AuthScreen from '../screens/Auth/AuthScreen';
import AuthStartScreen from '../screens/Auth/AuthStartScreen';
import AuthSucess from '../screens/Auth/AuthSuccess';
import CreateProfileScreen from '../screens/CreateProfile/CreateProfileScreen';
import AddProfilePhotoScreen from '../screens/CreateProfile/AddProfilePhotoScreen';

import StartGroupScreen from '../screens/Group/StartGroupScreen';
import JoinGroupScreen from '../screens/Group/JoinGroupScreen';
import GroupScreen from '../screens/Group/GroupScreen';

import MyProfileScreen from '../screens/MyProfile/MyProfileScreen';
import ProfilePreviewScreen from '../screens/Preview/ProfilePreviewScreen';
import SettingScreen from '../screens/MyProfile/SettingScreen';
import EditProfileScreen from '../screens/MyProfile/EditProfileScreen';

import SwipeScreen from '../screens/Swipe/SwipeScreen';
import ChatScreen from '../screens/ChatScreen';
import LikesScreen from '../screens/Likes/LikesScreen';
import BlockProfilesScreen from '../screens/BlockProfiles/BlockProfilesScreen';

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

const ProfilePreviewNavigator = createStackNavigator(
  {
    ProfilePreview: {
      screen: ProfilePreviewScreen,
      navigationOptions: {
        headerTitle: 'Profile Preview',
      },
    },
    Profile: ProfileModalScreen,
  },
  {
    mode: 'modal',
    headerMode: 'none',
    tabBarVisible: false,
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
    Preview: ProfilePreviewNavigator,
    EditProfile: {
      screen: EditProfileScreen,
    },
    Setting: {
      screen: SettingScreen,
    },
    Blocked: {
      screen: BlockProfilesScreen,
    },
  },
  {
    defaultNavigationOptions: defaultNavOptions,
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
    StartGroup: {
      screen: StartGroupScreen,
      navigationOptions: {
        ...defaultNavOptions,
        gestureDirection: 'horizontal-inverted',
      },
    },
    JoinGroup: JoinGroupScreen,
    Group: {
      screen: GroupScreen,
      navigationOptions: {
        ...defaultNavOptions,
        gestureDirection: 'horizontal',
      },
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
        return (
          <Ionicons name="home-outline" size={25} color={tabInfo.tintColor} />
        );
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
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: (tabInfo) => {
        return (
          <MaterialCommunityIcons
            name="account-group"
            size={25}
            color={tabInfo.tintColor}
          />
        );
      },
      tabBarColor: Colors.orange,
      tabBarLabel: Platform.OS === 'android' ? <Text>Create group</Text> : null,
      tabBarOptions: {
        showLabel: false,
        activeTintColor: Colors.orange,
        style: {
          backgroundColor:
            navigation.state.routes[navigation.state.index].routeName ===
            'Group'
              ? Colors.bgCard
              : Colors.bg,
          borderTopWidth: 0,
        },
        tabStyle: {
          backgroundColor:
            navigation.state.routes[navigation.state.index].routeName ===
            'Group'
              ? Colors.bgCard
              : Colors.bg,
          statusBarStyle: Colors.bg,
        },
      },
    }),
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
          shifting: true,
          activeTintColor: Colors.orange,
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
    SwipeProfile: ProfileModalScreen,
    SwipeMatch: MatchScreen,
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
    Group: GroupNavigator,
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

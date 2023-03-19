import React from 'react';
import { Platform, Text, View } from 'react-native';
// import { createAppContainer, createSwitchNavigator } from 'react-navigation';
// import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
// import { createStackNavigator } from 'react-navigation-stack';
// import { createBottomTabNavigator } from 'react-navigation-tabs';

import { NavigationContainer } from '@react-navigation/native';
import { createSwitchNavigator } from '@react-navigation/compat';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import Colors from '../constants/Colors';

import SwipeProfileScreen from '../screens/SwipeProfile/SwipeProfileScreen';
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
import SettingScreen from '../screens/MyProfile/SettingScreen';
import EditProfileScreen from '../screens/MyProfile/EditProfileScreen';

import SwipeScreen from '../screens/Swipe/SwipeScreen';
import ChatScreen from '../screens/ChatScreen';
import LikesScreen from '../screens/Likes/LikesScreen';
import BlockProfilesScreen from '../screens/BlockProfiles/BlockProfilesScreen';
import InstagramScreen from '../screens/CreateProfile/InstagramScreen';

const Stack = createStackNavigator();

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
  headerTitleAlign: 'center',
};

const AuthNavigator = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="AuthStart" component={AuthStartScreen} />
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="Instagram" component={InstagramScreen} />
      <Stack.Screen name="Create" component={CreateProfileScreen} />
      <Stack.Screen name="AddPhoto" component={AddProfilePhotoScreen} />
      <Stack.Screen name="Success" component={AuthSucess} />
    </Stack.Navigator>
  );
};

const MyProfileNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...defaultNavOptions,
      }}
    >
      <Stack.Screen
        name="MyProfile"
        component={MyProfileScreen}
        options={{
          gestureDirection: 'horizontal-inverted',
        }}
      />
      <Stack.Screen
        name="SwipeProfile"
        component={SwipeProfileScreen}
        options={{
          ...defaultNavOptions,
          title: 'Profile Preview',
          gestureDirection: 'horizontal',
          headerMode: 'none',
        }}
      />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="Setting" component={SettingScreen} />
      <Stack.Screen name="Blocked" component={BlockProfilesScreen} />
    </Stack.Navigator>
  );
};

const MyProfileNavigatorWithModal = () => {
  return (
    <Stack.Navigator mode="modal" headerMode="none" >
      <Stack.Screen name="MyProfile" component={MyProfileNavigator} />
      <Stack.Screen name="ProfileModal" component={ProfileModalScreen} />
    </Stack.Navigator>
  );
};

const ChatNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...defaultNavOptions,
        gestureDirection: 'horizontal',
        title: null,
      }}
    >
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="SwipeProfile" component={SwipeProfileScreen} />
    </Stack.Navigator>
  );
};

const LikeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...defaultNavOptions,
      }}
    >
      <Stack.Screen name="Likes" component={LikesScreen} />
    </Stack.Navigator>
  );
};

const SwipeNavigator = createStackNavigator(
  {
    Swipe: SwipeScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const MatchNavigator = createStackNavigator(
  {
    Chat: ChatNavigator,
    ProfileModal: ProfileModalScreen,
  },
  {
    mode: 'modal',
    headerMode: 'none',
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
    screen: GroupNavigator,
    navigationOptions: ({ navigation }) => {
      return {
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
        tabBarLabel:
          Platform.OS === 'android' ? <Text>Create group</Text> : null,
        tabBarOptions: {
          showLabel: false,
          activeTintColor: Colors.orange,
          style: {
            backgroundColor:
              navigation.state.routes &&
              navigation.state.routes[navigation.state.index].routeName ===
                'Group'
                ? Colors.bgCard
                : Colors.bg,
            borderTopWidth: 0,
          },
          tabStyle: {
            backgroundColor:
              navigation.state.routes &&
              navigation.state.routes[navigation.state.index].routeName ===
                'Group'
                ? Colors.bgCard
                : Colors.bg,
            statusBarStyle: Colors.bg,
          },
        },
      };
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
    ProfileModal: ProfileModalScreen,
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
    Match: MatchNavigator,
    Group: GroupNavigator,
    MyProfile: MyProfileNavigatorWithModal,
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

function App() {
  return (
    <NavigationContainer>
      <MainNavigator/>
    </NavigationContainer>
  );
}

export default App;

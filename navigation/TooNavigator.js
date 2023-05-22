import React, { useContext } from 'react';
import { Platform, Text, View, Image } from 'react-native';
import { Context } from '../context/ContextProvider';

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
import LikesScreen from '../screens/Likes/LikesScreen';
import BlockProfilesScreen from '../screens/BlockProfiles/BlockProfilesScreen';
import InstagramScreen from '../screens/CreateProfile/InstagramScreen';

import RecoveryScreen from '../screens/Recovery/RecoveryScreen';
import ValidateCodeScreen from '../screens/Recovery/ValidateCodeScreen';
import ChangePasswordScreen from '../screens/Recovery/ChangePasswordScreen';

import ChatScreen from '../screens/Chat/ChatScreen';
import GroupChatScreen from '../screens/Chat/GroupChatScreen';
import MatchesScreen from '../screens/Chat/MatchesScreen';
import ItsMatchScreenModal from '../screens/ItsMatchModal/ItsMatchScreenModal';

import Avatar from '../components/MyProfile/Avatar';
import HeaderButtom from '../components/UI/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

const Stack = createStackNavigator();

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Colors.bg,
    shadowColor: 'transparent',
  },
  headerTitleStyle: {},
  headerBackTitleStyle: {},
  headerTintColor: Colors.white,
  headerTitleAlign: 'center',
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
        options={({ navigation }) => ({
          title: 'My Profile',
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButtom}>
              <Item
                iconName={
                  Platform.OS === 'android'
                    ? 'settings-sharp'
                    : 'settings-sharp'
                }
                onPress={() => {
                  navigation.navigate('Settings');
                }}
                title="Back arrow"
              />
            </HeaderButtons>
          ),
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButtom}>
              <Item
                iconName={
                  Platform.OS === 'android'
                    ? 'ios-arrow-back'
                    : 'ios-arrow-back'
                }
                onPress={() => {
                  navigation.goBack();
                }}
                title="Back arrow"
              />
            </HeaderButtons>
          ),
        })}
      />
      <Stack.Screen
        name="SwipeProfile"
        component={SwipeProfileScreen}
        options={({ navigation }) => ({
          ...defaultNavOptions,
          title: 'Profile Preview',
          gestureDirection: 'horizontal',
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButtom}>
              <Item
                iconName={
                  Platform.OS === 'android'
                    ? 'ios-arrow-back'
                    : 'ios-arrow-back'
                }
                onPress={() => {
                  navigation.goBack();
                }}
                title="Back arrow"
              />
            </HeaderButtons>
          ),
        })}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={({ navigation }) => ({
          title: 'Edit profile',
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButtom}>
              <Item
                iconName={
                  Platform.OS === 'android'
                    ? 'ios-arrow-back'
                    : 'ios-arrow-back'
                }
                onPress={() => {
                  navigation.goBack();
                }}
                title="Back arrow"
              />
            </HeaderButtons>
          ),
        })}
      />
      <Stack.Screen
        name="Settings"
        component={SettingScreen}
        options={({ navigation }) => ({
          title: 'Settings',
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButtom}>
              <Item
                iconName={
                  Platform.OS === 'android'
                    ? 'ios-arrow-back'
                    : 'ios-arrow-back'
                }
                onPress={() => {
                  navigation.goBack();
                }}
                title="Back arrow"
              />
            </HeaderButtons>
          ),
        })}
      />
      <Stack.Screen
        name="Blocked"
        component={BlockProfilesScreen}
        options={({ navigation }) => ({
          title: 'Blocked profiles',
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButtom}>
              <Item
                iconName={
                  Platform.OS === 'android'
                    ? 'ios-arrow-back'
                    : 'ios-arrow-back'
                }
                onPress={() => {
                  navigation.goBack();
                }}
                title="Back arrow"
              />
            </HeaderButtons>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const MyProfileNavigatorWithModal = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, presentation: 'modal' }}
    >
      <Stack.Screen name="MyProfileNavigator" component={MyProfileNavigator} />
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
      }}
    >
      <Stack.Screen
        name="Matches"
        component={MatchesScreen}
        options={({ navigation }) => ({
          title: 'Matches',
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButtom}>
              <Item
                iconName={
                  Platform.OS === 'android'
                    ? 'ios-arrow-back'
                    : 'ios-arrow-back'
                }
                onPress={() => {
                  navigation.goBack();
                }}
                title="Back arrow"
              />
            </HeaderButtons>
          ),
        })}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="GroupChat"
        component={GroupChatScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SwipeProfile"
        component={SwipeProfileScreen}
        options={({ navigation }) => ({
          ...defaultNavOptions,
          title: 'Swipe profile',
          gestureDirection: 'horizontal',
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButtom}>
              <Item
                iconName={
                  Platform.OS === 'android'
                    ? 'ios-arrow-back'
                    : 'ios-arrow-back'
                }
                onPress={() => {
                  navigation.goBack();
                }}
                title="Back arrow"
              />
            </HeaderButtons>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const MatchNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ ...defaultNavOptions, presentation: 'modal' }}
    >
      <Stack.Screen
        name="ChatNavigator"
        component={ChatNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfileModal"
        component={ProfileModalScreen}
        options={{ headerShown: false, presentation: 'modal' }}
      />
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
      <Stack.Screen
        name="Likes"
        component={LikesScreen}
        options={({ navigation }) => ({
          headerTitle: 'Likes',
          gestureDirection: 'horizontal',
          headerLeft: () => (
            <Avatar
              onPress={() => {
                navigation.navigate('MyProfile');
              }}
            />
          ),
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButtom}>
              <Item
                title="Matches"
                iconName={
                  Platform.OS === 'android'
                    ? 'chatbubble-outline'
                    : 'chatbubble-outline'
                }
                onPress={() => {
                  navigation.navigate('Match');
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const SwipeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...defaultNavOptions,
      }}
    >
      <Stack.Screen
        name="Swipe"
        component={SwipeScreen}
        options={({ navigation }) => ({
          headerTitle: () => (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Image
                source={require('../assets/images/logo-1.png')}
                style={{ width: 57, height: 35 }}
              />
            </View>
          ),
          headerLeft: () => (
            <Avatar
              onPress={() => {
                navigation.navigate('MyProfile');
              }}
            />
          ),
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButtom}>
              <Item
                title="Matches"
                iconName={
                  Platform.OS === 'android'
                    ? 'chatbubble-outline'
                    : 'chatbubble-outline'
                }
                onPress={() => {
                  navigation.navigate('Match');
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const GroupNavigator = () => {
  const { groupContext } = useContext(Context);
  return (
    <Stack.Navigator
      initialRouteName={groupContext ? 'Group' : 'StartGroup'}
      screenOptions={{
        ...defaultNavOptions,
      }}
    >
      <Stack.Screen
        name="StartGroup"
        component={StartGroupScreen}
        options={({ navigation }) => ({
          headerTitle: 'Start group',
          gestureDirection: 'horizontal-inverted',
        })}
      />
      <Stack.Screen
        name="JoinGroup"
        component={JoinGroupScreen}
        options={({ navigation }) => ({
          ...defaultNavOptions,
          gestureDirection: 'horizontal',
          headerTitle: 'Join',
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButtom}>
              <Item
                iconName={
                  Platform.OS === 'android'
                    ? 'ios-arrow-back'
                    : 'ios-arrow-back'
                }
                onPress={() => {
                  navigation.goBack();
                }}
                title="Back arrow"
              />
            </HeaderButtons>
          ),
        })}
      />
      <Stack.Screen
        name="Group"
        component={GroupScreen}
        options={({ navigation }) => ({
          ...defaultNavOptions,
          gestureDirection: 'horizontal',
          headerTitle: 'Group',
          headerLeft: () => (
            <Avatar
              onPress={() => {
                navigation.navigate('MyProfile');
              }}
            />
          ),
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButtom}>
              <Item
                title="Matches"
                iconName={
                  Platform.OS === 'android'
                    ? 'chatbubble-outline'
                    : 'chatbubble-outline'
                }
                onPress={() => {
                  navigation.navigate('Match');
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const Tab =
  Platform.OS === 'android'
    ? createMaterialBottomTabNavigator()
    : createBottomTabNavigator();

const ToogetherTab = (props) => {
  const { groupContext } = useContext(Context);
  return (
    <Tab.Navigator
      shifting={true}
      initialRoute="SwipeNavigator"
      barStyle={{
        backgroundColor: Colors.bg,
        borderColor: Colors.bg,
      }}
      screenOptions={({ navigation, route }) => {
        const isGroupNavigator = route.name === 'GroupNavigator';
        const bgCard = groupContext && isGroupNavigator;

        return {
          headerShown: false,
          tabBarInactiveBackgroundColor: bgCard ? Colors.bgCard : Colors.bg,
          tabBarActiveBackgroundColor: bgCard ? Colors.bgCard : Colors.bg,
          tabBarActiveTintColor: Colors.orange,
          tabBarStyle: {
            backgroundColor: bgCard ? Colors.bgCard : Colors.bg,
            borderColor: bgCard ? Colors.bgCard : Colors.bg,
            borderTopColor: bgCard ? Colors.bgCard : Colors.bg,
          },
        };
      }}
    >
      <Tab.Screen
        name="SwipeNavigator"
        component={SwipeNavigator}
        options={{
          tabBarIcon: (tabInfo) => {
            return (
              <Ionicons name="home-outline" size={25} color={tabInfo.color} />
            );
          },
          tabBarColor: Colors.orange,
          tabBarLabel: Platform.OS === 'android' ? <Text>Swipe</Text> : '',
        }}
      />
      <Tab.Screen
        name="LikeNavigator"
        component={LikeNavigator}
        options={{
          tabBarIcon: (tabInfo) => {
            return <AntDesign color={tabInfo.color} name="hearto" size={25} />;
          },
          tabBarColor: Colors.orange,
          tabBarLabel: Platform.OS === 'android' ? <Text>Likes</Text> : '',
        }}
      />
      <Tab.Screen
        name="GroupNavigator"
        component={GroupNavigator}
        options={({ navigation, route }) => ({
          tabBarIcon: (tabInfo) => {
            return (
              <MaterialCommunityIcons
                name="account-group"
                size={25}
                color={tabInfo.color}
              />
            );
          },
          tabBarColor: Colors.orange,
          tabBarLabel:
            Platform.OS === 'android' ? <Text>Create group</Text> : '',
        })}
      />
    </Tab.Navigator>
  );
};

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="TabNavigator" component={ToogetherTab} />
      <Stack.Screen
        name="ProfileModal"
        component={ProfileModalScreen}
        options={{ presentation: 'modal' }}
      />
      <Stack.Screen
        name="SwipeMatch"
        component={ItsMatchScreenModal}
        options={{ presentation: 'modal' }}
      />
    </Stack.Navigator>
  );
};

export const TooNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Swipe"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Swipe" component={HomeNavigator} />
      <Stack.Screen name="Match" component={MatchNavigator} />
      <Stack.Screen name="GroupNavigator" component={GroupNavigator} />
      <Stack.Screen
        name="MyProfile"
        component={MyProfileNavigatorWithModal}
        options={{ gestureDirection: 'horizontal-inverted' }} // INVERTED
      />
    </Stack.Navigator>
  );
};

export const RecoveryNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ ...defaultNavOptions }}>
      <Stack.Screen
        name="RecoveryCode"
        component={RecoveryScreen}
        options={({ navigation }) => ({
          headerTitle: '',
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButtom}>
              <Item
                iconName={
                  Platform.OS === 'android'
                    ? 'ios-arrow-back'
                    : 'ios-arrow-back'
                }
                onPress={() => {
                  navigation.goBack();
                }}
                title="Back arrow"
              />
            </HeaderButtons>
          ),
        })}
      />
      <Stack.Screen
        name="ValidateCode"
        component={ValidateCodeScreen}
        options={({ navigation }) => ({
          headerTitle: '',
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButtom}>
              <Item
                iconName={
                  Platform.OS === 'android'
                    ? 'ios-arrow-back'
                    : 'ios-arrow-back'
                }
                onPress={() => {
                  navigation.goBack();
                }}
                title="Back arrow"
              />
            </HeaderButtons>
          ),
        })}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={({ navigation }) => ({
          headerTitle: '',
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButtom}>
              <Item
                iconName={
                  Platform.OS === 'android'
                    ? 'ios-arrow-back'
                    : 'ios-arrow-back'
                }
                onPress={() => {
                  navigation.goBack();
                }}
                title="Back arrow"
              />
            </HeaderButtons>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AuthStart" component={AuthStartScreen} />
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="Instagram" component={InstagramScreen} />
      <Stack.Screen name="Create" component={CreateProfileScreen} />
      <Stack.Screen name="AddPhoto" component={AddProfilePhotoScreen} />
      <Stack.Screen name="Success" component={AuthSucess} />
      <Stack.Screen name="Recovery" component={RecoveryNavigator} />
    </Stack.Navigator>
  );
};

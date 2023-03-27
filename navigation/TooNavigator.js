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
import MatchScreen from '../screens/Match/MatchScreen';

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

import Avatar from '../components/UI/Avatar';
import HeaderButtom from '../components/UI/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Header from '../components/UI/Header';
import { getNavHeader } from './getNavHeader';

console.log('GET NAV -> ', getNavHeader(1, 'X')); // TODO: for some reason this is undefined

const Stack = createStackNavigator();

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Colors.bg,
    shadowColor: 'transparent',
  },
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
        name="MyProfileScreen"
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
      <Stack.Screen
        name="MyProfileNavigator"
        component={MyProfileNavigator}
        options={{ gestureDirection: 'horizontal-inverted' }}
      />
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
        name="Match"
        component={ChatScreen}
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

const LikeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...defaultNavOptions,
      }}
    >
      <Stack.Screen
        name="LikesScreen"
        component={LikesScreen}
        options={({ navigation }) => ({
          headerTitle: 'Likes',
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
                title="Chat"
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
        name="SwipeScreen"
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
                title="Chat"
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

const MatchNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ ...defaultNavOptions, presentation: 'modal' }}
    >
      <Stack.Screen
        name="Chat"
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

const GroupNavigator = () => {
  const { groupContext } = useContext(Context);
  return (
    <Stack.Navigator
      initialRouteName="StartGroup"
      screenOptions={{
        ...defaultNavOptions,
        gestureDirection: 'horizontal-inverted',
      }}
    >
      {groupContext ? (
        <Stack.Screen
          name="Group"
          component={GroupScreen}
          options={({ navigation }) => ({
            ...defaultNavOptions,
            gestureDirection: 'horizontal',
            headerTitle: 'Likes',
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
                  title="Chat"
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
      ) : (
        <>
          <Stack.Screen
            name="StartGroup"
            component={StartGroupScreen}
            options={({ navigation }) => ({
              headerTitle: 'Start group',
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
        </>
      )}
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
        name="Likes"
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
      <Stack.Screen name="Main" component={ToogetherTab} />
      <Stack.Screen name="ProfileModal" component={ProfileModalScreen} />
      <Stack.Screen
        name="SwipeMatch"
        component={MatchScreen}
        options={{ presentation: 'modal' }}
      />
    </Stack.Navigator>
  );
};

export const TooNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="SwipeScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SwipeScreen" component={HomeNavigator} />
      <Stack.Screen name="Match" component={MatchNavigator} />
      <Stack.Screen name="GroupNavigator" component={GroupNavigator} />
      <Stack.Screen
        name="MyProfile"
        component={MyProfileNavigatorWithModal}
        options={{ gestureDirection: 'horizontal-inverted' }}
      />
    </Stack.Navigator>
  );
};

export const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AuthStart" component={AuthStartScreen} />
      <Stack.Screen name="AuthLogin" component={AuthScreen} />
      <Stack.Screen name="Instagram" component={InstagramScreen} />
      <Stack.Screen name="Create" component={CreateProfileScreen} />
      <Stack.Screen name="AddPhoto" component={AddProfilePhotoScreen} />
      <Stack.Screen name="Success" component={AuthSucess} />
    </Stack.Navigator>
  );
};

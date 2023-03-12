import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
  ScrollView,
  Text,
  Platform,
  TouchableOpacity,
  View,
  Alert,
  Linking,
  Share,
  StyleSheet,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import {
  FontAwesome5,
  Ionicons,
  AntDesign,
  Feather,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { logout, userDelete } from '../../store/actions/user';
import { SETTINGS_ACCOUNT_DATA, SETTINGS_APP_DATA } from '../../data/settings';
import { check400Error, checkServerError } from '../../utils/errors';

import HeaderButtom from '../../components/UI/HeaderButton';
import AuthButton from '../../components/UI/AuthButton';
import ActivityModal from '../../components/UI/ActivityModal';
import Colors from '../../constants/Colors';
import * as c from '../../constants/user';

const SettingScreen = (props) => {
  const dispatch = useDispatch();

  const userDeleteReducer = useSelector((state) => state.userDelete);
  const {
    error: errorDelete,
    loading: loadingDelete,
    data: dataDeleted,
  } = userDeleteReducer;

  useEffect(() => {
    if (errorDelete) {
      console.log({ ...errorDelete });
      if (errorDelete?.response?.status === 400) {
        check400Error(errorDelete);
      }
      checkServerError(errorDelete);
    }

    if (dataDeleted) {
      props.navigation.navigate('AuthStart');
    }
  }, [errorDelete, dataDeleted]);

  const handleLogout = async () => {
    try {
      dispatch(logout());
      props.navigation.navigate('AuthStart');
    } catch (error) {
      if (error) {
        if (error?.response?.status === 400) {
          check400Error(error);
        }
        checkServerError(error);
      }
    }
  };

  const handleDeleteUser = () => {
    dispatch(userDelete());
  };

  // for delete or log out
  const showAlert = (
    title,
    text,
    cancelButtonText,
    okButtonText,
    actionFunction
  ) => {
    Alert.alert(title, text, [
      {
        text: cancelButtonText,
        onPress: () => {
          actionFunction(); // Dispatch the action
        },
        style: 'cancel',
      },
      {
        text: okButtonText,
      },
    ]);
  };

  const onShareApp = async () => {
    try {
      const result = await Share.share({
        message:
          'Toogether App 🎉 | Find parties around you and meet other students, download it here ;) https://toogether.app/',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // do something
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        // just for IOS
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleOpenLink = useCallback(async (url) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, []);

  const navigateToScreen = (screen) => {
    props.navigation.navigate(screen);
  };

  const checkAction = (action) => {
    switch (action.type) {
      case 'NAVIGATE_TO_SCREEN':
        return navigateToScreen(action.screen);
      case 'DELETE_ACCOUNT':
        return showAlert(
          'You sure you want to delete your account?',
          'This is an irreversible action, all your data will be deleted. ',
          'Yes',
          'Keep my account',
          handleDeleteUser
        );
      case 'REDIRECT_TO_URL':
        return handleOpenLink(action.url);
      case 'SHARE_APP':
        return onShareApp();
      default:
        return null;
    }
  };

  if (loadingDelete) {
    return (
      <ActivityModal
        loading={loadingDelete}
        title="Please wait"
        size="large"
        activityColor="white"
        titleColor="white"
        activityWrapperStyle={{
          backgroundColor: Colors.bg,
        }}
      />
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bg }}>
      <ScrollView contentContainerStyle={{ backgroundColor: Colors.bg }}>
        <View style={styles.settingsView}>
          <View style={styles.settingTitleView}>
            <Text style={styles.settingTitleText}>Account</Text>
          </View>
          {SETTINGS_ACCOUNT_DATA.map((setting) => (
            <TouchableOpacity
              onPress={() => checkAction(setting.action)}
              style={styles.settingView}
              key={setting.id}
            >
              <View style={styles.settingIcon}>
                {setting.ionicons && (
                  <Ionicons name={setting.icon} size={25} color="white" />
                )}
                {setting.fontawesome && (
                  <FontAwesome5 name={setting.icon} size={25} color="white" />
                )}
                {setting.antdesign && (
                  <AntDesign name={setting.icon} size={25} color="white" />
                )}
                {setting.feather && (
                  <Feather name={setting.icon} size={25} color="white" />
                )}
                {setting.materialcommunityicons && (
                  <MaterialCommunityIcons
                    name={setting.icon}
                    size={25}
                    color="white"
                  />
                )}
              </View>
              <View style={styles.settingTextView}>
                <Text style={styles.settingText}>{setting.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
          <View style={styles.settingTitleView}>
            <Text style={styles.settingTitleText}>App</Text>
          </View>
          {SETTINGS_APP_DATA.map((setting) => (
            <TouchableOpacity
              onPress={() => checkAction(setting.action)}
              style={styles.settingView}
              key={setting.id}
            >
              <View style={styles.settingIcon}>
                {setting.ionicons && (
                  <Ionicons name={setting.icon} size={25} color="white" />
                )}
                {setting.fontawesome && (
                  <FontAwesome5 name={setting.icon} size={25} color="white" />
                )}
                {setting.antdesign && (
                  <AntDesign name={setting.icon} size={25} color="white" />
                )}
                {setting.feather && (
                  <Feather name={setting.icon} size={25} color="white" />
                )}
                {setting.materialcommunityicons && (
                  <MaterialCommunityIcons
                    name={setting.icon}
                    size={25}
                    color="white"
                  />
                )}
              </View>
              <View style={styles.settingTextView}>
                <Text style={styles.settingText}>{setting.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
          <View style={styles.line} />
          <View style={{ width: '60%', padding: 10 }}>
            <Text style={{ color: Colors.white, width: '60%' }}>
              Version: 1.0.0
            </Text>
          </View>
          <View style={styles.buttonView}>
            <AuthButton
              text="Logout"
              onPress={() =>
                showAlert(
                  'Logout',
                  'Are you sure you want to logout?',
                  'Yes',
                  'Keep me in',
                  handleLogout
                )
              }
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

SettingScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Settings',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButtom}>
        <Item
          iconName={
            Platform.OS === 'android' ? 'ios-arrow-back' : 'ios-arrow-back'
          }
          onPress={() => {
            navData.navigation.navigate('MyProfile');
          }}
          title="Back arrow"
        />
      </HeaderButtons>
    ),
  };
};

export default SettingScreen;

const styles = StyleSheet.create({
  settingsView: {
    margin: 20,
    paddingHorizontal: 2,
    justifyContent: 'center',
    alignContent: 'center',
  },
  settingTitleView: {
    width: '90%',
    marginVertical: 9,
  },
  settingTitleText: {
    fontSize: 20,
    color: Colors.placeholder,
  },
  settingView: {
    width: '90%',
    marginVertical: 9,
    paddingHorizontal: 2,
    padding: 10,
    flexDirection: 'row',
  },
  settingIcon: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  settingTextView: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  settingText: {
    fontSize: 18,
    color: Colors.white,
  },
  line: {
    borderBottomColor: Colors.placeholder,
    borderBottomWidth: 0.5,
    margin: 10,
  },
  buttonView: {
    marginBottom: '10%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    width: '95%',
  },
});

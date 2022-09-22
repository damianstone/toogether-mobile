/* eslint-disable no-fallthrough */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Linking,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesome5 } from '@expo/vector-icons';
import { logout, userDelete } from '../../store/actions/user';
import { SETTINGS_ACCOUNT_DATA, SETTINGS_APP_DATA } from '../../data/settings';
import { check400Error, checkServerError } from '../../utils/errors';

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
      props.navigation.navigate('');
    }
  }, [errorDelete]);

  const handleLogout = async () => {
    try {
      dispatch(logout());
      props.navigation.navigate('AuthStart');
    } catch (error) {
      // TODO: check errors
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

  const handleOpenLink = useCallback(async (url) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, []);

  const navigateToScreen = (screen) => {
    props.navigate(screen);
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
              style={styles.settingView}>
              <View style={styles.settingIcon}>
                <FontAwesome5 name={setting.icon} size={25} color="white" />
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
              style={styles.settingView}>
              <View style={styles.settingIcon}>
                <FontAwesome5
                  name={setting.icon}
                  size={25}
                  color="white"
                  type="FontAwesome5"
                />
              </View>
              <View style={styles.settingTextView}>
                <Text style={styles.settingText}>{setting.title}</Text>
              </View>
            </TouchableOpacity>
          ))}

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

SettingScreen.navigationOptions = () => {
  return {
    headerTitle: 'Settings',
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
    fontSize: 25,
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
    fontSize: 20,
    color: Colors.white,
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

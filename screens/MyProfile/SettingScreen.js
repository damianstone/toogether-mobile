import React, { useEffect, useCallback } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Linking,
  Share,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  FontAwesome5,
  Ionicons,
  AntDesign,
  Feather,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { userDelete } from '../../store/actions/user';
import { logout } from '../../store/actions/auth';
import { SETTINGS_ACCOUNT_DATA, SETTINGS_APP_DATA } from '../../data/settings';
import { check400Error, checkServerError } from '../../utils/errors';

import AuthButton from '../../components/UI/AuthButton';
import ActivityModal from '../../components/UI/ActivityModal';
import Colors from '../../constants/Colors';
import * as u from '../../constants/requestTypes/user';

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
      if (errorDelete?.response?.status === 400) {
        check400Error(errorDelete);
      }
      checkServerError(errorDelete);
    }

    if (dataDeleted) {
      dispatch({ type: u.USER_DELETE_RESET });
      dispatch(logout());
    }
  }, [errorDelete, dataDeleted]);

  const handleLogout = () => {
    dispatch(logout());
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
      <View style={styles.screen}>
        <ActivityModal
          loading
          title="Deleting your account"
          size="small"
          activityColor="white"
          titleColor="white"
          activityWrapperStyle={{
            backgroundColor: 'transparent',
          }}
        />
      </View>
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

export default SettingScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.bg,
    justifyContent: 'center',
    alignItems: 'center',
  },
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

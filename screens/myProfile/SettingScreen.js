import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
  RefreshControl,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  logout,
  getUserProfile,
  updateUserProfile,
} from '../../store/actions/user';
import { UPDATE_PROFILE_INPUTS } from '../../data/profile';
import {
  getFieldErrorFromServer,
  check400Error,
  checkServerError,
} from '../../utils/errors';

import AuthButton from '../../components/UI/AuthButton';
import Input from '../../components/UI/Input';
import Loader from '../../components/UI/Loader';
import Colors from '../../constants/Colors';
import * as c from '../../constants/user';
import styles from './styles';

const FORM_UPDATE = 'FORM_UPDATE';

const GENDER_OPTIONS = [
  {
    label: 'Male',
    value: 'male',
  },
  {
    label: 'Female',
    value: 'female',
  },
  {
    label: 'Chair',
    value: 'chair',
  },
];

const SHOW_ME_OPTIONS = [
  {
    label: 'Men',
    value: 'men',
  },
  {
    label: 'Women',
    value: 'women',
  },
  {
    label: 'Both',
    value: 'both',
  },
];

const formReducer = (state, action) => {
  if (action.type === FORM_UPDATE) {
    const updatedValued = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedValidities[key] && updatedFormIsValid;
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValued,
    };
  }
  return state;
};

const SettingScreen = (props) => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);

  const userGetProfile = useSelector((state) => state.userGetProfile);
  const {
    loading: loadingProfile,
    error: errorProfile,
    data: userProfile,
  } = userGetProfile;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    data: dataUpdate,
  } = userUpdateProfile;

  useEffect(() => {
    if (errorUpdate) {
      if (errorUpdate.response && errorUpdate.response.status === 400) {
        if (errorUpdate.response.data.hasOwnProperty('detail')) {
          check400Error(errorUpdate);
        } else {
          setError(true);
        }
      } else {
        checkServerError(errorUpdate);
      }
    }

    if (dataUpdate) {
      Alert.alert('Profile updated!', '', [
        {
          text: 'OK',
        },
      ]);
      dispatch(getUserProfile());
    }
  }, [errorUpdate, dataUpdate]);

  const loadProfile = useCallback(async () => {
    setRefreshing(true);
    try {
      await dispatch(getUserProfile());
    } catch (err) {
      checkServerError(err);
    }
    setRefreshing(false);
  }, [dispatch]);

  const getInputValue = (value) => {
    if (typeof value === 'number') {
      return value.toString();
    }
    return value;
  };

  const getPickerValue = (backendValue, items) => {
    const item = items.find((item) => item.label === backendValue);
    if (item) {
      return item.value;
    }
    return '';
  };

  // TODO: fix this: chenge the backend to check if there exit any of the properties or check in the frontend
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      // just two values, as the user is updated the new values will be included dynamically
      gender: userProfile?.gender
        ? getPickerValue(userProfile.gender, GENDER_OPTIONS)
        : '',
      show_me: userProfile?.show_me
        ? getPickerValue(userProfile.show_me, SHOW_ME_OPTIONS)
        : '',
      nationality: userProfile?.nationality ? userProfile.nationality : '',
      city: userProfile?.city ? userProfile.city : '',
      university: userProfile?.university ? userProfile.university : '',
      description: userProfile?.description ? userProfile.description : '',
    },
    inputValidities: {
      gender: false,
      show_me: false,
      nationality: false,
      city: false,
      university: false,
      description: false,
    },
    formIsValid: false,
  });

  const { formIsValid, inputValues } = formState;

  // ON CHANGE INPUTS
  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  // SAVE USER DATA
  const handleUpdateUserProfile = () => {
    // TODO: check when the user has not changed any data
    const isEmpty = Object.values(inputValues).every(
      (property) => property === null || property === ''
    );

    if (isEmpty) {
      Alert.alert(
        'No changes detected',
        'Are you sure you made changes to your profile?',
        [
          {
            text: 'OK',
          },
        ]
      );
    }

    if (!isEmpty) {
      dispatch(updateUserProfile(inputValues));
    }
    return null;
  };

  const handleLogout = () => {
    dispatch(logout());
    props.navigation.navigate('AuthStart');
  };

  const handleDeleteUser = () => {};

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

  if (loadingProfile) {
    return <Loader />;
  }

  console.log('USER PROFILE -> ', userProfile);
  console.log({ ...inputValues });
  console.log(formIsValid);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bg }}>
      <ScrollView contentContainerStyle={{ backgroundColor: Colors.bg }}>
        <View
          style={styles.settingContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={loadProfile}
              tintColor={Colors.white}
            />
          }>
          {UPDATE_PROFILE_INPUTS.map((field) => (
            <View style={styles.inputContainer} key={field.key}>
              <Input
                labelStyle={styles.label}
                inputStyle={
                  field.desabled ? styles.desabledInputStyle : styles.inputStyle
                }
                onInputChange={inputChangeHandler}
                initialValue={
                  field.pickerRequired
                    ? getPickerValue(userProfile[field.field_name], field.items)
                    : getInputValue(userProfile[field.field_name])
                }
                items={field.items}
                itemKey={userProfile[field.field_name]}
                id={field.id}
                key={field.key}
                label={field.label}
                placeholder={field.placeholder}
                placeholderTextColor={field.placeholderTextColor}
                inputType={field.inputType}
                keyboardType={field.keyboardType}
                editable={field.editable}
                desabled={field.desabled}
                required={field.required}
                pickerRequired={field.pickerRequired}
                autoCorrect={field.autoCorrect}
                autoCapitalize={field.autoCapitalize}
                autoComplete={field.autoComplete}
                dataDetectorTypes={field.dataDetectorTypes}
                maxLength={field.maxLength}
                returnKeyType={field.returnKeyType}
                serverError={error}
                errorText={getFieldErrorFromServer(
                  errorUpdate,
                  field.field_name,
                  field.error_text_message
                )}
              />
            </View>
          ))}
          <View style={styles.inputContainer}>
            <Input
              labelStyle={styles.label}
              style={styles.textArea} // style for the
              inputStyle={styles.textTareaStyle}
              underlineColorAndroid="transparent"
              placeholder="Type something"
              placeholderTextColor={Colors.placeholder}
              multiline
              numberOfLines={5}
              maxLength={500}
              inputType="textInput"
              id="description"
              label="About"
              autoCapitalize="none"
              required={false}
              initialIsValid
              initialValue={
                userProfile.description ? userProfile.description : ''
              }
              onInputChange={inputChangeHandler}
              autoCorrect={false}
            />
          </View>
          {loadingUpdate ? (
            <View style={styles.centered}>
              <ActivityIndicator size="large" color={Colors.icons} />
            </View>
          ) : (
            <View
              style={{
                marginBottom: '10%',
                flexDirection: 'column',
                justifyContent: 'center',
                alignSelf: 'center',
                alignItems: 'center',
                width: '70%',
              }}>
              <AuthButton
                text="Update profile"
                onPress={handleUpdateUserProfile}
              />
            </View>
          )}
        </View>

        {/* INFORMATION */}

        <TouchableOpacity onPress={() => {}} style={styles.optionView}>
          <View style={styles.iconView}>
            <Text>ICON</Text>
          </View>
          <View style={styles.textView}>
            <Text style={styles.textLabel}>Blocked users</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            showAlert(
              'You sure you want to delete your account?',
              'This is an irreversible action, all your data will be deleted. ',
              'Yes',
              'Keep my account',
              handleDeleteUser
            );
          }}
          style={styles.optionView}>
          <View style={styles.iconView}>
            <Text>ICON</Text>
          </View>
          <View style={styles.textView}>
            <Text style={styles.textLabel}>Delete account</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={styles.optionView}>
          <View style={styles.iconView}>
            <Text>ICON</Text>
          </View>
          <View style={styles.textView}>
            <Text style={styles.textLabel}>Contact Us</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            showAlert(
              'Logout',
              'You sure you want to logout?',
              'Yes',
              'Keep me in',
              handleLogout
            )
          }
          style={styles.logoutView}>
          <Text style={styles.textLabel}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default SettingScreen;

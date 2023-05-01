import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
  ScrollView,
  View,
  Alert,
  Platform,
  RefreshControl,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, updateUserProfile } from '../../store/actions/user';
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
import * as c from '../../constants/requestTypes/user';
import styles from './styles';

const FORM_UPDATE = 'FORM_UPDATE';

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

const EditProfileScreen = (props) => {
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

  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);

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
      dispatch(getUserProfile());
      Alert.alert('Profile updated!', '', [
        {
          text: 'OK',
        },
      ]);
      dispatch({ type: c.USER_UPDATE_RESET });
    }
  }, [dispatch, errorUpdate, dataUpdate]);

  const loadProfile = useCallback(async () => {
    setRefreshing(true);
    try {
      await dispatch(getUserProfile());
    } catch (err) {
      checkServerError(err);
    }
    setRefreshing(false);
  }, [dispatch]);

  // add listener to fetch the user and re fetch it
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      loadProfile();
    });

    return () => {
      if (unsubscribe.remove) {
        unsubscribe.remove();
      }
    };
  }, [loadProfile]);

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

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {},
    inputValidities: {
      gender: false,
      show_me: false,
      nationality: false,
      city: false,
      university: false,
      description: false,
      instagram: false,
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

  const getInitialValue = (
    profile,
    pickerRequired,
    field_name,
    field_items
  ) => {
    if (profile && pickerRequired) {
      return getPickerValue(profile[field_name], field_items);
    }
    if (profile && !pickerRequired) {
      return getInputValue(profile[field_name]);
    }
    return '';
  };

  const handleUpdateUserProfile = () => {
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

  if (loadingUpdate || loadingProfile) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator color={Colors.white} size="large" />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <KeyboardAvoidingView
        style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled
        keyboardVerticalOffset={100}
      >
        <ScrollView
          contentContainerStyle={{ backgroundColor: Colors.bg }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={loadProfile}
              tintColor={Colors.white}
            />
          }
        >
          <View style={styles.editContainer}>
            {userProfile &&
              UPDATE_PROFILE_INPUTS.map((field) => (
                <View style={styles.inputContainer} key={field.key}>
                  <Input
                    labelStyle={styles.label}
                    inputStyle={
                      field.desabled
                        ? styles.desabledInputStyle
                        : styles.inputStyle
                    }
                    onInputChange={inputChangeHandler}
                    initialValue={getInitialValue(
                      userProfile,
                      field.pickerRequired,
                      field.field_name,
                      field.items
                    )}
                    items={field.items}
                    itemKey={
                      userProfile && !loadingProfile
                        ? userProfile[field.field_name]
                        : ''
                    }
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
                      field.field_name
                    )}
                  />
                </View>
              ))}
            <View style={styles.inputContainer}>
              <Input
                labelStyle={styles.label}
                style={styles.textArea}
                inputStyle={styles.textTareaStyle}
                underlineColorAndroid="transparent"
                placeholder="Type something"
                placeholderTextColor={Colors.placeholder}
                multiline
                numberOfLines={5}
                maxLength={500}
                inputType="textInput"
                id="description"
                label="Bio"
                autoCapitalize="none"
                required={false}
                initialIsValid
                initialValue={
                  userProfile?.description ? userProfile.description : ''
                }
                onInputChange={inputChangeHandler}
                autoCorrect={false}
              />
            </View>
            {loadingUpdate ? (
              <Loader />
            ) : (
              <View
                style={{
                  marginBottom: '10%',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  alignItems: 'center',
                  width: '95%',
                }}
              >
                <AuthButton
                  text="Update profile"
                  onPress={handleUpdateUserProfile}
                />
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default EditProfileScreen;

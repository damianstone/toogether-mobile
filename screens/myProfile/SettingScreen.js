import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AuthButton from '../../components/UI/AuthButton';
import Input from '../../components/UI/Input';
import Loader from '../../components/UI/Loader';
import Colors from '../../constants/Colors';
import * as c from '../../constants/user';
import { logout, getUserProfile } from '../../store/actions/user';
import {
  getFieldErrorFromServer,
  check400Error,
  checkServerError,
} from '../../utils/errors';
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

const gender = [
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

const show = [
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

  console.log('USER PROFILE --> ', userProfile);

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    data: dataUpdate,
  } = userUpdateProfile;

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      gender: '',
      show_me: '',
      university: '',
      city: '',
      description: '',
    },
    inputValidities: {
      gender: false,
      show_me: false,
      university: true,
      city: true,
      description: true,
    },
    formIsValid: false,
  });

  const { formIsValid, inputValues } = formState;

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

    dispatch({ type: c.USER_UPDATE_RESET });
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
  const updateUserProfile = () => {
    // console.log({ ...inputValues });
    if (!formIsValid) {
      // Alert.alert(
      //   `Required fields in blank;)`,
      //   'Please fill the required fields',
      //   [{ text: 'Okay' }]
      // );
    }

    // TODO: dispatch
  };

  const onLogOut = () => {
    dispatch(logout());
    props.navigation.navigate('AuthStart');
  };

  const onDelete = () => {};

  const showAlert = () => {};

  if (loadingProfile) {
    return <Loader />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bg }}>
      <ScrollView contentContainerStyle={{ backgroundColor: Colors.bg }}>
        <View style={styles.settingContainer}>
          <View style={styles.inputContainer}>
            <Input
              labelStyle={styles.label}
              inputStyle={styles.inputStyle}
              id="firstname"
              label="Name"
              onInputChange={inputChangeHandler}
              inputType="textInput"
              keyboardType="default"
              editable={false}
              disable
              autoCapitalize="sentences"
              initialValue={userProfile.firstname}
              returnKeyType="next"
            />
          </View>
          <View style={styles.inputContainer}>
            <Input
              labelStyle={styles.label}
              inputStyle={styles.inputStyle}
              inputType="textInput"
              id="lastname"
              label="Lastname"
              keyboardType="default"
              required
              autoCapitalize="sentences"
              onInputChange={inputChangeHandler}
              initialValue={userProfile.lastname}
              autoCorrect={false}
              returnKeyType="next"
              serverError={error}
              errorText={getFieldErrorFromServer(
                errorUpdate,
                'lastname',
                'Please enter your latname'
              )}
            />
          </View>
          <View style={styles.inputContainer}>
            <Input
              labelStyle={styles.label}
              inputStyle={styles.inputStyle}
              inputType="inputMask"
              id="birthdate"
              label="Birthdate"
              required
              autoComplete="birthdate-day"
              dataDetectorTypes="calendarEvent"
              onInputChange={inputChangeHandler}
              placeholder="YYYY-MM-DD"
              initialValue={userProfile.birthdate}
              placeholderTextColor={Colors.placeholder}
              serverError={error}
              errorText={getFieldErrorFromServer(
                errorUpdate,
                'birthdate',
                'Please enter a birthdate'
              )}
            />
          </View>
          <View style={styles.inputContainer}>
            <Input
              labelStyle={styles.label}
              inputStyle={styles.inputStyle}
              inputType="textInput"
              id="age"
              label="Age"
              keyboardType="default"
              disabled
              autoCapitalize="sentences"
              required
              onInputChange={inputChangeHandler}
              initialValue={userProfile.age}
              serverError={error}
            />
          </View>
          <View style={styles.inputContainer}>
            <Input
              labelStyle={styles.label}
              inputStyle={styles.inputStyle}
              inputType="textInput"
              id="university"
              label="University"
              keyboardType="default"
              autoCapitalize="sentences"
              required={false}
              initialIsValid
              onInputChange={inputChangeHandler}
              initialValue={
                userProfile.university ? userProfile.university : ''
              }
              autoCorrect={false}
              returnKeyType="next"
            />
          </View>
          <View style={styles.inputContainer}>
            <Input
              labelStyle={styles.label}
              inputStyle={styles.inputStyle}
              inputType="textInput"
              id="city"
              label="City"
              keyboardType="default"
              autoCapitalize="sentences"
              required={false}
              initialIsValid
              onInputChange={inputChangeHandler}
              initialValue={userProfile.city ? userProfile.city : ''}
              autoCorrect={false}
              returnKeyType="next"
            />
          </View>
          <View style={styles.inputContainer}>
            <Input
              pickerRequired
              inputType="picker"
              labelStyle={styles.label}
              inputStyle={styles.inputStyle}
              items={gender}
              itemKey={show.value}
              label="Gender *"
              initialValue={userProfile.value}
              id="gender"
              placeholder={{ label: 'Select an item', value: 'Select an item' }}
              placeholderTextColor={Colors.placeholder}
              onInputChange={inputChangeHandler}
              serverError={error}
              errorText={getFieldErrorFromServer(
                errorUpdate,
                'gender',
                'Please enter your gender'
              )}
            />
          </View>
          <View style={styles.inputContainer}>
            <Input
              pickerRequired
              inputType="picker"
              labelStyle={styles.label}
              inputStyle={styles.inputStyle}
              items={show}
              itemKey={show.value}
              initialValue={userProfile.show_me}
              label="Show me *"
              id="show_me"
              placeholder={{ label: 'Select an item', value: 'Select an item' }}
              placeholderTextColor={Colors.placeholder}
              onInputChange={inputChangeHandler}
              serverError={error}
              errorText={getFieldErrorFromServer(
                errorUpdate,
                'show_me',
                'Please enter your show_me'
              )}
            />
          </View>
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
              label="About (optional)"
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
              <AuthButton text="Update profile" onPress={updateUserProfile} />
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
        <TouchableOpacity onPress={onDelete} style={styles.optionView}>
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
        <TouchableOpacity onPress={onLogOut} style={styles.logoutView}>
          <Text style={styles.textLabel}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default SettingScreen;

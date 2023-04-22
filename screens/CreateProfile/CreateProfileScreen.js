import React, { useState, useReducer, useCallback, useEffect } from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  Alert,
  Platform,
  PlatformColor,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import AuthButton from '../../components/UI/AuthButton';
import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors';
import * as c from '../../constants/requestTypes/user';
import { createUserProfile } from '../../store/actions/user';
import {
  checkServerError,
  getFieldErrorFromServer,
  check400Error,
} from '../../utils/errors';

import { CREATE_PROFILE_INPUTS } from '../../data/profile';
import * as authStyles from '../Auth/styles';
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

const CreateProfileScreen = (props) => {
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      img: '',
      name: '',
      birthdate: '',
      gender: '',
      show_me: '',
      university: '',
      description: '',
    },
    inputValidities: {
      img: true,
      name: false,
      birthdate: false,
      gender: false,
      show_me: false,
      university: true,
      description: true,
    },
    formIsValid: false,
  });

  const { formIsValid, inputValues } = formState;

  const userCreateProfile = useSelector((state) => state.userCreateProfile);
  const {
    error: createError,
    data: createData,
    loading: createLoading,
  } = userCreateProfile;

  useEffect(() => {
    if (createError) {
      if (createError.response && createError?.response?.status === 400) {
        if (createError.response?.data?.hasOwnProperty('detail')) {
          check400Error(createError);
        } else {
          setError(true);
        }
      } else {
        checkServerError(createError);
      }
    }

    if (createData && Object.keys(createData).length !== 0) {
      Alert.alert(
        `Your age is ${createData.age} ?`,
        'Please confirm your age',
        [
          {
            text: "No, I'm not",
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              dispatch({ type: c.USER_CREATE_RESET });
              props.navigation.navigate('AddPhoto');
            },
          },
        ]
      );
    }
  }, [createError, createData]);

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
  const createUserProfileHandler = () => {
    dispatch(
      createUserProfile(
        inputValues.name,
        inputValues.birthdate,
        inputValues.gender,
        inputValues.show_me,
        inputValues.university,
        inputValues.description
      )
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : ''}
      keyboardVerticalOffset={50}
      style={styles.screen}
      contentContainerStyle={styles.screen}
      enabled
    >
      <StatusBar style="light" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles.scroll}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.auth_text_view}>
          <View style={authStyles.default.auth_text_container}>
            <Text style={authStyles.default.auth_text_big}>
              Lets poss create your profile
            </Text>
          </View>
          <View style={authStyles.default.auth_text_container}>
            <Text style={authStyles.default.auth_text_small}>
              You can change your data any time after
            </Text>
          </View>
        </View>

        {CREATE_PROFILE_INPUTS.map((field) => (
          <View style={styles.inputContainer} key={field.key}>
            <Input
              labelStyle={styles.label}
              inputStyle={styles.inputStyle}
              onInputChange={inputChangeHandler}
              initialValue=""
              items={field.items}
              itemKey=""
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
              errorText={getFieldErrorFromServer(createError, field.field_name)}
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
            label="About (optional)"
            autoCapitalize="none"
            required={false}
            initialIsValid
            onInputChange={inputChangeHandler}
            autoCorrect={false}
          />
        </View>
        {createLoading ? (
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
            }}
          >
            <AuthButton text="continue" onPress={createUserProfileHandler} />
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateProfileScreen;

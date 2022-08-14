import React, {
  useState,
  useContext,
  useEffect,
  useReducer,
  useCallback,
} from 'react';
import {
  Image,
  View,
  Button,
  Text,
  ScrollView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useDispatch, useSelector } from 'react-redux';

import styles from './styles';
import Colors from '../../constants/Colors';
import AuthInput from '../../components/UI/AuthInput';
import { userRegister } from '../../store/actions/user';

const FORM_UPDATE = 'FORM_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_UPDATE) {
    const updatedValued = {
      ...state.inputValues, // old input value
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities, // old input validity
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      // if there are all true so the form is valid
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

const AuthStartScreen = (props) => {
  const register = props.navigation.getParam('register');

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
      repeated_password: '',
    },
    inputValidities: {
      email: false,
      password: true,
      repeated_password: true,
    },
    formIsValid: false,
  });

  const { formIsValid, inputValues } = formState;

  const dispatch = useDispatch();
  const userRegisterReducer = useSelector((state) => state.userRegister);
  const { loading, data, success, error } = userRegisterReducer;

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occurred!', error.response.data.detail, [
        { text: 'Okay' },
      ]);
      dispatch({ type: 'USER_REGISTER_RESET' });
      console.log('ERROR AXIOS ', { ...error });
    }
    if (success) {
      Alert.alert('CHUPA CHUPA!', "you've created an account mamawebo", [
        { text: 'Okay' },
      ]);
      dispatch({ type: 'USER_REGISTER_RESET' });
    }
  }, [error, success]);

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

  const handleRegister = () => {
    if (formIsValid) {
      dispatch(
        userRegister(
          inputValues.email,
          inputValues.password,
          inputValues.repeated_password
        )
      );
    }
  };

  const handleLogin = () => {};

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <View style={styles.auth_text_view}>
        <View style={styles.auth_text_container}>
          <Text style={styles.auth_text_big}>
            {register ? 'Lets create your account!' : 'Lets sign you in'}
          </Text>
        </View>
        <View style={styles.auth_text_container}>
          <Text style={styles.auth_text_small}>
            {register ? 'Welcome ;)' : 'Welcome back'}
          </Text>
        </View>
      </View>
      <KeyboardAvoidingView behavior={'position'}>
        <ScrollView
          style={styles.scrollview_style}
          contentContainerStyle={styles.scrollview_content_container}
          automaticallyAdjustKeyboardInsets={true}>
          <View style={styles.auth_input_container}>
            <AuthInput
              id="email"
              label="Email"
              keyboardType="default"
              required
              autoComplete="email"
              autoCapitalize="none"
              errorText="Enter your email"
              placeholder="hello@example@gmail.com"
              placeholderTextColor="#D8D8D8"
              autoCorrect={false}
              onInputChange={inputChangeHandler}
            />
            <AuthInput
              secureTextEntry={true}
              id="password"
              label="Password"
              keyboardType="default"
              required
              errorText="Enter your password"
              autoCorrect={false}
              onInputChange={inputChangeHandler}
            />
            {register && (
              <AuthInput
                secureTextEntry={true}
                required
                id="repeated_password"
                label="Repeat your password"
                keyboardType="default"
                errorText="Enter your password"
                autoCorrect={false}
                onInputChange={inputChangeHandler}
              />
            )}
            {loading ? (
              <View style={styles.auth_loader_container}>
                <ActivityIndicator size="large" />
              </View>
            ) : (
              <View style={styles.auth_button_container}>
                <Button
                  color={Colors.white}
                  title={register ? 'Create account' : 'Login'}
                  onPress={register ? handleRegister : handleLogin}
                />
              </View>
            )}
            <Text style={styles.auth_goback_text}>
              You already have an account?
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default AuthStartScreen;

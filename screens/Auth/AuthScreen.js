import React, { useEffect, useReducer, useCallback, useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
  Platform,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';

import ButtonAndroid from '../../components/UI/ButtonAndroid';
import AuthButton from '../../components/UI/AuthButton';
import AuthInput from '../../components/UI/AuthInput';
import Colors from '../../constants/Colors';
import Device from '../../theme/Device';
import * as c from '../../constants/requestTypes/auth';
import { Context } from '../../context/ContextProvider';
import { authenticate, login, register } from '../../store/actions/auth';
import { check400Error, checkServerError } from '../../utils/errors';
import styles from './styles';

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
  const { updateProfileContext } = useContext(Context);
  const { registerMode } = props.route.params;

  const dispatch = useDispatch();

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

  const userRegisterReducer = useSelector((state) => state.userRegister);
  const {
    loading: registerLoading,
    data: registerData,
    error: registerError,
  } = userRegisterReducer;

  const userLoginReducer = useSelector((state) => state.userLogin);
  const {
    loading: loginLoading,
    data: loginData,
    success: loginSuccess,
    error: loginError,
  } = userLoginReducer;

  // REGISTER
  useEffect(() => {
    if (registerError) {
      if (registerError?.response?.status === 400) {
        check400Error(registerError);
      } else {
        checkServerError(registerError);
      }
      dispatch({ type: c.USER_REGISTER_RESET });
    }

    if (registerData) {
      props.navigation.navigate('Success', { registerMode: true });
      dispatch({ type: c.USER_REGISTER_RESET });
    }

    dispatch({ type: c.USER_REGISTER_RESET });
  }, [registerData, registerError]);

  // LOGIN
  useEffect(() => {
    if (loginError) {
      if (loginError?.response?.status === 400) {
        check400Error(loginError);
      } else if (loginError?.response?.status === 401) {
        Alert.alert(
          'Login Failed',
          'Your email or password is incorred. Please try again',
          [{ text: 'OK' }]
        );
      } else {
        checkServerError(loginError);
      }
      dispatch({ type: c.USER_LOGIN_RESET });
    }

    if (loginSuccess && loginData.has_account) {
      dispatch(authenticate(true));
      dispatch({ type: c.USER_LOGIN_RESET });
    }

    if (loginSuccess && !loginData.has_account) {
      props.navigation.navigate('Success', { registerMode: registerMode });
      dispatch({ type: c.USER_LOGIN_RESET });
    }

    dispatch({ type: c.USER_LOGIN_RESET });
  }, [loginError, loginSuccess]);

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

  const handleSwitch = () => {
    if (registerMode) {
      props.navigation.navigate('Auth', { registerMode: false });
    } else {
      props.navigation.navigate('Auth', { registerMode: true });
    }
  };

  const handleRegister = () => {
    if (formIsValid) {
      dispatch(
        register(
          inputValues.email,
          inputValues.password,
          inputValues.repeated_password
        )
      );
    }
  };

  const handleLogin = () => {
    if (formIsValid) {
      dispatch(login(inputValues.email, inputValues.password));
    }
  };

  return (
    <View style={[styles.screen, Platform.OS === 'ios' ? {} : { flex: 1 }]}>
      <StatusBar style="light" />
      <View style={styles.auth_text_view}>
        <View style={styles.auth_text_container}>
          <Text style={styles.auth_text_big}>
            {registerMode ? 'Lets create your account!' : 'Lets sign you in'}
          </Text>
        </View>
        <View style={styles.auth_text_container}>
          <Text style={styles.auth_text_small}>
            {registerMode ? 'Welcome ;)' : 'Welcome back'}
          </Text>
        </View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'position' : 'height'}
        keyboardVerticalOffset={
          Platform.OS === 'ios' ? undefined : -0.3 * Device.height
        }
      >
        <ScrollView
          style={styles.scrollview_style}
          contentContainerStyle={styles.scrollview_content_container}
          automaticallyAdjustKeyboardInsets={
            Platform.OS == 'ios' ? false : true
          }
        >
          <View style={styles.auth_input_container}>
            <AuthInput
              id="email"
              label="Email"
              textContentType="emailAddress"
              keyboardType="email-address"
              required
              autoComplete="email"
              autoCapitalize="none"
              errorText="Enter your email"
              placeholder="hello@gmail.com"
              placeholderTextColor="#D8D8D8"
              autoCorrect={false}
              onInputChange={inputChangeHandler}
            />
            <AuthInput
              secureTextEntry
              textContentType={
                Platform.OS === 'ios' ? 'oneTimeCode' : 'newPassword'
              }
              id="password"
              label="Password"
              keyboardType="default"
              required
              autoCapitalize="none"
              errorText="Enter your password"
              autoCorrect={false}
              onInputChange={inputChangeHandler}
              autoComplete={'off'}
            />
            {registerMode && (
              <AuthInput
                secureTextEntry
                textContentType={
                  Platform.OS === 'ios' ? 'oneTimeCode' : 'newPassword'
                }
                required
                autoCapitalize="none"
                id="repeated_password"
                label="Repeat your password"
                keyboardType="default"
                errorText="Enter your password"
                autoCorrect={false}
                onInputChange={inputChangeHandler}
              />
            )}
            {!registerMode && (
              <ButtonAndroid
                style={styles.auth_text_button}
                color={Colors.bgCard}
                title={'Did you forget your password?'}
                onPress={() => props.navigation.navigate('Recovery')}
              />
            )}
            {registerLoading || loginLoading ? (
              <View style={styles.auth_loader_container}>
                <ActivityIndicator size="large" />
              </View>
            ) : (
              <AuthButton
                text={registerMode ? 'Create account' : 'Login'}
                onPress={registerMode ? handleRegister : handleLogin}
              />
            )}
            <ButtonAndroid
              style={styles.auth_text_button}
              color={Colors.bgCard}
              title={
                registerMode
                  ? 'You already have an account?'
                  : 'You dont have an account?'
              }
              onPress={handleSwitch}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default AuthStartScreen;

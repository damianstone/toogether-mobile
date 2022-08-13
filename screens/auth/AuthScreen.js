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
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useDispatch, useSelector } from 'react-redux';

import styles from './styles';
import Colors from '../../constants/Colors';
import AuthInput from '../../components/UI/AuthInput';
import * as actions from '../../store/actions/auth';

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [register, setRegister] = useState(false);

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

  useEffect(() => {
    if (error) {
      // if there is an error when user can login or signup
      Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
      setError();
    }
  }, [error]);

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

  console.log(formState);

  if (isLoading === true) {
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.orange} />
    </View>;
  }

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={styles.scrollview_auth}
        automaticallyAdjustKeyboardInsets={true}>
        <View style={styles.auth_text_view}>
          <View style={styles.auth_text_container}>
            <Text style={styles.auth_text_big}>Lets sign you in</Text>
          </View>
          <View style={styles.auth_text_container}>
            <Text style={styles.auth_text_small}>Welcome back</Text>
          </View>
        </View>
        <View style={styles.auth_input_container}>
          <AuthInput
            labelStyle={styles.label}
            inputStyle={styles.inputStyle}
            id="email"
            label="Email"
            keyboardType="default"
            required
            autoComplete="email"
            autoCapitalize="sentences"
            errorText="Enter your email"
            placeholder="hello@example@gmail.com"
            autoCorrect={false}
            onInputChange={inputChangeHandler}
          />
          <AuthInput
            labelStyle={styles.label}
            inputStyle={styles.inputStyle}
            password={true}
            secureTextEntry={true}
            id="password"
            label="Password"
            keyboardType="default"
            required
            errorText="Enter your password"
            autoCorrect={false}
            returnKeyType="next"
            onInputChange={inputChangeHandler}
          />
          <AuthInput
            labelStyle={styles.label}
            inputStyle={styles.inputStyle}
            password={true}
            secureTextEntry={true}
            id="repeated_password"
            label="Repeat your password"
            keyboardType="default"
            required
            errorText="Enter your password"
            autoCorrect={false}
            returnKeyType="next"
            onInputChange={inputChangeHandler}
          />
          <View style={styles.auth_button_container}>
            <Button
              color={Colors.white}
              title="Create account"
              onPress={() => {
                setRegister(true);
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AuthStartScreen;

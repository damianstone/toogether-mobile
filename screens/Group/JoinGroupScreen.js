import React, { useEffect, useReducer, useCallback, useState } from 'react';
import {
  View,
  Button,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';

import AuthButton from '../../components/UI/AuthButton';
import AuthInput from '../../components/UI/AuthInput';
import Colors from '../../constants/Colors';
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

const JoinGroupScreen = (props) => {
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {}, []);

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

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <View style={styles.join_text_view}>
        <View style={styles.join_text_container}>
          <Text style={styles.join_text_big}>Start the night</Text>
        </View>
        <View style={styles.join_text_container}>
          <Text style={styles.join_text_small}>Have fun</Text>
        </View>
      </View>
      <KeyboardAvoidingView behavior="position">
        <ScrollView
          style={styles.scrollview_style}
          contentContainerStyle={styles.scrollview_content_container}
          automaticallyAdjustKeyboardInsets>
          <View style={styles.imageContainer}>
            <Image
              source={require('../../assets/images/balls_group.png')}
              style={styles.image}
            />
          </View>
          <View style={styles.join_input_container}>
            <AuthInput
              labelStyle={styles.label}
              id="share_link"
              label="Past the group's link"
              keyboardType="email-address"
              required
              autoCapitalize="none"
              errorText="Verify if the link"
              placeholder="start.the.night/wceJKbhsJKB"
              placeholderTextColor="#D8D8D8"
              autoCorrect={false}
              onInputChange={inputChangeHandler}
            />
            {loading ? (
              <View style={styles.join_loader_container}>
                <ActivityIndicator size="large" />
              </View>
            ) : (
              <AuthButton text="Join" onPress={() => {}} />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

JoinGroupScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Join a group',
  };
};

export default JoinGroupScreen;

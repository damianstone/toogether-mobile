import React, { useState, useReducer, useCallback, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  KeyboardAvoidingView,
  Image,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

import Colors from '../../constants/Colors';
import styles from './styles';
import Input from '../../components/UI/Input';
import Header from '../../components/UI/Header';

const FORM_UPDATE = 'FORM_UPDATE';

// to manage onChange with state
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

const CreateProfile = (props) => {
  // CREAR UN SISTEMA PARA QUE SOLO SE PUEDA CONTINUAR SI ES QUE SE LLENA TODO EL FORMULARIO
  const [completed, setCompleted] = useState(false);

  // START DECLARING STATE
  // useReducer from react native is used to manage a lot states
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      name: '',
      lastname: '',
      university: '',
      birthday: '',
      gender: '',
      showMe: '',
      about: '',
    },
    inputValidities: {
      name: false,
      lastname: false,
      university: false,
      birthday: false,
      gender: false,
      showMe: false,
      about: false,
    },
    formIsValid: false,
  });
  // FINISH DECLARING STATE

  const createUsarHandler = () => {
    // dispatch the user info to redux then to database
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        // this gonna go directly to the form reducer
        type: FORM_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}>
      <StatusBar style="light" />
      <Header />
      <View styles={styles.titleContainer}>
        <Text style={styles.title}>Complete your profile</Text>
      </View>
      <ScrollView>
        <View style={styles.wrapper}>
          <View style={styles.photoContainer}>
            <Image
              source={require('../../assets/images/Profiles/profile-5.jpeg')}
              style={styles.photo}
            />
            <Image
              source={require('../../assets/images/Profiles/profile-5.jpeg')}
              style={styles.photo}
            />
          </View>
          <View style={styles.inputContainer}>
            <Input
              labelStyle={styles.label}
              inputType='textInput'
              id="email"
              label="Name"
              keyboardType="email-address"
              required
              autoCapitalize="sentences"
              errorText="Please enter your real name"
              onInputChange={inputChangeHandler}
              initialValue=""
            />
          </View>
          <View style={styles.inputContainer}>
            <Input
              labelStyle={styles.label}
              inputType='textInput'
              id="email"
              label="Lastname"
              keyboardType="email-address"
              required
              autoCapitalize="none"
              errorText="Please enter you real lastname"
              onInputChange={inputChangeHandler}
              initialValue=""
            />
          </View>
          <View style={styles.inputContainer}>
            <Input
              labelStyle={styles.label}
              inputType='textInput'
              id="email"
              label="University"
              keyboardType="email-address"
              autoCapitalize="none"
              errorText="Please enter a valid university"
              onInputChange={inputChangeHandler}
              initialValue=""
            />
          </View>
          <View style={styles.inputContainer}>
            <Input
              labelStyle={styles.label}
              inputType='inputMask'
              id="birthday"
              label="Birthday"
              required
              autoComplete="birthdate-day"
              dataDetectorTypes="calendarEvent"
              errorText="Please enter you birthday"
              onInputChange={inputChangeHandler}
              initialValue="DD-MM-YYYY"
            />
          </View>
          <View style={styles.inputContainer}>
            <Input
              labelStyle={styles.label}
              inputType='textInput'
              id="email"
              label="Gender"
              keyboardType="email-address"
              required
              autoCapitalize="none"
              errorText="Please enter a valid email address"
              onInputChange={inputChangeHandler}
              initialValue=""
            />
          </View>
          <View style={styles.inputContainer}>
            <Input
              labelStyle={styles.label}
              inputType='textInput'
              id="email"
              label="Show me"
              keyboardType="email-address"
              required
              autoCapitalize="none"
              errorText="Please enter a valid email address"
              onInputChange={inputChangeHandler}
              initialValue=""
            />
          </View>
          <View style={styles.inputContainer}>
            <Input
              labelStyle={styles.label}
              inputType='textInput'
              inputStyle={styles.inputStyle}
              id="email"
              label="About"
              keyboardType="email-address"
              required
              autoCapitalize="none"
              errorText="Please enter a valid email address"
              onInputChange={inputChangeHandler}
              initialValue=""
            />
          </View>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <View style={styles.buttonContainer}>
            <Button
              onPress={() => {
                props.navigation.navigate('Swipe');
              }}
              color={Colors.white}
              title="Continuar"
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateProfile;

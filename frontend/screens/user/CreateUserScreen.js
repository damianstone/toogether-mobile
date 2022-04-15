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
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

import Colors from '../../constants/Colors';
import styles from './styles';
import Input from '../../components/UI/Input';
import Header from '../../components/UI/Header';
import ImageSelector from '../../components/UI/ImageSelector';

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

const show = [
  {
    label: 'Hombres',
    value: 'hombres',
  },
  {
    label: 'Mujeres',
    value: 'mujeres',
  },
  {
    label: 'Mixto',
    value: 'Mixto',
  },
];

const gender = [
  {
    label: 'Masculino',
    value: 'Masculino',
  },
  {
    label: 'Femenino',
    value: 'Femenino',
  },
  {
    label: 'otro',
    value: 'otro',
  },
];

const CreateUserScreen = (props) => {
  // CREAR UN SISTEMA PARA QUE SOLO SE PUEDA CONTINUAR SI ES QUE SE LLENA TODO EL FORMULARIO
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState('')
  const [error, setError] = useState();

  // START DECLARING STATE
  // useReducer from react native is used to manage a lot states
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      img: '',
      name: '',
      lastname: '',
      university: '',
      birthday: '',
      gender: '',
      showme: '',
      about: '',
    },
    inputValidities: {
      img: true,
      name: false,
      lastname: false,
      university: true,
      birthday: false,
      gender: false,
      showme: false,
      about: true,
    },
    formIsValid: false,
  });
  // FINISH DECLARING STATE

  useEffect(() => {
    if (error) {
      Alert.alert('An error occurred!', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  // SAVE USER DATA
  const createUsarHandler = () => {

    // SEND BIRTHDAY AS AGE
    //const age = [] 
    //age.push(text.split(" "))
    //age.filter((elem) => elem != "-");
    //console.log(age)
    //for(let i = 0; i < age.length; i++) {
    //  // slice
    //}

    // dispatch the user info to redux then to database
    if (!formState.formIsValid) {
      Alert.alert('Fill the form aweonao', error, [{ text: 'Okay' }]);
      console.log(formState);
      return;
    }


    console.log(formState);
    
    // go to the home section but pass the user data to header button left and user profile 
    props.navigation.navigate('Swipe'); 
  };

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

  imageTakenHandler = (imagePath) => {
    // ADD REMOVE PHOTO HANDLER!
    formState.inputValues.img = imagePath;
    formState.inputValidities.img = true;
    setImage(imagePath);
  }

  // DISABLE BUTTON IF THE USER DONT FILL ALL THE FIELDS
  let styleButton;
  if (!formState.formIsValid) {
    styleButton = styles.buttonContainerNoValid;
  }
  if (formState.formIsValid) {
    styleButton = styles.buttonContainer;
  }

  // LOADING SPINNER
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.icons} />
      </View>
    );
  }

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
      <ScrollView style={styles.scroll} contentContainerStyle={styles.contentContainer}>
        <View style={{width: '60%', alignSelf:'center'}}>
          <ImageSelector onImageTaken={imageTakenHandler} />
        </View>
        <View style={styles.inputContainer}>
          <Input
            labelStyle={styles.label} // style for the label
            inputStyle={styles.inputStyle}
            inputType="textInput"
            id="name"
            label="Name"
            keyboardType="default" // normal keyboard
            required
            autoCapitalize="sentences"
            errorText="Please enter your real name"
            onInputChange={inputChangeHandler}
            initialValue=""
            autoCorrect={false} // disable auto correction
            returnKeyType="next" // next button on keyboard instead of done
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
            errorText="Please enter you real lastname"
            onInputChange={inputChangeHandler}
            initialValue=""
            autoCorrect={false} // disable auto correction
            returnKeyType="next" // next button on keyboard instead of done
          />
        </View>
        <View style={styles.inputContainer}>
          <Input
            labelStyle={styles.label}
            inputStyle={styles.inputStyle}
            inputType="textInput"
            id="university"
            label="University (optional)"
            keyboardType="default"
            autoCapitalize="sentences"
            required={false}
            initialIsValid={true}
            onInputChange={inputChangeHandler}
            initialValue=""
            autoCorrect={false} // disable auto correction
            returnKeyType="next" // next button on keyboard instead of done
          />
        </View>
        <View style={styles.inputContainer}>
          <Input
            labelStyle={styles.label}
            inputStyle={styles.inputStyle}
            inputType="inputMask"
            id="birthday"
            label="Birthday"
            required
            autoComplete="birthdate-day"
            dataDetectorTypes="calendarEvent"
            errorText="Please enter your birthday"
            onInputChange={inputChangeHandler}
            initialValue="DD-MM-YYYY"
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
            label="Gender"
            initialValue=""
            id="gender"
            placeholder={{ label: 'Select an item', value: 'Select an item' }}
            errorText="Please select your gender"
            onInputChange={inputChangeHandler}
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
            label="Show me"
            initialValue=""
            id="showme"
            placeholder={{ label: 'Select an item', value: 'Select an item'}}
            errorText="Please select an option"
            onInputChange={inputChangeHandler}
          />
        </View>
        <View style={styles.inputContainer}>
          <Input
            labelStyle={styles.label}
            style={styles.textArea} // style for the
            inputStyle={styles.textTareaStyle}
            underlineColorAndroid="transparent"
            placeholder="Type something"
            placeholderTextColor="grey"
            multiline={true}
            numberOfLines={5}
            maxLength={500}
            inputType="textInput"
            id="about"
            label="About (optional)"
            autoCapitalize="none"
            required={false}
            initialIsValid={true}
            onInputChange={inputChangeHandler}
            autoCorrect={false} // disable auto correction
            initialValue=""
          />
        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <View style={styleButton}>
            <TouchableOpacity
              style={styles.touchable}
              onPress={createUsarHandler}>
              <Button
                onPress={createUsarHandler}
                color={Colors.white}
                title="Continuar"
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateUserScreen;

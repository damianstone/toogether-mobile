import React, { useState, useReducer, useCallback, useEffect } from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useDispatch, useSelector } from 'react-redux';
import { createUserProfile, addPhoto } from '../../store/actions/user';

import Colors from '../../constants/Colors';
import styles from './styles';
import Input from '../../components/UI/Input';
import Header from '../../components/UI/Header';
import ImageSelector from '../../components/UI/ImageSelector';
import AuthButton from '../../components/UI/AuthButton';

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

const CreateUserScreen = (props) => {
  const [image, setImage] = useState('');
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      img: '',
      firstname: '',
      lastname: '',
      birthdate: '',
      gender: '',
      show_me: '',
      university: '',
      description: '',
    },
    inputValidities: {
      img: true,
      firstname: false,
      lastname: false,
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
    success: createSuccess,
    loading: createLoading,
  } = userCreateProfile;

  const userAddPhoto = useSelector((state) => state.userAddPhoto);
  const {
    error: addPhotoError,
    data: addPhotoData,
    success: addPhotoSuccess,
    loading: addPhotoLoading,
  } = userAddPhoto;

  useEffect(() => {
    if (createError || addPhotoError) {
      if (createError.response.data !== undefined) {
        setError(true);
      }
      if (createError.response.data.detail !== undefined) {
        Alert.alert('Error', createError.response.data.detail, [
          { text: 'OK' },
        ]);
      }
    }

    if (createSuccess && addPhotoSuccess) {
      //TODO: go to swipe
      Alert.alert('Success', 'profile created', [{ text: 'Okay' }]);
    }

    if (createSuccess && createData) {
      Alert.alert(
        `Your age is ${createData.age} ?`,
        'Please confirm your age',
        [{ text: 'Yes' }]
      );
    }
  }, [createError, createSuccess, addPhotoError, addPhotoSuccess]);

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
    console.log({ ...inputValues });
    if (!formIsValid) {
      Alert.alert(
        `Required fields in blank;)`,
        'Please fill the required fields',
        [{ text: 'Yes' }]
      );
      // dispatch(addPhoto(image));
    }
    dispatch(
      createUserProfile(
        inputValues.firstname,
        inputValues.lastname,
        inputValues.birthdate,
        inputValues.gender,
        inputValues.show_me,
        inputValues.university,
        inputValues.description
      )
    );
  };

  const imageTakenHandler = (imagePath) => {
    // ADD REMOVE PHOTO HANDLER!
    formState.inputValues.img = imagePath;
    formState.inputValidities.img = true;
    setImage(imagePath);
  };

  const checkIsErrorFromServer = (field, text) => {
    if (
      createError &&
      createError.response !== undefined &&
      createError.response.data !== undefined &&
      createError.response.data[field] !== undefined
    ) {
      // console.log('ERROR BIRTHDATE', createError.response.data['birthdate']);
      return createError.response.data[field][0];
    }
    return;
  };

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
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.contentContainer}>
        <View style={{ width: '60%', alignSelf: 'center' }}>
          <ImageSelector onImageTaken={imageTakenHandler} />
        </View>
        <View style={styles.inputContainer}>
          <Input
            labelStyle={styles.label}
            inputStyle={styles.inputStyle}
            id="firstname"
            label="Name *"
            inputType="textInput"
            keyboardType="default"
            required
            autoCapitalize="sentences"
            onInputChange={inputChangeHandler}
            initialValue=""
            autoCorrect={false}
            returnKeyType="next"
            serverError={error}
            errorText={checkIsErrorFromServer(
              'firstname',
              'Please enter a name'
            )}
          />
        </View>
        <View style={styles.inputContainer}>
          <Input
            labelStyle={styles.label}
            inputStyle={styles.inputStyle}
            inputType="textInput"
            id="lastname"
            label="Lastname *"
            keyboardType="default"
            required
            autoCapitalize="sentences"
            onInputChange={inputChangeHandler}
            initialValue=""
            autoCorrect={false}
            returnKeyType="next"
            serverError={error}
            errorText={checkIsErrorFromServer(
              'lastname',
              'Please enter your latname'
            )}
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
            initialIsValid={true}
            onInputChange={inputChangeHandler}
            initialValue=""
            autoCorrect={false}
            returnKeyType="next"
          />
        </View>
        <View style={styles.inputContainer}>
          <Input
            labelStyle={styles.label}
            inputStyle={styles.inputStyle}
            inputType="inputMask"
            id="birthdate"
            label="Birthdate *"
            required
            autoComplete="birthdate-day"
            dataDetectorTypes="calendarEvent"
            onInputChange={inputChangeHandler}
            placeholder="YYYY-MM-DD"
            serverError={error}
            errorText={checkIsErrorFromServer(
              'birthdate',
              'Please enter a birthdate'
            )}
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
            initialValue=""
            id="gender"
            placeholder={{ label: 'Select an item', value: 'Select an item' }}
            onInputChange={inputChangeHandler}
            serverError={error}
            errorText={checkIsErrorFromServer(
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
            label="Show me *"
            id="show_me"
            placeholder={{ label: 'Select an item', value: 'Select an item' }}
            onInputChange={inputChangeHandler}
            serverError={error}
            errorText={checkIsErrorFromServer(
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
            placeholderTextColor="grey"
            multiline={true}
            numberOfLines={5}
            maxLength={500}
            inputType="textInput"
            id="description"
            label="About (optional)"
            autoCapitalize="none"
            required={false}
            initialIsValid={true}
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
            }}>
            <AuthButton text={'continue'} onPress={createUserProfileHandler} />
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateUserScreen;

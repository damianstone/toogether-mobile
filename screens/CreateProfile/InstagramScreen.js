import React, { useEffect, useReducer, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../../store/actions/user';
import { check400Error, checkServerError } from '../../utils/errors';

import Input from '../../components/UI/Input';
import Loader from '../../components/UI/Loader';
import * as c from '../../constants/requestTypes/user';
import Colors from '../../constants/Colors';

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

const InstagramScreen = (props) => {
  const dispatch = useDispatch();

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    data: dataUpdate,
  } = userUpdateProfile;

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      instagram: '',
    },
    inputValidities: {
      instagram: false,
    },
    formIsValid: false,
  });

  const { formIsValid, inputValues } = formState;

  useEffect(() => {
    if (errorUpdate) {
      if (errorUpdate?.response?.status === 400) {
        if (errorUpdate?.response?.data?.detail) {
          check400Error(errorUpdate);
        } else {
          setError(true);
        }
      } else {
        checkServerError(errorUpdate);
      }
    }

    if (dataUpdate) {
      props.navigation.navigate('Create');
    }

    dispatch({ type: c.USER_UPDATE_RESET });
  }, [dispatch, errorUpdate, dataUpdate]);

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

  const handleInstagram = () => {
    if (formIsValid) {
      dispatch(updateUserProfile(inputValues));
    } else {
      Alert.alert(
        'Please enter you Instagram account',
        'Soon there will a chat build in the app ',
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.screen}
      style={{ backgroundColor: Colors.bg }}
    >
      <StatusBar style="light" />
      <KeyboardAvoidingView behavior="position">
        <View style={styles.container}>
          <Text style={styles.mainText}>Connecting with students</Text>
          <View style={styles.container}>
            <Text style={styles.text}>
              We use instagram for connecting you with other people
            </Text>

            <View style={styles.imageContainer}>
              <Image
                source={require('../../assets/images/ig-logo.png')}
                style={styles.image}
              />
            </View>

            <Input
              labelStyle={styles.label}
              inputStyle={styles.inputStyle}
              underlineColorAndroid="transparent"
              placeholder="your_account"
              placeholderTextColor={Colors.placeholder}
              maxLength={30}
              inputType="textInput"
              id="instagram"
              label="Instagram account"
              autoCapitalize="none"
              required
              initialIsValid
              onInputChange={inputChangeHandler}
              autoCorrect={false}
            />
          </View>
        </View>
      </KeyboardAvoidingView>

      <View style={styles.buttonContainer}>
        {loadingUpdate ? (
          <Loader />
        ) : (
          <TouchableOpacity style={styles.touchable} onPress={handleInstagram}>
            <Text style={styles.button_text}>Continue</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

export default InstagramScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: Colors.bg,
    padding: 10,
  },
  container: {
    marginVertical: 20,
  },
  mainText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: Colors.white,
  },
  text: {
    fontSize: 30,
    color: Colors.white,
  },
  imageContainer: {
    padding: 20,
    marginVertical: 20,
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    padding: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: Colors.orange,
    marginVertical: 10,
    width: '65%',
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
  },
  touchable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },

  label: {
    color: Colors.white,
    fontSize: 18,
  },
  inputStyle: {
    justifyContent: 'center',
    padding: 3,
    backgroundColor: '#494863',
    borderRadius: 10,
  },
  button_text: {
    color: 'white',
    fontSize: 20,
  },
});

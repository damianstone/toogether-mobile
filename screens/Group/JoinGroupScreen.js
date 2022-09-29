import React, { useEffect, useReducer, useCallback, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { joinGroup } from '../../store/actions/group';
import { check400Error, checkServerError } from '../../utils/errors';

import AuthButton from '../../components/UI/AuthButton';
import AuthInput from '../../components/UI/AuthInput';
import Colors from '../../constants/Colors';
import * as g from '../../constants/group';

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
  const dispatch = useDispatch();

  const joinGroupReducer = useSelector((state) => state.joinGroup);
  const {
    loading: loadingJoin,
    error: errorJoin,
    data: dataJoin,
  } = joinGroupReducer;

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      share_link: '',
    },
    inputValidities: {
      share_link: false,
    },
    formIsValid: false,
  });

  const { formIsValid, inputValues } = formState;

  useEffect(() => {
    if (errorJoin) {
      if (errorJoin?.response?.status === 400) {
        check400Error(errorJoin);
      }
      checkServerError(errorJoin);
      dispatch({ type: g.JOIN_GROUP_RESET });
    }

    if (dataJoin) {
      Alert.alert('Joined to the group', '', [
        {
          text: 'OK',
        },
      ]);
      props.navigation.replace('Group');
      dispatch({ type: g.JOIN_GROUP_RESET });
    }
  }, [dispatch, errorJoin, dataJoin]);

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

  const handleJoinGroup = () => {
    if (!inputValues.share_link) {
      Alert.alert('No Link', 'Please enter the link of the group', [
        {
          text: 'OK',
          onPress: () => {
            dispatch({ type: g.JOIN_GROUP_RESET });
          },
        },
      ]);
    }
    dispatch(joinGroup(inputValues.share_link));
  };

  if (loadingJoin) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator color={Colors.orange} size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="light" />
      <KeyboardAvoidingView behavior="position">
        <ScrollView
          style={styles.scrollview_style}
          contentContainerStyle={styles.scrollview_content_container}
          automaticallyAdjustKeyboardInsets>
          <View style={styles.imageContainer}>
            <Image
              source={require('../../assets/images/hand_join.png')}
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
              errorText="Paste the group link to join"
              placeholder="start.the.night/wceJKbhsJKB"
              placeholderTextColor="#D8D8D8"
              autoCorrect={false}
              onInputChange={inputChangeHandler}
            />
            {loadingJoin ? (
              <View style={styles.join_loader_container}>
                <ActivityIndicator size="large" />
              </View>
            ) : (
              <AuthButton text="Join" onPress={handleJoinGroup} />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

JoinGroupScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Join a group',
  };
};

export default JoinGroupScreen;

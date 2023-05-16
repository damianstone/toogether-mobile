import React, { useEffect, useReducer, useCallback, useContext } from 'react';
import {
  View,
  Image,
  Platform,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Alert,
  Dimensions,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { Context } from '../../context/ContextProvider';
import { joinGroup } from '../../store/actions/group';
import { check400Error, checkServerError } from '../../utils/errors';

import AuthButton from '../../components/UI/AuthButton';
import AuthInput from '../../components/UI/AuthInput';
import Colors from '../../constants/Colors';
import * as g from '../../constants/requestTypes/group';

const { width, height } = Dimensions.get('window');

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
  const { updateGroupContext } = useContext(Context);
  const dispatch = useDispatch();

  const joinGroupReducer = useSelector((state) => state.joinGroup);
  const {
    loading: loadingJoin,
    error: errorJoin,
    data: dataJoin,
  } = joinGroupReducer;

  // internar reducer for the form where the user put the invitation link
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
      updateGroupContext(dataJoin);
      props.navigation.navigate('Group');
      dispatch({ type: g.JOIN_GROUP_RESET });
    }
  }, [errorJoin, dataJoin]);

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
    if (inputValues.share_link) {
      dispatch(joinGroup(inputValues.share_link));
    }
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
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'position' : ''}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.scroll}
        >
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

export default JoinGroupScreen;

const styles = StyleSheet.create({
  loadingScreen: {
    backgroundColor: Colors.bg,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screen: {
    flex: 1,
    backgroundColor: Colors.bg,
    height: '100%',
  },

  container: {
    flexGrow: 1,
    flexDirection: 'column',
  },

  scroll: {
    justifyContent: 'space-between',
  },

  imageContainer: {
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: Platform.OS === 'ios' ? 0.55 * height : 0.6 * height,
  },

  // make a dynamic css so for all screens the image will take a 60% of the height of the screen
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

  join_input_container: {
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    padding: 3,
    marginBottom: Platform.OS === 'ios' ? 0 : 0.015 * height,
  },

  label: {
    color: Colors.white,
    fontSize: 18,
  },

  join_loader_container: {
    marginVertical: 30,
    padding: 3,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
  },
});

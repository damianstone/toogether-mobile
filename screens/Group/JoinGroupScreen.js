import React, { useEffect, useReducer, useCallback, useContext } from 'react';
import {
  View,
  Image,
  Platform,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { Context } from '../../context/ContextProvider';
import { joinGroup } from '../../store/actions/group';
import { check400Error, checkServerError } from '../../utils/errors';

import HeaderButtom from '../../components/UI/HeaderButton';
import AuthButton from '../../components/UI/AuthButton';
import AuthInput from '../../components/UI/AuthInput';
import Colors from '../../constants/Colors';
import * as g from '../../constants/group';

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
      Alert.alert('Joined to the group', '', [
        {
          text: 'OK',
        },
      ]);
      updateGroupContext(dataJoin);
      props.navigation.navigate('Group');
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
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButtom}>
        <Item
          iconName={
            Platform.OS === 'android' ? 'ios-arrow-back' : 'ios-arrow-back'
          }
          onPress={() => {
            navData.navigation.goBack();
          }}
          title="Back arrow"
        />
      </HeaderButtons>
    ),
  };
};

export default JoinGroupScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.bg,
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: '100%',
  },

  loadingScreen: {
    backgroundColor: Colors.bg,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  gradient: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  scrollview_style: {
    flexGrow: 1,
    backgroundColor: Colors.bg,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 0,
  },

  scrollview_content_container: {
    flexDirection: 'column', // inner items will be added vertically
    flexGrow: 1, // all the available vertical space will be occupied by it
    justifyContent: 'space-between', // will create the gutter between body and footer
  },

  join_text_view: {
    padding: 10,
  },

  join_text_container: {
    width: '100%',
  },

  join_text_big: {
    color: Colors.white,
    fontSize: 35,
    fontWeight: 'bold',
  },

  join_text_small: {
    color: Colors.white,
    fontSize: 25,
  },

  imageContainer: {
    maxHeight: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    width: '100%',
    height: 470,
  },

  join_input_container: {
    backgroundColor: Colors.bg,
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
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

  join_button_container: {
    marginVertical: 30,
    marginBottom: 20,
    padding: 3,
    flexDirection: 'row',
    width: '100%',
    height: 44,
    backgroundColor: Colors.orange,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  join_text_button: {
    color: '#4A4A4A',
    fontSize: 15,
  },
});

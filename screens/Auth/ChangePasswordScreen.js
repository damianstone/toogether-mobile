import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import AuthButton from '../../components/UI/AuthButton';
import AuthInput from '../../components/UI/AuthInput';
import HeaderButtom from '../../components/UI/HeaderButton';
import Device from '../../theme/Device';
import Colors from '../../constants/Colors';
import ActivityModal from '../../components/UI/ActivityModal';
import * as c from '../../constants/user';
import { changePassword } from '../../store/actions/user';
import { check400Error, checkServerError } from '../../utils/errors';

const ChangePasswordScreen = (props) => {
  const { data, error, loading } = useSelector(state => state.changePassword)
  const email = props.navigation.getParam('email');
  const token = props.navigation.getParam('token');

  const [password, setPassword] = useState('')
  const [repeated_password, setRepeated_password] = useState('')

  const dispatch = useDispatch()


  const handlerPassword = (inputIdentifier, inputValue) => {
    setPassword(inputValue)
  }

  const handlerNewPassword = (inputIdentifier, inputValue) => {
    setRepeated_password(inputValue)
  }


  useEffect(() => {
    if (error) {
      if (error?.response?.status === 400) {
        if (error?.response?.data?.detail) {
          check400Error(error);
        }
      } else {
        checkServerError(error);
      }
    }

    if (data) {
      props.navigation.navigate('Auth');
    }

    dispatch({ type: c.CHANGE_PASSWORD_RESET });
  }, [dispatch, error, data]);

  const handlePress = () => {
    if(password && repeated_password){
      dispatch(changePassword(email, password, repeated_password, token))
    }else{
      Alert.alert(
        'Error',
        'Password and repeated password fields are required to change password',
        [{ text: 'OK' }]
      );
    }
  }

  if (loading) {
    return (
      <View style={styles.screen}>
        <ActivityModal
          loading
          title="Loading"
          size="small"
          activityColor="white"
          titleColor="white"
          activityWrapperStyle={{
            backgroundColor: 'transparent',
          }}
        />
      </View>
    )
  }
  const example = () => { }

  return (
    <ScrollView contentContainerStyle={styles.scroll_container}>
      <KeyboardAvoidingView style={styles.screen}>
        <View style={styles.auth_text_container}>
          <Text style={styles.auth_text_big}>Change password</Text>
          <Text style={styles.auth_text_small}>
            Change your password and make sure you’ll remember it
          </Text>
        </View>
        <View style={styles.auth_input_email}>
          <Text style={styles.auth_text_small}>Password</Text>
          <AuthInput
            secureTextEntry
            textContentType={
              Platform.OS === 'ios' ? 'password' : 'newPassword'
            }
            id="password"
            keyboardType="default"
            required
            autoCapitalize="none"
            errorText="Enter your password"
            autoCorrect={false}
            onInputChange={handlerPassword}
          />
          <Text style={styles.auth_text_small}>Confirm your password</Text>
          <AuthInput
            secureTextEntry
            textContentType={
              Platform.OS === 'ios' ? 'password' : 'newPassword'
            }
            id="password"
            keyboardType="default"
            required
            autoCapitalize="none"
            errorText="Enter your password"
            autoCorrect={false}
            onInputChange={handlerNewPassword}
          />
        </View>
        <View style={styles.button_container}>
          <AuthButton text="Confirm"
            onPress={handlePress}/>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

ChangePasswordScreen.navigationOptions = (navData) => {
  return {
    headerTitle: '',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButtom}>
        <Item
          iconName={
            Platform.OS === 'android' ? 'ios-arrow-back' : 'ios-arrow-back'
          }
          onPress={() => {
            navData.navigation.navigate('ValidateCode');
          }}
          title="Back arrow"
        />
      </HeaderButtons>
    ),
  };
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.bg,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100%',
    width: '100%'
  },
  auth_text_big: {
    color: Colors.white,
    fontSize: 35,
    fontWeight: 'bold',
  },

  auth_text_small: {
    color: Colors.white,
    fontSize: 20,
    paddingTop: 20
  },
  auth_text_container: {
    flexDirection: 'column',
    justifyContent: 'center',
    border: 2,
    width: '95%',
    padding: 10,
    // fixes styling for Android and should be default for iOS
  },
  auth_input_email: {
    width: '100%',
    flexDirection: 'column',
    paddingHorizontal: 20
  },

  input: {
    height: 40,
    width: "90%",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#494863',
    paddingHorizontal: 10,
    marginBottom: 20,
    // otros estilos para el campo de entrada
  },
  button_container: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    padding: Platform.OS === 'ios' ? 20 : 0,
    paddingHorizontal: Platform.OS === 'ios' ? 0 : 20,
    paddingVertical: Platform.OS === 'ios' ? '7%' : 0,
    paddingBottom: Platform.OS === 'ios' ? '7%' : 0.09 * Device.height,
  },
  scroll_container: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    with: '100%',
  },
});


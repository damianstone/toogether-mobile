import React, { useState, useContext, useEffect } from 'react';
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
import { useDispatch } from 'react-redux';

import styles from './styles';
import Colors from '../../constants/Colors';
import * as actions from '../../store/actions/auth';

/* 
google login

depending of the device u need a different approach

Check if the user has already loged in before -> show create user screen 

*/

const AuthScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isSignup, setIsSignup] = useState(false); // to switch between signup and signin
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      // if there is an error when user can login or signup
      Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
      setError()
    }
  }, [error]);

  const authHandler = async () => {
    try {
      await dispatch(actions.googleLogIn());
      props.navigation.navigate('Swipe');
    } catch (err) {
      setError(err.message);
    }
  };

  if (isLoading === true) {
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.orange} />
    </View>;
  }

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <ScrollView>
        <View>
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/images/logo-2.png')}
              style={styles.logo}
            />
          </View>
          <View style={styles.imageContainer}>
            <Image
              source={require('../../assets/images/login.png')}
              style={styles.image}
            />
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer2}>
            <AntDesign name="google" size={22} color="black" />
            <Button
              onPress={authHandler}
              color={Colors.black}
              title={isSignup ? 'Sign Up with Google' : 'Login with Google'}
            />
          </View>
          <Button
            title={`Switch to ${isSignup ? 'Login?' : 'Sign Up?'}`}
            color={Colors.white}
            onPress={() => {
              setIsSignup((prevState) => !prevState);
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default AuthScreen;

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
import { useDispatch, useSelector } from 'react-redux';

import styles from './styles';
import Colors from '../../constants/Colors';
import * as actions from '../../store/actions/auth';

import Constants from 'expo-constants'; // to read app.json extra
import * as Google from 'expo-google-app-auth'; // google auth libraries
import firebase from 'firebase'; // basic firebase
import Firebase from '../../Firebase/config'; // This is the initialized Firebase,

/* 
google login

depending of the device u need a different approach

Check if the user has already loged in before -> show create user screen 

*/

const AuthScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isSignup, setIsSignup] = useState(false); // to switch between signup and signin

  // from redux check is authenticated
  const isAuthenticated = useSelector((state) => state.auth.authenticated);

  useEffect(() => {
    if (error) {
      // if there is an error when user can login or signup
      Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
      setError();
    }
  }, [error]);

  const authHandler = async () => {
    const response = await Google.logInAsync({
      //return an object with result token and user
      iosClientId: Constants.manifest.extra.IOS_KEY, //From app.json
      androidClientId: Constants.manifest.extra.ANDROIUD_KEY, //From app.json
    });

    // if the user couldnt login
    if (response.type != 'success') {
      setError('An error has occurred, check your connection and try again');
    }

    console.log(response);
    const credential = firebase.auth.GoogleAuthProvider.credential(
      //Set the tokens to Firebase
      response.idToken,
      response.accessToken
    );

    const fireRes = await Firebase.auth().signInWithCredential(credential); // Login to Firebase
    const isNewUser = fireRes.additionalUserInfo.isNewUser;

    if (!isNewUser && isAuthenticated) {
      props.navigation.navigate('Swipe');
      return;
    }

    console.log('TO SUCCESS SCREEN');
    props.navigation.navigate('Success');
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

/*         .then((res) => {
          if (res.additionalUserInfo.isNewUser) {
            props.navigation.navigate('Success');
            console.log('GO TO SUCCESS SCREEN')
            newUser = true
          } else {
          }
        })
        .catch((error) => {
          console.log(error);
        }); */

/*     try {
      await dispatch(actions.googleLogIn());
      props.navigation.navigate('Success');
    } catch (err) {
      setError(err.message);
    } */

import AsyncStorage from '@react-native-async-storage/async-storage'; // automatically login when reload
import Constants from 'expo-constants'; // to read app.json extra
import * as Google from 'expo-google-app-auth'; // google auth libraries
import firebase from 'firebase'; // basic firebase
import Firebase from '../../Firebase/config'; // This is the initialized Firebase,

export const DELETE = 'DELETE';
export const GOOGLE_LOGIN = 'GOOGLE_LOGIN';
export const LOGIN = 'LOGIN';

// LOGIN WITH GOOGLE
export const googleLogIn = () => {
  return async (dispatch) => {
    const response = await Google.logInAsync({
      //return an object with result token and user
      iosClientId: Constants.manifest.extra.IOS_KEY, //From app.json
      androidClientId: Constants.manifest.extra.ANDROIUD_KEY, //From app.json
    });

    if (response.type === 'success') {
      console.log(response);
      const credential = firebase.auth.GoogleAuthProvider.credential(
        //Set the tokens to Firebase
        response.idToken,
        response.accessToken
      );

      Firebase.auth()
        .signInWithCredential(credential) // Login to Firebase
        .then((res) => {})
        .catch((error) => {
          console.log(error);
        });
    }

    // if the user couldnt login
    if (response.type != 'success') {
      throw new Error(
        'An error has occurred, check your connection and try again'
      );
    }
  };
};

// redux anction to check if the user has already be registered (completed the form)
// the user can be auth from google but if nof complete the form so is not full authenticared yet
// if the user auth with google but not complete the form, the. show again the auth screen
// if the user completed the form, so he can logout and then enter again to the without showing the form again
// if the user delete the their account, the state change to authenticated false
export const login = (authenticated) => {
  saveData(authenticated);
  return {
    type: LOGIN,
    authenticated: authenticated,
  };
};

// LOGOUT
export const deleteUser = () => {
  clearLogoutTimer();
  // clear the asyncStorage (local storage) using the same identifier to store the data
  AsyncStorage.removeItem('userData');
  return { type: DELETE };
};

// ERROR NO DATA GET SAVE SO THEN AFTER RELOAD USER HAVE TO LOGIN AGAIN
const saveData = async (authenticated) => {
  try {
    await AsyncStorage.setItem(
      'userData',
      JSON.stringify({
        authenticated: authenticated,
      })
    );
  } catch (err) {
    console.log(err);
  }
};

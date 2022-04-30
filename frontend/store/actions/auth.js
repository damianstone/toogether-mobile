import AsyncStorage from '@react-native-async-storage/async-storage'; // automatically login when reload
import Constants from 'expo-constants'; // to read app.json extra
import * as Google from 'expo-google-app-auth'; // google auth libraries
import firebase from 'firebase'; // basic firebase
import { getAdditionalUserInfo } from "firebase/auth"
import Firebase from '../../Firebase/config'; // This is the initialized Firebase,

export const AUTHENTICATE = 'AUTHENTICATE';
export const SIGNUP = 'SIGNUP';
export const LOGOUT = 'LOGOUT';
export const GOOGLE_LOGIN = 'GOOGLE_LOGIN';
export const LOGINS = 'LOGINS';

let timer;

// RESUSABLE AUNTENTICATE DISPATCH
export const authenticate = (accessToken, idToken, expirationTime) => {
  return (dispatch) => {
    dispatch(setLogoutTimer(expirationTime * 1000));
    dispatch({
      type: AUTHENTICATE,
      accessToken: accessToken,
      idToken: idToken,
    });
  };
};

// redux anction to check if the user has already be registered (completed the form)
// the user can be auth from google but if nof complete the form so is not full authenticared yet
// if the user auth with google but not complete the form, the. show again the auth screen 
// if the user completed the form, so he can logout and then enter again to the without showing the form again
// if the user delete the their account, the state change to authenticated false 
export const logins = (authenticated) => {
  saveData(authenticated);
  return {
    type: LOGINS,
    authenticated: authenticated,
  }
}

// LOGOUT
export const logout = () => {
  clearLogoutTimer();
  // clear the asyncStorage (local storage) using the same identifier to store the data
  AsyncStorage.removeItem('userData');
  return { type: LOGOUT };
};

// SIGN UP WITH FIREBASE
export const signup = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      // request to create a new user
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAeTJYg-SmUKrM0Alclkyc6abG2xS-lPeE',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      console.log(errorResData); // log the object with the info of the error
      const errorId = errorResData.error.message;
      let message = 'Something went wrong!';

      if (errorId === 'EMAIL_EXISTS') {
        message = 'This email exists already!';
      }

      throw new Error(message);
    }

    const resData = await response.json();
    console.log(resData);

    dispatch({
      type: SIGNUP,
    });
  };
};

// SIGN IN WITH FIREBASE
export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      // request to create a new user
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAeTJYg-SmUKrM0Alclkyc6abG2xS-lPeE',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      console.log(errorResData); // log the object with the info of the error
      const errorId = errorResData.error.message;
      let message = 'Something went wrong!';

      if (errorId === 'EMAIL_NOT_FOUND') {
        message = 'This email could not be found!';
      } else if (errorId === 'INVALID_PASSWORD') {
        message = 'This password is not valid!';
      } else if (errorId === 'USER_DISABLED') {
        message = 'This user has been disabled!';
      }

      throw new Error(message);
    }

    const resData = await response.json();
    console.log(resData);

    dispatch({
      type: SIGNIN,
    });
  };
};

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
        .then(res => {
        })
        .catch((error) => {
          console.log(error);
        });
    }

    // if the user couldnt login
    if (response.type != 'success') {
      throw new Error('An error has occurred, check your connection and try again');
    }
  };
};

// ERROR NO DATA GET SAVE SO THEN AFTER RELOAD USER HAVE TO LOGIN AGAIN
const saveData = async (authenticated) => {
  try {
    await AsyncStorage.setItem(
      'userData',
      JSON.stringify({
        authenticated: authenticated
      })
    );
  } catch (err) {
    console.log(err);
  }
};

// CLEAN LOGOUT TIMER
const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
};

// SET LOGOUT TIMER
const setLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      // logout the user
      dispatch(logout());
    }, expirationTime);
  };
};


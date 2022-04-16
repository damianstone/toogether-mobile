import AsyncStorage from '@react-native-async-storage/async-storage'; // automatically login when reload
import Constants from 'expo-constants'; // to read app.json extra
import * as Google from 'expo-google-app-auth'; // google auth libraries
import firebase from 'firebase'; // basic firebase
import Firebase from '../../Firebase/config'; // This is the initialized Firebase,

export const AUTHENTICATE = 'AUTHENTICATE';
export const SIGNUP = 'SIGNUP';
export const LOGOUT = 'LOGOUT';
export const GOOGLE_LOGIN = 'GOOGLE_LOGIN';

let timer;

// RESUSABLE AUNTENTICATE DISPATCH
export const authenticate = (accessToken, idToken) => {
  return (dispatch) => {
    dispatch({ type: AUTHENTICATE, accessToken: accessToken, idToken: idToken });
  };
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
        .catch((error) => {
          console.log(error);
        });
    }

    // if the user couldnt login
    if(response.type != 'success') {
      throw new Error('ERROR');
    }

    // DISPATCH
    dispatch(authenticate(
      response.accessToken, 
      response.idToken
      ));

    saveData(response.accessToken, response.idToken);
  };
};

// ERROR NO DATA GET SAVE SO THEN AFTER RELOAD USER HAVE TO LOGIN AGAIN
const saveData = async (token, userId) => {
  try {
    await AsyncStorage.setItem(
      'userData',
      JSON.stringify({
        token: token,
        userId: userId,
      })
    );
  } catch (err) {
    console.log(err);
  }
};

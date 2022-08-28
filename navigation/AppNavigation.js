import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import Navigation from './Navigation';
import firebase from "firebase";
import Firebase from '../Firebase/config';


const AppNavigator = (props) => {

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) { // if the user is not logged in
        NavigationActions.navigate({
            routeName: 'Auth'
        }) // go to the auth screen
    }
    });
  })

  return <Navigation />;
};

export default AppNavigator;



/* 

  const mainC = useMemo(
    () => ({
      handleGLogin: () => Glogin(),
      signOutUser: () => Firebase.auth().signOut(),
    }),
    []
  ); 
  
*/


import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import Navigation from './Navigation';
import mainContext from '../context/mainContext';
import firebase from "firebase/auth";
import Firebase from '../Firebase/config';


const AppNavigator = (props) => {
  const navRef = useRef();
  const isAuth = useSelector((state) => !!state.auth.token);
  const auth = Firebase.auth();
  const user = auth.currentUser;

  useEffect(() => {
    if(!isAuth) {
      console.log('NO USER LOGGED')
    }
  })

  if(user) {
    console.log('USER------>', user);
  }

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


import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import Navigation from './Navigation';
import mainContext from '../context/mainContext';

const AppNavigator = (props) => {
  const navRef = useRef();
  const isAuth = useSelector((state) => !!state.auth.token);

  useEffect(() => {
    if (!isAuth) {
      navRef.current.dispatch(
        NavigationActions.navigate({ routeName: 'Auth' })
      );
    }
  }, [isAuth]);

/*   const mainC = useMemo(
    () => ({
      handleGLogin: () => Glogin(),
      signOutUser: () => Firebase.auth().signOut(),
    }),
    []
  ); */


  return <Navigation ref={navRef} />;
};

export default AppNavigator;

import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { NavigationActions } from 'react-navigation'; // navigate outside of the navigator

import ToogetherNavigation from './Navigation';

const NavigationContainer = (props) => {
  // wrapper for ShopNavigation to use redux
  const isAuth = useSelector((state) => !!state.auth.userData);

  const navRef = useRef();

  // TODO: check expired token
  useEffect(() => {
    if (!isAuth) {
      navRef.current.dispatch(
        NavigationActions.navigate({
          routeName: 'Auth',
        })
      );
    }
  }, [isAuth]); // if the isAuth changes, then run the useEffect again

  return <ToogetherNavigation ref={navRef} />;
};

export default NavigationContainer;

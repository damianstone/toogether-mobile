import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  View,
  Image,
  Share,
  Text,
  Platform,
  SafeAreaView,
  Alert,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { withNavigation } from 'react-navigation';
import { StatusBar } from 'expo-status-bar';
import { useSelector, useDispatch } from 'react-redux';
import { verifyLocationPermissions } from '../../utils/permissions';
import { userLocation } from '../../store/actions/user';
import { listSwipe } from '../../store/actions/swipe';
import * as b from '../../constants/block';

import Deck from './Deck';
import HeaderButtom from '../../components/UI/HeaderButton';
import ActivityModal from '../../components/UI/ActivityModal';
import Avatar from '../../components/UI/Avatar';
import SwipeError from '../../components/SwipeError';
import Colors from '../../constants/Colors';
import styles from './styles';

/*
showMode
-1 = error location
0 = not found
1 = all cards swiped
2 = swipe
3= match
*/

const SwipeScreen = (props) => {
  const dispatch = useDispatch();
  const [showMode, setShowMode] = useState(2);
  const [localLoading, setLocalLoading] = useState(false);

  const userLocationReducer = useSelector((state) => state.userLocation);
  const {
    loading: postLocationLoading,
    error: postLocationError,
    success: userProfile,
  } = userLocationReducer;

  const listSwipeReducer = useSelector((state) => state.listSwipe);
  const {
    loading: loadingSwipe,
    error: errorSwipe,
    data: swipe,
  } = listSwipeReducer;

  useEffect(() => {
    const permissionGranted = verifyLocationPermissions();
    if (permissionGranted) {
      dispatch(userLocation());
    } else {
      setShowMode(-1);
      return Alert.alert(
        'Insufficient Permissions!',
        'You need to grant Location permissions to be able to access your location',
        [{ text: 'Okay', onPress: () => verifyLocationPermissions() }]
      );
    }
    if (postLocationError || errorSwipe) {
      setShowMode(-1);
    } else {
      setShowMode(2);
    }
    return null;
  }, [dispatch, postLocationError, errorSwipe]);

  useEffect(() => {
    dispatch(listSwipe());
  }, [dispatch]);

  useEffect(() => {
    if (swipe && swipe.results.length === 0) {
      setShowMode(0);
    }
  }, [swipe?.results]);

  // TODO: fix render when enter the screen

  // add listener to fetch the user and re fetch it
  // useEffect(() => {
  //   const unsubscribe = props.navigation.addListener('didFocus', () => {
  //     reload();
  //   });
  //   return unsubscribe;
  // }, [reload]);

  const reload = useCallback(async () => {
    setLocalLoading(true);
    try {
      await dispatch(userLocation());
      await dispatch(listSwipe());
    } catch (err) {
      console.log(err);
    }
    setLocalLoading(false);

    if (showMode !== 3) {
      setShowMode(2); // show profiles
    }
  }, [dispatch]);

  // pasa como props al deck y del deck al swipecard
  const showProfileHandler = (profile, isGroup) => {
    props.navigation.navigate('SwipeProfile', {
      profile: profile,
      isGroup: isGroup,
    });
  };

  const showMatchHandler = () => {
    props.navigation.navigate('SwipeMatch');
  };

  const onShareApp = async () => {
    try {
      const result = await Share.share({
        message:
          'Toogether App | The app to have fun and meet other students, download it using the following link ;) URL',
      });
      console.log('SHARE RESULT -> ', result);
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // do something
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        // just for IOS
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const renderAllCardSwiped = () => {
    return (
      <SwipeError
        imageUrl={require('../../assets/images/radar.png')}
        title="All cards swiped"
        text="There seems to be no one around you using Toogether. Why not tell them to download it? ;)"
        onPress={onShareApp}
        buttonText="Share this amazing app"
        reload
        onReload={reload}
      />
    );
  };

  const renderNoCardsFound = () => {
    return (
      <SwipeError
        imageUrl={require('../../assets/images/radar.png')}
        title="No Cards found"
        text="There seems to be no one around you using Toogether. Why not tell them to download it? ;)"
        onPress={onShareApp}
        buttonText="Share this amazing app"
        reload
        onReload={reload}
      />
    );
  };

  const renderLocationError = () => {
    return (
      <SwipeError
        imageUrl={require('../../assets/images/radar.png')}
        title="Allow your location"
        text="In order to render profiles and groups around you, we need your location ;)"
        onPress={verifyLocationPermissions}
        buttonText="Enable location service"
      />
    );
  };

  if (loadingSwipe || localLoading) {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar style="light" />
        <View style={styles.screen}>
          <ActivityModal
            loading
            title="Please wait"
            size="small"
            activityColor="white"
            titleColor="white"
            activityWrapperStyle={{
              backgroundColor: 'transparent',
            }}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      <View style={styles.screen}>
        {showMode === -1 && renderLocationError()}

        {showMode === 0 && renderNoCardsFound()}

        {showMode === 1 && renderAllCardSwiped()}
        {(showMode === 2 || showMode === 3) &&
          swipe &&
          swipe.results.length > 0 && (
            <Deck
              swipeProfiles={swipe.results}
              setShowMode={setShowMode}
              showMode={showMode}
              navigation={props.navigation}
              showProfileHandler={showProfileHandler}
              showMatchHandler={showMatchHandler}
            />
          )}
      </View>
    </SafeAreaView>
  );
};

SwipeScreen.navigationOptions = (navData) => {
  return {
    headerTitle: () => (
      <Image
        source={require('../../assets/images/logo-1.png')}
        style={styles.logo}
      />
    ),
    headerLeft: () => (
      <Avatar
        onPress={() => {
          navData.navigation.navigate('MyProfile');
        }}
      />
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButtom}>
        <Item
          title="Chat"
          iconName={
            Platform.OS === 'android'
              ? 'chatbubble-outline'
              : 'chatbubble-outline'
          }
          onPress={() => {
            navData.navigation.navigate('Chat');
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default SwipeScreen;

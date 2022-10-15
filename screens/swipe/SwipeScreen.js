import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  View,
  Image,
  Share,
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
import NewMatch from '../../components/NewMatch';
import SwipeError from '../../components/SwipeError';
import GROUPS from '../../data/dummy-data';
import Colors from '../../constants/Colors';
import styles from './styles';

// TODO: manage render match screen
// TODO: manage render cards not found
// TODO: manage render location error
// TODO: manage render all cards swiped

const SwipeScreen = (props) => {
  const dispatch = useDispatch();
  const swipeTracker = useRef(null);
  const [swipes, setSwipes] = useState([...GROUPS]);
  const [showMode, setShowMode] = useState(0);

  const [localLoading, setLocalLoading] = useState(false);
  const [allCardsSwiped, setAllCardsSwiped] = useState(false);
  const [locationError, setLocationError] = useState(false);

  const userLocationReducer = useSelector((state) => state.userLocation);
  const {
    loading: postLocationLoading,
    error: postLocationError,
    success: postLocationSuccess,
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
      setLocationError(true);
      return Alert.alert(
        'Insufficient Permissions!',
        'You need to grant Location permissions to be able to access your location',
        [{ text: 'Okay', onPress: () => verifyLocationPermissions() }]
      );
    }
    if (postLocationError) {
      setLocationError(true);
    } else {
      setLocationError(false);
    }
    return null;
  }, [dispatch, locationError]);

  useEffect(() => {
    dispatch(listSwipe());
  }, [dispatch]);

  // TODO: fix render when enter the screen

  // add listener to fetch the user and re fetch it
  // useEffect(() => {
  //   const unsubscribe = props.navigation.addListener('didFocus', () => {
  //     console.log('RELOAD SWIPE');
  //       reload();
  //   });
  //   return unsubscribe;
  // }, [props.navigation]);

  const reload = useCallback(async () => {
    setLocalLoading(true);
    try {
      await dispatch(userLocation());
      await dispatch(listSwipe());
    } catch (err) {
      console.log(err);
    }
    setAllCardsSwiped(false);
    setLocalLoading(false);
  }, [dispatch]);
  // pasa como props al deck y del deck al swipecard
  const showProfileHandler = (profile, isGroup) => {
    props.navigation.navigate('SwipeProfile', {
      profile: profile,
      isGroup: isGroup,
    });
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
          // shared with activity type of result.activityType
          // TODO: dispatch list swipes
          console.log('SHARE RESULT -> ', result.activityType);
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        // just for IOS
        // TODO: list swipes
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const renderNewMatch = () => {
    console.log('match');
  };

  const renderAllCardSwiped = () => {
    return (
      <SwipeError
        imageUrl={require('../../assets/images/radar.png')}
        title="Why not? 🤔"
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
        title="Why not? 🤔"
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

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      <View style={styles.screen}>
        {locationError && renderLocationError()}

        {allCardsSwiped && renderAllCardSwiped()}

        {!locationError &&
          swipe &&
          swipe.results.length === 0 &&
          renderNoCardsFound()}

        {loadingSwipe ||
          (localLoading && (
            <ActivityModal
              loading
              title="Please wait"
              size="large"
              activityColor="white"
              titleColor="white"
              activityWrapperStyle={{
                backgroundColor: '#404040',
              }}
            />
          ))}

        {swipe &&
          swipe.results.length > 0 &&
          !locationError &&
          !allCardsSwiped && (
            <Deck
              swipeProfiles={swipe.results}
              setShowMode={setShowMode}
              setAllCardsSwiped={setAllCardsSwiped}
              showMode={showMode}
              renderNewMatch={renderNewMatch}
              showProfileHandler={showProfileHandler}
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
          title="Cart"
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => {
            // go to chat screen
            navData.navigation.navigate('Chat');
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default withNavigation(SwipeScreen);

import React, { useEffect, useState, useCallback } from 'react';
import { View, Share, SafeAreaView, Alert, Linking } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { StatusBar } from 'expo-status-bar';
import { useSelector, useDispatch } from 'react-redux';
import { verifyLocationPermissions } from '../../utils/permissions';
import { getShowMode } from '../../utils/checks';
import { userLocation } from '../../store/actions/user';
import { listSwipe } from '../../store/actions/swipe';

import Deck from './Deck';
import ActivityModal from '../../components/UI/ActivityModal';
import SwipeError from '../../components/SwipeError';
import styles from './styles';

/*
  * show modes:
  -1 = error location
  0 = cards not found
  1 = all cards swiped
  2 = swipe deck
  3 = its a match
*/

const SwipeScreen = (props) => {
  const topProfile = props.route.params?.topProfile;

  const dispatch = useDispatch();
  const [showMode, setShowMode] = useState(2);
  const [localLoading, setLocalLoading] = useState(false);
  const permissionGranted = verifyLocationPermissions();

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
    dispatch(listSwipe());
  }, []);

  useEffect(() => {
    if (permissionGranted) {
      dispatch(userLocation());
    } else {
      setShowMode(-1);
      Alert.alert(
        'Insufficient Permissions!',
        'You need to grant Location permissions to be able to access your location',
        [{ text: 'Okay', onPress: () => verifyLocationPermissions() }]
      );
    }
  }, [dispatch]);

  useEffect(() => {
    if (!loadingSwipe) {
      setShowMode(
        getShowMode(
          showMode,
          swipe,
          errorSwipe,
          topProfile,
          postLocationError,
          permissionGranted
        )
      );
    }
  }, [swipe, loadingSwipe, errorSwipe, topProfile, postLocationError]);

  const reload = useCallback(async () => {
    setLocalLoading(true);
    try {
      await dispatch(userLocation());
      await dispatch(listSwipe());
    } catch (err) {
      console.log(err);
    }
    // reset the top profile so dont show it over and over
    props.navigation.setParams({ topProfile: null });
    setLocalLoading(false);
  }, [dispatch]);

  const showMatchHandler = () => {
    props.navigation.navigate('SwipeMatch');
  };

  const onShareApp = async () => {
    try {
      const result = await Share.share({
        message:
          'Toogether App 🎉 | Find parties around you and meet other students, download it here ;) https://toogether.app/',
      });
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

  const handleFeedbackForm = useCallback(async () => {
    const url = `https://forms.gle/fSgpVLbNAMXtQFyB7`;
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, []);

  const renderAllCardSwiped = () => {
    return (
      <SwipeError
        imageUrl={require('../../assets/images/radar.png')}
        title="All cards swiped"
        text="Complete the following 3 minute form and help us build Toogether ;)"
        onPress={handleFeedbackForm}
        buttonText="Feedback form"
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
        reload
        onReload={reload}
      />
    );
  };

  if (loadingSwipe || localLoading || postLocationLoading) {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar style="light" />
        <View style={styles.screen}>
          <ActivityModal
            loading
            title="Loading"
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

  // console.log('Show mode & results ', showMode, swipe?.results.length);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      <View style={styles.screen}>
        {showMode === -1 && renderLocationError()}

        {showMode === 0 && renderNoCardsFound()}

        {showMode === 1 && renderAllCardSwiped()}

        {(showMode === 2 || showMode === 3) && swipe?.results && (
          <Deck
            swipeProfiles={swipe.results}
            topProfile={topProfile}
            setShowMode={setShowMode}
            showMode={showMode}
            renderAllCardSwiped={renderAllCardSwiped}
            navigation={props.navigation}
            showMatchHandler={showMatchHandler}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default SwipeScreen;

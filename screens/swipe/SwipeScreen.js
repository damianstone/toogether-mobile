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
import { StatusBar } from 'expo-status-bar';
import { useSelector, useDispatch } from 'react-redux';
import { verifyLocationPermissions } from '../../utils/permissions';
import { userLocation } from '../../store/actions/user';
import { listSwipes } from '../../store/actions/swipe';

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

  const [loading, setLoading] = useState(false);
  const [noCards, setNoCards] = useState(false);
  const [allCardsSwiped, setAllCardsSwiped] = useState(false);
  const [locationError, setLocationError] = useState(false);

  const userLocationReducer = useSelector((state) => state.userLocation);
  const {
    loading: loadingLocation,
    error: errorLocation,
    success: successLocation,
  } = userLocationReducer;

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
    return null;
  }, [dispatch, locationError]);

  // add listener to fetch the user and re fetch it
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      loadLocation();
    });
    return unsubscribe;
  }, [loadLocation]);

  const loadLocation = useCallback(async () => {
    setLoading(true);
    try {
      await dispatch(userLocation());
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }, [dispatch]);

  // TODO: why those functions ??--------
  const undoSwipe = (swipeToUndo) => {
    if (!swipeToUndo) {
      return;
    }
    const swipeToUndoId = swipeToUndo.id || swipeToUndo.userID;
    const userID = 'id';

    swipeTracker.current.removeSwipe(swipeToUndoId, userID);
  };

  const onSwipe = (type, swipeItem) => {
    const user = {
      name: 'Damian',
    };
    if (swipeItem) {
      swipeTracker.current.addSwipe(user, swipeItem, type, (response) => {});
    }
  };
  // TODO: ------------------------------

  // pasa como props al deck y del deck al swipecard
  const showProfileHandler = (id) => {
    props.navigation.navigate('Profile', { profileId: id });
  };

  const onShareApp = async () => {
    try {
      const result = await Share.share({
        message:
          'Toogether App | The app to have fun and meet other students, download it using the following link ;) URL',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          // TODO: dispatch list swipes
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

  // TODO: create a button to reload and fetch profiles
  const renderAllCardSwiped = () => {
    return (
      <SwipeError
        imageUrl={require('../../assets/images/radar.png')}
        title="Why not? 🤔"
        text="There seems to be no one around you using Toogether. Why not tell them to download it? ;)"
        onPress={onShareApp}
        buttonText="Share this amazing app"
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
        {noCards && !locationError && renderNoCardsFound()}
        {swipes.length > 0 && !locationError && !noCards && !allCardsSwiped && (
          <Deck
            swipeProfiles={swipes}
            setShowMode={setShowMode}
            setAllCardsSwiped={setAllCardsSwiped}
            onUndoSwipe={undoSwipe}
            onSwipe={onSwipe}
            showMode={showMode}
            renderNewMatch={renderNewMatch}
            showProfileHandler={showProfileHandler}
          />
        )}
        {swipes.length === 0 && loading && (
          <ActivityModal
            loading={swipes.length === 0}
            title="Please wait"
            size="large"
            activityColor="white"
            titleColor="white"
            activityWrapperStyle={{
              backgroundColor: '#404040',
            }}
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

export default SwipeScreen;

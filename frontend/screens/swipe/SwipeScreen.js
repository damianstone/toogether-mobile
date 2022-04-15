import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  View,
  Image,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  Text,
  AppState,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { StatusBar } from 'expo-status-bar';
import { useSelector, useDispatch, ReactReduxContext } from 'react-redux';

import styles from './styles';
import SwipeButtons from '../../components/SwipeButtons';
import Deck from './Deck';
import HeaderButtom from '../../components/UI/HeaderButton';
import NoMoreCards from './NoMoreCards';
import ActivityModal from '../../components/UI/ActivityModal';
import NewMatch from './NewMatch';

/* 
Toda la logica del swipe 

recibe todos los datos que vienen desde el backend 

distribuye los datos al deck para el swipe 

renderiza newMatchprofile y noMoreProfiles si es que el deck llama estas funciones


*/

const SwipeScreen = (props) => {
  // GET DATA FROM REDUCERS
  const groups = useSelector((state) => state.groups.groups);
  const user = useSelector((state) => state.groups.groups);

  // STATE
  const [swipes, setSwipes] = useState([]);
  const [showMode, setShowMode] = useState(0);
  const [currentMatchData, setCurrentMatchData] = useState(null);
  const [appState, setAppState] = useState(AppState.currentState);
  const [positionWatchID, setPositionWatchID] = useState(null);
  const [userSettingsDidChange, setUserSettingsDidChange] = useState(false);
  const [hasValidatedCurrentProfile, setHasValidatedCurrentProfile] =
    useState(false);

  // REF
  const swipeRef = useRef(null);

  const dispatch = useDispatch();

  // USE EFFECTS
  useEffect(() => {
    setSwipes(groups);
  }, []);

  const handleNewMatchButtonTap = (nextScreen) => {
    setShowMode(0);
    setCurrentMatchData(null);

    if (nextScreen) {
      props.navigation.navigate(nextScreen);
    }
  };

  const undoSwipe = (swipeToUndo) => {
    if (!swipeToUndo) {
      return;
    }

    const swipeToUndoId = swipeToUndo.id || swipeToUndo.userID;
    const userID = user.id || user.userID;

    swipeTracker.current.removeSwipe(swipeToUndoId, userID);
  };

  const onSwipe = (type, swipeItem) => {
    if (swipeItem) {
      swipeTracker.current.addSwipe(user, swipeItem, type, (response) => {});
    }
  };

  const onAllCardsSwiped = () => {
    // empty swipes
    setSwipes([]);
  };

  // pasa como props al deck y del deck al swipecard
  const showProfileHandler = (id) => {
    props.navigation.navigate('Profile', { profileId: id });
  };

  const renderEmptyState = () => {
    return <NoMoreCards />;
  };

  const renderNewMatch = () => {
    return (
      <NewMatch
        url={currentMatchData.profilePictureURL}
        onSendMessage={() => handleNewMatchButtonTap('Conversations')}
        onKeepSwiping={() => handleNewMatchButtonTap(null)}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      <View style={styles.screen}>
        {swipes.length > 0 && (
          <Deck
            data={swipes}
            setShowMode={setShowMode}
            onUndoSwipe={undoSwipe}
            onSwipe={onSwipe}
            showMode={showMode}
            onAllCardsSwiped={onAllCardsSwiped}
            renderEmptyState={renderEmptyState}
            renderNewMatch={renderNewMatch}
            showProfileHandler={showProfileHandler}
          />
        )}
        {swipes.length === 0 && renderEmptyState()}
        {swipes.length === 3478957349 && (
          <ActivityModal
            loading={swipes.length === 0}
            title={'Please wait'}
            size={'large'}
            activityColor={'white'}
            titleColor={'white'}
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
      <TouchableOpacity
        style={styles.imgContainer}
        onPress={() => {
          navData.navigation.navigate('MyProfile');
        }}>
        <Image
          source={require('../../assets/images/Profiles/user.jpeg')}
          style={styles.img}
        />
      </TouchableOpacity>
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

import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { StatusBar } from 'expo-status-bar';
import { useSelector, useDispatch, ReactReduxContext } from 'react-redux';

import styles from './styles';
import Deck from './Deck';
import HeaderButtom from '../../components/UI/HeaderButton';
import NoMoreCards from '../../components/NoMoreCards';
import ActivityModal from '../../components/UI/ActivityModal';
import NewMatch from '../../components/NewMatch';
import { listSwipes } from '../../store/actions/swipe';

import axios from 'axios';

/* 
Toda la logica del swipe 

recibe todos los datos que vienen desde el backend 

distribuye los datos al deck para el swipe 

renderiza newMatchprofile y noMoreProfiles si es que el deck llama estas funciones

ERRORS
render no cards screen 
Loading while fetching data from the state

*/

const SwipeScreen = (props) => {
  // STATE
  const [swipes, setSwipes] = useState([]);
  const [showMode, setShowMode] = useState(0);
  const [currentMatchData, setCurrentMatchData] = useState(null);

  const [loading, setLoading] = useState(false);
  const [noCards, setNoCards] = useState(false);

  // GET DATA FROM REDUCERS

  const dispatch = useDispatch();

  // USE EFFECTS
  useEffect(() => {
    setLoading(true);
    const fetchProd = async () => {
      // no write the entire url because the other part of the url is in proxy packajge.json
      const { data } = await axios.get('http://127.0.0.1:8000/api/profles/');
      setSwipes(data);
    };
    fetchProd();
    setLoading(false);
  }, []);

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
    setNoCards(true);
    return <NoMoreCards />;
  };

  // pasa como props al deck y del deck al swipecard
  const showProfileHandler = (id) => {
    props.navigation.navigate('Profile', { profileId: id });
  };

  const renderEmptyState = () => {
    setNoCards(true);
    return <NoMoreCards />;
  };

  const renderNewMatch = () => {
    return <NewMatch url={currentMatchData.profilePictureURL} />;
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      <View style={styles.screen}>
        {swipes.length > 0 && (
          <Deck
            swipeProfiles={swipes}
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
        {swipes.length === 0 && loading && (
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
        {noCards === true && renderEmptyState()}
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
        }}
      >
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

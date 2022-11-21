import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Dimensions, Alert, Text } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'tailwind-rn';
import { like } from '../../store/actions/swipe';

import SwipeCard from '../../components/SwipeCard';
import SwipeButtons from '../../components/SwipeButtons';
import Colors from '../../constants/Colors';
import * as r from '../../constants/responses/match';
import * as w from '../../constants/swipe';
import styles from './styles';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

// error: cuando cambio el estado a showMatch true no aparece el pop y tengo que hacer un manual
//reload para que funcione

const Deck = (props) => {
  const { swipeProfiles, showProfileHandler, setShowMode, topProfile } = props;
  const dispatch = useDispatch();
  const swipeRef = useRef();
  const currentDeckIndex = useRef(0);
  const [userData, setUserData] = useState({});

  const likeReducer = useSelector((state) => state.like);
  const {
    loading: likeLoading,
    error: likeError,
    data: likeData,
  } = likeReducer;

  const getAsyncData = async () => {
    try {
      const user = JSON.parse(await AsyncStorage.getItem('@userData'));

      if (user !== null) {
        setUserData(user);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAsyncData();
  }, []);

  useEffect(() => {
    if (likeError) {
      Alert.alert('Like error');
      dispatch({ type: w.LIKE_PROFILE_RESET });
    }
  }, [dispatch, likeError]);

  useEffect(() => {
    if (
      likeData?.details === r.NEW_MATCH ||
      likeData?.details === r.SAME_MATCH
    ) {
      props.navigation.navigate('SwipeMatch', {
        likeData: likeData,
        userData: userData,
      });
    } else {
      dispatch({ type: w.LIKE_PROFILE_RESET });
    }
  }, [dispatch, likeData?.details]);

  const getRandomMember = (members) => {
    return members[Math.floor(Math.random() * members.length)];
  };

  // Swiper actions
  const handleLike = async (index) => {
    // liked profile can be a group or a single member
    const likedProfile = swipeProfiles[index];

    if ('members' in likedProfile) {
      // its a group profile
      const randomMember = getRandomMember(likedProfile.members);
      console.log('RANDOM MEMBER -> ', randomMember);
      await dispatch(like(randomMember.id));
      console.log('LIKE DATA GROUP -> ', likeData, likeLoading);
    } else {
      // console.log('LIKED PROFILE -> ', likedProfile);
      await dispatch(like(likedProfile.id));
      console.log('LIKE DATA -> ', likeData, likeLoading);
    }

    currentDeckIndex.current = index;
  };

  const handleDislike = (index) => {
    currentDeckIndex.current = index;
  };

  // Buttons actions
  const onLikePressed = () => {
    // swipeLeft() function activates the onLike function
    swipeRef.current.swipeLeft();
  };

  const onDislikePressed = () => {
    swipeRef.current.swipeRight();
  };

  const onRewindPressed = () => {
    swipeRef.current.swipeBack((index) => {
      // const prevDeckItem = swipeProfiles[index - 1];
      currentDeckIndex.current = index;
    });
  };

  const allCardsSwiped = () => {
    setShowMode(1);
  };

  // sawp the positions of elements 
  const swapElement = (from, to, arr) => {
    const newArr = [...arr];

    const item = newArr.splice(from, 1)[0];
    newArr.splice(to, 0, item);

    return newArr;
  };

  const putOnTopCard = (topCard, swipes) => {
    // get the index of the topCard and change it to the top
    const toIndex = 0;
    const fromIndex = swipes.findIndex((elem) => elem.id === topCard.id);
    if (fromIndex !== -1) {
      const newSwipes = swapElement(fromIndex, toIndex, swipes);
      return newSwipes;
    }
    return [topCard, ...swipes];
  };

  // render a card with the profiles (single and group)
  const renderCard = (profile) => {
    console.log("profile", profile?.id)
    if (typeof profile === 'object') {
      return (
        <SwipeCard
          key={profile.id}
          isGroup={profile.hasOwnProperty('members')}
          profile={profile}
          showProfileHandler={showProfileHandler}
        />
      );
    }
    return null;
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.swipeContainer}>
        <Swiper
          containerStyle={tw('bg-transparent')}
          cards={
            topProfile ? putOnTopCard(topProfile, swipeProfiles) : swipeProfiles
          }
          ref={swipeRef}
          renderCard={renderCard}
          stackSize={2}
          cardIndex={0}
          verticalSwipe
          infinite={false}
          stackAnimationFriction={10}
          showSecondCard
          animateCardOpacity
          animateOverlayLabelsOpacity
          swipeBackCard
          overlayLabels={{
            left: {
              title: 'DISLIKE',
              style: {
                label: {
                  textAlign: 'right',
                  color: Colors.red,
                  fontSize: 30,
                },
              },
            },
            right: {
              title: 'LIKE',
              style: {
                label: {
                  textAlign: 'left',
                  color: Colors.calypso,
                  fontSize: 30,
                },
              },
            },
          }}
          onSwipedLeft={handleDislike}
          onSwipedRight={handleLike}
          onSwipedTop={handleLike}
          onSwipedBottom={handleDislike}
          onSwipedAll={allCardsSwiped}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <SwipeButtons
          rewind
          onLeft={onLikePressed}
          onRight={onDislikePressed}
          onRewind={onRewindPressed}
        />
      </View>
    </View>
  );
};

export default Deck;

import React, { useState, useEffect, useRef } from 'react';
import { View, Dimensions, Alert } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'tailwind-rn';
import { like } from '../../store/actions/swipe';
import { exist } from '../../utils/checks';

import SwipeCard from '../../components/SwipeCard';
import SwipeButtons from '../../components/SwipeButtons';
import Colors from '../../constants/Colors';
import * as r from '../../constants/responses/match';
import * as w from '../../constants/requestTypes/swipe';
import styles from './styles';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const Deck = (props) => {
  const { navigation, swipeProfiles, setShowMode, topProfile } = props;
  const dispatch = useDispatch();
  const swipeRef = useRef();
  const currentDeckIndex = useRef(0);
  const [userData, setUserData] = useState({});
  const [swipeCards, setSwipeCards] = useState([...swipeProfiles]);

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

  const showProfileHandler = (profile, isGroup) => {
    navigation.navigate('ProfileModal', {
      profile: profile,
      isGroup: isGroup,
      currentRef: swipeRef.current,
    });
  };

  // * Swiper actions (swipe to the left / right)
  const handleLike = async (index) => {
    // liked profile can be a group or a single member
    const likedProfile = swipeCards[index];

    if ('members' in likedProfile) {
      // its a group profile
      const randomMember = getRandomMember(likedProfile.members);
      await dispatch(like(randomMember.id));
    } else {
      await dispatch(like(likedProfile.id));
    }

    currentDeckIndex.current = index;
  };

  const handleDislike = (index) => {
    currentDeckIndex.current = index;
  };

  // * Buttons actions
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

  // * Handle put card on the top of the stack
  const swapElement = (from, to, arr) => {
    const newArr = [...arr];

    const item = newArr.splice(from, 1)[0];
    newArr.splice(to, 0, item);

    return newArr;
  };

  const putOnTopCard = (topCard, swipeCards) => {
    // get the index of the topCard and change it to the top
    const toIndex = 0;
    const fromIndex = swipeCards.findIndex((elem) => elem.id === topCard.id);

    // if the profile is already in the fetched swipes, then we need to swap positions
    if (fromIndex !== -1) {
      const newSwipes = swapElement(fromIndex, toIndex, swipeCards);
      return newSwipes;
    }

    setSwipeCards([topCard, ...swipeCards]);

    return [topCard, ...swipeCards];
  };

  // render a card with the profiles (single and group)
  const renderCard = (profile, cardIndex) => {
    if (exist(profile)) {
      return (
        <SwipeCard
          key={profile.id}
          isGroup={exist(profile.members)}
          members={exist(profile.members) ? profile.members : null}
          profile={profile}
          showProfileHandler={showProfileHandler}
          showProfileRestricted={false}
          allowedProfileId={null}
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
          cards={topProfile ? putOnTopCard(topProfile, swipeCards) : swipeCards}
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

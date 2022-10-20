import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Dimensions, Alert, Text } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'tailwind-rn';
import { like } from '../../store/actions/swipe';

import SwipeCard from '../../components/SwipeCard';
import SwipeButtons from '../../components/SwipeButtons';
import SwipeMatch from '../../components/SwipeMatch';
import Colors from '../../constants/Colors';
import * as r from '../../constants/responses/match';
import * as w from '../../constants/swipe';
import styles from './styles';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

// TODO: error: cuando cambio el estado a showMatch true no aparece el pop y tengo que hacer un manual reload para que funcione

const Deck = (props) => {
  const dispatch = useDispatch();
  const swipeRef = useRef();
  const currentDeckIndex = useRef(0);
  const [userData, setUserData] = useState({});
  const [showMatch, setShowMatch] = useState(false);

  const {
    swipeProfiles,
    showProfileHandler,
    showMatchHandler,
    setShowMode,
    showMode,
  } = props;

  const userGetProfile = useSelector((state) => state.userGetProfile);
  const { data: userProfile } = userGetProfile;

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
      // setShowMode(3);
      console.log('USER DATA -> ', userData);
      props.navigation.navigate('SwipeMatch', {
        likeData: likeData,
        userData: userData,
      });
    } else {
      dispatch({ type: w.LIKE_PROFILE_RESET });
      setShowMode(2);
    }
  }, [dispatch, likeData?.details, likeData]);

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
      // console.log('RANDOM MEMBER -> ', randomMember);
      await dispatch(like(randomMember.id));
      console.log('LIKE DATA -> ', likeData, likeLoading);
    } else {
      // console.log('LIKED PROFILE -> ', likedProfile);
      await dispatch(like(likedProfile.id));
      console.log('LIKE DATA -> ', likeData, likeLoading);
    }

    if (
      likeData?.details === r.NEW_MATCH ||
      likeData?.details === r.SAME_MATCH
    ) {
      setShowMode(3);
      // return showMatchHandler();
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
    if (!likeData && !likeLoading) {
      setShowMode(1);
    }
  };
  // -------------------------------------MATCH SECTION ----------------------------------
  // // Match actions
  // const handleCloseMatch = () => {
  //   setShowMode(2);
  //   dispatch({ type: w.LIKE_PROFILE_RESET });
  // };

  // const getCurrentProfile = (matchData, currentProfile) => {
  //   if (matchData?.profile1.id === currentProfile?.id) {
  //     return matchData.profile1;
  //   }
  //   return matchData?.profile2;
  // };

  // const getMatchedProfile = (matchData, currentProfile) => {
  //   if (matchData?.profile1.id === currentProfile?.id) {
  //     return matchData.profile2;
  //   }
  //   return matchData?.profile1;
  // };

  // const getMatchedType = (type) => {
  //   switch (type) {
  //     case r.NEITHER:
  //       return {
  //         current: 'Profile',
  //         matched: 'Profile',
  //       };
  //     case r.BOTH:
  //       return {
  //         current: 'Group',
  //         matched: 'Group',
  //       };
  //     case r.LIKED:
  //       return {
  //         current: 'Profile',
  //         matched: 'Group',
  //       };
  //     case r.CURRENT:
  //       return {
  //         current: 'Group',
  //         matched: 'Profile',
  //       };
  //     default:
  //       return {
  //         current: 'Profile',
  //         matched: 'Profile',
  //       };
  //   }
  // };

  // const getMatchData = (data) => {
  //   const matchedProfile = getMatchedProfile(data?.match_data, userProfile);
  //   const currentProfile = getCurrentProfile(data?.match_data, userProfile);
  //   const matchType = getMatchedType(data?.group_match);

  //   switch (data.details) {
  //     case r.NEW_MATCH:
  //       return {
  //         matchId: data.match_data.id,
  //         title: 'NEW MATCH!!',
  //         curretProfileImage: currentProfile.photos[0].image,
  //         matchedProfileImage: matchedProfile.photos[0].image,
  //         currentProfileName: currentProfile.firstname,
  //         matchedProfileName: matchedProfile.firstname,
  //         currentType: matchType.current,
  //         matchedType: matchType.matched,
  //         chatButtonText: `Send message to ${matchedProfile.firstname}`,
  //       };
  //     case r.SAME_MATCH:
  //       return {
  //         matchId: data.match_data.id,
  //         title: 'MATCH!!',
  //         curretProfileImage: currentProfile.photos[0].image,
  //         matchedProfileImage: matchedProfile.photos[0].image,
  //         currentProfileName: currentProfile.firstname,
  //         matchedProfileName: matchedProfile.firstname,
  //         currentType: matchType.current,
  //         matchedType: matchType.matched,
  //         chatButtonText: `Send message to ${matchedProfile.firstname}`,
  //       };
  //     default:
  //       return null;
  //   }
  // };

  // // render match
  // const renderMatch = () => {
  //   if (!likeData) {
  //     return null;
  //   }
  //   const matchData = getMatchData(likeData);
  //   return (
  //     <SwipeMatch
  //       visible={showMode === 3}
  //       title={matchData.title}
  //       currentProfileImage={matchData.curretProfileImage}
  //       matchedProfileImage={matchData.matchedProfileImage}
  //       currentProfileName={matchData.currentProfileName}
  //       matchedProfileName={matchData.matchedProfileName}
  //       currentType={matchData.currentType}
  //       matchedType={matchData.matchedType}
  //       chatButtonText={matchData.chatButtonText}
  //       chatOnPress={() => console.log('go to chat')}
  //       laterOnPress={handleCloseMatch}
  //     />
  //   );
  // };

  // render a card with the profiles (single and group)
  const renderCard = (profile) => {
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
          cards={swipeProfiles}
          ref={swipeRef}
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
          renderCard={renderCard}
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

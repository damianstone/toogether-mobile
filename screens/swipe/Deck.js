import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Dimensions,
  Modal,
  Alert,
  Text,
  TouchableOpacity,
  Button,
} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'tailwind-rn';
import { like } from '../../store/actions/swipe';

import SwipeCard from '../../components/SwipeCard';
import SwipeButtons from '../../components/SwipeButtons';
import SwipeMatch from '../../components/SwipeMatch';
import Colors from '../../constants/Colors';
import * as Response from '../../constants/responses/match';
import * as w from '../../constants/swipe';
import styles from './styles';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const Deck = (props) => {
  const dispatch = useDispatch();
  const swipeRef = useRef();
  const currentDeckIndex = useRef(0);
  const [itsMatch, setItsMatch] = useState(true);

  const { swipeProfiles, setAllCardsSwiped, showProfileHandler } = props;

  const userGetProfile = useSelector((state) => state.userGetProfile);
  const { data: userProfile } = userGetProfile;

  const likeReducer = useSelector((state) => state.like);
  const {
    loading: likeLoading,
    error: likeError,
    data: likeData,
  } = likeReducer;

  useEffect(() => {
    if (likeError) {
      Alert.alert('Like error');
      dispatch({ type: w.LIKE_PROFILE_RESET });
    }
    if (likeData) {
      if (
        likeData.details === Response.NEW_MATCH ||
        likeData.details === Response.SAME_MATCH
      ) {
        setItsMatch(true);
      }
      console.log('LIKE DATA -> ', { ...likeData });
    }
  }, [likeError]);

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
    } else {
      // console.log('LIKED PROFILE -> ', likedProfile);
      await dispatch(like(likedProfile.id));
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

  const handleCloseMatch = async () => {
    await dispatch({ type: w.LIKE_PROFILE_RESET });
    setItsMatch(false);
  };

  const getCurrentProfile = (matchData, currentProfile) => {
    if (matchData?.profile1.id === currentProfile?.id) {
      return matchData.profile1;
    }
    return matchData?.profile2;
  };

  const getMatchedProfile = (matchData, currentProfile) => {
    if (matchData?.profile1.id === currentProfile?.id) {
      return matchData.profile2;
    }
    return matchData?.profile1;
  };

  const getMatchedType = (type) => {
    switch (type) {
      case Response.NEITHER:
        return {
          current: 'Profile',
          matched: 'Profile',
        };
      case Response.BOTH:
        return {
          current: 'Group',
          matched: 'Group',
        };
      case Response.LIKED:
        return {
          current: 'Profile',
          matched: 'Group',
        };
      case Response.CURRENT:
        return {
          current: 'Group',
          matched: 'Profile',
        };
      default:
        return {
          current: 'Profile',
          matched: 'Profile',
        };
    }
  };

  const getMatchData = (data) => {
    const matchedProfile = getMatchedProfile(data.match_data, userProfile);
    const currentProfile = getCurrentProfile(data.match_data, userProfile);
    const matchType = getMatchedType(data.group_match);

    switch (data.details) {
      case Response.NEW_MATCH:
        return {
          matchId: data.match_data.id,
          title: 'NEW MATCH!!',
          curretProfileImage: currentProfile.photos[0].image,
          matchedProfileImage: matchedProfile.photos[0].image,
          currentProfileName: currentProfile.firstname,
          matchedProfileName: matchedProfile.firstname,
          currentType: matchType.current,
          matchedType: matchType.matched,
          chatButtonText: `Send message to ${matchedProfile.firstname}`,
        };
      case Response.SAME_MATCH:
        return {
          matchId: data.match_data.id,
          title: 'MATCH!!',
          curretProfileImage: currentProfile.photos[0].image,
          matchedProfileImage: matchedProfile.photos[0].image,
          currentProfileName: currentProfile.firstname,
          matchedProfileName: matchedProfile.firstname,
          currentType: matchType.current,
          matchedType: matchType.matched,
          chatButtonText: `Send message to ${matchedProfile.firstname}`,
        };
      default:
        return null;
    }
  };

  // render a card with the profiles (single and group)
  const renderCard = (profile) => {
    return (
      <SwipeCard
        key={profile.id}
        isGroup={'members' in profile}
        profile={profile}
        showProfileHandler={showProfileHandler}
      />
    );
  };

  const renderMatch = () => {
    if (likeData && likeData.details) {
      const matchData = getMatchData(likeData);
      return (
        <SwipeMatch
          visible={itsMatch}
          title={matchData.title}
          currentProfileImage={matchData.curretProfileImage}
          matchedProfileImage={matchData.matchedProfileImage}
          currentProfileName={matchData.currentProfileName}
          matchedProfileName={matchData.matchedProfileName}
          currentType={matchData.currentType}
          matchedType={matchData.matchedType}
          chatButtonText={matchData.chatButtonText}
          chatOnPress={() => console.log('go to chat')}
          laterOnPress={handleCloseMatch}
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
                  fontSize: 25,
                },
              },
            },
            right: {
              title: 'LIKE',
              style: {
                label: {
                  textAlign: 'left',
                  color: Colors.calypso,
                  fontSize: 25,
                },
              },
            },
          }}
          onSwipedLeft={handleDislike}
          onSwipedRight={handleLike}
          onSwipedTop={handleLike}
          onSwipedBottom={handleDislike}
          renderCard={renderCard}
          onSwipedAll={() => {
            setAllCardsSwiped(true);
          }}
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
      {itsMatch && renderMatch()}
    </View>
  );
};

export default Deck;

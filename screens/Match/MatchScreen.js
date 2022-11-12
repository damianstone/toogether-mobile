import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as r from '../../constants/responses/match';
import * as w from '../../constants/swipe';
import SwipeMatch from '../../components/SwipeMatch';

const MatchScreen = (props) => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({});
  const likeData = props.navigation.getParam('likeData');

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
  const handleCloseMatch = () => {
    dispatch({ type: w.LIKE_PROFILE_RESET });
    props.navigation.goBack(null);
  };

  const getCurrentProfile = (matchData) => {
    if (matchData.profile1.id === userData.id) {
      return matchData.profile1;
    }
    return matchData?.profile2;
  };

  const getMatchedProfile = (matchData) => {
    if (matchData.profile1.id === userData.id) {
      return matchData.profile2;
    }
    return matchData?.profile1;
  };

  const getMatchedType = (type) => {
    switch (type) {
      case r.NEITHER:
        return {
          current: 'Profile',
          matched: 'Profile',
        };
      case r.BOTH:
        return {
          current: 'Group',
          matched: 'Group',
        };
      case r.LIKED:
        return {
          current: 'Profile',
          matched: 'Group',
        };
      case r.CURRENT:
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
    const matchedProfile = getMatchedProfile(data?.match_data);
    const currentProfile = getCurrentProfile(data?.match_data);
    const matchType = getMatchedType(data?.group_match);

    console.log('CURRENT -> ', currentProfile);

    switch (data.details) {
      case r.NEW_MATCH:
        return {
          matchId: data.match_data.id,
          title: 'NEW MATCH!!',
          currentProfileImage: currentProfile.photos[0].image,
          matchedProfileImage: matchedProfile.photos[0].image,
          currentProfileName: currentProfile.name,
          matchedProfileName: matchedProfile.name,
          currentType: matchType.current,
          matchedType: matchType.matched,
          chatButtonText: `Send message to ${matchedProfile.name}`,
        };
      case r.SAME_MATCH:
        return {
          matchId: data.match_data.id,
          title: 'MATCH!!',
          currentProfileImage: currentProfile.photos[0].image,
          matchedProfileImage: matchedProfile.photos[0].image,
          currentProfileName: currentProfile.name,
          matchedProfileName: matchedProfile.name,
          currentType: matchType.current,
          matchedType: matchType.matched,
          chatButtonText: `Send message to ${matchedProfile.name}`,
        };
      default:
        return null;
    }
  };

  return (
    <SwipeMatch
      matchData={getMatchData(likeData)}
      chatOnPress={() => console.log('chat')}
      laterOnPress={handleCloseMatch}
    />
  );
};

export default MatchScreen;

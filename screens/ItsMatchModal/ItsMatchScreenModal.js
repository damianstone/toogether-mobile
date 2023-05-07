import React from 'react';
import { useDispatch } from 'react-redux';
import { exist } from '../../utils/checks';

import * as r from '../../constants/responses/match';
import * as w from '../../constants/requestTypes/swipe';
import SwipeMatch from '../../components/SwipeMatch';

const ItsMatchScreenModal = (props) => {
  const { likeData } = props.route.params;
  const dispatch = useDispatch();

  const handleGoToMatches = () => {
    props.navigation.goBack(null);
    props.navigation.navigate('Match');
  };

  const handleCloseMatch = () => {
    dispatch({ type: w.LIKE_PROFILE_RESET });
    props.navigation.goBack(null);
  };

  const getProfileImage = (profile) => {
    if (exist(profile.photos[0])) {
      return profile.photos[0].image;
    }
    return null;
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
    const matchedProfile = data?.match_data.matched_data.matched_profile;
    const currentProfile = data?.match_data.current_profile;
    const matchType = getMatchedType(data?.group_match);

    switch (data.details) {
      case r.NEW_MATCH:
        return {
          matchId: data.match_data.id,
          title: 'NEW MATCH!!',
          currentProfileImage: getProfileImage(currentProfile),
          matchedProfileImage: getProfileImage(matchedProfile),
          currentProfileName: currentProfile.name,
          matchedProfileName: matchedProfile.name,
          currentType: matchType.current,
          matchedType: matchType.matched,
          matchedInstagram: matchedProfile.instagram,
          chatButtonText: `Send message to ${matchedProfile.name}`,
        };
      case r.SAME_MATCH:
        return {
          matchId: data.match_data.id,
          title: 'MATCH!!',
          currentProfileImage: getProfileImage(currentProfile),
          matchedProfileImage: getProfileImage(matchedProfile),
          currentProfileName: currentProfile.name,
          matchedProfileName: matchedProfile.name,
          currentType: matchType.current,
          matchedType: matchType.matched,
          matchedInstagram: matchedProfile.instagram,
          chatButtonText: `Send message to ${matchedProfile.name}`,
        };
      default:
        return null;
    }
  };

  return (
    <SwipeMatch
      matchData={getMatchData(likeData)}
      chatOnPress={handleGoToMatches}
      laterOnPress={handleCloseMatch}
    />
  );
};

export default ItsMatchScreenModal;

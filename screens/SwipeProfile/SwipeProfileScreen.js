import React, { useEffect } from 'react';
import { StyleSheet, Alert, Platform, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import { exist, checkMemberInGroup } from '../../utils/checks';
import { getSwipeProfile } from '../../store/actions/swipe';

import ActivityModal from '../../components/UI/ActivityModal';
import HeaderButtom from '../../components/UI/HeaderButton';
import Loader from '../../components/UI/Loader';
import SwipeCard from '../../components/SwipeCard';
import Colors from '../../constants/Colors';
import * as w from '../../constants/swipe';

// TODO: manage errors

const SwipeProfileScreen = (props) => {
  const dispatch = useDispatch();
  const mainProfileId = props.navigation.getParam('mainProfileId');
  const isInGroup = props.navigation.getParam('isInGroup');
  const isMyProfile = props.navigation.getParam('isMyProfile');

  const currentSwipeProfile = useSelector((state) => state.getSwipeProfile);

  const {
    loading: loadingSwipeProfile,
    error: errorSwipeProfile,
    data: swipeProfile,
  } = currentSwipeProfile;

  // how can I render something if and only if this is already executed
  useEffect(() => {
    dispatch(getSwipeProfile(mainProfileId));
  }, [mainProfileId]);

  useEffect(() => {
    if (errorSwipeProfile) {
      Alert.alert(`Someting went wrong`, 'Your profile could not be loaded', [
        {
          text: 'OK',
          onPress: () => {
            dispatch({ type: w.GET_SWIPE_PROFILE_RESET });
            props.navigation.goBack();
          },
        },
      ]);
    }
  }, [dispatch, errorSwipeProfile]);

  const showProfile = (profile, isGroup) => {
    if (profile.id === mainProfileId) {
      props.navigation.navigate('ProfileModal', {
        profile: profile,
        isGroup: isGroup,
        preview: true,
        isMyProfile: isMyProfile,
      });
    }
  };

  // swap the positions of elements
  const swapElement = (from, to, arr) => {
    const newArr = [...arr];

    const item = newArr.splice(from, 1)[0];
    newArr.splice(to, 0, item);

    return newArr;
  };

  const putOnTopCard = (topCardId, members) => {
    // get the index of the topCard and change it to the top
    const toIndex = 0;
    const fromIndex = members.findIndex((elem) => elem.id === topCardId);

    // if the profile exists in members, return the new ordered array
    if (fromIndex !== -1) {
      const newSwipes = swapElement(fromIndex, toIndex, members);
      return newSwipes;
    }

    return false;
  };

  const getOrderedMembers = () => {
    const orderedMembers = putOnTopCard(mainProfileId, swipeProfile.members);
    return orderedMembers;
  };

  // To prevent rendering the old state profile
  const checksBeforeRender = () => {
    if (!swipeProfile) {
      return false;
    }

    if (swipeProfile.id === mainProfileId) {
      return true;
    }

    if (
      isInGroup &&
      swipeProfile.members &&
      checkMemberInGroup(mainProfileId, swipeProfile.members)
    ) {
      return true;
    }

    return false;
  };

  if (loadingSwipeProfile) {
    <ActivityModal
      loading
      title="Please wait"
      size="large"
      activityColor="white"
      titleColor="white"
      activityWrapperStyle={{
        backgroundColor: Colors.bg,
      }}
    />;
  }

  if (!mainProfileId) {
    return (
      <View style={styles.screen}>
        <View
          style={{
            position: 'absolute',
            width: '95%',
            height: '80%',
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.bgCard,
            opacity: 0.5,
          }}>
          <Loader />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={{ width: '95%', height: '105%', padding: 15 }}>
        {checksBeforeRender() ? (
          <SwipeCard
            key={swipeProfile.id}
            isGroup={isInGroup}
            members={exist(swipeProfile.members) ? getOrderedMembers() : null}
            profile={swipeProfile}
            showProfileHandler={showProfile}
            showProfileRestricted
            allowedProfileId={mainProfileId}
          />
        ) : (
          <Loader />
        )}
      </View>
    </View>
  );
};

SwipeProfileScreen.navigationOptions = (navData) => {
  return {
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButtom}>
        <Item
          iconName={
            Platform.OS === 'android' ? 'ios-arrow-back' : 'ios-arrow-back'
          }
          onPress={() => {
            navData.navigation.pop();
          }}
          title="Back arrow"
        />
      </HeaderButtons>
    ),
  };
};

export default SwipeProfileScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.bg,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  card: {
    flex: 1,
  },
  groupName: {
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 2,
    backgroundColor: Colors.orange,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  text: {
    fontSize: 13,
    fontWeight: 'bold',
    color: Colors.white,
  },
  arrowContainer: {
    width: 50,
    height: 50,
    borderRadius: 100,

    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginVertical: 15,
    marginHorizontal: 15,
    padding: 10,
  },
});

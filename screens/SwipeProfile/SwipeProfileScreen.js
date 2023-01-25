import React, { useState, useEffect } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  Alert,
  Platform,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import Swiper from 'react-native-swiper';
import Constants from 'expo-constants';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentSwipeProfile } from '../../store/actions/swipe';

import ActivityModal from '../../components/UI/ActivityModal';
import HeaderButtom from '../../components/UI/HeaderButton';
import Loader from '../../components/UI/Loader';
import InfoCard from '../../components/InfoCard';
import Colors from '../../constants/Colors';

const SwipeProfileScreen = (props) => {
  const dispatch = useDispatch();

  const currentProfileId = useSelector(
    (state) => state.userGetProfile?.data?.id
  );

  const currentSwipeProfile = useSelector(
    (state) => state.getCurrentSwipeProfile
  );

  const {
    loading: loadingSwipeProfile,
    error: errorSwipeProfile,
    data: swipeProfile,
  } = currentSwipeProfile;

  useEffect(() => {
    dispatch(getCurrentSwipeProfile());
  }, [dispatch]);

  useEffect(() => {
    if (errorSwipeProfile) {
      Alert.alert(`Someting went wrong`, 'Your profile could not be loaded', [
        {
          text: 'OK',
          onPress: () => props.navigation.navigate('MyProfile'),
        },
      ]);
    }
  }, [errorSwipeProfile]);

  const showProfile = (profile, isGroup) => {
    props.navigation.navigate('Profile', {
      profile: profile,
      isGroup: isGroup,
      preview: true,
    });
  };

  let cardType;
  let imageStyle;
  if (swipeProfile && !swipeProfile.members) {
    cardType = {
      position: 'absolute',
      width: '95%',
      height: '80%',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.bgCard,
    };
    imageStyle = {
      borderRadius: 20,
      height: '100%',
    };
  } else {
    cardType = {
      position: 'absolute',
      width: '95%',
      height: '80%',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.orange,
    };
    imageStyle = {
      borderBottomRightRadius: 20,
      borderBottomLeftRadius: 20,
      height: '100%',
    };
  }

  const checkPhoto = (profile) => {
    if (profile?.photos?.length > 0) {
      return { uri: `${profile.photos[0]?.image}` };
    }
    return require('../../assets/images/placeholder-profile.png');
  };

  // sawp the positions of elements
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

  const renderGroupProfile = () => {
    //render the current profile first
    const orderedMembers = putOnTopCard(currentProfileId, swipeProfile.members);

    return orderedMembers.map((profile) => {
      return (
        <ImageBackground
          key={profile.id}
          imageStyle={{ ...imageStyle, ...styles.card }}
          resizeMode="cover"
          source={checkPhoto(profile)}
          style={styles.image}>
          <InfoCard
            name={profile.name}
            city={profile.city}
            live_in={profile.live_in}
            age={profile.age}
            university={profile.university}
          />
          {profile.id === currentProfileId && (
            <TouchableOpacity
              onPress={() => showProfile(profile, true)}
              style={styles.arrowContainer}>
              <Image
                source={require('../../assets/images/white-arrow-up.png')}
                style={{ width: '100%', height: '100%' }}
              />
            </TouchableOpacity>
          )}
        </ImageBackground>
      );
    });
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

  if (!currentProfileId) {
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
      <View style={{ ...cardType }}>
        {swipeProfile && swipeProfile.members && (
          <View style={styles.groupName}>
            <Text style={styles.text}>Toogether group</Text>
          </View>
        )}
        <Swiper
          activeDot={
            <View
              style={{
                backgroundColor: Colors.orange,
                width: 8,
                height: 8,
                borderRadius: 4,
                margin: 4,
              }}
            />
          }
          dot={
            <View
              style={{
                backgroundColor: 'rgba(0,0,0,.2)',
                width: 8,
                height: 8,
                borderRadius: 4,
                margin: 4,
              }}
            />
          }
          loop={false}
          removeClippedSubviews={false}
          showsButtons
          buttonWrapperStyle={{ color: Colors.placeholder }}
          style={styles.wrapper}>
          {swipeProfile && swipeProfile.members ? (
            renderGroupProfile()
          ) : swipeProfile ? (
            <ImageBackground
              imageStyle={{ ...imageStyle, ...styles.card }}
              key={swipeProfile.id}
              resizeMode="cover"
              source={checkPhoto(swipeProfile)}
              style={styles.image}>
              <InfoCard
                name={swipeProfile.name}
                city={swipeProfile.city}
                live_in={swipeProfile.live_in}
                age={swipeProfile.age}
                university={swipeProfile.university}
              />
              <TouchableOpacity
                onPress={() => showProfile(swipeProfile, false)}
                style={styles.arrowContainer}>
                <Image
                  source={require('../../assets/images/white-arrow-up.png')}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                />
              </TouchableOpacity>
            </ImageBackground>
          ) : (
            <Loader />
          )}
        </Swiper>
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
            // go to chat screen
            navData.navigation.navigate('MyProfile');
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
  card: {},
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

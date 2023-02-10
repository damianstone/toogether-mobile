/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import Swiper from 'react-native-swiper';
import Constants from 'expo-constants';

import Colors from '../constants/Colors';
import InfoCard from './InfoCard';

// TODO: clear props

const SwipeCard = (props) => {
  const {
    isGroup,
    profile,
    members,
    showProfileHandler, // function to open the profile
    showProfileRestricted, // restriction to open a specific profile
    allowedProfileId, // specific profile that can be open
  } = props;

  let cardType;
  let imageStyle;
  if (!isGroup) {
    cardType = {
      position: 'absolute',
      width: '107%',
      height: '80%',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.placeholder,
    };

    imageStyle = {
      borderRadius: 20,
      height: '100%',
    };
  } else {
    cardType = {
      position: 'absolute',
      width: '107%',
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
    if (profile.photos.length > 0) {
      return { uri: `${profile.photos[0]?.image}` };
    }
    return require('../assets/images/placeholder-profile.png');
  };

  return (
    <View style={styles.screen}>
      <View style={{ ...cardType }}>
        {isGroup && (
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
          paginationStyle={{ top: 5, bottom: null }}
          removeClippedSubviews={false}
          showsButtons
          buttonWrapperStyle={{ color: Colors.placeholder }}
          style={styles.wrapper}>
          {isGroup ? (
            members.map((profile) => {
              return (
                <ImageBackground
                  key={profile.id}
                  imageStyle={{ ...imageStyle }}
                  resizeMode="cover"
                  source={checkPhoto(profile)}
                  style={styles.image}>
                  <InfoCard
                    name={profile.name}
                    city={profile.city}
                    live_in={profile.live_in}
                    from={profile.nationality}
                    age={profile.age}
                    university={profile.university}
                  />
                  {showProfileRestricted && allowedProfileId === profile.id && (
                    <TouchableOpacity
                      onPress={() => showProfileHandler(profile, true)}
                      style={styles.arrowContainer}>
                      <Image
                        source={require('../assets/images/white-arrow-up.png')}
                        style={{ width: '100%', height: '100%' }}
                      />
                    </TouchableOpacity>
                  )}
                </ImageBackground>
              );
            })
          ) : (
            <ImageBackground
              imageStyle={{ ...imageStyle }}
              key={profile.id}
              resizeMode="cover"
              source={checkPhoto(profile)}
              style={styles.image}>
              <InfoCard
                name={profile.name}
                city={profile.city}
                live_in={profile.live_in}
                from={profile.nationality}
                age={profile.age}
                university={profile.university}
              />
              <TouchableOpacity
                onPress={() => showProfileHandler(profile, false)}
                style={styles.arrowContainer}>
                <Image
                  source={require('../assets/images/white-arrow-up.png')}
                  style={{ width: '100%', height: '100%' }}
                />
              </TouchableOpacity>
            </ImageBackground>
          )}
        </Swiper>
      </View>
    </View>
  );
};

export default SwipeCard;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
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

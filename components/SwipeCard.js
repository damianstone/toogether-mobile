/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Swiper from 'react-native-swiper';
import Constants from 'expo-constants';

import Colors from '../constants/Colors';
import InfoCard from './InfoCard';

const SwipeCard = (props) => {
  const BASE_URL = Constants.manifest.extra.LOCAL_URL;

  let cardType;
  let imageStyle;
  // if the profiles array > 1
  if (!props.isGroup) {
    cardType = {
      position: 'absolute',
      width: '107%',
      height: '80%',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
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

  return (
    <View style={styles.screen}>
      <View style={{ ...cardType }}>
        {props.isGroup && (
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
          {props.isGroup ? (
            props.profile.members.map((profile) => {
              return (
                <ImageBackground
                  key={profile.id}
                  imageStyle={{ ...imageStyle }}
                  resizeMode="cover"
                  source={{ uri: `${BASE_URL}${profile.photos[0].image}` }}
                  style={styles.image}>
                  <InfoCard
                    firstName={profile.firstname}
                    lastName={profile.lastname}
                    city={profile.city}
                    live_in={profile.live_in}
                    age={profile.age}
                    university={profile.university}
                  />
                  <TouchableOpacity
                    onPress={() => props.showProfileHandler(profile, true)}
                    style={styles.arrowContainer}>
                    <Text>A</Text>
                  </TouchableOpacity>
                </ImageBackground>
              );
            })
          ) : (
            <ImageBackground
              imageStyle={{ ...imageStyle }}
              key={props.profile.id}
              resizeMode="cover"
              source={{ uri: `${BASE_URL}${props.profile.photos[0].image}` }} // just get the first photo of every profile uri: `http://127.0.0.1:8000${profile.photo}`
              style={styles.image}>
              <InfoCard
                firstName={props.profile.firstname}
                lastName={props.profile.lastname}
                city={props.profile.city}
                live_in={props.profile.live_in}
                age={props.profile.age}
                university={props.profile.university}
              />
              <TouchableOpacity
                onPress={() => props.showProfileHandler(props.profile, false)}
                style={styles.arrowContainer}>
                <Text>A</Text>
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
    backgroundColor: Colors.orange,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginVertical: 15,
    marginHorizontal: 15,
    padding: 10,
  },
});

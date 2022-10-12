import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Modal } from 'react-native';
import Swiper from 'react-native-swiper';
import { useSelector } from 'react-redux';
import Constants from 'expo-constants';

import DetailCard from '../../components/DetailCard';
import Colors from '../../constants/Colors';

const ProfileModalScreen = (props) => {
  const BASE_URL = Constants.manifest.extra.LOCAL_URL;
  const profile = props.navigation.getParam('profile');

  // TODO: add buttom sheet

  return (
    <View style={{ flex: 1 }}>
      <Swiper
        style={styles.wrapper}
        removeClippedSubviews={false}
        showsButtons
        loop={false}
        paginationStyle={{ top: 5, bottom: null }}
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
        }>
        {profile.photos.map((photo) => {
          return (
            <ImageBackground
              key={profile.id}
              style={styles.image}
              imageStyle={styles.imageStyle}
              source={{ uri: `${BASE_URL}${photo.image}` }}
              resizeMode="cover"
            />
          );
        })}
      </Swiper>
      <DetailCard
        onClose={() => props.navigation.goBack(null)}
        name={profile.firstname}
        lastname={profile.lastname}
        age={profile.age}
        city={profile.city}
        university={profile.university}
        description={profile.description}
      />
    </View>
  );
};

export default ProfileModalScreen;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  imageStyle: {
    height: '100%',
  },
});

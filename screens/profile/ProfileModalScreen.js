import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Modal } from 'react-native';
import { useSelector } from 'react-redux';
import Swiper from 'react-native-swiper';

import Colors from '../../constants/Colors';
import DetailCard from '../../components/DetailCard';

const ProfileModalScreen = (props) => {
  const groups = useSelector((state) => state.groups.groups);

  const profiles = [];
  for (let i = 0; i < groups.length; i++) {
    for (let j = 0; j < groups[i].members.length; j++) {
      profiles.push(groups[i].members[j]);
    }
  }

  const profileId = props.navigation.getParam('profileId');

  const profile = profiles.find((profile) => profile.id === profileId);

  return (
    <View style={{ flex: 1 }}>
      <Swiper
        style={styles.wrapper}
        removeClippedSubviews={false}
        showsButtons={true}
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
        }
      >
        {profile.photos.map((ph) => {
          return (
            <ImageBackground
              key={profile.id}
              style={styles.image}
              imageStyle={styles.imageStyle}
              source={ph}
              resizeMode="cover"
            ></ImageBackground>
          );
        })}
      </Swiper>
      <DetailCard
        onClose={() => props.navigation.goBack(null)}
        name={profile.name}
        lastname={profile.lastname}
        age={profile.age}
        location={profile.location}
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

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Modal } from 'react-native';
import { useSelector } from 'react-redux';
import Swiper from 'react-native-swiper';

import Colors from '../../constants/Colors';
import DetailCard from '../../components/DetailCard';

const Profile = (props) => {
  return (
    <Modal visible={props.visible}>
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
        }>
        {props.photos.map((ph) => {
          return (
            <ImageBackground
              key={props.id}
              style={styles.image}
              imageStyle={styles.imageStyle}
              source={ph}
              resizeMode="cover">
              <DetailCard
                name={props.name}
                lastname={props.lastname}
                age={props.age}
                location={props.location}
                university={props.university}
                description={props.description}
              />
            </ImageBackground>
          )
        })}
      </Swiper>
    </Modal>
  );
};

export default Profile;

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
    borderRadius: 30,
    height: '100%',
  },
});

/* 

  //const groups = useSelector((state) => state.groups.groups);
  //const profiles = [];
  //for (let i = 0; i < groups.length; i++) {
  //  for (let j = 0; j < groups[i].members.length; j++) {
  //    profiles.push(groups[i].members[j]);
  //  }
  //}
  //
  //const profileId = props.navigation.getParam('profileId');
  //console.log('PROFILE COMPONENT -------->', profileId);
  //
  //const profile = profiles.find((profile) => profile.id === profileId);
  //console.log('PROFILE COMPONENT -------->', profile.name);



*/

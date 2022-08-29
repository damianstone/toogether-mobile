import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Modal } from 'react-native';
import { useSelector } from 'react-redux';
import Swiper from 'react-native-swiper';

import Colors from '../../constants/Colors';
import DetailCard from '../../components/DetailCard';

const ProfileModalScreen = (props) => {
  const [firstName] = useState(props.firstName || '');
  const [lastName] = useState(props.lastName || '');
  const [age] = useState(props.age || '');
  const [university] = useState(props.university || 'UCLA');
  const [location] = useState(props.location || '');
  const [distance] = useState(props.distance || '');
  const [description] = useState(props.description || '');
  const [photos] = useState(props.photosArr || '');


  // pass those functions as a props for detail card
  const onDislikePressed = () => {
    props.setShowMode(0);
    props.onSwipeLeft();
  };

  const onLikePressed = () => {
    props.setShowMode(0);
    props.onSwipeRight();
  };

  const onSuperLikePressed = () => {
    props.setShowMode(0);
    props.onSwipeTop();
  };

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
        {photos.map((ph) => {
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
        name={firstName}
        lastname={lastName}
        age={age}
        location={location}
        university={university}
        description={description}
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

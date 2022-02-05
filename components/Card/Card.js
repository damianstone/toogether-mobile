import React from 'react';
import { Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import { Ionicons, Entypo } from '@expo/vector-icons';
import tw from 'tailwind-rn';

import styles from './styles';
import FastImage from 'react-native-fast-image';
import Info from '../Info';
import Colors from '../../constants/Colors';

// ADD SWIPER TO SLIDE BETWEEN INTEGRANTS
const Card = (props) => {
  const { profiles } = props;

  const showProfileHandler = () => {
    console.log('show Profile');
  }

  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <View style={styles.groupName}>
          <Text style={styles.text}>Grupo de {profiles[0].name}</Text>
        </View>
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
          {profiles.map((profile) => {
            return (
              <ImageBackground
                key={profile.id}
                style={styles.image}
                imageStyle={styles.imageStyle}
                source={profile.photos[0]}
                resizeMode="cover">
                <Info
                  firstName={profile.name}
                  lastName={profile.lastname}
                  university={profile.university}
                  location={profile.location}
                  age={profile.age}
                />
                <TouchableOpacity style={styles.arrowContainer} onPress={showProfileHandler}>
                  <Text>A</Text>
                </TouchableOpacity>
              </ImageBackground>
            );
          })}
        </Swiper>
      </View>
    </View>
  );
};

export default Card;

/* 

        {profiles.map((profile) => (
          <ImageBackground
            style={styles.image}
            imageStyle={styles.imageStyle}
            source={profile.photos[0]}
            resizeMode="cover">
            <Info
              firstName={profile.firstName}
              lastName={profile.lastName}
              occupation={profile.location}
              age={props.age}
            />
          </ImageBackground>
        ))}
*/

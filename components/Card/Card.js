import React from 'react';
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Swiper from 'react-native-swiper';

import styles from './styles';
import FastImage from 'react-native-fast-image';
import Info from '../Info';
import Colors from '../../constants/Colors';

// ADD SWIPER TO SLIDE BETWEEN INTEGRANTS
const Card = (props) => {
  const { profiles } = props;
  
  // send the id to the swipe component
  const showProfile = (id) => {
    props.onProfile(id);
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
          {profiles.map((profile, i) => {
            return (
              <ImageBackground
                key={profile.id}
                style={styles.image}
                imageStyle={styles.imageStyle}
                source={profile.photos[0]} // just get the first photo of every profile
                resizeMode="cover">
                <Info
                  firstName={profile.name}
                  lastName={profile.lastname}
                  university={profile.university}
                  location={profile.location}
                  age={profile.age}
                />
                <TouchableOpacity
                  style={styles.arrowContainer}
                  onPress={() => showProfile(profile.id)}>
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


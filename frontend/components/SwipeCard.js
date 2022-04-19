import React, { useState } from 'react';
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Swiper from 'react-native-swiper';

import Info from './Info';
import Colors from '../constants/Colors';
import ProfileModal from '../screens/swipe/ProfileModal';

/*

Muestra cada perfil individual del grupo y si es que es solo un perfil muestra undo

Aqui es donde llama al showProfile modal para ver en detalle cada perfil

*/

const SwipeCard = (props) => {
  // swipe pass as a props the profiles array of each group of the single profile

  const { profiles, setShowMode, showMode } = props;

  // send the id to the swipe component
  const showProfile = (id) => {
    props.onProfile(id);
  };

  const showProfilee = (profile) => {
    props.onRenderProfile(profile);
    setShowMode(1);
  };


  let cardType;
  // if the profiles array > 1
  if (profiles.length === 1) {
    cardType = {
      position: 'absolute',
      width: '107%',
      height: '80%',
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
    };
  } else {
    cardType = {
      position: 'absolute',
      width: '107%',
      height: '80%',
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.orange,
    };
  }


  return (
    <View style={styles.screen}>
      <View style={{ ...cardType }}>
        {profiles.length > 1 && (
          <View style={styles.groupName}>
            <Text style={styles.text}>Grupo de {profiles[0].name}</Text>
          </View>
        )}
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
                  onPress={() => props.onProfile(profile.id)}>
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

export default SwipeCard;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  groupName: {
    borderRadius: 30,
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
  imageStyle: {
    borderRadius: 30,
    height: '100%',
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

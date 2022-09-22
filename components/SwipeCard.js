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

import Colors from '../constants/Colors';
import ProfileModal from '../screens/Swipe/ProfileModal';
import Info from './Info';

/*

Muestra cada perfil individual del grupo y si es que es solo un perfil muestra undo

Aqui es donde llama al showProfile modal para ver en detalle cada perfil

checkear si el objecto es de un grupo o no

*/

const SwipeCard = (props) => {
  // swipe pass as a props the profiles array of each group of the single profile
  const { profile, setShowMode } = props;

  let isGroup;
  if (profile.total_members) {
    isGroup = true;
  } else {
    isGroup = false;
  }

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
  if (!isGroup) {
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
        {profile.length > 1 && (
          <View style={styles.groupName}>
            <Text style={styles.text}>Grupo de {profile[0].name}</Text>
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
          style={styles.wrapper}>
          {isGroup ? (
            profile.members.map((profile, i) => {
              return (
                <ImageBackground
                  imageStyle={styles.imageStyle}
                  key={profile.id}
                  resizeMode="cover"
                  source={require('../assets/images/Profiles/profile-1.jpeg')}
                  style={styles.image}>
                  <Info
                    age={profile.age}
                    firstName={profile.name}
                    lastName={profile.lastname}
                    location={profile.location}
                    university={profile.university}
                  />
                  <TouchableOpacity
                    onPress={() => props.onProfile(profile.id)}
                    style={styles.arrowContainer}>
                    <Text>A</Text>
                  </TouchableOpacity>
                </ImageBackground>
              );
            })
          ) : (
            <ImageBackground
              imageStyle={styles.imageStyle}
              key={profile.id}
              resizeMode="cover"
              source={{ uri: `http://127.0.0.1:8000${profile.photo}` }} // just get the first photo of every profile
              style={styles.image}>
              <Info
                age={profile.age}
                firstName={profile.name}
                lastName={profile.lastname}
                location={profile.location}
                university={profile.university}
              />
              <TouchableOpacity
                onPress={() => props.onProfile(profile.id)}
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

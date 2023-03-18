import React, { useState, useContext, useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Context } from '../../context/ContextProvider';
import Colors from '../../constants/Colors';
import { getNameInitials, getImage } from '../../utils/getMethods';

import Loader from './Loader';

const Avatar = (props) => {
  const { profileContext } = useContext(Context);

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={styles.imgContainer}>
      {!profileContext && (
        <View style={styles.error_avatar_view}>
          <Loader />
        </View>
      )}
      {profileContext && profileContext.photos.length > 0 && (
        <View style={styles.avatar_view}>
          <Image
            source={{ uri: `${getImage(profileContext.photos[0].image)}` }}
            style={styles.img}
          />
        </View>
      )}
      {profileContext?.photos?.length === 0 && (
        <View style={styles.avatar_view}>
          <Text style={styles.avatar_initials}>
            {getNameInitials(profileContext.name)}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  imgContainer: {
    width: 40,
    height: 40,
    overflow: 'hidden',
    marginLeft: 10,
    borderRadius: 100,
  },
  img: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.bgCard,
  },

  avatar_view: {
    backgroundColor: Colors.orange,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  error_avatar_view: {
    backgroundColor: Colors.bgCard,
    opacity: 0.5,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar_initials: {
    color: Colors.white,
    fontSize: 18,
  },
});

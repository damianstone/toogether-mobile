import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Constants from 'expo-constants';
import Colors from '../constants/Colors';

const MemberAvatar = (props) => {
  const { onPress, photos, name } = props;

  const getInitials = (name) => {
    const first = name ? name.charAt(0).toUpperCase() : 'N';
    return first;
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.imgContainer}>
      {photos && photos.length >= 1 && (
        <Image source={{ uri: `${photos[0].image}` }} style={styles.img} />
      )}
      {!photos ||
        (photos.length === 0 && (
          <View style={styles.avatar_view}>
            <Text style={styles.avatar_initials}>{getInitials(name)}</Text>
          </View>
        ))}
    </TouchableOpacity>
  );
};

export default MemberAvatar;

const styles = StyleSheet.create({
  imgContainer: {
    width: 70,
    height: 70,
    overflow: 'hidden',
    marginLeft: 10,
    borderRadius: 100,
  },
  img: {
    width: '100%',
    height: '100%',
  },

  avatar_view: {
    backgroundColor: Colors.orange,
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

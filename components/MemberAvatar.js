import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Constants from 'expo-constants';
import Colors from '../constants/Colors';

const MemberAvatar = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.imgContainer}>
      {props.photos && props.photos.length >= 1 && (
        <Image
          source={{ uri: `${props.photos[0].image}` }}
          style={styles.img}
        />
      )}
      {!props.photos ||
        (props.photos.length === 0 && (
          <View style={styles.avatar_view}>
            <Text style={styles.avatar_initials}>DS</Text>
          </View>
        ))}
    </TouchableOpacity>
  );
};

export default MemberAvatar;

const styles = StyleSheet.create({
  imgContainer: {
    width: 60,
    height: 60,
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
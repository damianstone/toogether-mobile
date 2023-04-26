import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';

import { getNameInitials, getImage } from '../../utils/getMethods';
import Colors from '../../constants/Colors';

const MemberAvatar = ({ onPress, photos, name }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.imgContainer}>
      {photos && photos.length >= 1 && (
        <FastImage
          source={{
            uri: `${getImage(photos[0].image)}`,
            priority: FastImage.priority.high,
          }}
          style={styles.img}
        />
      )}
      {!photos ||
        (photos.length === 0 && (
          <View style={styles.avatar_view}>
            <Text style={styles.avatar_initials}>{getNameInitials(name)}</Text>
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

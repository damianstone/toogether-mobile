import React, { useState, useEffect, useCallback } from 'react';
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { checkPhoto } from '../utils/checks';
import Colors from '../constants/Colors';

const MatchAvatar = (props) => {
  const {
    matchedProfile,
    matchedProfileHasPhoto,
    matchedProfilePhoto,
    onShowChat,
  } = props;

  return (
    <TouchableOpacity onPress={onShowChat}>
      <ImageBackground
        source={checkPhoto(matchedProfile)}
        imageStyle={styles.img}
        style={styles.singleImageContainer}></ImageBackground>
    </TouchableOpacity>
  );
};

export default MatchAvatar;
const styles = StyleSheet.create({
  singleImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    backgroundColor: Colors.bgCard,
  },

  img: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  noPhotoContainer: {
    width: 50,
    height: 50,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.bgCard,
    marginRight: 20,
  },
});

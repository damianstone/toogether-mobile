import React, { useState, useEffect, useCallback } from 'react';
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { getNameInitials, getImage } from '../utils/getMethods';
import Colors from '../constants/Colors';

const MatchAvatar = (props) => {
  const {
    matchedProfile,
    matchedProfileHasPhoto,
    matchedProfilePhoto,
    onShowChat,
  } = props;

  if (matchedProfileHasPhoto) {
    return (
      <TouchableOpacity onPress={onShowChat}>
        <ImageBackground
          source={{ uri: `${getImage(matchedProfilePhoto)}` }}
          imageStyle={styles.img}
          style={styles.singleImageContainer}
          onPress={onShowProfile}></ImageBackground>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.noPhotoContainer} onPress={onShowChat}>
      <Text style={{ color: Colors.white, fontSize: 20 }}>
        {getNameInitials(matchedProfile.name)}
      </Text>
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

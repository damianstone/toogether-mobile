import React, { useState, useEffect, useCallback } from 'react';
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Colors from '../constants/Colors';

const ChatAvatar = (props) => {
  const {
    isInGroup,
    matchedProfile,
    matchedProfileHasPhoto,
    matchedProfilePhoto,
  } = props;

  const getInitials = (name) => {
    const first = name ? name.charAt(0).toUpperCase() : 'N';
    return first;
  };

  if (matchedProfileHasPhoto) {
    return (
      <TouchableOpacity onPress={props.onShowProfile}>
        <ImageBackground
          source={{ uri: `${matchedProfilePhoto}` }}
          imageStyle={styles.img}
          style={
            matchedProfile.is_in_group
              ? styles.groupImageContainer
              : styles.singleImageContainer
          }
          onPress={props.onShowProfile}>
          <View style={styles.counterCircle}>
            <Text style={styles.counterCircleText}>+5</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={styles.noPhotoContainer}
      onPress={props.onShowProfile}>
      <Text style={{ color: Colors.white, fontSize: 20 }}>
        {getInitials(matchedProfile.name)}
      </Text>
    </TouchableOpacity>
  );
};

export default ChatAvatar;

const styles = StyleSheet.create({
  groupImageContainer: {
    borderWidth: 1,
    borderColor: Colors.orange,
    width: 60,
    height: 60,
    borderRadius: 100,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    backgroundColor: Colors.bgCard,
  },

  counterCircle: {
    width: 20,
    height: 20,
    borderRadius: 100,
    backgroundColor: Colors.orange,
    position: 'absolute',
    top: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },

  counterCircleText: {
    color: Colors.white,
    fontSize: 9,
    fontWeight: 'bold',
    padding: 5,
  },

  singleImageContainer: {
    width: 60,
    height: 60,
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
    width: 60,
    height: 60,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.orange,
    marginRight: 20,
  },
});

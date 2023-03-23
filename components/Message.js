import React, { useState, useEffect, useCallback } from 'react';
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Colors from '../constants/Colors';

const Message = (props) => {
  const { sender, message, onShowProfile, matchedProfile, ownProfile } = props;

  const checkPhoto = (profile) => {
    if (profile && profile.photos.length > 0) {
      return { uri: `${getImage(profile.photos[0]?.image)}` };
    }
    return require('../assets/images/placeholder-profile.png');
  };
  return (
    <View
      style={[
        styles.container,
        sender ? styles.senderMessage : styles.myMessage,
      ]}>
      <View
        style={[
          styles.messageContainer,
          sender ? styles.senderMessageBG : styles.myMessageBG,
        ]}>
        <Text style={styles.textMessage}>{message}</Text>
        <Text style={styles.time}>19:30</Text>
      </View>
      <TouchableOpacity onPress={onShowProfile}>
        <ImageBackground
          source={checkPhoto(sender ? matchedProfile : ownProfile)}
          imageStyle={styles.img}
          style={styles.singleImageContainer}></ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: {
    fontSize: 16,
    lineHeight: '100%',
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 5,
    borderRadius: 10,
    width: '60%',
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  myMessage: {
    alignSelf: 'flex-end',
  },
  senderMessage: {
    flexDirection: 'row-reverse',
    alignSelf: 'flex-start',
  },

  messageContainer: {
    flex: 2,
    borderRadius: 15,
    padding: 10,
    marginEnd: 5,
    width: '85%',
  },
  myMessageBG: {
    backgroundColor: Colors.orange,
  },
  senderMessageBG: {
    marginStart: 10,
    backgroundColor: Colors.blue,
  },
  textMessage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white,
  },

  time: {
    fontSize: 10,
    color: Colors.grey,
    alignSelf: 'flex-end',
  },
  singleImageContainer: {
    width: 35,
    height: 35,
    borderRadius: 100,
  },

  img: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
});

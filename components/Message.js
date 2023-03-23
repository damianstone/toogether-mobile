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

const Message = (props) => {
  const { isMyMessage, message, onShowProfile, matchedProfile, ownProfile } =
    props;

  return (
    <View
      style={[
        styles.container,
        isMyMessage ? styles.myMessage : styles.senderMessage,
      ]}>
      <View
        style={[
          styles.messageContainer,
          isMyMessage ? styles.myMessageBG : styles.senderMessageBG,
        ]}>
        <Text style={styles.textMessage}>{message}</Text>
        <Text style={styles.time}>19:30</Text>
      </View>
      <TouchableOpacity onPress={onShowProfile}>
        <ImageBackground
          source={checkPhoto(isMyMessage ? ownProfile : matchedProfile)}
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
    width: '65%',
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
    paddingVertical: 7,
    paddingLeft: 10,
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
    color: Colors.white,
  },

  time: {
    fontSize: 10,
    color: Colors.grey,
    alignSelf: 'flex-end',
    marginHorizontal: 5,
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

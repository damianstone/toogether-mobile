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
  const { isMyMessage, message, onShowProfile, receiverData, ownProfile } =
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
        <View style={styles.textMessageContainer}>
          <Text style={styles.textMessage}>{message.message}</Text>
        </View>
        <Text style={styles.time}>{message.sent_at}</Text>
      </View>
      <TouchableOpacity onPress={onShowProfile}>
        <ImageBackground
          source={checkPhoto(isMyMessage ? ownProfile : receiverData)}
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
    marginVertical: 5,
    marginHorizontal: 5,
    borderRadius: 10,
    flex: 1,
    alignContent: 'center',
    maxWidth: '70%',
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
    flexShrink: 1,
    flexDirection: 'row',
    borderRadius: 15,
    paddingTop: 3,
    paddingBottom: 6,
    paddingHorizontal: 10,
  },
  myMessageBG: {
    marginEnd: 5,
    backgroundColor: Colors.orange,
  },
  senderMessageBG: {
    marginStart: 10,
    backgroundColor: Colors.blue,
  },
  textMessageContainer: {
    flexShrink: 3,
  },

  textMessage: {
    fontSize: 16,
    color: Colors.white,
    margin: 0,
  },

  time: {
    fontSize: 8.5,
    color: Colors.grey,
    marginStart: 4,
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

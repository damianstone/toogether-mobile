import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import FastImage from 'react-native-fast-image';

import { getImage } from '../../utils/getMethods';
import Colors from '../../constants/Colors';

const GroupMessage = ({ isMyMessage, message }) => {
  const formatWithLink = (text) => {
    if (!text || typeof text !== 'string') {
      return text;
    }

    const urlRegex = /(https?:\/\/[^\s]+)/gi;
    const words = text?.split(' ');

    // Open clickable links in browser
    const onLinkPress = (url) => {
      Linking.canOpenURL(url).then((supported) => {
        if (supported) {
          Linking.openURL(url);
        }
      });
    };

    const formattedWords = words.map((word, i) => {
      if (word.match(urlRegex)) {
        return (
          <Text key={i}>
            <TouchableOpacity onPress={() => onLinkPress(word)}>
              <Text style={{ color: Colors.bgCard }}>{word} </Text>
            </TouchableOpacity>
          </Text>
        );
      } else {
        return <Text key={i}>{word} </Text>;
      }
    });

    return formattedWords;
  };

  return (
    <View
      style={[
        styles.container,
        isMyMessage ? styles.myMessage : styles.senderMessage,
      ]}
    >
      <View
        style={[
          styles.messageContainer,
          isMyMessage ? styles.myMessageBG : styles.senderMessageBG,
        ]}
      >
        {!isMyMessage ? (
          <View style={{ alignSelf: 'flex-start' }}>
            <Text style={{ fontSize: 9, color: Colors.placeholder }}>
              {message.sender_name}
            </Text>
          </View>
        ) : null}
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.textMessageContainer}>
            <Text style={isMyMessage ? styles.blackText : styles.whiteText}>
              {formatWithLink(message.message)}
            </Text>
          </View>
          <Text style={isMyMessage ? styles.blackTime : styles.greyTime}>
            {message.sent_at}
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.singleImageContainer} onPress={() => {}}>
        <FastImage
          style={styles.img}
          resizeMode={FastImage.resizeMode.cover}
          source={
            message?.sender_photo
              ? {
                  uri: `${getImage(message.sender_photo.image)}`,
                  priority: FastImage.priority.high,
                }
              : require('../../assets/images/placeholder-profile.png')
          }
        />
      </TouchableOpacity>
    </View>
  );
};

export default GroupMessage;

const styles = StyleSheet.create({
  container: {
    fontSize: 16,
    lineHeight: '100%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 5,
    marginHorizontal: 5,
    borderRadius: 10,
    flex: 1,
    alignContent: 'center',
    maxWidth: '75%',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },

  sameSender: {
    marginTop: 0,
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
    flexDirection: 'column',
    borderRadius: 10,
    paddingTop: 6,
    paddingBottom: 6,
    paddingHorizontal: 10,
  },

  myMessageBG: {
    marginEnd: 5,
    backgroundColor: Colors.blue,
  },

  senderMessageBG: {
    marginStart: 10,
    backgroundColor: Colors.bgCard,
  },

  textMessageContainer: {
    flexShrink: 3,
  },

  blackText: {
    fontSize: 15,
    color: Colors.black,
    margin: 0,
  },
  whiteText: {
    fontSize: 15,
    color: Colors.white,
    margin: 0,
  },

  blackTime: {
    fontSize: 8.5,
    color: Colors.black,
    marginStart: 4,
    alignSelf: 'flex-end',
    opacity: 0.7,
  },

  greyTime: {
    fontSize: 8.5,
    color: Colors.lightGray,
    marginStart: 4,
    alignSelf: 'flex-end',
  },

  singleImageContainer: {
    width: 35,
    height: 35,
    borderRadius: 100,
    backgroundColor: Colors.bgCard,
  },

  img: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
});

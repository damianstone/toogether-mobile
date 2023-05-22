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

const Message = ({ isMyMessage, message, onShowProfile }) => {
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
        <View style={styles.textMessageContainer}>
          <Text style={styles.textMessage}>
            {formatWithLink(message.message)}
          </Text>
        </View>
        <Text style={styles.time}>{message.sent_at}</Text>
      </View>
      <TouchableOpacity
        style={styles.singleImageContainer}
        onPress={onShowProfile}
      >
        <FastImage
          source={
            message?.sender_photo
              ? {
                  uri: `${getImage(message.sender_photo.image)}`,
                  priority: FastImage.priority.high,
                }
              : require('../../assets/images/placeholder-profile.png')
          }
          style={styles.img}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Message;

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
    flexDirection: 'row',
    borderRadius: 10,
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
    backgroundColor: Colors.bgCard,
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
    backgroundColor: Colors.bgCard,
  },

  img: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
});

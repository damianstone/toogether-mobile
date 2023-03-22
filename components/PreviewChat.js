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
import ChatAvatar from './ChatAvatar';

const PreviewChat = (props) => {
  const {
    matchedData,
    matchedProfile,
    onShowProfile,
    data,
    matchedProfilePhoto,
    matchedProfileHasPhoto,
    onOpenActionSheet,
    onShowChat,
  } = props;
  return (
    <View style={styles.container}>
      {matchedProfileHasPhoto ? (
        <View>
          <TouchableOpacity onPress={onShowChat}>
            <ImageBackground
              source={{ uri: `${getImage(matchedProfilePhoto)}` }}
              imageStyle={styles.img}
              style={styles.singleImageContainer}
              onPress={onShowProfile}></ImageBackground>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <TouchableOpacity
            style={styles.noPhotoContainer}
            onPress={onShowChat}>
            <Text style={{ color: Colors.white, fontSize: 20 }}>
              {getNameInitials(matchedProfile.name)}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        onLongPress={onOpenActionSheet}
        onPress={onShowProfile}
        style={styles.cardContainer}>
        <View style={styles.chat_preview}>
          <Text style={styles.matched_name}>{matchedProfile.name}</Text>
          <Text style={styles.last_message}>{data.messages[0].text}</Text>
        </View>
        <View style={styles.divider} />
      </TouchableOpacity>
    </View>
  );
};

export default PreviewChat;

const styles = StyleSheet.create({
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
    backgroundColor: Colors.bgCard,
    marginRight: 20,
  },
  container: {
    flexDirection: 'row',
    flex: 2,
    marginBottom: 15,
    marginTop: 10,
  },

  matched_name: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    justifyContent: 'center',
  },

  chat_preview: {
    flex: 2,
    flexDirection: 'column',
    marginBottom: 10,
  },

  last_message: {
    color: Colors.lightGray,
    marginTop: 5,
    fontSize: 14,
    justifyContent: 'center',
  },

  cardContainer: {
    backgroundColor: Colors.bg,
    borderRadius: 10,
    width: '100%',
  },

  bottom_border: {
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 0.5,
    width: 50,
    marginTop: 10,
    height: 50,
  },
  divider: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'white',
    width: '85%',
    marginTop: 20,
    marginLeft: -40,
  },
});

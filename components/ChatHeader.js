import React, { useState, useEffect, useCallback } from 'react';
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { checkPhoto } from '../utils/checks';
import Colors from '../constants/Colors';

const ChatHeader = (props) => {
  const { matchedData, onShowProfile } = props;
  const { matched_profile: matchedProfile } = matchedData;

  return (
    <View
      style={{
        marginTop: 5,
        marginLeft: 10,
        flex: 3,
        flexDirection: 'row',
      }}>
      <TouchableOpacity onPress={onShowProfile}>
        <ImageBackground
          source={checkPhoto(matchedProfile)}
          imageStyle={styles.img}
          style={styles.singleImageContainer}></ImageBackground>
      </TouchableOpacity>
      <Text style={styles.matched_Name}>{matchedProfile.name}</Text>
      <View style={styles.menuIcon}>
        <TouchableOpacity>
          <Entypo name="dots-three-vertical" size={24} color="grey" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatHeader;

const styles = StyleSheet.create({
  singleImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
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
  menuIcon: {
    alignSelf: 'center',
    marginLeft: 80,
  },
  matched_Name: {
    fontSize: 18,
    color: 'white',
    marginLeft: 10,
    marginTop: 5,
    paddingBottom: 5,
    fontWeight: 'bold',
  },
});

import React, { useState, useEffect, useCallback } from 'react';
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { checkPhoto } from '../utils/checks';
import Colors from '../constants/Colors';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButtom from './UI/HeaderButton';
const ChatHeader = (props) => {
  const { matchedData, onShowProfile, onGoBack } = props;
  const { matched_profile: matchedProfile } = matchedData;

  return (
    <View style={styles.titleContainer}>
      <HeaderButtons HeaderButtonComponent={HeaderButtom}>
        <Item
          iconName={
            Platform.OS === 'android' ? 'ios-arrow-back' : 'ios-arrow-back'
          }
          title="Back"
          onPress={onGoBack}
        />
      </HeaderButtons>
      <TouchableOpacity onPress={onShowProfile}>
        <ImageBackground
          source={checkPhoto(matchedProfile)}
          imageStyle={styles.img}
          style={styles.singleImageContainer}></ImageBackground>
      </TouchableOpacity>
      <Text style={styles.matched_Name}>{matchedProfile.name}</Text>
      <TouchableOpacity style={styles.menuIcon}>
        <Entypo name="dots-three-vertical" size={24} color="grey" />
      </TouchableOpacity>
    </View>
  );
};

export default ChatHeader;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    height: 100,
    marginTop: 10,
    paddingTop: 50,
    width: '100%',
  },

  singleImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
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
  },
  matched_Name: {
    width: '50%',
    fontSize: 18,
    color: 'white',
    marginTop: 5,
    paddingBottom: 5,
    fontWeight: 'bold',
  },
});

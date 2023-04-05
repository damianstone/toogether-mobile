import React, { useState, useEffect, useCallback } from 'react';
import Constants from 'expo-constants';
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
  const { receiverData, onShowProfile, onGoBack, onActionSheet } = props;

  return (
    <View style={styles.headerContainer}>
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
          source={require('../assets/images/placeholder-profile.png')}
          imageStyle={styles.img}
          style={styles.singleImageContainer}></ImageBackground>
      </TouchableOpacity>
      <Text style={styles.matched_Name}>{receiverData?.name}</Text>
      <TouchableOpacity style={styles.menuIcon} onPress={onActionSheet}>
        <Entypo name="dots-three-vertical" size={24} color="grey" />
      </TouchableOpacity>
    </View>
  );
};

export default ChatHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight + 15,
    paddingBottom: 5,
    width: '100%',
    // alignItems: 'flex-end',
  },

  singleImageContainer: {
    width: 40,
    height: 40,
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

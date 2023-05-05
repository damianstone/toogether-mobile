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
      <TouchableOpacity 
        style={styles.profilePictureButton}
        onPress={onShowProfile}
      >
        <ImageBackground
          source={require('../assets/images/placeholder-profile.png')}
          imageStyle={styles.img}
          style={styles.singleImageContainer}/>
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <TouchableOpacity 
          style={styles.profileInfoContainer}
          onPress={onShowProfile}
        >
          <Text
            numberOfLines={1} 
            style={styles.matched_Name}
          >
            {receiverData?.name}
          </Text>
          {receiverData.is_in_group && (
            <Text style={styles.groupMemberCounterText}>{receiverData.member_count} member group</Text>
          )}
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.menuIcon} onPress={onActionSheet}>
        <Entypo name="dots-three-vertical" size={24} color="grey" />
      </TouchableOpacity>
    </View>
  );
};

export default ChatHeader;

const styles = StyleSheet.create({
  headerContainer: {
    // borderColor: 'white',
    // borderWidth: 1,
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight + 15,
    paddingBottom: 5,
    width: '100%',
  },

  singleImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },

  headerProfileContainer: {
    width: '75%',
    height: '100%',
    flexDirection: 'row',
  },

  profilePictureButton: {
    alignSelf: 'flex-start',
    width: '12%',
  },

  img: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },

  textContainer: {
    alignSelf: 'center',
    width: '60%',
    marginTop: 5,
    paddingLeft: 8,
    // paddingRight: '12%',
  },

  profileInfoContainer: {
    // borderColor: 'white',
    // borderWidth: 1,
    maxWidth: '100%',
  },

  groupMemberCounterText: {
    // alignSelf: 'center',
    color: Colors.orange,
    fontSize: 12,
    marginLeft: 8,
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
    paddingLeft: 24,
    alignSelf: 'center',
  },

  matched_Name: {
    maxWidth: '100%',
    // alignSelf: 'center',
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

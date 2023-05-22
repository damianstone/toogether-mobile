import React from 'react';
import Constants from 'expo-constants';
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButtom from '../UI/HeaderButton';
import Colors from '../../constants/Colors';

const GroupChatHeader = ({ navigation, totalMembers }) => {
  return (
    <View style={styles.headerContainer}>
      <HeaderButtons HeaderButtonComponent={HeaderButtom}>
        <Item
          iconName={
            Platform.OS === 'android' ? 'ios-arrow-back' : 'ios-arrow-back'
          }
          title="Back"
          onPress={() => navigation.goBack()}
        />
      </HeaderButtons>
      <TouchableOpacity style={styles.profilePictureButton} onPress={() => {}}>
        <ImageBackground
          source={require('../../assets/images/group-chat-placeholder.png')}
          imageStyle={styles.img}
          style={styles.singleImageContainer}
        />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <TouchableOpacity
          style={styles.profileInfoContainer}
          onPress={() =>
            navigation.navigate('TabNavigator', { screen: 'GroupNavigator' })
          }
        >
          <Text numberOfLines={1} style={styles.matched_Name}>
            Your Group
          </Text>
          <Text
            style={styles.groupMemberCounterText}
          >{`${totalMembers} members`}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.menuIcon} onPress={() => {}}>
        <Entypo name="dots-three-vertical" size={24} color="grey" />
      </TouchableOpacity>
    </View>
  );
};

export default GroupChatHeader;

const styles = StyleSheet.create({
  headerContainer: {
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
    backgroundColor: Colors.bgCard,
    width: 50,
    height: 50,
    borderRadius: 100,
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
  },

  profileInfoContainer: {
    maxWidth: '100%',
    marginLeft: 10,
  },

  groupMemberCounterText: {
    color: Colors.calypso,
    fontSize: 12,
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

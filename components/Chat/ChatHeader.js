import React from 'react';
import Constants from 'expo-constants';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import FastImage from 'react-native-fast-image';

import { getImage } from '../../utils/getMethods';
import Colors from '../../constants/Colors';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButtom from '../UI/HeaderButton';

const ChatHeader = ({
  receiverProfile,
  onShowProfile,
  onActionSheet,
  navigation,
}) => {
  return (
    <View style={styles.headerContainer}>
      <HeaderButtons HeaderButtonComponent={HeaderButtom}>
        <Item
          iconName={
            Platform.OS === 'android' ? 'ios-arrow-back' : 'ios-arrow-back'
          }
          title="Back"
          onPress={() => navigation.navigate('Matches')}
        />
      </HeaderButtons>
      <TouchableOpacity
        style={styles.profilePictureButton}
        onPress={onShowProfile}
      >
        <FastImage
          source={
            receiverProfile?.photo
              ? {
                  uri: `${getImage(receiverProfile.photo?.image)}`,
                  priority: FastImage.priority.high,
                }
              : require('../../assets/images/placeholder-profile.png')
          }
          style={styles.img}
        />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <TouchableOpacity
          style={styles.profileInfoContainer}
          onPress={onShowProfile}
        >
          <Text numberOfLines={1} style={styles.matched_Name}>
            {receiverProfile?.name}
          </Text>
          {receiverProfile.is_in_group && (
            <Text style={styles.groupMemberCounterText}>
              {receiverProfile.member_count} member group
            </Text>
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
    width: 50,
    height: 50,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    backgroundColor: Colors.bgCard,
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
    color: Colors.orange,
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

import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Share,
  Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import Colors from '../../constants/Colors';

const ClipBoard = (props) => {
  const handleShareUrl = async (groupUrl) => {
    try {
      const result = await Share.share({
        message: `Join to my group on Toogether app using the following link: ${groupUrl}
          \n How to join a group using the link? 🤔
          \n Open the app -> Group -> Join a group -> paste the link 
          \n Don't have Toogether yet? 👀
          \n Download it here ;) https://toogether.app/
          `,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // do something
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        // just for IOS
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const copyToClipboard = (text) => {
    Clipboard.setString(text);
  };

  const removeHttp = (url) => {
    return url.replace(/^https?:\/\//, '');
  };

  console.log('URL TEXT ', props.text);

  return (
    <View
      style={{
        ...styles.clipboard_button_container,
        backgroundColor: props.backgroundColor,
      }}
    >
      <Text style={styles.clipboard_button_text}>{removeHttp(props.text)}</Text>
      <TouchableOpacity
        style={styles.clipboard_icon}
        onPress={() => handleShareUrl(props.text)}
      >
        <Ionicons name="ios-share-outline" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};
export default ClipBoard;

const styles = StyleSheet.create({
  clipboard_button_container: {
    marginVertical: 10,
    padding: 0,
    flexDirection: 'row',
    width: '100%',
    height: 44,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  clipboard_button_text: {
    paddingHorizontal: 7,
    color: Colors.placeholder,
    fontSize: 13,
    width: '85%',
  },
  clipboard_icon: {
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    color: Colors.white,
    backgroundColor: Colors.bgCard,
    height: '100%',
    width: '15%',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
});

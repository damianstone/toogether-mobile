import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import Colors from '../../constants/Colors';

const ClipBoard = (props) => {
  const copyToClipboard = (text) => {
    Clipboard.setString(text);
  };

  const removeHttp = (url) => {
    return url.replace(/^https?:\/\//, '');
  };

  return (
    <View
      style={{
        ...styles.clipboard_button_container,
        backgroundColor: props.backgroundColor,
      }}
      onPress={() => copyToClipboard(props.text)}>
      <Text style={styles.clipboard_button_text}>{removeHttp(props.text)}</Text>
      <TouchableOpacity style={styles.clipboard_icon}>
        <Feather name="copy" size={24} color="white" />
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

import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import Colors from '../../constants/Colors';

const ClipBoard = (props) => {
  const copyToClipboard = (text) => {
    Clipboard.setString(text);
  };

  return (
    <TouchableOpacity
      style={{
        ...styles.clipboard_button_container,
        backgroundColor: props.backgroundColor,
      }}
      onPress={() => copyToClipboard(props.text)}>
      <Text style={styles.clipboard_button_text}>{props.text}</Text>
      <Text style={styles.clipboard_icon}>ICON</Text>
    </TouchableOpacity>
  );
};
export default ClipBoard;

const styles = StyleSheet.create({
  clipboard_button_container: {
    marginVertical: 10,
    padding: 3,
    flexDirection: 'row',
    width: '100%',
    height: 44,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  clipboard_button_text: {
    color: Colors.black,
    fontSize: 12,
  },
  clipboard_icon: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    color: Colors.white,
    backgroundColor: Colors.bgCard,
    height: 44,
  },
});

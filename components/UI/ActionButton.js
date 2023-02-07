import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import Colors from '../../constants/Colors';

const AuthButton = (props) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.action_button_container,
        backgroundColor: props.backgroundColor,
      }}
      onPress={props.onPress}
    >
      <Text style={styles.action_button_text}>{props.text}</Text>
    </TouchableOpacity>
  );
};

export default AuthButton;

const styles = StyleSheet.create({
  action_button_container: {
    marginVertical: 10,
    padding: 3,
    flexDirection: 'row',
    width: '100%',
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  action_button_text: {
    color: Colors.white,
    fontSize: 18,
  },
});

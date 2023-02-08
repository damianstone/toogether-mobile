import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import Colors from '../../constants/Colors';

const AuthButton = (props) => {
  const { onPress, text } = props;

  return (
    <TouchableOpacity style={styles.auth_button_container} onPress={onPress}>
      <Text style={styles.auth_button_text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default AuthButton;

const styles = StyleSheet.create({
  auth_button_container: {
    marginVertical: 30,
    padding: 3,
    flexDirection: 'row',
    width: '100%',
    height: 44,
    backgroundColor: Colors.orange,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  auth_button_text: {
    color: Colors.white,
    fontSize: 18,
  },
});

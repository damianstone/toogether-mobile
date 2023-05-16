import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import Colors from '../../constants/Colors';

const AuthButton = (props) => {
  const { backgroundColor, text, onPress, text_Style } = props;

  const textStyle = !text_Style ? {} : text_Style;

  return (
    <TouchableOpacity
      style={{
        ...styles.action_button_container,
        backgroundColor: backgroundColor,
      }}
      onPress={onPress}
    >
      <Text style={[styles.action_button_text, textStyle]}>{text}</Text>
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

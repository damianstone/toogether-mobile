import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
  Dimensions,
} from 'react-native';
import Colors from '../../constants/Colors';
import Device from '../../theme/Device';

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
    marginVertical: Platform.OS === 'ios' ? 30 : 0,
    marginTop: Platform.OS === 'ios' ? 30 : 15,
    padding: 3,
    flexDirection: 'row',
    width: '100%',
    height: Platform.OS === 'ios' ? 44 : 0.06 * Device.height,
    backgroundColor: Platform.OS === 'ios' ? Colors.orange : Colors.bgCard,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  auth_button_text: {
    color: Colors.white,
    fontSize: 18,
  },
});

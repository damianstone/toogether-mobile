import React from 'react';
import { StyleSheet, TouchableOpacity, Text, Platform, Dimensions } from 'react-native';
import Colors from '../../constants/Colors';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const aspectRatio = width/height;
// 16x9 aspect ratio
const sbn = aspectRatio === 0.6020066889632107;

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
    // marginVertical: Platform.OS === 'ios' ? 30 : !sbn ? 30 : 12,
    marginVertical: Platform.OS === 'ios' ? 30 : 0,
    marginTop: Platform.OS === 'ios' ? 0 : 15,
    padding: 3,
    flexDirection: 'row',
    width: '100%',
    height: Platform.OS === 'ios' ? 44 : 0.06*height,
    backgroundColor: Colors.orange,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
    // borderColor: 'white',
  },
  auth_button_text: {
    color: Colors.white,
    fontSize: 18,
  },
});

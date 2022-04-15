import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';

import tw from 'tailwind-rn';
import Colors from '../constants/Colors';


const SwipeButtons = (props) => {
  return (
    <View style={[tw('flex flex-row justify-evenly pb-4'), styles.screen]}>
      <TouchableOpacity style={styles.button1} onPress={props.onLeft}>
        <Entypo name="cross" size={22} color="white" />
      </TouchableOpacity>
      {props.rewind ? (
        <TouchableOpacity style={styles.button3} onPress={props.onRewind}>
          <Entypo name="heart" size={22} color="black" />
        </TouchableOpacity>
      ) : null}
      <TouchableOpacity style={styles.button2} onPress={props.onRight}>
        <Entypo name="heart" size={22} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default SwipeButtons;

const styles = StyleSheet.create({
  screen: {
    marginVertical: 2,
  },
  button1: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: Colors.orange,
  },
  button2: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: Colors.calypso,
  },
  button3: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: Colors.white,
  },
});

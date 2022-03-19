import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';
import tw from 'tailwind-rn';

import styles from './styles';

const SwipeButtons = (props) => {
  return (
    <View style={[tw('flex flex-row justify-evenly pb-4'), styles.screen]}>
      <TouchableOpacity style={styles.button1} onPress={props.onLeft}>
        <Entypo name="cross" size={22} color="white" />
      </TouchableOpacity>
      {props.rewind ? (
        <TouchableOpacity style={styles.button3} onPress={props.onRight}>
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

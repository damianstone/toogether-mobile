import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

import tw from 'tailwind-rn';
import Colors from '../constants/Colors';

const SwipeButtons = (props) => {
  const { onLeft, onRewind, onRight, rewind } = props;

  return (
    <View style={[tw('flex flex-row justify-evenly pb-4'), styles.screen]}>
      <TouchableOpacity onPress={onLeft} style={styles.button1}>
        <Entypo color="white" name="cross" size={24} />
      </TouchableOpacity>
      {rewind ? (
        <TouchableOpacity onPress={onRewind} style={styles.button3}>
          <MaterialCommunityIcons
            name="backup-restore"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      ) : null}
      <TouchableOpacity onPress={onRight} style={styles.button2}>
        <Entypo color="white" name="heart" size={24} />
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

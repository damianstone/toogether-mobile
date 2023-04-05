import React, { useState } from 'react';
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Colors from '../constants/Colors';

const MatchCounter = (props) => {
  const matches = props.data;

  return (
    <TouchableOpacity style={styles.noPhotoContainer}>
      {matches?.count == 0 ? (
        <Text style={styles.textCounter}>0</Text>
      ) : (
        <Text style={styles.textCounter}>
          {/* <Text style={styles.plus}>+</Text> */}
          {matches?.count}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default MatchCounter;

const styles = StyleSheet.create({
  noPhotoContainer: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: Colors.orange,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCounter: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: 'bold',
  },
  plus: {
    fontSize: 10,
  },
});

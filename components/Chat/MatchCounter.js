import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import Colors from '../../constants/Colors';

const MatchCounter = ({ matches }) => {
  return (
    <View style={styles.noPhotoContainer}>
      {matches?.count == 0 ? (
        <Text style={styles.textCounter}>0</Text>
      ) : (
        <Text style={styles.textCounter}>{matches?.count}</Text>
      )}
    </View>
  );
};

export default MatchCounter;

const styles = StyleSheet.create({
  noPhotoContainer: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: Colors.bgCard,
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

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { listMatches } from '../store/actions/swipe';
import ActivityModal from './UI/ActivityModal';
import Colors from '../constants/Colors';

const MatchCounter = (props) => {
  const listMatchesReducer = useSelector((state) => state.listMatches);
  const {
    error: errorListMatches,
    loading: loadingListMatches,
    data: matches,
  } = listMatchesReducer;

  return (
    <TouchableOpacity style={styles.noPhotoContainer}>
      {matches?.count == 0 ? (
        <Text style={styles.textCounter}>{0}</Text>
      ) : (
        <Text style={styles.textCounter}>
          <Text style={{ fontSize: 9 }}>+</Text>
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
});

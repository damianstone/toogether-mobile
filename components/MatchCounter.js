import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { listMatches } from '../store/actions/swipe';
import ActivityModal from '../../components/UI/ActivityModal';
import Colors from '../constants/Colors';

const MatchCounter = (props) => {
  const listMatchesReducer = useSelector((state) => state.listMatches);
  const {
    error: errorListMatches,
    loading: loadingListMatches,
    data: matches,
  } = listMatchesReducer;
  useEffect(() => {
    dispatch(listMatches());
  }, []);

  if (loadingListMatches) {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar style="light" />
        <View style={styles.screen}>
          <ActivityModal
            loading
            title="Loading"
            size="small"
            activityColor="white"
            titleColor="white"
            activityWrapperStyle={{
              backgroundColor: 'transparent',
            }}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <TouchableOpacity style={styles.noPhotoContainer}>
      <Text style={{ color: Colors.white, fontSize: 20 }}>
        +{matches.length}
      </Text>
    </TouchableOpacity>
  );
};

export default MatchCounter;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  screen: {
    flex: 2,
    backgroundColor: Colors.bg,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    bottom: 10,
  },

  noPhotoContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

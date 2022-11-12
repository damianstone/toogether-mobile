import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import BottomSheet, { BottomSheetFooter } from '@gorhom/bottom-sheet';
import SwipeButtons from './SwipeButtons';
import Colors from '../constants/Colors';

const App = (props) => {
  // ref
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['30%', '100%'], []);

  return (
    <View style={styles.screen}>
      <BottomSheet ref={bottomSheetRef} index={1} snapPoints={snapPoints}>
        <View style={styles.container1}>
          <Text style={styles.nameText}>{`${props.name}, ${props.age}`}</Text>
          <TouchableOpacity
            onPress={props.onClose}
            style={styles.closeContainer}>
            <Text>C</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.container2}>
          <View style={styles.infoWrapper}>
            <Text style={styles.icon}>📍</Text>
            <Text style={styles.text}>{props.location}</Text>
          </View>

          <View style={styles.infoWrapper}>
            <Text style={styles.icon}>🏠</Text>
            <Text style={styles.text}>{props.city}</Text>
          </View>

          <View style={styles.infoWrapper}>
            <Text style={styles.icon}>🎓</Text>
            <Text style={styles.text}>{props.university}</Text>
          </View>
        </View>

        <View style={styles.line} />

        <View style={styles.descriptionContainer}>
          <Text style={{ fontSize: 18, fontWeight: '500', marginBottom: 4 }}>
            About
          </Text>
          <Text style={styles.descriptionText}>{props.description}</Text>
        </View>

        <View style={styles.line} />

        <SwipeButtons rewind={false} />

        <View style={styles.line} />

        <View style={styles.reportContainer}>
          <Button title="Block profile" color={Colors.red} onPress={() => {}} />
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 0.5,
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  contentContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  footerContainer: {
    padding: 12,
    margin: 12,
    borderRadius: 12,
    backgroundColor: '#80f',
  },
  footerText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '800',
  },

  container1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  closeContainer: {
    backgroundColor: Colors.orange,
    borderRadius: 100,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  nameText: {
    fontSize: 25,
    fontWeight: '500',
  },
  infoWrapper: {
    flexDirection: 'row',
    margin: 3,
  },
  icon: {
    fontSize: 20,
  },
  text: {
    fontSize: 15,
    marginLeft: 10,
  },
  descriptionContainer: {
    margin: 3,
  },
  descriptionText: {
    fontSize: 15,
  },
  line: {
    borderBottomColor: Colors.black,
    borderBottomWidth: 0.5,
    margin: 10,
  },
  reportContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  redText: {
    color: Colors.red,
  },
});

export default App;

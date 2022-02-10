import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import tw from 'tailwind-rn';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';

const Info = (props) => {
  return (
    <View style={styles.cardShadow}>
      <View style={styles.textContainer}>
        <Text
          style={
            styles.name
          }>{`${props.firstName} ${props.lastName}, ${props.age}`}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Ionicons name="location" size={19} color="black" />
        <Text style={styles.text}>{`${props.location}`}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Ionicons name="location" size={19} color="black" />
        <Text style={styles.text}>{`${props.university}`}</Text>
      </View>
    </View>
  );
};

export default Info;

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    backgroundColor: Colors.white,
    width: '60%',
    height: 90,
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginVertical: 15,
    marginHorizontal: 3,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  textContainer: {
    marginVertical: 1,
  },
  name: {
    fontStyle: 'normal',
    fontSize: 17,
    color: Colors.black,
    fontWeight: '600',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 1,
    justifyContent: 'flex-start',
  },
  text: {
    fontStyle: 'normal',
    fontSize: 15,
    marginLeft: 10,
  },
});

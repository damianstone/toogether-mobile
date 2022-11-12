import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';

const InfoCard = (props) => {
  const { name, city, live_in, age, university, occupation, from } = props;

  const details = [
    {
      detail: university,
      icon: '🎓',
      iconName: 'location',
    },
    {
      detail: occupation,
      icon: '😎',
      iconName: 'location',
    },
    {
      detail: live_in,
      icon: '📍',
      iconName: 'location',
    },
    {
      detail: city,
      icon: '📍',
      iconName: 'location',
    },
    {
      detail: from,
      icon: '🏡',
      iconName: 'location',
    },
  ];
  const filtered = details.filter(
    (obj) => obj.detail && obj.detail !== undefined
  );

  let cardShadow;
  if (filtered.length < 2) {
    cardShadow = {
      width: '50%',
      maxHeight: '60%',
      height: '10%',
    };
  } else {
    cardShadow = {
      width: '50%',
      maxHeight: '60%',
      height: '16%',
    };
  }

  return (
    <View style={{ ...styles.cardShadow, ...cardShadow }}>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{`${name}, ${age}`}</Text>
      </View>
      {filtered[0] && (
        <View style={styles.infoContainer}>
          <Text style={{ fontSize: 14 }}>{filtered[0].icon}</Text>
          <Text style={styles.text}>{filtered[0].detail}</Text>
        </View>
      )}
      {filtered[1] && (
        <View style={styles.infoContainer}>
          <Text style={{ fontSize: 14 }}>{filtered[1].icon}</Text>
          <Text style={styles.text}>{filtered[1].detail}</Text>
        </View>
      )}
    </View>
  );
};

export default InfoCard;

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
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginVertical: 15,
    marginHorizontal: 3,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  textContainer: {
    marginVertical: 1,
  },
  name: {
    fontStyle: 'normal',
    fontSize: 15,
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
    fontSize: 12,
    marginLeft: 10,
  },
});

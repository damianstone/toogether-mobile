import React, { useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import styles from './styles';
import Card from '../../components/Card/Card';
import SwipeButtons from '../../components/SwipeButtons/SwipeButtons';

const burned_data = [
  {
    firstName: 'Elizabeth',
    lastName: 'Olsen',
    occupation: 'Actress',
    photoURL:
      'https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTE5NTU2MzE2NTE5MzAyNjY3/elizabeth-olsen-20631899-1-402.jpg',
    age: 32,
  },
  {
    firstName: 'Elon',
    lastName: 'Musk',
    occupation: 'Software Developer',
    photoURL:
      'https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTc5OTk2ODUyMTMxNzM0ODcy/gettyimages-1229892983-square.jpg',
    age: 40,
  },
  {
    firstName: 'Rafael',
    lastName: 'Nadal',
    occupation: 'Tennis player',
    photoURL:
      'https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTc5ODc2ODQzNzY2MTYzMDU1/gettyimages-982701222.jpg',
    age: 35,
  },
];

const Swipe = (props) => {
  return (
    // CARD SECTION
    <SafeAreaView style={styles.safe}>
      <View style={styles.screen}>
        <Card data={burned_data} />
      </View>
    </SafeAreaView>
  );
};

export default Swipe;

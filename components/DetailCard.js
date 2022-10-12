import React from 'react';
import { ScrollView, StyleSheet, Text, View, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';
import SwipeButtons from './SwipeButtons';
import BottomSheet from './BottomSheet';

// TODO: like action
// TODO:

const DetailCard = (props) => {
  const {
    firstname,
    lastname,
    age,
    city,
    live_in,
    university,
    occupation,
    description,
  } = props;

  const details = [
    {
      detail: university,
      iconName: 'location',
    },
    {
      detail: occupation,
      iconName: 'location',
    },
    {
      detail: live_in,
      iconName: 'location',
    },
    {
      detail: city,
      iconName: 'location',
    },
  ];

  const filtered = details.filter(
    (obj) => obj.detail && obj.detail !== undefined
  );

  return <BottomSheet />;

  // return (
  //   <ScrollView style={styles.screen}>
  //     <View style={styles.container1}>
  //       <Text
  //         style={
  //           styles.nameText
  //         }>{`${props.name} ${props.lastname}, ${props.age}`}</Text>
  //       <TouchableOpacity onPress={props.onClose} style={styles.closeContainer}>
  //         <Text>C</Text>
  //       </TouchableOpacity>
  //     </View>

  //     <View style={styles.container2}>
  //       <View style={styles.infoWrapper}>
  //         <Text style={styles.icon}>📍</Text>
  //         <Text style={styles.text}>{props.location}</Text>
  //       </View>

  //       <View style={styles.infoWrapper}>
  //         <Text style={styles.icon}>🏠</Text>
  //         <Text style={styles.text}>{props.city}</Text>
  //       </View>

  //       <View style={styles.infoWrapper}>
  //         <Text style={styles.icon}>🎓</Text>
  //         <Text style={styles.text}>{props.university}</Text>
  //       </View>
  //     </View>

  //     <View style={styles.line} />

  //     <View style={styles.descriptionContainer}>
  //       <Text style={{ fontSize: 18, fontWeight: '500', marginBottom: 4 }}>
  //         About
  //       </Text>
  //       <Text style={styles.descriptionText}>{props.description}</Text>
  //     </View>

  //     <View style={styles.line} />

  //     <SwipeButtons rewind={false} />

  //     <View style={styles.line} />

  //     <View style={styles.reportContainer}>
  //       <Button title="Block profile" color={Colors.red} onPress={() => {}} />
  //     </View>
  //   </ScrollView>
  // );
};

export default DetailCard;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 20,
    minHeight: '30%',
    maxHeight: '40%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  container1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  container2: {},
  container3: {},
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

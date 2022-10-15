import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import SwipeButtons from './SwipeButtons';
import BottomSheet from './BottomSheet';

const DetailBottomSheet = (props) => {
  const {
    firstname,
    lastname,
    age,
    city,
    live_in,
    from,
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
    {
      detail: from,
      iconName: 'location',
    },
  ];

  const filtered = details.filter(
    (obj) => obj.detail && obj.detail !== undefined
  );

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.scrollview}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      <View style={styles.container1}>
        <View style={styles.nameTextContainer}>
          <Text style={styles.nameText}>
            {`${firstname} ${lastname}, ${age}`}
          </Text>
          {!props.isGroup && (
            <Text style={styles.toogetherGroupText}>Toogether group</Text>
          )}
        </View>
        <TouchableOpacity onPress={props.onClose} style={styles.closeContainer}>
          <Text>C</Text>
        </TouchableOpacity>
      </View>

      {filtered &&
        filtered.map((obj) => (
          <View style={styles.infoWrapper} key={obj.detail}>
            <Ionicons color="black" name={obj.iconName} size={16} />
            <Text style={styles.text}>{obj.detail}</Text>
          </View>
        ))}

      <View style={styles.line} />

      <View style={styles.descriptionContainer}>
        <Text style={{ fontSize: 18, fontWeight: '500', marginBottom: 4 }}>
          About
        </Text>
        <Text style={styles.descriptionText}>{description}</Text>
      </View>

      {!props.preview && (
        <>
          <View style={styles.line} />
          <SwipeButtons
            rewind={false}
            onLeft={props.onClose}
            onRight={props.handleLike}
          />
          <View style={styles.line} />
          <View style={styles.reportContainer}>
            <Button
              title="Block profile"
              color={Colors.red}
              onPress={props.openAlert}
            />
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default DetailBottomSheet;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    overflow: 'hidden',
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
  scrollview: {},
  container1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  nameTextContainer: {
    flexDirection: 'column',
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
  toogetherGroupText: {
    fontSize: 15,
    color: Colors.orange,
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
    marginBottom: 50,
  },
  redText: {
    color: Colors.red,
  },
});

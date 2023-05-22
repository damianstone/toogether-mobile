import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

const NameCounter = ({ name, total_likes, total_matches, navigation }) => {
  return (
    <>
      <View style={styles.nameView}>
        <Text style={styles.name}>{name}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
          <MaterialIcons name="edit" size={20} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.counterContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('LikeNavigator')}>
          <View style={styles.counterView}>
            <Text style={styles.likesNumber}>{total_likes}</Text>
            <Text style={styles.counterText}>Likes</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Match')}>
          <View style={styles.counterView}>
            <Text style={styles.matchesNumber}>{total_matches}</Text>
            <Text style={styles.counterText}>matches</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default NameCounter;

const styles = StyleSheet.create({
  nameView: {
    flexDirection: 'row',
    width: '100%',
    marginTop: -5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    // marginRight: 10,
    color: Colors.white,
    padding: 10,
  },
  counterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
  },
  counterView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  likesNumber: {
    color: Colors.orange,
    fontSize: 24,
  },
  counterText: {
    color: Colors.white,
    fontSize: 14,
    marginTop: 5,
  },
  matchesNumber: {
    color: Colors.calypso,
    fontSize: 24,
  },
});

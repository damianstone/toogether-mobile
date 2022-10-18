import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Constants from 'expo-constants';
import { Entypo } from '@expo/vector-icons';

import InfoCard from './InfoCard';
import Colors from '../constants/Colors';

const LikeCard = (props) => {
  const BASE_URL = Constants.manifest.extra.LOCAL_URL;
  const {
    isGroup,
    firstname,
    lastname,
    age,
    image,
    onShowProfile,
    dislike,
    like,
  } = props;

  let cardType;
  if (isGroup) {
    cardType = {
      // position: 'absolute',
      width: '100%',
      height: '100%',
      borderRadius: 15,
    };
  } else {
    cardType = {
      position: 'absolute',
      width: '100%',
      height: '100%',
      borderRadius: 15,
      backgroundColor: Colors.placeholder,
    };
  }

  const getInitials = (firstname, lastname) => {
    const first = firstname ? firstname.charAt(0).toUpperCase : 'N';
    const second = lastname ? lastname.charAt(0).toUpperCase : 'N';
    return first + second;
  };

  const getCardInfo = () => {
    let n = firstname;
    let a = age;
    if (!firstname || firstname === null) {
      n = 'Toogether User';
    }
    if (!age || age === null) {
      a = '';
    }
    if (a) {
      return `${n}, ${a}`;
    }
    return `${n}`;
  };

  return (
    <View style={styles.screen}>
      <View style={{ ...cardType }}>
        <TouchableOpacity onPress={onShowProfile} style={styles.touch}>
          {isGroup && (
            <View style={styles.groupName}>
              <Text style={styles.text}>Toogether Group</Text>
            </View>
          )}
          {image ? (
            <ImageBackground
              imageStyle={styles.imageStyle}
              resizeMode="cover"
              source={{ uri: `${BASE_URL}${image}` }}
              style={styles.image}>
              <View style={styles.infoCard}>
                <Text style={{ color: Colors.black, fontSize: 10 }}>
                  {getCardInfo()}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  marginVertical: 5,
                  marginHorizontal: 3,
                  height: '40%',
                  justifyContent: 'space-around',
                }}>
                <TouchableOpacity onPress={dislike} style={styles.dislike}>
                  <Entypo color="white" name="cross" size={15} />
                </TouchableOpacity>
                <TouchableOpacity onPress={like} style={styles.like}>
                  <Entypo color="white" name="cross" size={15} />
                </TouchableOpacity>
              </View>
            </ImageBackground>
          ) : (
            <View style={styles.initialsView}>
              <Text style={{ color: Colors.black, fontSize: 30 }}>
                {getInitials(firstname, lastname)}
              </Text>
              <View>
                <TouchableOpacity onPress={dislike} style={styles.dislike}>
                  <Entypo color="white" name="cross" size={15} />
                </TouchableOpacity>
                <TouchableOpacity onPress={like} style={styles.like}>
                  <Entypo color="white" name="cross" size={15} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LikeCard;

const styles = StyleSheet.create({
  screen: {
    flex: 0.5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 200,
    margin: 15,
  },
  groupName: {
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 2,
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  initialsView: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    width: '100%',
    height: '100%',
  },
  imageStyle: {
    borderRadius: 15,
    height: '100%',
  },
  text: {
    fontSize: 9,
    fontWeight: 'bold',
    color: Colors.white,
  },
  touch: {
    height: 200,
  },
  infoCard: {
    backgroundColor: Colors.white,
    opacity: 1,
    width: '50%',
    height: '15%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    borderRadius: 10,
    paddingHorizontal: 8,
    marginVertical: 7,
    marginHorizontal: 3,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },

  dislike: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: Colors.orange,
  },

  like: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: Colors.calypso,
  },
});

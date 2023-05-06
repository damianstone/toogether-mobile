import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Entypo } from '@expo/vector-icons';
import { getImage } from '../utils/getMethods';
import FastImageBackground from './UI/FastImageBackground';
import Colors from '../constants/Colors';

const LikeCard = ({
  isGroup,
  name,
  age,
  image,
  onShowProfile,
  dislike,
  like,
}) => {
  const getCardInfo = () => {
    let n = name;
    let a = age;
    if (!name || name === null) {
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
      <View style={isGroup ? styles.groupCard : styles.singleCard}>
        <TouchableOpacity onPress={onShowProfile} style={styles.touch}>
          {isGroup && (
            <View style={styles.groupName}>
              <Text style={styles.text}>Toogether Group</Text>
            </View>
          )}
          <FastImageBackground
            containerStyle={
              isGroup ? styles.groupImageContainer : styles.singleImageContainer
            }
            imageStyle={styles.imageStyle}
            resizeMode={FastImage.resizeMode.cover}
            source={
              image
                ? {
                    uri: `${getImage(image)}`,
                    priority: FastImage.priority.high,
                  }
                : require('../assets/images/placeholder-profile.png')
            }
          >
            <View style={styles.infoCard}>
              <Text style={{ color: Colors.black, fontSize: 10 }}>
                {getCardInfo()}
              </Text>
            </View>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity onPress={dislike} style={styles.dislike}>
                <Entypo color="white" name="cross" size={15} />
              </TouchableOpacity>
              <TouchableOpacity onPress={like} style={styles.like}>
                <Entypo color="white" name="heart" size={15} />
              </TouchableOpacity>
            </View>
          </FastImageBackground>
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
    maxHeight: 200,
    minHeight: 200,
    margin: 15,
  },
  groupName: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 2,
    width: '100%',
  },
  groupCard: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    backgroundColor: Colors.orange,
  },
  singleCard: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 15,
    backgroundColor: Colors.placeholder,
  },
  groupImageContainer: {
    width: '100%',
    height: '92%',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  singleImageContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexDirection: 'row',
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
    fontWeight: '600',
    color: Colors.white,
  },
  touch: {
    height: '100%',
    justifyContent: 'flex-end',
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

  buttonsContainer: {
    flexDirection: 'column',
    marginVertical: 5,
    marginHorizontal: 3,
    height: '40%',
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

import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Platform,
  Dimensions,
} from 'react-native';
import Colors from '../constants/Colors';
import ButtonAndroid from './UI/ButtonAndroid';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const aspectRatio = width / height;
// 16x9 aspect ratio
const sbn = aspectRatio === 0.6020066889632107;

const SwipeError = (props) => {
  const { imageUrl, title, text, onPress, onReload, buttonText, reload } =
    props;

  return (
    <View style={styles.screen}>
      <Image style={styles.img} source={imageUrl} />
      <View style={styles.bottomContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.text}>{text}</Text>
        </View>
        <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
        {reload &&
          (Platform.OS === 'ios' ? (
            <Button title="Reload" color={Colors.white} onPress={onReload} />
          ) : (
            <ButtonAndroid title="Reload" onPress={onReload} />
          ))}
      </View>
    </View>
  );
};

export default SwipeError;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
  },

  img: {
    width: '80%',
    height: '55%',
    alignSelf: 'center',
  },
  title: {
    color: Colors.white,
    fontSize: 30,
    marginBottom: 10,
  },
  bottomContainer: {
    width: '80%',
    height: '35%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  textContainer: {
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Colors.placeholder,
    fontSize: 15,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '60%',
    height: 40,
    alignItems: 'center',
    backgroundColor: Colors.orange,
    borderRadius: 10,
    justifyContent: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 15,
  },
});

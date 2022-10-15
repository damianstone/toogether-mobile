import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
} from 'react-native';
import Colors from '../constants/Colors';

const SwipeError = (props) => {
  const { imageUrl, title, text, onPress, buttonText } = props;

  return (
    <View style={styles.screen}>
      <Image
        style={{ width: '80%', height: '55%', alignSelf: 'center' }}
        source={imageUrl}
      />
      <View style={styles.bottomContainer}>
        <View style={styles.textContainer}>
          <Text style={{ color: Colors.white, fontSize: 30, marginBottom: 10 }}>
            {title}
          </Text>
          <Text
            style={{
              color: Colors.placeholder,
              fontSize: 15,
              textAlign: 'center',
            }}>
            {props.text}
          </Text>
        </View>
        <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
          <Text style={{ color: Colors.white, fontSize: 15 }}>
            {buttonText}
          </Text>
        </TouchableOpacity>
        {props.reload && (
          <Button
            title="Reload"
            color={Colors.white}
            onPress={props.onReload}
          />
        )}
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
  buttonContainer: {
    width: '60%',
    height: 40,
    alignItems: 'center',
    backgroundColor: Colors.orange,
    borderRadius: 10,
    justifyContent: 'center',
    marginBottom: 10,
  },
});

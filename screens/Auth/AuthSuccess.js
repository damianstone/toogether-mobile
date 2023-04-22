import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

import Colors from '../../constants/Colors';

const AuthSucess = (props) => {
  const { registerMode } = props.route.params;

  return (
    <View style={[styles.screen, Platform.OS === 'ios' ? {} : { flex: 1 }]}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <Text style={styles.mainText}>
          {registerMode ? 'Register Success' : 'Login Success'}
        </Text>
        <View style={styles.container}>
          <Text style={styles.text}>Lets start with your profile</Text>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/images/authSucess.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => {
            props.navigation.navigate('Instagram');
          }}
        >
          <Text style={styles.button_text}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AuthSucess;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: Colors.bg,
  },
  container: {
    marginVertical: 20,
  },
  mainText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: Colors.white,
  },
  text: {
    fontSize: 30,
    color: Colors.white,
  },
  imageContainer: {
    padding: 20,
    marginVertical: 20,
    width: 280,
    height: 300,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    padding: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: Colors.orange,
    marginVertical: 10,
    width: '65%',
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
  },
  touchable: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button_text: {
    color: Colors.white,
    fontSize: 20,
  },
});

import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import Colors from '../constants/Colors';

const AuthSucess = (props) => {
  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <Text style={styles.mainText}>Sign Up Success</Text>
        <View style={styles.container}>
          <Text style={styles.text}>Lets start with your profile</Text>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/images/authSucess.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => {
            props.navigation.navigate('Create');
          }}
          color={Colors.white}
          title="Continuar"
        />
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
    marginVertical: 10,
    width: '65%',
    height: 44,
    backgroundColor: Colors.green,
    borderRadius: 22,
    alignItems: 'center',
  },
});

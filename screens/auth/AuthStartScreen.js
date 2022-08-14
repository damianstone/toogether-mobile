import React, { useState } from 'react';
import {
  Image,
  View,
  Button,
  Text,
  ScrollView,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

import Colors from '../../constants/Colors';

const AuthStartScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  //TODO: check if is there a user using useEffect

  if (isLoading === true) {
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.orange} />
    </View>;
  }

  const handleRegister = () => {
    props.navigation.navigate('Auth', { register: true });
  };

  const handleLogin = () => {
    props.navigation.navigate('Auth', { register: false });
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <ScrollView
        style={styles.scrollview_style}
        contentContainerStyle={styles.scrollview_content_container}>
        <View>
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/images/logo-2.png')}
              style={styles.logo}
            />
          </View>
          <View style={styles.imageContainer}>
            <Image
              source={require('../../assets/images/login.png')}
              style={styles.image}
            />
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <Button title="Login" color={Colors.white} onPress={handleLogin} />
          <View style={styles.buttonContainer2}>
            <Button
              onPress={handleRegister}
              color={Colors.white}
              title="Create account"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AuthStartScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.bg,
    flex: 1,
    justifyContent: 'space-around',
    height: '100%',
  },
  gradient: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  scrollview_style: {
    flexGrow: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  scrollview_content_container: {
    flexDirection: 'column', // inner items will be added vertically
    flexGrow: 1, // all the available vertical space will be occupied by it
    justifyContent: 'space-between', // will create the gutter between body and footer
  },

  logoContainer: {
    marginTop: 80,
    alignItems: 'center',
    width: '100%',
  },

  logo: {
    width: 350,
    height: 90,
    resizeMode: 'stretch',
  },
  imageContainer: {
    marginTop: 20,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 400,
  },

  buttonsContainer: {
    alignItems: 'center',
    marginVertical: 40,
  },
  buttonContainer: {
    padding: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
    width: '65%',
    height: 44,
    backgroundColor: '#4267B2',
    borderRadius: 22,
    alignItems: 'center',
  },

  button: {
    fontSize: 60,
    color: Colors.white,
  },

  inputsContainer: {
    padding: 3,
    width: '80%',
    marginVertical: 0,
    alignSelf: 'center',
  },

  buttonContainer2: {
    marginVertical: 30,
    padding: 3,
    flexDirection: 'row',
    width: '80%',
    height: 44,
    backgroundColor: Colors.orange,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

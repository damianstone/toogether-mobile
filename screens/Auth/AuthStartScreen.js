import React, { useState } from 'react';
import {
  Image,
  View,
  Button,
  ScrollView,
  Platform,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

import AuthButton from '../../components/UI/AuthButton';
import Colors from '../../constants/Colors';
import ButtonAndroid from '../../components/UI/ButtonAndroid';
// import Button from '../../components/UI/Button';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const aspectRatio = width/height;
// 16x9 aspect ratio
const sbn = aspectRatio === 0.6020066889632107;

const AuthStartScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);

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
        contentContainerStyle={styles.scrollview_content_container}
      >
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/images/logo-2.png')}
            style={styles.logo}
          />
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/images/radar.png')}
            style={styles.image}
            resizeMode= {Platform.OS === 'ios' ? 'cover' : 'contain'}
          />
        </View>
        <View style={styles.buttonsContainer}>
          {
            Platform.OS === 'ios' 
              ?
                <Button
                  title="Login"
                  color={Platform.OS === 'ios' ? Colors.white : Colors.bg} //  not needed but kept for refernce
                  onPress={handleLogin}
                />
              :
                <ButtonAndroid 
                  title="Login"
                  color={Platform.OS === 'ios' ? Colors.white : Colors.bg}
                  onPress={handleLogin}
                />
          }
          <AuthButton onPress={handleRegister} text="Create Account" />
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
    justifyContent: 'center',
    flexDirection: 'column',
    height: '100%',
  },

  gradient: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  scrollview_content_container: {
    flexDirection: 'column', // inner items will be added vertically
    flexGrow: 1, // all the available vertical space will be occupied by it
    justifyContent: 'space-between', // will create the gutter between body and footer
  },

  scrollview_style: {
    flexGrow: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  logoContainer: {
    marginTop: Platform.OS === 'ios' ? 80 : 0.07 * height,
    alignItems: 'center',
    width: '100%',
    // borderWidth: 1,
    // borderColor: 'white',
  },

  logo: {
    width: Platform.OS === 'ios' ? 350 : 0.69 * width,
    height: Platform.OS === 'ios' ? 90 : 0.1 * height,
    resizeMode: Platform.OS === 'ios' ? 'stretch' : 'center',
  },

  imageContainer: {
    marginTop: 20,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
    // borderColor: 'white'
  },

  image: {
    width: '100%',
    height: Platform.OS === 'ios' ? 450 : 0.60*height,
    resizeMode: 'center',
  },

  buttonsContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    padding: Platform.OS === 'ios' ? 20 : 0,
    paddingHorizontal: Platform.OS === 'ios' ? 0 : 20,
    paddingVertical: Platform.OS === 'ios' ? '7%' : 0,
    paddingBottom: Platform.OS === 'ios' ? 0 : 0.01 * height,
    // borderWidth: 1,
    // borderColor: 'white',
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
});

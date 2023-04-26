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
import Device from '../../theme/Device';
import ButtonAndroid from '../../components/UI/ButtonAndroid';

const AuthStartScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading === true) {
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.orange} />
    </View>;
  }

  const handleRegister = () => {
    props.navigation.navigate('Auth', { registerMode: true });
  };

  const handleLogin = () => {
    props.navigation.navigate('Auth', { registerMode: false });
  };

  return (
    <View style={[styles.screen, Platform.OS === 'ios' ? {} : { flex: 1 }]}>
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
            resizeMode={Platform.OS === 'ios' ? 'cover' : 'contain'}
          />
        </View>
        <View
          style={[
            styles.buttonsContainer,
            Platform.OS === 'ios' ? {} : { flex: 1 },
          ]}
        >
          {Platform.OS === 'ios' ? (
            <Button
              title="Login"
              color={Platform.OS === 'ios' ? Colors.white : Colors.bg} //  not needed but kept for refernce
              onPress={handleLogin}
            />
          ) : (
            <ButtonAndroid
              title="Login"
              color={Platform.OS === 'ios' ? Colors.white : Colors.bg}
              onPress={handleLogin}
            />
          )}
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
    marginTop: Platform.OS === 'ios' ? 80 : 0.07 * Device.height,
    alignItems: 'center',
    width: '100%',
  },

  logo: {
    width: Platform.OS === 'ios' ? 350 : 0.69 * Device.width,
    height: Platform.OS === 'ios' ? 90 : 0.1 * Device.height,
    resizeMode: Platform.OS === 'ios' ? 'stretch' : 'center',
  },

  imageContainer: {
    marginTop: 20,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    width: '100%',
    height: Platform.OS === 'ios' ? 450 : 0.6 * Device.height,
    resizeMode: 'cover', // default value
  },

  buttonsContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    padding: Platform.OS === 'ios' ? 20 : 0,
    paddingHorizontal: Platform.OS === 'ios' ? 0 : 20,
    paddingVertical: Platform.OS === 'ios' ? '7%' : 0,
    paddingBottom: Platform.OS === 'ios' ? '7%' : 0.01 * Device.height,
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

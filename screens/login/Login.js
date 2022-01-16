import React, { useState } from 'react';
import { Image, View, Button, Text, ScrollView } from 'react-native';
import { Item } from 'react-navigation-header-buttons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AntDesign from '@expo/vector-icons/AntDesign';
import { StatusBar } from 'expo-status-bar';
//import { LinearGradient } from 'expo-linear-gradient';

import styles from './styles';
import Colors from '../../constants/Colors';

const Login = (props) => {
  const [isSignup, setIsSignup] = useState(false); // to switch between signup and signin

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <ScrollView>
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
          <View style={styles.buttonContainer2}>
            <AntDesign name="facebook-square" size={22} color="black" />
            <Button
              onPress={() => {
                props.navigation.navigate('Swipe');
                if (isSignup) {
                  props.navigation.navigate('Success');
                }
              }}
              color={Colors.black}
              title={isSignup ? 'Sign Up with Google' : 'Login with Google'}
            />
          </View>
          <View style={styles.buttonContainer}>
            <AntDesign name="facebook-square" size={22} color="white" />
            <Button
              onPress={() => {
                props.navigation.navigate('Swipe');
                if (isSignup) {
                  props.navigation.navigate('Success');
                }
              }}
              color={Colors.white}
              title={isSignup ? 'Sign Up with Facebook' : 'Login with Facebook'}
            />
          </View>
          <Button
            title={`Switch to ${isSignup ? 'Login?' : 'Sign Up?'}`}
            color={Colors.white}
            onPress={() => {
              setIsSignup((prevState) => !prevState);
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;

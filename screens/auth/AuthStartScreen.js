import React, {
  useState,
  useContext,
  useEffect,
  useReducer,
  useCallback,
} from 'react';
import {
  Image,
  View,
  Button,
  Text,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

import styles from './styles';
import Colors from '../../constants/Colors';

const AuthStartScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading === true) {
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.orange} />
    </View>;
  }

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
          <Button
            title="Login"
            color={Colors.white}
            onPress={() => {
              props.navigation.navigate('Auth');
            }}
          />
          <View style={styles.buttonContainer2}>
            <Button
              onPress={() => {}}
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

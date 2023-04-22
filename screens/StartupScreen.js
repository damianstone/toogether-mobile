/* eslint-disable consistent-return */
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ActivityModal from '../components/UI/ActivityModal';
import Colors from '../constants/Colors';

const StartupScreen = ({navigation}) => {
  // const navigation = useNavigation()

  useEffect(() => {
    const tryLogin = async () => {
      console.log("STARTUP SCREEN", props)
      // get the user data as a promise
      const userData = JSON.parse(await AsyncStorage.getItem('@userData'));

      if (userData && userData.has_account) {
        navigation.navigate('Swipe');
      } else {
        navigation.navigate('AuthStart');
      }
    };

    tryLogin();
  }, []);

  return (
    <View style={styles.screen}>
      <ActivityModal
        loading
        title="Loading"
        size="small"
        activityColor="white"
        titleColor="white"
        activityWrapperStyle={{
          backgroundColor: 'transparent',
        }}
      />
    </View>
  );
};

export default StartupScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.bg,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

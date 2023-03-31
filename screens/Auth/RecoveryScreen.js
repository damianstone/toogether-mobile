import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import AuthButton from '../../components/UI/AuthButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import AuthInput from '../../components/UI/AuthInput';
import HeaderButtom from '../../components/UI/HeaderButton';
import { recoveryPassword } from '../../store/actions/user';
import Device from '../../theme/Device';
import { Platform } from 'react-native';
import Colors from '../../constants/Colors';
import AuthStartScreen from '../Auth/AuthScreen';

const RecoveryScreen = (props) => {
  return (
    <View style={styles.screen}>
      <View style={styles.auth_text_container}>
        <Text style={styles.auth_text_big}>Recovery code</Text>
        <Text style={styles.auth_text_small}>
          We will send you a recover code to your email so you can change your
          password
        </Text>
      </View>
      <View style={styles.auth_button_email}>
        <Text style={styles.auth_text_small}>E-mail</Text>
        <AuthInput
          id="email"
          textContentType="emailAddress"
          keyboardType="email-address"
          required
          autoComplete="email"
          autoCapitalize="none"
          errorText="Enter your email"
          placeholder="my-email@gmail.com"
          placeholderTextColor="#B0B3B8"
          autoCorrect={false}
          border-radius="10"
        />
      </View>
      <View style={styles.button_container}>
        <AuthButton text="Send recovery code" />
      </View>
    </View>
  );
};

RecoveryScreen.navigationOptions = (navData) => {
  return {
    headerTitle: '',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButtom}>
        <Item
          iconName={
            Platform.OS === 'android' ? 'ios-arrow-back' : 'ios-arrow-back'
          }
          onPress={() => {
            navData.navigation.navigate('Auth');
          }}
          title="Back arrow"
        />
      </HeaderButtons>
    ),
  };
};

export default RecoveryScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.bg,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100%',
  },
  auth_text_big: {
    color: Colors.white,
    fontSize: 35,
    fontWeight: 'bold',
  },

  auth_text_small: {
    color: Colors.white,
    fontSize: 20,
  },
  auth_text_container: {
    flexDirection: 'column',
    justifyContent: 'center',
    border: 2,
    width: '95%',
    padding: 10,
    // fixes styling for Android and should be default for iOS
  },
  auth_button_email: {
    padding: 0,
    margin: 0,
    width: '90%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    border: '2, solid, salmon',
  },

  input: {
    height: 40,
    width: "90%",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#494863',
    paddingHorizontal: 10,
    marginBottom: 20,
    // otros estilos para el campo de entrada
  },
  button_container: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    padding: Platform.OS === 'ios' ? 20 : 0,
    paddingHorizontal: Platform.OS === 'ios' ? 0 : 20,
    paddingVertical: Platform.OS === 'ios' ? '7%' : 0,
    paddingBottom: Platform.OS === 'ios' ? '7%' : 0.09 * Device.height,
  },
});

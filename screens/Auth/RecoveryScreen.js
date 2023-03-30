import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, TextInput, Button, StyleSheet, KeyboardAvoidingView } from 'react-native';
import ButtonAndroid from '../../components/UI/ButtonAndroid';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import AuthInput from '../../components/UI/AuthInput';
import HeaderButtom from '../../components/UI/HeaderButton';
import { recoveryPassword } from '../../store/actions/user';
import Device from '../../theme/Device';
import { Platform } from 'react-native';
import Colors from '../../constants/Colors';
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

const RecoveryScreen = (props) => {
  return (
    <>
    <View style={[styles.screen, Platform.OS === 'ios' ? {} : { flex: 1 }]}>
    <View style={styles.auth_text_container}>
          <Text style={styles.auth_text_big}>
            Recovery code
          </Text>
      <Text style={styles.auth_text_small}>
          We will send you a recover code to your email so you can change your password
      </Text> 
    </View>
      <View style={styles.auth_button_email}>
      
      <TextInput keyboardType="email-address"
       placeholder="your-email@gmail.com" style={styles.input}>
        
      </TextInput>
      </View>
        <View style={styles.button_container}>
        <ButtonAndroid
              title="Login"
              color={Platform.OS === 'ios' ? Colors.white : Colors.bg}
              
            />
          </View>
      </View>
    </>
  );
};

RecoveryScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Change Password',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButtom}>
        <Item
          iconName={
            Platform.OS === 'android' ? 'ios-arrow-back' : 'ios-arrow-back'
          }
          onPress={() => {
            navData.navigation.navigate('MyProfile');
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
    backgroundColor: Colors.bg,
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    height: '100%',
  },
  auth_text_big: {
    color: Colors.white,
    fontSize: 35,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Poppins-Bold' : 'Poppins-Regular',
  },

  auth_text_small: {
    color: Colors.white,
    fontSize: 20,
    fontFamily: Platform.OS === 'ios' ? 'Poppins-Bold' : 'Poppins-Regular',
  },
  auth_text_container: {
    flex:1,
    flexDirection:'column',
    justifyContent:'center',
    border: 2,
    width: '80%',
    paddingVertical: 0,
    paddingLeft: 20 ,
    position: 'relative',
    // fixes styling for Android and should be default for iOS
  },
  auth_button_email:{
    padding:0,
    margin:0,
    flex:1,
    flexDirection:'column',
    alignItems:"center",
    justifyContent:'center',
    position:'relative',
    bottom:150
  },
  input: {
    height: 40,
    width: 308,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor:'#494863',
    paddingHorizontal: 10,
    marginBottom: 20,
    // otros estilos para el campo de entrada
  },
  button_container:{
    backgroundColor:'#494863'

  }
});


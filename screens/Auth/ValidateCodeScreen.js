import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, StyleSheet, Alert, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import AuthButton from '../../components/UI/AuthButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import AuthInput from '../../components/UI/AuthInput';
import HeaderButtom from '../../components/UI/HeaderButton';
import { recoveryPassword } from '../../store/actions/user';
import Device from '../../theme/Device';
import { Platform } from 'react-native';
import Colors from '../../constants/Colors';
import AuthStartScreen from '../Auth/AuthScreen';
import style from './styles';


const ValidateCodeScreen = (props) => {
  const handlePress = () => {
    Alert.alert(
      'Valid code',
      'Continue and change your password',
      [
        {
          text: 'Continue',
          onPress: () => props.navigation.navigate('ChangePassword'),
        },
      ],
      { cancelable: false }
    );
  };

  const handleResend = () => {
    Alert.alert(
      'Resent code',
      'Please check you email to get the code',
      [
        {
          text: 'Acept',
          onPress: () => props.navigation.navigate('ValidateCode'),
        },
      ],
      { cancelable: false }
    );
  };
    
  const [value, setValue] = useState('');

  const formatCode = (text) => {
    // Elimina cualquier guión existente
    text = text.replace(/-/g, '');
    // Inserta guiones después de cada 2 caracteres
    text = text.replace(/(.{2})/g, '$1-');
    // Elimina el guión adicional al final
    text = text.replace(/-$/, '');
    return text;
  }

  const handleChange = (text) => {
    // Formatea el texto ingresado
    const formattedText = formatCode(text);
    setValue(formattedText);
  }


  return (
    <KeyboardAvoidingView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scroll_container}>
      <View style={styles.auth_text_container}>
        <Text style={styles.auth_text_big}>Validate code</Text>
        <Text style={styles.auth_text_small}>
        Validate the recovery code we sent you to your email
        </Text>
      </View>
  
      <View style={styles.auth_button_email}>
      <TextInput style={styles.code_container}
      value={value}
      onChangeText={handleChange}
      placeholderTextColor="#B0B3B8"
      placeholder="NN - NN - NN"
      maxLength={8} // Establece la longitud máxima del texto en 11 caracteres
      keyboardType='numeric'
    />  
      <TouchableOpacity onPress={handleResend}>
        <Text style={styles.auth_text_small}>Resend code</Text>
      </TouchableOpacity>
      
      </View>
 
      <View style={styles.button_container}>
        <AuthButton text="Confirm" 
        onPress={handlePress}
        backgroundColor={Colors.bg}/>
      </View>
      </ScrollView>
      </KeyboardAvoidingView>
  );
};

ValidateCodeScreen.navigationOptions = (navData) => {
  return {
    headerTitle: '',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButtom}>
        <Item
          iconName={
            Platform.OS === 'android' ? 'ios-arrow-back' : 'ios-arrow-back'
          }
          onPress={() => {
            navData.navigation.navigate('Recovery');
          }}
          title="Back arrow"
        />
      </HeaderButtons>
    ),
  };
};

export default ValidateCodeScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.bg,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100%',
  },
  scroll_container:{
    flexGrow:1,
    flexDirection:'column',
    justifyContent:'space-between'
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
    width: '100%',
    height:'18%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent:'space-around'
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
  code_container:{
    backgroundColor: '#494863',
    borderRadius: 10,
    width:'60%',
    paddingVertical:10,
    marginBottom:10,
    textAlign: 'center',
    fontSize: 20,
    color: Colors.white
  },
});


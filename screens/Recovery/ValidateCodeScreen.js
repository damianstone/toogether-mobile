import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import AuthButton from '../../components/UI/AuthButton';
import Device from '../../theme/Device';
import Colors from '../../constants/Colors';
import ActivityModal from '../../components/UI/ActivityModal';
import * as c from '../../constants/requestTypes/user';
import { validateCode } from '../../store/actions/user';
import { sendRecoveryCode } from '../../store/actions/user';
import { check400Error, checkServerError } from '../../utils/errors';

const ValidateCodeScreen = (props) => {
  const { email } = props.route.params;

  const dispatch = useDispatch();
  const [code, setCode] = useState('');

  const { data, error, loading } = useSelector((state) => state.validateCode);
  const { data: dataResend } = useSelector((state) => state.sendRecoveryCode);

  const handleResend = () => {
    dispatch(sendRecoveryCode(email));
  };

  const formatCode = (text) => {
    // Remove existing hyphen
    text = text.replace(/-/g, '');
    // Insert hyphen each 2 characters
    text = text.replace(/(.{2})/g, '$1-');
    // Remove last hyphen added to end
    text = text.replace(/-$/, '');
    return text;
  };

  const handleChange = (text) => {
    // Formatea el texto ingresado
    const formattedText = formatCode(text);
    setCode(formattedText);
  };

  useEffect(() => {
    if (error) {
      if (error?.response?.status === 400) {
        check400Error(error);
      } else {
        checkServerError(error);
      }
    }

    if (data) {
      props.navigation.navigate('ChangePassword', {
        email: email,
        token: data.AccessToken,
      });
    }

    dispatch({ type: c.VALIDATE_CODE_RESET });
  }, [dispatch, error, data]);

  useEffect(() => {
    if (dataResend) {
      Alert.alert(
        'Code sent',
        'Please check your email. The code may take a while to arrive',
        [{ text: 'OK' }]
      );
    }
  }, [dataResend]);

  const handlePress = () => {
    const fixedCode = code.replace(/-/g, '');
    if (code) {
      dispatch(validateCode(email, fixedCode));
    } else {
      Alert.alert('Error', 'Please enter the code', [{ text: 'OK' }]);
    }
  };

  if (loading) {
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
  }

  return (
    <View style={styles.screen}>
      <KeyboardAvoidingView style={styles.scroll_container}>
        <View style={styles.auth_text_container}>
          <Text style={styles.auth_text_big}>Validate code</Text>
          <Text style={styles.auth_text_small}>
            Validate the recovery code we sent you to your email
          </Text>
        </View>

        <View style={styles.auth_button_email}>
          <TextInput
            style={styles.code_container}
            value={code}
            onChangeText={handleChange}
            placeholderTextColor="#B0B3B8"
            placeholder="NN - NN - NN"
            maxLength={8} // Establece la longitud máxima del texto en 11 caracteres
            keyboardType="numeric"
          />
          <TouchableOpacity onPress={handleResend}>
            <Text style={styles.auth_text_small}>Resend code</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.button_container}>
          <AuthButton
            text="Confirm"
            onPress={handlePress}
            backgroundColor={Colors.bg}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
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
  scroll_container: {
    flexGrow: 1,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.bg,
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
    height: '18%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button_container: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    backgroundColor: Colors.bg,
    padding: Platform.OS === 'ios' ? 20 : 0,
    paddingHorizontal: Platform.OS === 'ios' ? 0 : 20,
    paddingVertical: Platform.OS === 'ios' ? '7%' : 0,
    paddingBottom: Platform.OS === 'ios' ? '7%' : 0.09 * Device.height,
  },
  code_container: {
    backgroundColor: '#494863',
    borderRadius: 10,
    width: '60%',
    paddingVertical: 10,
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 20,
    color: Colors.white,
  },
});

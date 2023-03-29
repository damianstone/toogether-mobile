import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButtom from '../../components/UI/HeaderButton';

import { recoveryPassword } from '../../store/actions/user';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const RecoveryScreen = (props) => {
  const [inputEmail, setInputEmail] = useState('');
  const dispatch = useDispatch();

  const recoverycode = useSelector((state) => state.recoverycode);
  const { data } = recoverycode;
  console.log(recoverycode);

  return (
    <>
      <View>
        <Text>Change your password</Text>
      </View>
      <View style={styles.container}>
        <TextInput
          value={inputEmail}
          placeholder="hello@gmail.com"
          placeholderTextColor="#D8D8D8"
          onChangeText={(text) => setInputEmail(text)}
        />
        <Button
          title="send email"
          onPress={() => dispatch(recoveryPassword(inputEmail))}
        />
        <Text>{data}</Text>
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

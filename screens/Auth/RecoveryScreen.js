import React from 'react';
import { View, Text } from 'react-native';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButtom from '../../components/UI/HeaderButton';

const RecoveryScreen = (props) => {
  return (
    <View>
      <Text>Screen</Text>
    </View>
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

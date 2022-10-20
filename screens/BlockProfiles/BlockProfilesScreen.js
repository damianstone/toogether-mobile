import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import {
  listBlockedProfiles,
  disblockProfile,
} from '../../store/actions/block';
import { checkServerError } from '../../utils/errors';

import HeaderButtom from '../../components/UI/HeaderButton';
import AuthButton from '../../components/UI/AuthButton';
import Loader from '../../components/UI/Loader';
import Colors from '../../constants/Colors';
import * as c from '../../constants/user';

const BlockProfilesScreen = () => {
  return (
    <View style={styles.screen}>
      <Text>Blocked profiles</Text>
    </View>
  );
};

BlockProfilesScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Blocked Users',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButtom}>
        <Item
          iconName={
            Platform.OS === 'android' ? 'ios-arrow-back' : 'ios-arrow-back'
          }
          onPress={() => {
            // go to chat screen
            navData.navigation.goBack();
          }}
          title="Back arrow"
        />
      </HeaderButtons>
    ),
  };
};

export default BlockProfilesScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.bg,
  },
});

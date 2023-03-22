import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

import Avatar from './Avatar';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButtom from './HeaderButton';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../constants/Colors';

const Header = () => {
  const navData = useNavigation();

  return ({
    headerTitleAlign: 'center',
    headerStyle: {
      backgroundColor: Colors.bg,
      shadowColor: 'transparent',
    },
    headerTitle: () => (
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/logo-1.png')}
          style={styles.logo}
        />
      </View>
    ),
    headerLeft: () => (
      <Avatar
        onPress={() => {
          navData.navigate('MyProfile');
        }}
      />
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButtom}>
        <Item
          title="Chat"
          iconName={
            Platform.OS === 'android'
              ? 'chatbubble-outline'
              : 'chatbubble-outline'
          }
          onPress={() => {
            navData.navigate('Match');
          }}
        />
      </HeaderButtons>
    ),
  });
};

export default Header;

const styles = StyleSheet.create({
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 57,
    height: 35,
  },
});

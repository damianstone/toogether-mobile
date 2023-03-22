import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';

import Avatar from './Avatar';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButtom from './HeaderButton';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../constants/Colors';

const Header = (props) => {
  const navData = useNavigation();

  const headerTitleComponent = () => {
    const screenName = props.route.name;
    console.log(screenName)
    switch (screenName) {
      case "MyProfileNavigator":
        return (
          <Text style={styles.textContainer}>
            My Profile
          </Text>
        );
      case "LikesScreen":
        return (
          <Text style={styles.textContainer}>
            Likes
          </Text>
        );
      default :
        return (
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/images/logo-1.png')}
              style={styles.logo}
            />
          </View>
        );
    }
  }

  return ({
    headerTitleAlign: 'center',
    headerStyle: {
      backgroundColor: Colors.bg,
      shadowColor: 'transparent',
    },
    headerTitle: headerTitleComponent,
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
  textContainer: {
    fontSize: 24,
    color: Colors.white,
  }
});

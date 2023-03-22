import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';

import Avatar from './Avatar';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButtom from './HeaderButton';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../constants/Colors';

const Header = (props) => {
  const navData = useNavigation();
  const screenName = props.route.name;
  console.log(screenName)

  const headerTitleComponent = () => {
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

  const headerLeftComponent= () => {
    switch (screenName) {
      case "MyProfileNavigator":
        return (
          <HeaderButtons HeaderButtonComponent={HeaderButtom}>
            <Item
              iconName={
                Platform.OS === 'android' ? 'ios-arrow-back' : 'ios-arrow-back'
              }
              onPress={() => {
                navData.navigate('SwipeScreen');
              }}
              title="Back arrow"
            />
          </HeaderButtons>
        );
      default :
        return (
          <Avatar
            onPress={() => {
              navData.navigate('MyProfile');
            }}
          />
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
    headerLeft: headerLeftComponent,
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

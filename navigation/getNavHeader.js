/*

type 1: just arrow back
type 2: avatar - chatscreen
type 3: avatar - logo - chat screen
type 4: custom

*/

import { View, Image } from 'react-native';
import Avatar from '../components/UI/Avatar';
import HeaderButtom from '../components/UI/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

export const getNavHeader = (type, title, navigation) => {
  switch (type) {
    case type === 1:
      return {
        title: title,
        headerLeft: () => (
          <HeaderButtons HeaderButtonComponent={HeaderButtom}>
            <Item
              iconName={
                Platform.OS === 'android' ? 'ios-arrow-back' : 'ios-arrow-back'
              }
              onPress={() => {
                navigation.goBack();
              }}
              title="Back arrow"
            />
          </HeaderButtons>
        ),
      };

    case type === 2:
      return {
        headerTitle: title,
        headerLeft: () => (
          <Avatar
            onPress={() => {
              navigation.navigate('MyProfile');
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
                navigation.navigate('Match');
              }}
            />
          </HeaderButtons>
        ),
      };

    case type === 3:
      return {
        headerTitle: () => (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image
              source={require('../assets/images/logo-1.png')}
              style={{ width: 57, height: 35 }}
            />
          </View>
        ),
        headerLeft: () => (
          <Avatar
            onPress={() => {
              navigation.navigate('MyProfile');
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
                navigation.navigate('Match');
              }}
            />
          </HeaderButtons>
        ),
      };

    case type === 4:
      return {
        title: custom.title,
        headerRight: () => (
          <HeaderButtons HeaderButtonComponent={HeaderButtom}>
            <Item
              iconName={
                Platform.OS === 'android'
                  ? custom.androidRightIcon
                  : custom.iosRightIcon
              }
              onPress={custom.rightNavigation}
              title={custom.title}
            />
          </HeaderButtons>
        ),
        headerLeft: () => (
          <HeaderButtons HeaderButtonComponent={HeaderButtom}>
            <Item
              iconName={
                Platform.OS === 'android'
                  ? custom.androidLeftIcon
                  : custom.iosLeftIcon
              }
              onPress={custom.leftNavigation}
              title="Back arrow"
            />
          </HeaderButtons>
        ),
      };
  }
};

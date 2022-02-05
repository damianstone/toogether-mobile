import React, { useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { StatusBar } from 'expo-status-bar';
import { useSelector } from 'react-redux';
import Swiper from 'react-native-deck-swiper';
import tw from 'tailwind-rn';

import styles from './styles';
import SwipeButtons from '../../components/SwipeButtons/SwipeButtons';
import HeaderButtom from '../../components/UI/HeaderButton';
import Card from '../../components/Card/Card';
import Colors from '../../constants/Colors';

const Swipe = (props) => {
  const groups = useSelector((state) => state.groups.groups);
  const swipeRef = useRef(null);
  return (
    // CARD SECTION
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      <View style={styles.screen}>
        <View style={styles.swipeContainer}>
          <Swiper
            containerStyle={tw('bg-transparent')}
            cards={groups}
            ref={swipeRef}
            stackSize={5}
            cardIndex={0}
            animateCardOpacity
            verticalSwipe={false}
            overlayLabels={{
              left: {
                title: 'NOPE',
                style: {
                  label: {
                    textAlign: 'right',
                    color: 'red',
                  },
                },
              },
              right: {
                title: 'MATCH',
                style: {
                  label: {
                    textAlign: 'left',
                    color: 'green',
                  },
                },
              },
            }}
            onSwipedLeft={() => {
              console.log('left');
            }}
            onSwipedRight={() => {
              console.log('right');
            }}
            renderCard={(group) => (
              <Card
                key={group.id}
                firstName={group.members[0].firstName}
                profiles={group.members}
              />
            )}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <SwipeButtons
            onLeft={() => {
              swipeRef.current.swipeLeft();
            }}
            onRight={() => {
              swipeRef.current.swipeRight();
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

Swipe.navigationOptions = (navData) => {
  return {
    headerTitle: () => (
      <Image
        source={require('../../assets/images/logo-1.png')}
        style={styles.logo}
      />
    ),
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButtom}>
        <Item
          title="Cart"
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => {
            // go to user profile
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButtom}>
        <Item
          title="Cart"
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => {
            // go to chat screen
            navData.navigation.navigate('Chat');
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default Swipe;

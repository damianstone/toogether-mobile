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
import Swiper from 'react-native-deck-swiper';
import tw from 'tailwind-rn';

import styles from './styles';
import SwipeButtons from '../../components/SwipeButtons/SwipeButtons';
import HeaderButtom from '../../components/UI/HeaderButton';
import Card from '../../components/Card/Card';
import Colors from '../../constants/Colors';

const burned_data = [
  {
    firstName: 'Elizabeth',
    lastName: 'Olsen',
    occupation: 'Actress',
    photoURL:
      'https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTE5NTU2MzE2NTE5MzAyNjY3/elizabeth-olsen-20631899-1-402.jpg',
    age: 32,
  },
  {
    firstName: 'Elon',
    lastName: 'Musk',
    occupation: 'Software Developer',
    photoURL:
      'https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTc5OTk2ODUyMTMxNzM0ODcy/gettyimages-1229892983-square.jpg',
    age: 40,
  },
  {
    firstName: 'Rafael',
    lastName: 'Nadal',
    occupation: 'Tennis player',
    photoURL:
      'https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTc5ODc2ODQzNzY2MTYzMDU1/gettyimages-982701222.jpg',
    age: 35,
  },
];

const Swipe = (props) => {
  const swipeRef = useRef(null);
  return (
    // CARD SECTION
    <SafeAreaView style={styles.safe}>
      <StatusBar style={{backgroundColor: Colors.bg}} />
      <View style={styles.screen}>
        <View style={styles.swipeContainer}>
          <Swiper
            containerStyle={tw('bg-transparent')}
            cards={burned_data}
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
            renderCard={(card) => (
              <Card
                photoURL={card.photoURL}
                firstName={card.firstName}
                lastName={card.lastName}
                occupation={card.occupation}
                age={card.age}
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
    headerTitle: 'Swipe',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButtom}>
        <Item
          title="Cart"
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => {
            // go to chat screen
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

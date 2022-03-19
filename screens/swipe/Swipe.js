import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  View,
  Image,
  Platform,
  SafeAreaView,
  TouchableOpacity,
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

const Swipe = (props) => {
  // get the groups from the reducer
  const groups = useSelector((state) => state.groups.groups);
  const swipeRef = useRef(null);

  const showProfileHandler = (id) => {
    props.navigation.navigate('Profile', { profileId: id });
  };

  return (
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
            renderCard={(elem) => (
              <Card
                key={elem.id}
                firstName={elem.length > 1 ? elem.members[0].firstName : null}
                profiles={elem.members}
                onProfile={showProfileHandler}
              />
            )}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <SwipeButtons
            rewind={true}
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
      <TouchableOpacity
        style={styles.imgContainer}
        onPress={() => {
          navData.navigation.navigate('MyProfile');
        }}>
        <Image
          source={require('../../assets/images/Profiles/user.jpeg')}
          style={styles.img}
        />
      </TouchableOpacity>
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

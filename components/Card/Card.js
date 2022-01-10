import React, { useRef } from 'react';
import { Text, View, Image } from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';
import Swiper from 'react-native-deck-swiper';
import styles from './styles';
import tw from 'tailwind-rn';
import SwipeButtons from '../SwipeButtons/SwipeButtons';
import Colors from '../../constants/Colors';

const Card = (props) => {
  const swipeRef = useRef(null);
  return (
    <View style={styles.screen}>
      <View style={styles.swipeContainer}>
        <View></View>
        <Swiper
          containerStyle={tw('bg-transparent')}
          cards={props.data}
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
            <View style={tw('bg-white h-3/4 rounded-xl')}>
              <Image
                style={tw('flex-1 rounded-t-xl')}
                source={{ uri: card.photoURL }}
              />
              <View
                style={[
                  tw('flex-row justify-between p-4 rounded-b-xl'),
                  styles.cardShadow,
                ]}>
                <View>
                  <Text style={tw('text-xl font-bold')}>
                    {card.firstName} {card.lastName}
                  </Text>
                  <Text>{card.occupation}</Text>
                </View>
                <Text style={tw('text-2xl font-bold')}>{card.age}</Text>
              </View>
              {/* <Text>{card.firstName}</Text> */}
            </View>
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
  );
};

export default Card;

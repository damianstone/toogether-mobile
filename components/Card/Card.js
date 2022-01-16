import React from 'react';
import { Text, View, Image, ImageBackground } from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';
import tw from 'tailwind-rn';

import styles from './styles';
import Info from '../Info';

// ADD SWIPER TO SLIDE BETWEEN INTEGRANTS
const Card = (props) => {
  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <View style={styles.groupName}>
          <Text style={styles.text}>Grupo de Cata</Text>
        </View>
        <ImageBackground
          style={styles.image}
          imageStyle={styles.imageStyle}
          source={{ uri: props.photoURL }}
          resizeMode="cover">
          <Info
            firstName={props.firstName}
            lastName={props.lastName}
            occupation={props.occupation}
            age={props.age}
          />
        </ImageBackground>
      </View>
    </View>
  );
};

export default Card;

/* 

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
                </View>
*/

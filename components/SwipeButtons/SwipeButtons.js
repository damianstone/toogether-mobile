import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';
import tw from 'tailwind-rn';
import styles from './styles';

const SwipeButtons = (props) => {
  return (
    <View style={[tw('flex flex-row justify-evenly pb-4'), styles.screen]}>
      <TouchableOpacity
        style={tw(
          'bg-red-200 rounded-full w-16 h-16 items-center justify-center'
        )}
        onPress={props.onLeft}>
        <Entypo name="cross" size={24} color="red" />
      </TouchableOpacity>
      <TouchableOpacity
        style={tw(
          'bg-green-200 rounded-full w-16 h-16 items-center justify-center'
        )}
        onPress={props.onRight}>
        <Entypo name="heart" size={24} color="green" />
      </TouchableOpacity>
    </View>
    /* <Button title="Go to the chat screen" onPress={()=>navigation.navigate('ChatScreen')}/>
      <Button title="Logout" onPress={()=>logout()}/> */
  );
};

export default SwipeButtons;

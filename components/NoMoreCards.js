import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

const NoMoreCards = () => {
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>NoMoreSwipesScreen</Text>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/images/noProfilesFound.png')}
          style={styles.image}
        />
      </View>
    </View>
  );
};

export default NoMoreCards;

const styles = StyleSheet.create({
  screen: {
      flex: 1, 
      flexDirection: 'column'
  },
  imageContainer: {
    padding: 20,
    marginVertical: 20,
    width: 280,
    height: 300,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

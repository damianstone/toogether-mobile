import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';

const DetailCard = (props) => {
  return (
    <ScrollView styls={styles.screen}>
      <View style={styles.container}>
        <Text
          style={
            styles.nameText
          }>{`${props.name} y ${props.lastname}, ${props.age}`}</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.infoWrapper}>
          <Text>ICON</Text>
          <Text style={styles.text}>{props.location}</Text>
        </View>
        <View style={styles.infoWrapper}>
          <Text>ICON</Text>
          <Text style={styles.text}>{props.location}</Text>
        </View>
        <View style={styles.infoWrapper}>
          <Text>ICON</Text>
          <Text style={styles.text}>{props.university}</Text>
        </View>
      </View>
      <View style={styles.line}>LINE</View>
      <View style={styles.container}>
        <Text>About</Text>
        <Text style={styles.text}>{props.description}</Text>
      </View>
    </ScrollView>
  );
};

export default DetailCard;

const styles = StyleSheet.create({
  screen: {},
  container: {},
  nameText: {},
  infoWrapper: {},
  text: {},
});

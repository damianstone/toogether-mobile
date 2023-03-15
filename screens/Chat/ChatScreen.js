import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { exist } from '../../utils/checks';

const ChatsScreen = (props) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.screen}>
      <Text>MatchsScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatsScreen;

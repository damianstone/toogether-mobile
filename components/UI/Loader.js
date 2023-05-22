import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import Colors from '../../constants/Colors';

const Loader = ({ size }) => {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ActivityIndicator size={size} color={Colors.icons} />
    </View>
  );
};

export default Loader;

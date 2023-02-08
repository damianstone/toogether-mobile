import React from 'react';
import { Text } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';

const GradientText = (props) => {
  const { style } = props;

  return (
    <MaskedView maskElement={<Text {...props} />}>
      <LinearGradient
        colors={['#ED665A', '#CF2A6E', '#BA007C']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text {...props} style={[style, { opacity: 0 }]} />
      </LinearGradient>
    </MaskedView>
  );
};

export default GradientText;

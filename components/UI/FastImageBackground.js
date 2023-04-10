import React from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';

const FastImageBackground = ({
  containerStyle,
  key,
  imageStyle,
  source,
  resizeMode,
  children,
}) => {
  const getResizeMode = () => {
    if ('contain') {
      return FastImage.resizeMode.contain;
    }
    if ('cover') {
      return FastImage.resizeMode.cover;
    }
    if ('center') {
      return FastImage.resizeMode.center;
    }
    if ('stretch') {
      return FastImage.resizeMode.stretch;
    }
  };

  return (
    <View
      style={{ flex: 1, padding: 0, margin: 0, ...containerStyle }}
      key={key}>
      <FastImage
        style={{
          ...imageStyle,
        }}
        source={source}
        resizeMode={getResizeMode(resizeMode)}
      />
      {children}
    </View>
  );
};

export default FastImageBackground;

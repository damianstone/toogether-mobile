import React from 'react';
import { View } from 'react-native';

const ScrollViewBackgroundLayer = ({
  topBounceColor,
  bottomBounceColor,
  children,
}) => (
  <View
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      width: '100%',
      height: '100%',
      zIndex: -1, // appear under the scrollview
    }}>
    <View style={{ flex: 1, backgroundColor: topBounceColor }} />
    <View style={{ flex: 1, backgroundColor: bottomBounceColor }} />
  </View>
);

export default ScrollViewBackgroundLayer;

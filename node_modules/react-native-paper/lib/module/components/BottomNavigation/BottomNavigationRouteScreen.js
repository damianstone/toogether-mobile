function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { Animated, Platform, View } from 'react-native';

class BottomNavigationRouteScreen extends React.Component {
  render() {
    const {
      style,
      index,
      children,
      visibility,
      ...rest
    } = this.props; // On Web, the unfocused tab screens can still be clicked since they are transparent, but still there
    // Hiding them with `display: none` makes sure that they won't receive clicks
    // We only set it on Web since on native, react-native-pager-view's breaks due to layout changing

    const display = Platform.OS === 'web' ? visibility === 0 ? 'none' : 'flex' : undefined;
    return /*#__PURE__*/React.createElement(View, _extends({
      testID: `RouteScreen: ${index}`,
      style: [style, {
        display
      }]
    }, rest), children);
  }

}

export default Animated.createAnimatedComponent(BottomNavigationRouteScreen);
//# sourceMappingURL=BottomNavigationRouteScreen.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativeReanimated = _interopRequireDefault(require("react-native-reanimated"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class TabBarIcon extends React.Component {
  render() {
    const {
      route,
      activeOpacity,
      inactiveOpacity,
      activeTintColor,
      inactiveTintColor,
      renderIcon,
      horizontal,
      style
    } = this.props; // We render the icon twice at the same position on top of each other:
    // active and inactive one, so we can fade between them.

    return /*#__PURE__*/React.createElement(_reactNative.View, {
      style: style
    }, /*#__PURE__*/React.createElement(_reactNativeReanimated.default.View, {
      style: [styles.icon, {
        opacity: activeOpacity
      }]
    }, renderIcon({
      route,
      focused: true,
      horizontal,
      tintColor: activeTintColor
    })), /*#__PURE__*/React.createElement(_reactNativeReanimated.default.View, {
      style: [styles.icon, {
        opacity: inactiveOpacity
      }]
    }, renderIcon({
      route,
      focused: false,
      horizontal,
      tintColor: inactiveTintColor
    })));
  }

}

exports.default = TabBarIcon;

const styles = _reactNative.StyleSheet.create({
  icon: {
    // We render the icon twice at the same position on top of each other:
    // active and inactive one, so we can fade between them:
    // Cover the whole iconContainer:
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    // Workaround for react-native >= 0.54 layout bug
    minWidth: 25
  }
});
//# sourceMappingURL=CrossFadeIcon.js.map
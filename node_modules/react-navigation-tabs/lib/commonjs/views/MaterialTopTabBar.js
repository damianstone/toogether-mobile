"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativeTabView = require("react-native-tab-view");

var _reactNativeReanimated = _interopRequireDefault(require("react-native-reanimated"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class TabBarTop extends React.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_renderLabel", ({
      route,
      focused,
      color
    }) => {
      const {
        showLabel,
        upperCaseLabel,
        labelStyle,
        allowFontScaling
      } = this.props;

      if (showLabel === false) {
        return null;
      }

      const label = this.props.getLabelText({
        route
      });

      if (typeof label === 'string') {
        return /*#__PURE__*/React.createElement(_reactNativeReanimated.default.Text, {
          style: [styles.label, {
            color
          }, labelStyle],
          allowFontScaling: allowFontScaling
        }, upperCaseLabel ? label.toUpperCase() : label);
      }

      if (typeof label === 'function') {
        return label({
          focused,
          tintColor: color
        });
      }

      return label;
    });

    _defineProperty(this, "_renderIcon", ({
      route,
      focused,
      color
    }) => {
      const {
        renderIcon,
        showIcon,
        iconStyle
      } = this.props;

      if (showIcon === false) {
        return null;
      }

      return /*#__PURE__*/React.createElement(_reactNative.View, {
        style: [styles.icon, iconStyle]
      }, renderIcon({
        route,
        focused,
        tintColor: color
      }));
    });
  }

  render() {
    const {
      navigation,
      activeTintColor,
      inactiveTintColor,

      /* eslint-disable @typescript-eslint/no-unused-vars */
      renderIcon,
      getLabelText,
      allowFontScaling,
      showLabel,
      showIcon,
      upperCaseLabel,
      tabBarPosition,
      screenProps,
      iconStyle,

      /* eslint-enable @typescript-eslint/no-unused-vars */
      ...rest
    } = this.props;
    return /*#__PURE__*/React.createElement(_reactNativeTabView.TabBar, _extends({}, rest, {
      activeColor: activeTintColor,
      inactiveColor: inactiveTintColor,
      navigationState: navigation.state,
      renderIcon: this._renderIcon,
      renderLabel: this._renderLabel
    }));
  }

}

exports.default = TabBarTop;

_defineProperty(TabBarTop, "defaultProps", {
  activeTintColor: 'rgba(255, 255, 255, 1)',
  inactiveTintColor: 'rgba(255, 255, 255, 0.7)',
  showIcon: false,
  showLabel: true,
  upperCaseLabel: true,
  allowFontScaling: true
});

const styles = _reactNative.StyleSheet.create({
  icon: {
    height: 24,
    width: 24
  },
  label: {
    textAlign: 'center',
    fontSize: 13,
    margin: 4,
    backgroundColor: 'transparent'
  }
});
//# sourceMappingURL=MaterialTopTabBar.js.map
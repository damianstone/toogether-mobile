"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativeIphoneXHelper = require("react-native-iphone-x-helper");

var _reactNavigation = require("react-navigation");

var _CrossFadeIcon = _interopRequireDefault(require("./CrossFadeIcon"));

var _withDimensions = _interopRequireDefault(require("../utils/withDimensions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const majorVersion = parseInt(_reactNative.Platform.Version, 10);
const isIos = _reactNative.Platform.OS === 'ios';
const isIOS11 = majorVersion >= 11 && isIos;
const DEFAULT_HEIGHT = 49;
const COMPACT_HEIGHT = 29;
const DEFAULT_MAX_TAB_ITEM_WIDTH = 125;
const DEFAULT_KEYBOARD_ANIMATION_CONFIG = {
  show: {
    animation: 'timing',
    config: {
      useNativeDriver: true,
      duration: 150
    }
  },
  hide: {
    animation: 'timing',
    config: {
      useNativeDriver: true,
      duration: 100
    }
  }
};

class TouchableWithoutFeedbackWrapper extends React.Component {
  render() {
    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      route,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      focused,
      onPress,
      onLongPress,
      testID,
      accessibilityLabel,
      accessibilityRole,
      accessibilityState,
      accessibilityStates,
      ...rest
    } = this.props;
    return /*#__PURE__*/React.createElement(_reactNative.TouchableWithoutFeedback, {
      onPress: onPress,
      onLongPress: onLongPress,
      testID: testID,
      hitSlop: {
        left: 15,
        right: 15,
        top: 0,
        bottom: 5
      },
      accessibilityLabel: accessibilityLabel,
      accessibilityRole: accessibilityRole,
      accessibilityState: accessibilityState // @ts-expect-error: support older RN versions
      ,
      accessibilityStates: accessibilityStates
    }, /*#__PURE__*/React.createElement(_reactNative.View, rest));
  }

}

class TabBarBottom extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      layout: {
        height: 0,
        width: 0
      },
      keyboard: false,
      visible: new _reactNative.Animated.Value(1)
    });

    _defineProperty(this, "keyboardDidShowSubscription", null);

    _defineProperty(this, "keyboardDidHideSubscription", null);

    _defineProperty(this, "context", void 0);

    _defineProperty(this, "_getKeyboardAnimationConfigByType", type => {
      const {
        keyboardHidesTabBarAnimationConfig
      } = this.props;
      const defaultKeyboardAnimationConfig = DEFAULT_KEYBOARD_ANIMATION_CONFIG[type];
      const keyboardAnimationConfig = (keyboardHidesTabBarAnimationConfig === null || keyboardHidesTabBarAnimationConfig === void 0 ? void 0 : keyboardHidesTabBarAnimationConfig[type]) || defaultKeyboardAnimationConfig; // merge config only `timing` animation

      if (keyboardAnimationConfig && keyboardAnimationConfig.animation === 'timing') {
        return { ...defaultKeyboardAnimationConfig,
          ...keyboardAnimationConfig,
          config: { ...defaultKeyboardAnimationConfig.config,
            ...keyboardAnimationConfig.config
          }
        };
      }

      return keyboardAnimationConfig;
    });

    _defineProperty(this, "_handleKeyboardShow", () => {
      this.setState({
        keyboard: true
      }, () => {
        const {
          animation,
          config
        } = this._getKeyboardAnimationConfigByType('show'); // @ts-expect-error


        _reactNative.Animated[animation](this.state.visible, {
          toValue: 0,
          ...config
        }).start();
      });
    });

    _defineProperty(this, "_handleKeyboardHide", () => {
      const {
        animation,
        config
      } = this._getKeyboardAnimationConfigByType('hide'); // @ts-expect-error


      _reactNative.Animated[animation](this.state.visible, {
        toValue: 1,
        ...config
      }).start(() => {
        this.setState({
          keyboard: false
        });
      });
    });

    _defineProperty(this, "_handleLayout", e => {
      const {
        layout
      } = this.state;
      const {
        height,
        width
      } = e.nativeEvent.layout;

      if (height === layout.height && width === layout.width) {
        return;
      }

      this.setState({
        layout: {
          height,
          width
        }
      });
    });

    _defineProperty(this, "_getActiveTintColor", () => {
      let {
        activeTintColor
      } = this.props;

      if (!activeTintColor) {
        return;
      } else if (typeof activeTintColor === 'string') {
        return activeTintColor;
      }

      return activeTintColor[this.context];
    });

    _defineProperty(this, "_getInactiveTintColor", () => {
      let {
        inactiveTintColor
      } = this.props;

      if (!inactiveTintColor) {
        return;
      } else if (typeof inactiveTintColor === 'string') {
        return inactiveTintColor;
      }

      return inactiveTintColor[this.context];
    });

    _defineProperty(this, "_getActiveBackgroundColor", () => {
      let {
        activeBackgroundColor
      } = this.props;

      if (!activeBackgroundColor) {
        return;
      } else if (typeof activeBackgroundColor === 'string') {
        return activeBackgroundColor;
      }

      return activeBackgroundColor[this.context];
    });

    _defineProperty(this, "_getInactiveBackgroundColor", () => {
      let {
        inactiveBackgroundColor
      } = this.props;

      if (!inactiveBackgroundColor) {
        return;
      } else if (typeof inactiveBackgroundColor === 'string') {
        return inactiveBackgroundColor;
      }

      return inactiveBackgroundColor[this.context];
    });

    _defineProperty(this, "_renderLabel", ({
      route,
      focused
    }) => {
      const {
        labelStyle,
        showLabel,
        showIcon,
        allowFontScaling
      } = this.props;

      if (showLabel === false) {
        return null;
      }

      const activeTintColor = this._getActiveTintColor();

      const inactiveTintColor = this._getInactiveTintColor();

      const label = this.props.getLabelText({
        route
      });
      const tintColor = focused ? activeTintColor : inactiveTintColor;

      const horizontal = this._shouldUseHorizontalLabels();

      if (typeof label === 'string') {
        return /*#__PURE__*/React.createElement(_reactNative.Animated.Text, {
          numberOfLines: 1,
          style: [styles.label, {
            color: tintColor
          }, showIcon && horizontal ? styles.labelBeside : styles.labelBeneath, labelStyle],
          allowFontScaling: allowFontScaling
        }, label);
      }

      if (typeof label === 'function') {
        return label({
          focused,
          tintColor,
          orientation: horizontal ? 'horizontal' : 'vertical'
        });
      }

      return label;
    });

    _defineProperty(this, "_renderIcon", ({
      route,
      focused
    }) => {
      const {
        renderIcon,
        showIcon,
        showLabel
      } = this.props;

      if (showIcon === false) {
        return null;
      }

      const horizontal = this._shouldUseHorizontalLabels();

      const activeTintColor = this._getActiveTintColor();

      const inactiveTintColor = this._getInactiveTintColor();

      const activeOpacity = focused ? 1 : 0;
      const inactiveOpacity = focused ? 0 : 1;
      return /*#__PURE__*/React.createElement(_CrossFadeIcon.default, {
        route: route,
        horizontal: horizontal,
        activeOpacity: activeOpacity,
        inactiveOpacity: inactiveOpacity,
        activeTintColor: activeTintColor,
        inactiveTintColor: inactiveTintColor,
        renderIcon: renderIcon,
        style: [styles.iconWithExplicitHeight, showLabel === false && !horizontal && styles.iconWithoutLabel, showLabel !== false && !horizontal && styles.iconWithLabel]
      });
    });

    _defineProperty(this, "_shouldUseHorizontalLabels", () => {
      const {
        routes
      } = this.props.navigation.state;
      const {
        isLandscape,
        dimensions,
        adaptive,
        tabStyle,
        labelPosition
      } = this.props;

      if (labelPosition) {
        let position;

        if (typeof labelPosition === 'string') {
          position = labelPosition;
        } else {
          position = labelPosition({
            deviceOrientation: isLandscape ? 'horizontal' : 'vertical'
          });
        }

        if (position) {
          return position === 'beside-icon';
        }
      }

      if (!adaptive) {
        return false;
      } // @ts-ignore


      if (_reactNative.Platform.isPad) {
        let maxTabItemWidth = DEFAULT_MAX_TAB_ITEM_WIDTH;

        const flattenedStyle = _reactNative.StyleSheet.flatten(tabStyle);

        if (flattenedStyle) {
          if (typeof flattenedStyle.width === 'number') {
            maxTabItemWidth = flattenedStyle.width;
          } else if (typeof flattenedStyle.maxWidth === 'number') {
            maxTabItemWidth = flattenedStyle.maxWidth;
          }
        }

        return routes.length * maxTabItemWidth <= dimensions.width;
      } else {
        return isLandscape;
      }
    });
  }

  componentDidMount() {
    if (_reactNative.Platform.OS === 'ios') {
      this.keyboardDidShowSubscription = _reactNative.Keyboard.addListener('keyboardWillShow', this._handleKeyboardShow);
      this.keyboardDidHideSubscription = _reactNative.Keyboard.addListener('keyboardWillHide', this._handleKeyboardHide);
    } else {
      this.keyboardDidShowSubscription = _reactNative.Keyboard.addListener('keyboardDidShow', this._handleKeyboardShow);
      this.keyboardDidHideSubscription = _reactNative.Keyboard.addListener('keyboardDidHide', this._handleKeyboardHide);
    }
  }

  componentWillUnmount() {
    var _this$keyboardDidShow, _this$keyboardDidHide;

    (_this$keyboardDidShow = this.keyboardDidShowSubscription) === null || _this$keyboardDidShow === void 0 ? void 0 : _this$keyboardDidShow.remove();
    (_this$keyboardDidHide = this.keyboardDidHideSubscription) === null || _this$keyboardDidHide === void 0 ? void 0 : _this$keyboardDidHide.remove();
  } // @ts-ignore


  render() {
    const {
      navigation,
      keyboardHidesTabBar,
      onTabPress,
      onTabLongPress,
      isLandscape,
      safeAreaInset,
      style,
      tabStyle
    } = this.props;
    const {
      routes
    } = navigation.state;
    const isDark = this.context === 'dark';

    const activeBackgroundColor = this._getActiveBackgroundColor();

    const inactiveBackgroundColor = this._getInactiveBackgroundColor();

    const {
      position,
      top,
      left = 0,
      bottom = 0,
      right = 0,
      margin,
      marginTop,
      marginLeft,
      marginBottom,
      marginRight,
      marginHorizontal,
      marginVertical,
      height,
      ...innerStyle
    } = _reactNative.StyleSheet.flatten(style || {});

    const containerStyle = {
      position,
      top,
      left,
      bottom,
      right,
      margin,
      marginTop,
      marginLeft,
      marginBottom,
      marginRight,
      marginHorizontal,
      marginVertical
    };
    const statusBarHeight = (0, _reactNativeIphoneXHelper.getStatusBarHeight)(true);
    const horizontalInset = isLandscape ? statusBarHeight : 0;
    const insets = {
      bottom: typeof (safeAreaInset === null || safeAreaInset === void 0 ? void 0 : safeAreaInset.bottom) === 'number' ? safeAreaInset.bottom : (safeAreaInset === null || safeAreaInset === void 0 ? void 0 : safeAreaInset.bottom) === 'never' ? 0 : (0, _reactNativeIphoneXHelper.getBottomSpace)(),
      left: typeof (safeAreaInset === null || safeAreaInset === void 0 ? void 0 : safeAreaInset.left) === 'number' ? safeAreaInset.left : (safeAreaInset === null || safeAreaInset === void 0 ? void 0 : safeAreaInset.left) === 'never' ? 0 : horizontalInset,
      right: typeof (safeAreaInset === null || safeAreaInset === void 0 ? void 0 : safeAreaInset.right) === 'number' ? safeAreaInset.right : (safeAreaInset === null || safeAreaInset === void 0 ? void 0 : safeAreaInset.right) === 'never' ? 0 : horizontalInset
    };
    const tabBarStyle = [{
      height: height != null ? typeof height === 'number' ? height + insets.bottom : height : // @ts-ignore: isPad exists in runtime but not available in type defs
      (this._shouldUseHorizontalLabels() && !_reactNative.Platform.isPad ? COMPACT_HEIGHT : DEFAULT_HEIGHT) + insets.bottom,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right
    }, styles.tabBar, isDark ? styles.tabBarDark : styles.tabBarLight, innerStyle];
    return /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
      style: [styles.container, containerStyle, keyboardHidesTabBar ? {
        // When the keyboard is shown, slide down the tab bar
        transform: [{
          translateY: this.state.visible.interpolate({
            inputRange: [0, 1],
            outputRange: [this.state.layout.height, 0]
          })
        }],
        // Absolutely position the tab bar so that the content is below it
        // This is needed to avoid gap at bottom when the tab bar is hidden
        position: this.state.keyboard ? 'absolute' : position
      } : null],
      pointerEvents: keyboardHidesTabBar && this.state.keyboard ? 'none' : 'auto',
      onLayout: this._handleLayout
    }, /*#__PURE__*/React.createElement(_reactNative.View, {
      style: tabBarStyle
    }, routes.map((route, index) => {
      const focused = index === navigation.state.index;
      const scene = {
        route,
        focused
      };
      const accessibilityLabel = this.props.getAccessibilityLabel({
        route
      });
      const accessibilityRole = this.props.getAccessibilityRole({
        route
      });
      const accessibilityStates = this.props.getAccessibilityStates(scene);
      const testID = this.props.getTestID({
        route
      });
      const backgroundColor = focused ? activeBackgroundColor : inactiveBackgroundColor;
      const ButtonComponent = this.props.getButtonComponent({
        route
      }) || TouchableWithoutFeedbackWrapper;
      return /*#__PURE__*/React.createElement(ButtonComponent, {
        key: route.key,
        route: route,
        focused: focused,
        onPress: () => onTabPress({
          route
        }),
        onLongPress: () => onTabLongPress({
          route
        }),
        testID: testID,
        accessibilityLabel: accessibilityLabel,
        accessibilityRole: accessibilityRole,
        accessibilityStates: accessibilityStates,
        style: [styles.tab, {
          backgroundColor
        }, this._shouldUseHorizontalLabels() ? styles.tabLandscape : styles.tabPortrait, tabStyle]
      }, this._renderIcon(scene), this._renderLabel(scene));
    })));
  }

}

_defineProperty(TabBarBottom, "defaultProps", {
  keyboardHidesTabBar: true,
  keyboardHidesTabBarAnimationConfig: DEFAULT_KEYBOARD_ANIMATION_CONFIG,
  activeTintColor: {
    light: '#007AFF',
    dark: '#fff'
  },
  inactiveTintColor: {
    light: '#8e8e93',
    dark: '#7f7f7f'
  },
  activeBackgroundColor: 'transparent',
  inactiveBackgroundColor: 'transparent',
  showLabel: true,
  showIcon: true,
  allowFontScaling: true,
  adaptive: isIOS11,
  safeAreaInset: {
    bottom: 'always',
    top: 'never'
  }
});

_defineProperty(TabBarBottom, "contextType", _reactNavigation.ThemeContext);

const styles = _reactNative.StyleSheet.create({
  tabBar: {
    borderTopWidth: _reactNative.StyleSheet.hairlineWidth,
    flexDirection: 'row'
  },
  tabBarLight: {
    backgroundColor: _reactNavigation.ThemeColors.light.header,
    borderTopColor: _reactNavigation.ThemeColors.light.headerBorder
  },
  tabBarDark: {
    backgroundColor: _reactNavigation.ThemeColors.dark.header,
    borderTopColor: _reactNavigation.ThemeColors.dark.headerBorder
  },
  container: {
    elevation: 8
  },
  tab: {
    flex: 1,
    alignItems: isIos ? 'center' : 'stretch'
  },
  tabPortrait: {
    justifyContent: 'flex-end',
    flexDirection: 'column'
  },
  tabLandscape: {
    justifyContent: 'center',
    flexDirection: 'row'
  },
  iconWithoutLabel: {
    flex: 1
  },
  iconWithLabel: {
    flex: 1
  },
  iconWithExplicitHeight: {
    // @ts-ignore
    height: _reactNative.Platform.isPad ? DEFAULT_HEIGHT : COMPACT_HEIGHT
  },
  label: {
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  labelBeneath: {
    fontSize: 11,
    marginBottom: 1.5
  },
  labelBeside: {
    fontSize: 12,
    marginLeft: 20
  }
});

var _default = (0, _withDimensions.default)(TabBarBottom);

exports.default = _default;
//# sourceMappingURL=BottomTabBar.js.map
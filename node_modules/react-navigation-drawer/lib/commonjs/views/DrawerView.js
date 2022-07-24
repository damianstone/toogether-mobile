"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNavigation = require("react-navigation");

var _reactNativeScreens = require("react-native-screens");

var DrawerActions = _interopRequireWildcard(require("../routers/DrawerActions"));

var _DrawerSidebar = _interopRequireDefault(require("./DrawerSidebar"));

var _DrawerGestureContext = _interopRequireDefault(require("../utils/DrawerGestureContext"));

var _ResourceSavingScene = _interopRequireDefault(require("./ResourceSavingScene"));

var _Drawer = _interopRequireDefault(require("./Drawer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Component that renders the drawer.
 */
class DrawerView extends React.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      loaded: [this.props.navigation.state.index],
      drawerWidth: typeof this.props.navigationConfig.drawerWidth === 'function' ? this.props.navigationConfig.drawerWidth() : this.props.navigationConfig.drawerWidth
    });

    _defineProperty(this, "context", void 0);

    _defineProperty(this, "drawerGestureRef", /*#__PURE__*/React.createRef());

    _defineProperty(this, "getLockMode", ({
      navigation,
      descriptors
    }) => {
      const activeKey = navigation.state.routes[navigation.state.index].key;
      const {
        drawerLockMode
      } = descriptors[activeKey].options;
      return drawerLockMode;
    });

    _defineProperty(this, "handleDrawerOpen", () => {
      const {
        navigation
      } = this.props;
      navigation.dispatch(DrawerActions.openDrawer({
        key: navigation.state.key
      }));
    });

    _defineProperty(this, "handleDrawerClose", () => {
      const {
        navigation
      } = this.props;
      navigation.dispatch(DrawerActions.closeDrawer({
        key: navigation.state.key
      }));
    });

    _defineProperty(this, "updateWidth", () => {
      const drawerWidth = typeof this.props.navigationConfig.drawerWidth === 'function' ? this.props.navigationConfig.drawerWidth() : this.props.navigationConfig.drawerWidth;

      if (this.state.drawerWidth !== drawerWidth) {
        this.setState({
          drawerWidth
        });
      }
    });

    _defineProperty(this, "renderNavigationView", ({
      progress
    }) => {
      return /*#__PURE__*/React.createElement(_DrawerSidebar.default, _extends({
        screenProps: this.props.screenProps,
        drawerOpenProgress: progress,
        navigation: this.props.navigation,
        descriptors: this.props.descriptors
      }, this.props.navigationConfig));
    });

    _defineProperty(this, "renderContent", () => {
      let {
        lazy,
        navigation,
        detachInactiveScreens = true
      } = this.props;
      let {
        loaded
      } = this.state;
      let {
        routes
      } = navigation.state;

      if (this.props.navigationConfig.unmountInactiveRoutes) {
        let activeKey = navigation.state.routes[navigation.state.index].key;
        let descriptor = this.props.descriptors[activeKey];
        return /*#__PURE__*/React.createElement(_reactNavigation.SceneView, {
          navigation: descriptor.navigation,
          screenProps: this.props.screenProps,
          component: descriptor.getComponent()
        });
      } else {
        const enabled = (_reactNativeScreens.screensEnabled === null || _reactNativeScreens.screensEnabled === void 0 ? void 0 : (0, _reactNativeScreens.screensEnabled)()) && detachInactiveScreens;
        return (
          /*#__PURE__*/
          // @ts-ignore
          React.createElement(_reactNativeScreens.ScreenContainer, {
            enabled: enabled,
            style: styles.content
          }, routes.map((route, index) => {
            if (lazy && !loaded.includes(index)) {
              // Don't render a screen if we've never navigated to it
              return null;
            }

            let isFocused = navigation.state.index === index;
            let descriptor = this.props.descriptors[route.key];
            return /*#__PURE__*/React.createElement(_ResourceSavingScene.default, {
              key: route.key,
              style: [_reactNative.StyleSheet.absoluteFill, {
                opacity: isFocused ? 1 : 0
              }],
              isVisible: isFocused,
              enabled: detachInactiveScreens
            }, /*#__PURE__*/React.createElement(_reactNavigation.SceneView, {
              navigation: descriptor.navigation,
              screenProps: this.props.screenProps,
              component: descriptor.getComponent()
            }));
          }))
        );
      }
    });

    _defineProperty(this, "setDrawerGestureRef", ref => {
      // @ts-ignore
      this.drawerGestureRef.current = ref;
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      index
    } = nextProps.navigation.state;
    return {
      // Set the current tab to be loaded if it was not loaded before
      loaded: prevState.loaded.includes(index) ? prevState.loaded : [...prevState.loaded, index]
    };
  }

  componentDidMount() {
    // If drawerLockMode was set to `locked-open`, we should open the drawer on mount
    if (this.getLockMode(this.props) === 'locked-open') {
      this.handleDrawerOpen();
    }

    _reactNative.Dimensions.addEventListener('change', this.updateWidth);
  }

  componentDidUpdate(prevProps) {
    const prevLockMode = this.getLockMode(prevProps);
    const nextLockMode = this.getLockMode(this.props);

    if (prevLockMode !== nextLockMode) {
      if (nextLockMode === 'locked-open') {
        this.handleDrawerOpen();
      } else {
        this.handleDrawerClose();
      }
    }
  }

  componentWillUnmount() {
    _reactNative.Dimensions.removeEventListener('change', this.updateWidth);
  }

  getDrawerBackgroundColor() {
    const {
      drawerBackgroundColor
    } = this.props.navigationConfig;

    if (drawerBackgroundColor) {
      return typeof drawerBackgroundColor === 'string' ? drawerBackgroundColor : drawerBackgroundColor[this.context];
    } else {
      return _reactNavigation.ThemeColors[this.context].bodyContent;
    }
  }

  getOverlayColor() {
    const {
      overlayColor
    } = this.props.navigationConfig;

    if (overlayColor) {
      return typeof overlayColor === 'string' ? overlayColor : overlayColor[this.context];
    } else {
      return 'rgba(0,0,0,0.5)';
    }
  }

  render() {
    const {
      navigation,
      navigationConfig
    } = this.props;
    const {
      drawerType,
      sceneContainerStyle,
      edgeWidth,
      minSwipeDistance,
      hideStatusBar,
      statusBarAnimation,
      gestureHandlerProps
    } = navigationConfig;
    const drawerLockMode = this.getLockMode(this.props);
    const drawerBackgroundColor = this.getDrawerBackgroundColor();
    const overlayColor = this.getOverlayColor();
    return /*#__PURE__*/React.createElement(_DrawerGestureContext.default.Provider, {
      value: this.drawerGestureRef
    }, /*#__PURE__*/React.createElement(_Drawer.default, {
      open: navigation.state.isDrawerOpen,
      gestureEnabled: drawerLockMode !== 'locked-open' && drawerLockMode !== 'locked-closed',
      onOpen: this.handleDrawerOpen,
      onClose: this.handleDrawerClose,
      onGestureRef: this.setDrawerGestureRef,
      gestureHandlerProps: gestureHandlerProps,
      drawerType: drawerType,
      drawerPosition: this.props.navigationConfig.drawerPosition,
      sceneContainerStyle: sceneContainerStyle,
      drawerStyle: {
        backgroundColor: drawerBackgroundColor,
        width: this.state.drawerWidth
      },
      overlayStyle: {
        backgroundColor: overlayColor
      },
      swipeEdgeWidth: edgeWidth,
      swipeDistanceThreshold: minSwipeDistance,
      hideStatusBar: hideStatusBar,
      statusBarAnimation: statusBarAnimation,
      renderDrawerContent: this.renderNavigationView,
      renderSceneContent: this.renderContent
    }));
  }

}

exports.default = DrawerView;

_defineProperty(DrawerView, "contextType", _reactNavigation.ThemeContext);

_defineProperty(DrawerView, "defaultProps", {
  lazy: true
});

const styles = _reactNative.StyleSheet.create({
  content: {
    flex: 1
  }
});
//# sourceMappingURL=DrawerView.js.map
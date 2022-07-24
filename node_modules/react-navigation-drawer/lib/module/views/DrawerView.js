function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { SceneView, ThemeColors, ThemeContext } from 'react-navigation';
import { ScreenContainer, screensEnabled } from 'react-native-screens';
import * as DrawerActions from '../routers/DrawerActions';
import DrawerSidebar from './DrawerSidebar';
import DrawerGestureContext from '../utils/DrawerGestureContext';
import ResourceSavingScene from './ResourceSavingScene';
import Drawer from './Drawer';

/**
 * Component that renders the drawer.
 */
export default class DrawerView extends React.PureComponent {
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
      return /*#__PURE__*/React.createElement(DrawerSidebar, _extends({
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
        return /*#__PURE__*/React.createElement(SceneView, {
          navigation: descriptor.navigation,
          screenProps: this.props.screenProps,
          component: descriptor.getComponent()
        });
      } else {
        const enabled = (screensEnabled === null || screensEnabled === void 0 ? void 0 : screensEnabled()) && detachInactiveScreens;
        return (
          /*#__PURE__*/
          // @ts-ignore
          React.createElement(ScreenContainer, {
            enabled: enabled,
            style: styles.content
          }, routes.map((route, index) => {
            if (lazy && !loaded.includes(index)) {
              // Don't render a screen if we've never navigated to it
              return null;
            }

            let isFocused = navigation.state.index === index;
            let descriptor = this.props.descriptors[route.key];
            return /*#__PURE__*/React.createElement(ResourceSavingScene, {
              key: route.key,
              style: [StyleSheet.absoluteFill, {
                opacity: isFocused ? 1 : 0
              }],
              isVisible: isFocused,
              enabled: detachInactiveScreens
            }, /*#__PURE__*/React.createElement(SceneView, {
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

    Dimensions.addEventListener('change', this.updateWidth);
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
    Dimensions.removeEventListener('change', this.updateWidth);
  }

  getDrawerBackgroundColor() {
    const {
      drawerBackgroundColor
    } = this.props.navigationConfig;

    if (drawerBackgroundColor) {
      return typeof drawerBackgroundColor === 'string' ? drawerBackgroundColor : drawerBackgroundColor[this.context];
    } else {
      return ThemeColors[this.context].bodyContent;
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
    return /*#__PURE__*/React.createElement(DrawerGestureContext.Provider, {
      value: this.drawerGestureRef
    }, /*#__PURE__*/React.createElement(Drawer, {
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

_defineProperty(DrawerView, "contextType", ThemeContext);

_defineProperty(DrawerView, "defaultProps", {
  lazy: true
});

const styles = StyleSheet.create({
  content: {
    flex: 1
  }
});
//# sourceMappingURL=DrawerView.js.map
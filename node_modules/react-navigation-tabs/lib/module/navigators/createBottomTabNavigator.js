function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { ScreenContainer, screensEnabled } from 'react-native-screens';
import createTabNavigator from '../utils/createTabNavigator';
import BottomTabBar from '../views/BottomTabBar';
import ResourceSavingScene from '../views/ResourceSavingScene';

class TabNavigationView extends React.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      loaded: [this.props.navigation.state.index]
    });

    _defineProperty(this, "_getButtonComponent", ({
      route
    }) => {
      const {
        descriptors
      } = this.props;
      const descriptor = descriptors[route.key];
      const options = descriptor.options;

      if (options.tabBarButtonComponent) {
        return options.tabBarButtonComponent;
      }

      return undefined;
    });

    _defineProperty(this, "_renderTabBar", () => {
      const {
        tabBarComponent: TabBarComponent = BottomTabBar,
        tabBarOptions,
        navigation,
        screenProps,
        getLabelText,
        getAccessibilityLabel,
        getAccessibilityRole,
        getAccessibilityStates,
        getTestID,
        renderIcon,
        onTabPress,
        onTabLongPress
      } = this.props;
      const {
        descriptors
      } = this.props;
      const {
        state
      } = this.props.navigation;
      const route = state.routes[state.index];
      const descriptor = descriptors[route.key];
      const options = descriptor.options;

      if (options.tabBarVisible === false) {
        return null;
      }

      return /*#__PURE__*/React.createElement(TabBarComponent, _extends({}, tabBarOptions, {
        jumpTo: this._jumpTo,
        navigation: navigation,
        screenProps: screenProps,
        onTabPress: onTabPress,
        onTabLongPress: onTabLongPress,
        getLabelText: getLabelText,
        getButtonComponent: this._getButtonComponent,
        getAccessibilityLabel: getAccessibilityLabel,
        getAccessibilityRole: getAccessibilityRole,
        getAccessibilityStates: getAccessibilityStates,
        getTestID: getTestID,
        renderIcon: renderIcon
      }));
    });

    _defineProperty(this, "_jumpTo", key => {
      const {
        navigation,
        onIndexChange
      } = this.props;
      const index = navigation.state.routes.findIndex(route => route.key === key);
      onIndexChange(index);
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

  render() {
    const {
      navigation,
      renderScene,
      lazy,
      detachInactiveScreens = true
    } = this.props;
    const {
      routes
    } = navigation.state;
    const {
      loaded
    } = this.state;
    const enabled = (screensEnabled === null || screensEnabled === void 0 ? void 0 : screensEnabled()) && detachInactiveScreens;
    return /*#__PURE__*/React.createElement(View, {
      style: styles.container
    }, /*#__PURE__*/React.createElement(ScreenContainer, {
      enabled: enabled,
      style: styles.pages
    }, routes.map((route, index) => {
      if (lazy && !loaded.includes(index)) {
        // Don't render a screen if we've never navigated to it
        return null;
      }

      const isFocused = navigation.state.index === index;
      return /*#__PURE__*/React.createElement(ResourceSavingScene, {
        key: route.key,
        style: StyleSheet.absoluteFill,
        isVisible: isFocused,
        enabled: detachInactiveScreens
      }, renderScene({
        route
      }));
    })), this._renderTabBar());
  }

}

_defineProperty(TabNavigationView, "defaultProps", {
  lazy: true,
  getAccessibilityRole: () => 'button',
  getAccessibilityStates: ({
    focused
  }) => focused ? ['selected'] : []
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden'
  },
  pages: {
    flex: 1
  }
});
export default createTabNavigator(TabNavigationView);
//# sourceMappingURL=createBottomTabNavigator.js.map
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as React from 'react';
import { TabView } from 'react-native-tab-view';
import createTabNavigator from '../utils/createTabNavigator';
import MaterialTopTabBar from '../views/MaterialTopTabBar';

class MaterialTabView extends React.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "renderTabBar", props => {
      const {
        state
      } = this.props.navigation;
      const route = state.routes[state.index];
      const {
        descriptors
      } = this.props;
      const descriptor = descriptors[route.key];
      const options = descriptor.options;
      const tabBarVisible = options.tabBarVisible == null ? true : options.tabBarVisible;
      const {
        navigation,
        getLabelText,
        getAccessibilityLabel,
        getTestID,
        renderIcon,
        onTabPress,
        onTabLongPress,
        tabBarComponent: TabBarComponent = MaterialTopTabBar,
        tabBarPosition,
        tabBarOptions,
        screenProps
      } = this.props;

      if (TabBarComponent === null || !tabBarVisible) {
        return null;
      }

      return /*#__PURE__*/React.createElement(TabBarComponent, _extends({}, tabBarOptions, props, {
        tabBarPosition: tabBarPosition,
        screenProps: screenProps,
        navigation: navigation,
        getLabelText: getLabelText,
        getAccessibilityLabel: getAccessibilityLabel,
        getTestID: getTestID,
        renderIcon: renderIcon,
        onTabPress: onTabPress,
        onTabLongPress: onTabLongPress
      }));
    });
  }

  render() {
    const {
      /* eslint-disable @typescript-eslint/no-unused-vars */
      getLabelText,
      getAccessibilityLabel,
      getTestID,
      renderIcon,
      onTabPress,
      onTabLongPress,
      screenProps,
      tabBarComponent,
      tabBarOptions,

      /* eslint-enable @typescript-eslint/no-unused-vars */
      lazyPlaceholderComponent,
      pagerComponent,
      navigation,
      descriptors,
      ...rest
    } = this.props;
    const {
      state
    } = navigation;
    const route = state.routes[state.index];
    const descriptor = descriptors[route.key];
    const options = descriptor.options;
    let swipeEnabled = // @ts-ignore
    options.swipeEnabled == null ? this.props.swipeEnabled : options.swipeEnabled;

    if (typeof swipeEnabled === 'function') {
      swipeEnabled = swipeEnabled(state);
    }

    return /*#__PURE__*/React.createElement(TabView, _extends({}, rest, {
      navigationState: navigation.state,
      swipeEnabled: swipeEnabled,
      renderTabBar: this.renderTabBar,
      renderLazyPlaceholder: lazyPlaceholderComponent !== undefined ? props => /*#__PURE__*/React.createElement(lazyPlaceholderComponent, props) : undefined,
      renderPager: pagerComponent !== undefined ? props => /*#__PURE__*/React.createElement(pagerComponent, props) : undefined
    }));
  }

}

export default createTabNavigator(MaterialTabView);
//# sourceMappingURL=createMaterialTopTabNavigator.js.map
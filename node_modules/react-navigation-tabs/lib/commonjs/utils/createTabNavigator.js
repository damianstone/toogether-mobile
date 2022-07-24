"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createTabNavigator;

var React = _interopRequireWildcard(require("react"));

var _reactNavigation = require("react-navigation");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createTabNavigator(TabView) {
  class NavigationView extends React.Component {
    constructor(...args) {
      super(...args);

      _defineProperty(this, "_renderScene", ({
        route
      }) => {
        const {
          screenProps,
          descriptors
        } = this.props;
        const descriptor = descriptors[route.key];
        const TabComponent = descriptor.getComponent();
        return /*#__PURE__*/React.createElement(_reactNavigation.SceneView, {
          screenProps: screenProps,
          navigation: descriptor.navigation,
          component: TabComponent
        });
      });

      _defineProperty(this, "_renderIcon", ({
        route,
        focused,
        tintColor,
        horizontal = false
      }) => {
        const {
          descriptors
        } = this.props;
        const descriptor = descriptors[route.key];
        const options = descriptor.options;

        if (options.tabBarIcon) {
          return typeof options.tabBarIcon === 'function' ? options.tabBarIcon({
            focused,
            tintColor,
            horizontal
          }) : options.tabBarIcon;
        }

        return null;
      });

      _defineProperty(this, "_getLabelText", ({
        route
      }) => {
        const {
          descriptors
        } = this.props;
        const descriptor = descriptors[route.key];
        const options = descriptor.options;

        if (options.tabBarLabel) {
          return options.tabBarLabel;
        }

        if (typeof options.title === 'string') {
          return options.title;
        }

        return route.routeName;
      });

      _defineProperty(this, "_getAccessibilityLabel", ({
        route
      }) => {
        const {
          descriptors
        } = this.props;
        const descriptor = descriptors[route.key];
        const options = descriptor.options;

        if (typeof options.tabBarAccessibilityLabel !== 'undefined') {
          return options.tabBarAccessibilityLabel;
        }

        const label = this._getLabelText({
          route
        });

        if (typeof label === 'string') {
          const {
            routes
          } = this.props.navigation.state;
          return "".concat(label, ", tab, ").concat(routes.indexOf(route) + 1, " of ").concat(routes.length);
        }

        return undefined;
      });

      _defineProperty(this, "_getTestID", ({
        route
      }) => {
        const {
          descriptors
        } = this.props;
        const descriptor = descriptors[route.key];
        const options = descriptor.options;
        return options.tabBarTestID;
      });

      _defineProperty(this, "_makeDefaultHandler", ({
        route,
        navigation
      }) => () => {
        if (navigation.isFocused()) {
          if (route.hasOwnProperty('index') && route.index > 0) {
            // If current tab has a nested navigator, pop to top
            navigation.dispatch(_reactNavigation.StackActions.popToTop({
              key: route.key
            }));
          } else {
            navigation.emit('refocus');
          }
        } else {
          this._jumpTo(route.routeName);
        }
      });

      _defineProperty(this, "_handleTabPress", ({
        route
      }) => {
        this._isTabPress = true; // After tab press, handleIndexChange will be called synchronously
        // So we reset it in promise callback

        Promise.resolve().then(() => this._isTabPress = false);
        const {
          descriptors
        } = this.props;
        const descriptor = descriptors[route.key];
        const {
          navigation,
          options
        } = descriptor;

        const defaultHandler = this._makeDefaultHandler({
          route,
          navigation
        });

        if (options.tabBarOnPress) {
          options.tabBarOnPress({
            navigation,
            defaultHandler
          });
        } else {
          defaultHandler();
        }
      });

      _defineProperty(this, "_handleTabLongPress", ({
        route
      }) => {
        const {
          descriptors
        } = this.props;
        const descriptor = descriptors[route.key];
        const {
          navigation,
          options
        } = descriptor;

        const defaultHandler = this._makeDefaultHandler({
          route,
          navigation
        });

        if (options.tabBarOnLongPress) {
          options.tabBarOnLongPress({
            navigation,
            defaultHandler
          });
        } else {
          defaultHandler();
        }
      });

      _defineProperty(this, "_handleIndexChange", index => {
        if (this._isTabPress) {
          this._isTabPress = false;
          return;
        }

        this._jumpTo(this.props.navigation.state.routes[index].routeName);
      });

      _defineProperty(this, "_jumpTo", routeName => {
        const {
          navigation
        } = this.props;
        navigation.dispatch(_reactNavigation.SwitchActions.jumpTo({
          routeName,
          key: navigation.state.key
        }));
      });

      _defineProperty(this, "_isTabPress", false);
    }

    render() {
      const {
        descriptors,
        navigation,
        screenProps,
        navigationConfig
      } = this.props;
      const {
        state
      } = navigation;
      const route = state.routes[state.index];
      const descriptor = descriptors[route.key];
      return (
        /*#__PURE__*/
        // TODO: don't have time to fix it right now
        // @ts-ignore
        React.createElement(TabView, _extends({}, navigationConfig, descriptor.options, {
          getLabelText: this._getLabelText,
          getAccessibilityLabel: this._getAccessibilityLabel,
          getTestID: this._getTestID,
          renderIcon: this._renderIcon,
          renderScene: this._renderScene,
          onIndexChange: this._handleIndexChange,
          onTabPress: this._handleTabPress,
          onTabLongPress: this._handleTabLongPress,
          navigation: navigation,
          descriptors: descriptors,
          screenProps: screenProps
        }))
      );
    }

  }

  return (routes, config = {}) => {
    const router = (0, _reactNavigation.TabRouter)(routes, config);
    return (0, _reactNavigation.createNavigator)(NavigationView, router, config);
  };
}
//# sourceMappingURL=createTabNavigator.js.map
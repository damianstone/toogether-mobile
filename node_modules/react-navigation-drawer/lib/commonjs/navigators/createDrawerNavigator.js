"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNavigation = require("react-navigation");

var _DrawerRouter = _interopRequireDefault(require("../routers/DrawerRouter"));

var _DrawerView = _interopRequireDefault(require("../views/DrawerView"));

var _DrawerNavigatorItems = _interopRequireDefault(require("../views/DrawerNavigatorItems"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const defaultContentComponent = props => /*#__PURE__*/React.createElement(_reactNative.ScrollView, {
  alwaysBounceVertical: false
}, /*#__PURE__*/React.createElement(_reactNavigation.SafeAreaView, {
  forceInset: {
    top: 'always',
    horizontal: 'never'
  }
}, /*#__PURE__*/React.createElement(_DrawerNavigatorItems.default, props)));

const DefaultDrawerConfig = {
  drawerWidth: () => {
    /*
     * Default drawer width is screen width - header height
     * with a max width of 280 on mobile and 320 on tablet
     * https://material.io/guidelines/patterns/navigation-drawer.html
     */
    const {
      height,
      width
    } = _reactNative.Dimensions.get('window');

    const smallerAxisSize = Math.min(height, width);
    const isLandscape = width > height;
    const isTablet = smallerAxisSize >= 600;
    const appBarHeight = _reactNative.Platform.OS === 'ios' ? isLandscape ? 32 : 44 : 56;
    const maxWidth = isTablet ? 320 : 280;
    return Math.min(smallerAxisSize - appBarHeight, maxWidth);
  },
  contentComponent: defaultContentComponent,
  drawerPosition: _reactNative.I18nManager.isRTL ? 'right' : 'left',
  keyboardDismissMode: 'on-drag',
  drawerBackgroundColor: {
    light: _reactNavigation.ThemeColors.light.bodyContent,
    dark: _reactNavigation.ThemeColors.dark.bodyContent
  },
  overlayColor: {
    light: 'rgba(0, 0, 0, 0.5)',
    dark: 'rgba(0, 0, 0, 0.5)'
  },
  drawerType: 'front',
  hideStatusBar: false,
  statusBarAnimation: 'slide'
};

const DrawerNavigator = (routeConfigs, config = {}) => {
  const mergedConfig = { ...DefaultDrawerConfig,
    ...config
  };
  const drawerRouter = (0, _DrawerRouter.default)(routeConfigs, mergedConfig); // TODO: don't have time to fix it right now

  const navigator = (0, _reactNavigation.createNavigator)(_DrawerView.default, drawerRouter, mergedConfig);
  return navigator;
};

var _default = DrawerNavigator;
exports.default = _default;
//# sourceMappingURL=createDrawerNavigator.js.map
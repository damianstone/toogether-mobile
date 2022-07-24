"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNavigation = require("react-navigation");

var _reactNativeIphoneXHelper = require("react-native-iphone-x-helper");

var _HeaderSegment = _interopRequireWildcard(require("./HeaderSegment"));

var _HeaderTitle = _interopRequireDefault(require("./HeaderTitle"));

var _debounce = _interopRequireDefault(require("../../utils/debounce"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const Header = /*#__PURE__*/React.memo(function Header(props) {
  const {
    scene,
    previous,
    layout,
    insets,
    navigation,
    styleInterpolator
  } = props;
  const {
    options
  } = scene.descriptor;
  const title = typeof options.headerTitle !== 'function' && options.headerTitle !== undefined ? options.headerTitle : options.title !== undefined ? options.title : scene.route.routeName;
  let leftLabel; // The label for the left back button shows the title of the previous screen
  // If a custom label is specified, we use it, otherwise use previous screen's title

  if (options.headerBackTitle !== undefined) {
    leftLabel = options.headerBackTitle;
  } else if (previous) {
    const o = previous.descriptor.options;
    leftLabel = typeof o.headerTitle !== 'function' && o.headerTitle !== undefined ? o.headerTitle : o.title !== undefined ? o.title : previous.route.routeName;
  } // eslint-disable-next-line react-hooks/exhaustive-deps


  const goBack = React.useCallback((0, _debounce.default)(() => {
    var _navigation$dangerous;

    const key = navigation.isFirstRouteInParent() ? // If we're the first route, we're going back to a parent navigator
    // So we need to get the key of the route we're nested in
    (_navigation$dangerous = navigation.dangerouslyGetParent()) === null || _navigation$dangerous === void 0 ? void 0 : _navigation$dangerous.state.key : scene.route.key;

    if (key !== undefined) {
      navigation.dispatch(_reactNavigation.StackActions.pop({
        key
      }));
    }
  }, 50), [navigation, scene.route.key]);
  return /*#__PURE__*/React.createElement(_HeaderSegment.default, _extends({}, options, {
    insets: insets,
    layout: layout,
    scene: scene,
    title: title,
    leftLabel: leftLabel,
    headerTitle: typeof options.headerTitle !== 'function' ? props => {
      // @ts-ignore
      return /*#__PURE__*/React.createElement(_HeaderTitle.default, props);
    } : options.headerTitle,
    onGoBack: previous ? goBack : undefined,
    styleInterpolator: styleInterpolator
  }));
});
Object.defineProperty(Header, 'HEIGHT', {
  get() {
    console.warn("Deprecation in 'createStackNavigator': 'Header.HEIGHT' will be removed in a future version. Use 'useHeaderHeight' or 'HeaderHeightContext' instead");
    return (0, _HeaderSegment.getDefaultHeaderHeight)(_reactNative.Dimensions.get('window'), (0, _reactNativeIphoneXHelper.getStatusBarHeight)(true));
  }

});
var _default = Header;
exports.default = _default;
//# sourceMappingURL=Header.js.map
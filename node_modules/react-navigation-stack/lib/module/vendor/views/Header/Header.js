function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import { Dimensions } from 'react-native';
import { StackActions } from 'react-navigation';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import HeaderSegment, { getDefaultHeaderHeight } from './HeaderSegment';
import HeaderTitle from './HeaderTitle';
import debounce from '../../utils/debounce';
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


  const goBack = React.useCallback(debounce(() => {
    var _navigation$dangerous;

    const key = navigation.isFirstRouteInParent() ? // If we're the first route, we're going back to a parent navigator
    // So we need to get the key of the route we're nested in
    (_navigation$dangerous = navigation.dangerouslyGetParent()) === null || _navigation$dangerous === void 0 ? void 0 : _navigation$dangerous.state.key : scene.route.key;

    if (key !== undefined) {
      navigation.dispatch(StackActions.pop({
        key
      }));
    }
  }, 50), [navigation, scene.route.key]);
  return /*#__PURE__*/React.createElement(HeaderSegment, _extends({}, options, {
    insets: insets,
    layout: layout,
    scene: scene,
    title: title,
    leftLabel: leftLabel,
    headerTitle: typeof options.headerTitle !== 'function' ? props => {
      // @ts-ignore
      return /*#__PURE__*/React.createElement(HeaderTitle, props);
    } : options.headerTitle,
    onGoBack: previous ? goBack : undefined,
    styleInterpolator: styleInterpolator
  }));
});
Object.defineProperty(Header, 'HEIGHT', {
  get() {
    console.warn("Deprecation in 'createStackNavigator': 'Header.HEIGHT' will be removed in a future version. Use 'useHeaderHeight' or 'HeaderHeightContext' instead");
    return getDefaultHeaderHeight(Dimensions.get('window'), getStatusBarHeight(true));
  }

});
export default Header;
//# sourceMappingURL=Header.js.map
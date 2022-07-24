function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import { ScrollView as RNScrollView, Switch as RNSwitch, TextInput as RNTextInput, DrawerLayoutAndroid as RNDrawerLayoutAndroid, FlatList as RNFlatList } from 'react-native';
import createNativeWrapper from '../handlers/createNativeWrapper';
export const ScrollView = createNativeWrapper(RNScrollView, {
  disallowInterruption: true,
  shouldCancelWhenOutside: false
}); // backward type compatibility with https://github.com/software-mansion/react-native-gesture-handler/blob/db78d3ca7d48e8ba57482d3fe9b0a15aa79d9932/react-native-gesture-handler.d.ts#L440-L457
// eslint-disable-next-line @typescript-eslint/no-redeclare

export const Switch = createNativeWrapper(RNSwitch, {
  shouldCancelWhenOutside: false,
  shouldActivateOnStart: true,
  disallowInterruption: true
}); // eslint-disable-next-line @typescript-eslint/no-redeclare

export const TextInput = createNativeWrapper(RNTextInput); // eslint-disable-next-line @typescript-eslint/no-redeclare

export const DrawerLayoutAndroid = createNativeWrapper(RNDrawerLayoutAndroid, {
  disallowInterruption: true
}); // we use literal object since TS gives error when using RN's `positions`
// @ts-ignore FIXME(TS) maybe this should be removed?

DrawerLayoutAndroid.positions = {
  Left: 'left',
  Right: 'right'
}; // eslint-disable-next-line @typescript-eslint/no-redeclare

export const FlatList = /*#__PURE__*/React.forwardRef((props, ref) => /*#__PURE__*/React.createElement(RNFlatList, _extends({
  ref: ref
}, props, {
  renderScrollComponent: scrollProps => /*#__PURE__*/React.createElement(ScrollView, scrollProps)
}))); // eslint-disable-next-line @typescript-eslint/no-redeclare
//# sourceMappingURL=GestureComponents.js.map
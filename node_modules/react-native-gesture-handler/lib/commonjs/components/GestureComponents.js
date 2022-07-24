"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlatList = exports.DrawerLayoutAndroid = exports.TextInput = exports.Switch = exports.ScrollView = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _createNativeWrapper = _interopRequireDefault(require("../handlers/createNativeWrapper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const ScrollView = (0, _createNativeWrapper.default)(_reactNative.ScrollView, {
  disallowInterruption: true,
  shouldCancelWhenOutside: false
}); // backward type compatibility with https://github.com/software-mansion/react-native-gesture-handler/blob/db78d3ca7d48e8ba57482d3fe9b0a15aa79d9932/react-native-gesture-handler.d.ts#L440-L457
// eslint-disable-next-line @typescript-eslint/no-redeclare

exports.ScrollView = ScrollView;
const Switch = (0, _createNativeWrapper.default)(_reactNative.Switch, {
  shouldCancelWhenOutside: false,
  shouldActivateOnStart: true,
  disallowInterruption: true
}); // eslint-disable-next-line @typescript-eslint/no-redeclare

exports.Switch = Switch;
const TextInput = (0, _createNativeWrapper.default)(_reactNative.TextInput); // eslint-disable-next-line @typescript-eslint/no-redeclare

exports.TextInput = TextInput;
const DrawerLayoutAndroid = (0, _createNativeWrapper.default)(_reactNative.DrawerLayoutAndroid, {
  disallowInterruption: true
}); // we use literal object since TS gives error when using RN's `positions`
// @ts-ignore FIXME(TS) maybe this should be removed?

exports.DrawerLayoutAndroid = DrawerLayoutAndroid;
DrawerLayoutAndroid.positions = {
  Left: 'left',
  Right: 'right'
}; // eslint-disable-next-line @typescript-eslint/no-redeclare

const FlatList = /*#__PURE__*/React.forwardRef((props, ref) => /*#__PURE__*/React.createElement(_reactNative.FlatList, _extends({
  ref: ref
}, props, {
  renderScrollComponent: scrollProps => /*#__PURE__*/React.createElement(ScrollView, scrollProps)
}))); // eslint-disable-next-line @typescript-eslint/no-redeclare

exports.FlatList = FlatList;
//# sourceMappingURL=GestureComponents.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PickerItem;

var React = _interopRequireWildcard(require("react"));

var ReactNativeWeb = _interopRequireWildcard(require("react-native-web"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Copyright (c) Nicolas Gallagher.
 *
 * 
 *
 */
const Option = props => ReactNativeWeb.unstable_createElement('option', props);
/**
 * PickerItem Component for React Native Web
 * @returns
 */


function PickerItem({
  color,
  label,
  testID,
  value,
  enabled = true
}) {
  return /*#__PURE__*/React.createElement(Option, {
    disabled: enabled === false ? true : undefined,
    style: {
      color
    },
    testID: testID,
    value: value,
    label: label
  }, label);
}
//# sourceMappingURL=PickerItem.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNativeWeb = require("react-native-web");

var _PickerItem = _interopRequireDefault(require("./PickerItem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const Select = /*#__PURE__*/(0, React.forwardRef)((props, forwardedRef) => (0, _reactNativeWeb.unstable_createElement)('select', { ...props,
  ref: forwardedRef
}));
const Picker = /*#__PURE__*/(0, React.forwardRef)((props, forwardedRef) => {
  const {
    enabled,
    onValueChange,
    selectedValue,
    itemStyle,
    mode,
    prompt,
    dropdownIconColor,
    ...other
  } = props;
  const handleChange = React.useCallback(e => {
    const {
      selectedIndex,
      value
    } = e.target;

    if (onValueChange) {
      onValueChange(value, selectedIndex);
    }
  }, [onValueChange]);
  return (
    /*#__PURE__*/
    // $FlowFixMe
    React.createElement(Select, _extends({
      disabled: enabled === false ? true : undefined,
      onChange: handleChange,
      ref: forwardedRef,
      value: selectedValue
    }, other))
  );
}); // $FlowFixMe

Picker.Item = _PickerItem.default;
var _default = Picker;
exports.default = _default;
//# sourceMappingURL=Picker.web.js.map
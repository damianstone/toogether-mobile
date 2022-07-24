"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = StackView;

var React = _interopRequireWildcard(require("react"));

var _validateDeprecatedOptions = _interopRequireDefault(require("../utils/validateDeprecatedOptions"));

var _validateDeprecatedConfig = _interopRequireDefault(require("../utils/validateDeprecatedConfig"));

var _StackView = _interopRequireDefault(require("../vendor/views/Stack/StackView"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function StackView({
  navigation,
  descriptors: originalDescriptors,
  navigationConfig,
  ...rest
}) {
  const descriptors = Object.keys(originalDescriptors).reduce((acc, key) => {
    const options = (0, _validateDeprecatedConfig.default)(navigationConfig, (0, _validateDeprecatedOptions.default)(originalDescriptors[key].options));
    acc[key] = { ...originalDescriptors[key],
      options
    };
    return acc;
  }, {});
  return /*#__PURE__*/React.createElement(_StackView.default, _extends({
    state: navigation.state,
    descriptors: descriptors,
    navigation: navigation
  }, navigationConfig, rest));
}
//# sourceMappingURL=StackView.js.map
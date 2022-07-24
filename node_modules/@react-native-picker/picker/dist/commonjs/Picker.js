/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * 
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _PickerAndroid = _interopRequireDefault(require("./PickerAndroid"));

var _PickerIOS = _interopRequireDefault(require("./PickerIOS"));

var _PickerWindows = _interopRequireDefault(require("./PickerWindows"));

var _PickerMacOS = _interopRequireDefault(require("./PickerMacOS"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const MODE_DIALOG = 'dialog';
const MODE_DROPDOWN = 'dropdown';

/**
 * Individual selectable item in a Picker.
 */
class PickerItem extends React.Component {
  render() {
    // The items are not rendered directly
    throw null;
  }

}

/**
 * Renders the native picker component on iOS and Android. Example:
 *
 *     <Picker
 *       selectedValue={this.state.language}
 *       onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
 *       <Picker.Item label="Java" value="java" />
 *       <Picker.Item label="JavaScript" value="js" />
 *     </Picker>
 */
class Picker extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "pickerRef", /*#__PURE__*/React.createRef());

    _defineProperty(this, "blur", () => {
      var _this$pickerRef$curre;

      (_this$pickerRef$curre = this.pickerRef.current) === null || _this$pickerRef$curre === void 0 ? void 0 : _this$pickerRef$curre.blur();
    });

    _defineProperty(this, "focus", () => {
      var _this$pickerRef$curre2;

      (_this$pickerRef$curre2 = this.pickerRef.current) === null || _this$pickerRef$curre2 === void 0 ? void 0 : _this$pickerRef$curre2.focus();
    });
  }

  render() {
    if (_reactNative.Platform.OS === 'ios') {
      /* $FlowFixMe(>=0.81.0 site=react_native_ios_fb) This suppression was
       * added when renaming suppression sites. */
      return /*#__PURE__*/React.createElement(_PickerIOS.default, this.props, this.props.children);
    } else if (_reactNative.Platform.OS === 'macos') {
      /* $FlowFixMe(>=0.81.0 site=react_native_ios_fb) This suppression was
       * added when renaming suppression sites. */
      return /*#__PURE__*/React.createElement(_PickerMacOS.default, this.props, this.props.children);
    } else if (_reactNative.Platform.OS === 'android') {
      return (
        /*#__PURE__*/

        /* $FlowFixMe(>=0.81.0 site=react_native_android_fb) This suppression
         * was added when renaming suppression sites. */
        React.createElement(_PickerAndroid.default, _extends({
          ref: this.pickerRef
        }, this.props), this.props.children)
      );
    } else if (_reactNative.Platform.OS === 'windows') {
      return /*#__PURE__*/React.createElement(_PickerWindows.default, this.props, this.props.children);
    } else {
      return null;
    }
  }

}

_defineProperty(Picker, "MODE_DIALOG", MODE_DIALOG);

_defineProperty(Picker, "MODE_DROPDOWN", MODE_DROPDOWN);

_defineProperty(Picker, "Item", PickerItem);

_defineProperty(Picker, "defaultProps", {
  mode: MODE_DIALOG
});

var _default = Picker;
exports.default = _default;
//# sourceMappingURL=Picker.js.map
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

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as React from 'react';
import { Platform } from 'react-native';
import PickerAndroid from './PickerAndroid';
import PickerIOS from './PickerIOS';
import PickerWindows from './PickerWindows';
import PickerMacOS from './PickerMacOS';
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
    if (Platform.OS === 'ios') {
      /* $FlowFixMe(>=0.81.0 site=react_native_ios_fb) This suppression was
       * added when renaming suppression sites. */
      return /*#__PURE__*/React.createElement(PickerIOS, this.props, this.props.children);
    } else if (Platform.OS === 'macos') {
      /* $FlowFixMe(>=0.81.0 site=react_native_ios_fb) This suppression was
       * added when renaming suppression sites. */
      return /*#__PURE__*/React.createElement(PickerMacOS, this.props, this.props.children);
    } else if (Platform.OS === 'android') {
      return (
        /*#__PURE__*/

        /* $FlowFixMe(>=0.81.0 site=react_native_android_fb) This suppression
         * was added when renaming suppression sites. */
        React.createElement(PickerAndroid, _extends({
          ref: this.pickerRef
        }, this.props), this.props.children)
      );
    } else if (Platform.OS === 'windows') {
      return /*#__PURE__*/React.createElement(PickerWindows, this.props, this.props.children);
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

export default Picker;
//# sourceMappingURL=Picker.js.map
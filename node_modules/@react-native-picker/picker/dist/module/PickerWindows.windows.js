/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 *
 * 
 */
'use strict';

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import { processColor, requireNativeComponent, StyleSheet } from 'react-native';
const RNCPicker = requireNativeComponent('RNCPicker');

/**
 * Not exposed as a public API - use <Picker> instead.
 */
class PickerWindows extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", PickerWindows.getDerivedStateFromProps(this.props));

    _defineProperty(this, "_setRef", comboBox => {
      this._picker = comboBox;
    });

    _defineProperty(this, "_onChange", event => {
      if (this._picker) {
        this._picker.setNativeProps({
          selectedIndex: this.state.selectedIndex,
          text: this.props.text
        });
      }

      this.props.onChange && this.props.onChange(event);
      this.props.onValueChange && this.props.onValueChange(event.nativeEvent.value, event.nativeEvent.itemIndex, event.nativeEvent.text);
    });
  }

  static getDerivedStateFromProps(props) {
    let selectedIndex = -1;
    const items = [];
    React.Children.toArray(props.children).forEach((c, index) => {
      const child = c;

      if (child.props.value === props.selectedValue) {
        selectedIndex = index;
      }

      items.push({
        value: child.props.value,
        label: child.props.label,
        textColor: processColor(child.props.color)
      });
    });
    return {
      selectedIndex,
      items
    };
  }

  render() {
    const nativeProps = {
      enabled: this.props.enabled,
      items: this.state.items,
      onChange: this._onChange,
      placeholder: this.props.placeholder,
      selectedIndex: this.state.selectedIndex,
      testID: this.props.testID,
      style: [styles.pickerWindows, this.props.style, this.props.itemStyle],
      accessibilityLabel: this.props.accessibilityLabel
    };
    return /*#__PURE__*/React.createElement(RNCPicker, _extends({
      ref: this._setRef
    }, nativeProps, {
      onStartShouldSetResponder: () => true,
      onResponderTerminationRequest: () => false
    }));
  }

}

const styles = StyleSheet.create({
  pickerWindows: {
    height: 32
  }
});
export default PickerWindows;
//# sourceMappingURL=PickerWindows.windows.js.map
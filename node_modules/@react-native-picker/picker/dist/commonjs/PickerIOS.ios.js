/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 * This is a controlled component version of RNCPickerIOS
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

var _RNCPickerNativeComponent = _interopRequireDefault(require("./RNCPickerNativeComponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const PickerIOSItem = props => {
  return null;
};

class PickerIOS extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_picker", null);

    _defineProperty(this, "state", {
      selectedIndex: 0,
      items: []
    });

    _defineProperty(this, "_onChange", event => {
      if (this.props.onChange) {
        this.props.onChange(event);
      }

      if (this.props.onValueChange) {
        this.props.onValueChange(event.nativeEvent.newValue, event.nativeEvent.newIndex);
      } // The picker is a controlled component. This means we expect the
      // on*Change handlers to be in charge of updating our
      // `selectedValue` prop. That way they can also
      // disallow/undo/mutate the selection of certain values. In other
      // words, the embedder of this component should be the source of
      // truth, not the native component.


      if (this._picker && this.state.selectedIndex !== event.nativeEvent.newIndex) {
        this._picker.setNativeProps({
          selectedIndex: this.state.selectedIndex
        });
      }
    });
  }

  static getDerivedStateFromProps(props) {
    let selectedIndex = 0;
    const items = [];
    React.Children.toArray(props.children).forEach(function (child, index) {
      if (child.props.value === props.selectedValue) {
        selectedIndex = index;
      }

      items.push({
        value: child.props.value,
        label: child.props.label,
        textColor: (0, _reactNative.processColor)(child.props.color),
        testID: child.props.testID
      });
    });
    return {
      selectedIndex,
      items
    };
  }

  render() {
    var _this$props$numberOfL;

    let numberOfLines = Math.round((_this$props$numberOfL = this.props.numberOfLines) !== null && _this$props$numberOfL !== void 0 ? _this$props$numberOfL : 1);

    if (numberOfLines < 1) {
      numberOfLines = 1;
    }

    return /*#__PURE__*/React.createElement(_reactNative.View, {
      style: this.props.style
    }, /*#__PURE__*/React.createElement(_RNCPickerNativeComponent.default, {
      ref: picker => {
        this._picker = picker;
      },
      themeVariant: this.props.themeVariant,
      testID: this.props.testID,
      style: [styles.pickerIOS, this.props.itemStyle],
      items: this.state.items,
      selectedIndex: this.state.selectedIndex,
      onChange: this._onChange,
      numberOfLines: numberOfLines
    }));
  }

}

_defineProperty(PickerIOS, "Item", PickerIOSItem);

const styles = _reactNative.StyleSheet.create({
  pickerIOS: {
    // The picker will conform to whatever width is given, but we do
    // have to set the component's height explicitly on the
    // surrounding view to ensure it gets rendered.
    height: 216
  }
});

var _default = PickerIOS;
exports.default = _default;
//# sourceMappingURL=PickerIOS.ios.js.map
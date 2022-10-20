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

var _AndroidDialogPickerNativeComponent = _interopRequireDefault(require("./AndroidDialogPickerNativeComponent"));

var _AndroidDropdownPickerNativeComponent = _interopRequireDefault(require("./AndroidDropdownPickerNativeComponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const MODE_DROPDOWN = 'dropdown';

/**
 * Not exposed as a public API - use <Picker> instead.
 */
function PickerAndroid(props, ref) {
  const pickerRef = React.useRef(null);
  React.useImperativeHandle(ref, () => {
    const viewManagerConfig = _reactNative.UIManager.getViewManagerConfig(props.mode === MODE_DROPDOWN ? 'RNCAndroidDialogPicker' : 'RNCAndroidDropdownPicker');

    return {
      blur: () => {
        if (!viewManagerConfig.Commands) {
          return;
        }

        _reactNative.UIManager.dispatchViewManagerCommand((0, _reactNative.findNodeHandle)(pickerRef.current), viewManagerConfig.Commands.blur, []);
      },
      focus: () => {
        if (!viewManagerConfig.Commands) {
          return;
        }

        _reactNative.UIManager.dispatchViewManagerCommand((0, _reactNative.findNodeHandle)(pickerRef.current), viewManagerConfig.Commands.focus, []);
      }
    };
  });
  const [items, selected] = React.useMemo(() => {
    // eslint-disable-next-line no-shadow
    let selected = 0; // eslint-disable-next-line no-shadow

    const items = React.Children.toArray(props.children).map((child, index) => {
      if (child === null) {
        return null;
      }

      if (child.props.value === props.selectedValue) {
        selected = index;
      }

      const {
        enabled = true
      } = child.props;
      const {
        color,
        label,
        style = {}
      } = child.props;
      const processedColor = (0, _reactNative.processColor)(color);
      return {
        color: color == null ? null : processedColor,
        label,
        enabled,
        style: { ...style,
          color: style.color ? (0, _reactNative.processColor)(style.color) : null,
          backgroundColor: style.backgroundColor ? (0, _reactNative.processColor)(style.backgroundColor) : null
        }
      };
    });
    return [items, selected];
  }, [props.children, props.selectedValue]);
  const onSelect = React.useCallback(({
    nativeEvent
  }) => {
    const {
      position
    } = nativeEvent;
    const onValueChange = props.onValueChange;

    if (onValueChange != null) {
      if (position >= 0) {
        const children = React.Children.toArray(props.children).filter(item => item != null);
        const value = children[position].props.value;

        if (props.selectedValue !== value) {
          onValueChange(value, position);
        }
      } else {
        onValueChange(null, position);
      }
    } // The picker is a controlled component. This means we expect the
    // on*Change handlers to be in charge of updating our
    // `selectedValue` prop. That way they can also
    // disallow/undo/mutate the selection of certain values. In other
    // words, the embedder of this component should be the source of
    // truth, not the native component.


    if (pickerRef.current && selected !== position) {
      // TODO: using setNativeProps is deprecated and will be unsupported once Fabric lands. Use codegen to generate native commands
      pickerRef.current.setNativeProps({
        selected
      });
    }
  }, [props.children, props.onValueChange, props.selectedValue, selected]);
  const Picker = props.mode === MODE_DROPDOWN ? _AndroidDropdownPickerNativeComponent.default : _AndroidDialogPickerNativeComponent.default;
  const rootProps = {
    accessibilityLabel: props.accessibilityLabel,
    enabled: props.enabled,
    items,
    onBlur: props.onBlur,
    onFocus: props.onFocus,
    onSelect,
    prompt: props.prompt,
    selected,
    style: props.style,
    dropdownIconColor: (0, _reactNative.processColor)(props.dropdownIconColor),
    dropdownIconRippleColor: (0, _reactNative.processColor)(props.dropdownIconRippleColor),
    testID: props.testID,
    numberOfLines: props.numberOfLines
  };
  return /*#__PURE__*/React.createElement(Picker, _extends({
    ref: pickerRef
  }, rootProps));
}

var _default = /*#__PURE__*/React.forwardRef(PickerAndroid);

exports.default = _default;
//# sourceMappingURL=PickerAndroid.android.js.map
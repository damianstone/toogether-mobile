import * as React from 'react';
import { View, requireNativeComponent } from 'react-native';
const GestureHandlerRootViewNative = requireNativeComponent('GestureHandlerRootView');
const GestureHandlerRootViewContext = /*#__PURE__*/React.createContext(false);
export default function GestureHandlerRootView({
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement(GestureHandlerRootViewContext.Consumer, null, available => {
    if (available) {
      // If we already have a parent wrapped in the gesture handler root view,
      // We don't need to wrap it again in root view
      // We still wrap it in a normal view so our styling stays the same
      return /*#__PURE__*/React.createElement(View, rest, children);
    }

    return /*#__PURE__*/React.createElement(GestureHandlerRootViewContext.Provider, {
      value: true
    }, /*#__PURE__*/React.createElement(GestureHandlerRootViewNative, rest, children));
  });
}
//# sourceMappingURL=GestureHandlerRootView.android.js.map
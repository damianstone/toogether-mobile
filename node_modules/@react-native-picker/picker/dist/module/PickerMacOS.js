function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
import * as React from 'react';
import UnimplementedView from './UnimplementedView';

class PickerMacOS extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement(UnimplementedView, null);
  }

}
/**
 * Fallback for non-MacOS platforms
 */


_defineProperty(PickerMacOS, "Item", UnimplementedView);

export default PickerMacOS;
//# sourceMappingURL=PickerMacOS.js.map
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import validateDeprecatedOptions from '../utils/validateDeprecatedOptions';
import validateDeprecatedConfig from '../utils/validateDeprecatedConfig';
import StackViewBase from '../vendor/views/Stack/StackView';
export default function StackView({
  navigation,
  descriptors: originalDescriptors,
  navigationConfig,
  ...rest
}) {
  const descriptors = Object.keys(originalDescriptors).reduce((acc, key) => {
    const options = validateDeprecatedConfig(navigationConfig, validateDeprecatedOptions(originalDescriptors[key].options));
    acc[key] = { ...originalDescriptors[key],
      options
    };
    return acc;
  }, {});
  return /*#__PURE__*/React.createElement(StackViewBase, _extends({
    state: navigation.state,
    descriptors: descriptors,
    navigation: navigation
  }, navigationConfig, rest));
}
//# sourceMappingURL=StackView.js.map
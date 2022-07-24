"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserInterfaceStyle = getUserInterfaceStyle;
exports.setUserInterfaceStyle = setUserInterfaceStyle;
exports.withIosUserInterfaceStyle = void 0;

function _configPlugins() {
  const data = require("@expo/config-plugins");

  _configPlugins = function () {
    return data;
  };

  return data;
}

const withIosUserInterfaceStyle = config => {
  return (0, _configPlugins().withInfoPlist)(config, config => {
    config.modResults = setUserInterfaceStyle(config, config.modResults);
    return config;
  });
};

exports.withIosUserInterfaceStyle = withIosUserInterfaceStyle;

function getUserInterfaceStyle(config) {
  var _ref, _config$ios$userInter, _config$ios;

  return (_ref = (_config$ios$userInter = (_config$ios = config.ios) === null || _config$ios === void 0 ? void 0 : _config$ios.userInterfaceStyle) !== null && _config$ios$userInter !== void 0 ? _config$ios$userInter : config.userInterfaceStyle) !== null && _ref !== void 0 ? _ref : 'light';
}

function setUserInterfaceStyle(config, {
  UIUserInterfaceStyle,
  ...infoPlist
}) {
  const userInterfaceStyle = getUserInterfaceStyle(config);
  const style = mapUserInterfaceStyleForInfoPlist(userInterfaceStyle);

  if (!style) {
    return infoPlist;
  }

  return { ...infoPlist,
    UIUserInterfaceStyle: style
  };
}

function mapUserInterfaceStyleForInfoPlist(userInterfaceStyle) {
  switch (userInterfaceStyle) {
    case 'light':
      return 'Light';

    case 'dark':
      return 'Dark';

    case 'automatic':
      return 'Automatic';
  }

  return null;
}
//# sourceMappingURL=withIosUserInterfaceStyle.js.map
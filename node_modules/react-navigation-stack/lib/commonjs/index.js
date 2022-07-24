"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  createStackNavigator: true
};
Object.defineProperty(exports, "createStackNavigator", {
  enumerable: true,
  get: function () {
    return _createStackNavigator.default;
  }
});

var _index = require("./vendor/index");

Object.keys(_index).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index[key];
    }
  });
});

var _createStackNavigator = _interopRequireDefault(require("./navigators/createStackNavigator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=index.js.map
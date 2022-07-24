"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactNative = require("react-native");

var _State = require("./State");

var _Directions = require("./Directions");

const NOOP = () => {// do nothing
};

const ScrollView = _reactNative.ScrollView;
const PanGestureHandler = _reactNative.View;
const attachGestureHandler = NOOP;
const createGestureHandler = NOOP;
const dropGestureHandler = NOOP;
const updateGestureHandler = NOOP;
var _default = {
  ScrollView,
  PanGestureHandler,
  attachGestureHandler,
  createGestureHandler,
  dropGestureHandler,
  updateGestureHandler,
  // probably can be removed
  Directions: _Directions.Directions,
  State: _State.State
};
exports.default = _default;
//# sourceMappingURL=mocks.js.map
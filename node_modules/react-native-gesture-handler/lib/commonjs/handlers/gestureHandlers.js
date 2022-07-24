"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RotationGestureHandler = exports.PinchGestureHandler = exports.PanGestureHandler = exports.LongPressGestureHandler = exports.ForceTouchGestureHandler = exports.FlingGestureHandler = exports.TapGestureHandler = exports.baseProps = void 0;

var React = _interopRequireWildcard(require("react"));

var _createHandler = _interopRequireDefault(require("./createHandler"));

var _PlatformConstants = _interopRequireDefault(require("../PlatformConstants"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const baseProps = ['id', 'enabled', 'minPointers', 'waitFor', 'simultaneousHandlers', 'shouldCancelWhenOutside', 'hitSlop', 'onBegan', 'onFailed', 'onCancelled', 'onActivated', 'onEnded', 'onGestureEvent', 'onHandlerStateChange'];
exports.baseProps = baseProps;
// eslint-disable-next-line @typescript-eslint/no-redeclare -- backward compatibility; see description on the top of this file
const TapGestureHandler = (0, _createHandler.default)({
  name: 'TapGestureHandler',
  allowedProps: [...baseProps, 'maxDurationMs', 'maxDelayMs', 'numberOfTaps', 'maxDeltaX', 'maxDeltaY', 'maxDist', 'minPointers'],
  config: {}
});
exports.TapGestureHandler = TapGestureHandler;
// eslint-disable-next-line @typescript-eslint/no-redeclare -- backward compatibility; see description on the top of this file
const FlingGestureHandler = (0, _createHandler.default)({
  name: 'FlingGestureHandler',
  allowedProps: [...baseProps, 'numberOfPointers', 'direction'],
  config: {}
});
exports.FlingGestureHandler = FlingGestureHandler;

class ForceTouchFallback extends React.Component {
  componentDidMount() {
    console.warn('ForceTouchGestureHandler is not available on this platform. Please use ForceTouchGestureHandler.forceTouchAvailable to conditionally render other components that would provide a fallback behavior specific to your usecase');
  }

  render() {
    return this.props.children;
  }

}

_defineProperty(ForceTouchFallback, "forceTouchAvailable", false);

// eslint-disable-next-line @typescript-eslint/no-redeclare -- backward compatibility; see description on the top of this file
const ForceTouchGestureHandler = _PlatformConstants.default !== null && _PlatformConstants.default !== void 0 && _PlatformConstants.default.forceTouchAvailable ? (0, _createHandler.default)({
  name: 'ForceTouchGestureHandler',
  allowedProps: [...baseProps, 'minForce', 'maxForce', 'feedbackOnActivation'],
  config: {}
}) : ForceTouchFallback;
exports.ForceTouchGestureHandler = ForceTouchGestureHandler;
ForceTouchGestureHandler.forceTouchAvailable = (_PlatformConstants.default === null || _PlatformConstants.default === void 0 ? void 0 : _PlatformConstants.default.forceTouchAvailable) || false;
// eslint-disable-next-line @typescript-eslint/no-redeclare -- backward compatibility; see description on the top of this file
const LongPressGestureHandler = (0, _createHandler.default)({
  name: 'LongPressGestureHandler',
  allowedProps: [...baseProps, 'minDurationMs', 'maxDist'],
  config: {}
});
exports.LongPressGestureHandler = LongPressGestureHandler;

function validatePanGestureHandlerProps(props) {
  if (props.minDeltaX && props.activeOffsetX) {
    throw new Error("It's not supported use minDeltaX with activeOffsetXStart or activeOffsetXEnd");
  }

  if (props.maxDeltaX && props.failOffsetX) {
    throw new Error("It's not supported use minDeltaX with activeOffsetXStart or activeOffsetXEnd");
  }

  if (props.minDeltaY && props.activeOffsetY) {
    throw new Error("It's not supported use minDeltaX with activeOffsetYStart or activeOffsetYEnd");
  }

  if (props.maxDeltaY && props.failOffsetY) {
    throw new Error("It's not supported use minDeltaX with activeOffsetYStart or activeOffsetYEnd");
  }

  if (Array.isArray(props.activeOffsetX) && (props.activeOffsetX[0] > 0 || props.activeOffsetX[1] < 0)) {
    throw new Error("First element of activeOffsetX should be negative, a the second one should be positive");
  }

  if (Array.isArray(props.activeOffsetY) && (props.activeOffsetY[0] > 0 || props.activeOffsetY[1] < 0)) {
    throw new Error("First element of activeOffsetY should be negative, a the second one should be positive");
  }

  if (Array.isArray(props.failOffsetX) && (props.failOffsetX[0] > 0 || props.failOffsetX[1] < 0)) {
    throw new Error("First element of failOffsetX should be negative, a the second one should be positive");
  }

  if (Array.isArray(props.failOffsetY) && (props.failOffsetY[0] > 0 || props.failOffsetY[1] < 0)) {
    throw new Error("First element of failOffsetY should be negative, a the second one should be positive");
  }
}

function transformPanGestureHandlerProps(props) {
  const res = { ...props
  };

  if (props.minDeltaX !== undefined) {
    delete res.minDeltaX;
    res.activeOffsetXStart = -props.minDeltaX;
    res.activeOffsetXEnd = props.minDeltaX;
  }

  if (props.maxDeltaX !== undefined) {
    delete res.maxDeltaX;
    res.failOffsetXStart = -props.maxDeltaX;
    res.failOffsetXEnd = props.maxDeltaX;
  }

  if (props.minOffsetX !== undefined) {
    delete res.minOffsetX;

    if (props.minOffsetX < 0) {
      res.activeOffsetXStart = props.minOffsetX;
    } else {
      res.activeOffsetXEnd = props.minOffsetX;
    }
  }

  if (props.minDeltaY !== undefined) {
    delete res.minDeltaY;
    res.activeOffsetYStart = -props.minDeltaY;
    res.activeOffsetYEnd = props.minDeltaY;
  }

  if (props.maxDeltaY !== undefined) {
    delete res.maxDeltaY;
    res.failOffsetYStart = -props.maxDeltaY;
    res.failOffsetYEnd = props.maxDeltaY;
  }

  if (props.minOffsetY !== undefined) {
    delete res.minOffsetY;

    if (props.minOffsetY < 0) {
      res.activeOffsetYStart = props.minOffsetY;
    } else {
      res.activeOffsetYEnd = props.minOffsetY;
    }
  }

  if (props.activeOffsetX !== undefined) {
    delete res.activeOffsetX;

    if (Array.isArray(props.activeOffsetX)) {
      res.activeOffsetXStart = props.activeOffsetX[0];
      res.activeOffsetXEnd = props.activeOffsetX[1];
    } else if (props.activeOffsetX < 0) {
      res.activeOffsetXStart = props.activeOffsetX;
    } else {
      res.activeOffsetXEnd = props.activeOffsetX;
    }
  }

  if (props.activeOffsetY !== undefined) {
    delete res.activeOffsetY;

    if (Array.isArray(props.activeOffsetY)) {
      res.activeOffsetYStart = props.activeOffsetY[0];
      res.activeOffsetYEnd = props.activeOffsetY[1];
    } else if (props.activeOffsetY < 0) {
      res.activeOffsetYStart = props.activeOffsetY;
    } else {
      res.activeOffsetYEnd = props.activeOffsetY;
    }
  }

  if (props.failOffsetX !== undefined) {
    delete res.failOffsetX;

    if (Array.isArray(props.failOffsetX)) {
      res.failOffsetXStart = props.failOffsetX[0];
      res.failOffsetXEnd = props.failOffsetX[1];
    } else if (props.failOffsetX < 0) {
      res.failOffsetXStart = props.failOffsetX;
    } else {
      res.failOffsetXEnd = props.failOffsetX;
    }
  }

  if (props.failOffsetY !== undefined) {
    delete res.failOffsetY;

    if (Array.isArray(props.failOffsetY)) {
      res.failOffsetYStart = props.failOffsetY[0];
      res.failOffsetYEnd = props.failOffsetY[1];
    } else if (props.failOffsetY < 0) {
      res.failOffsetYStart = props.failOffsetY;
    } else {
      res.failOffsetYEnd = props.failOffsetY;
    }
  }

  return res;
}

function managePanProps(props) {
  if (__DEV__) {
    validatePanGestureHandlerProps(props);
  }

  return transformPanGestureHandlerProps(props);
}

// eslint-disable-next-line @typescript-eslint/no-redeclare -- backward compatibility; see description on the top of this file
const PanGestureHandler = (0, _createHandler.default)({
  name: 'PanGestureHandler',
  allowedProps: [...baseProps, 'activeOffsetY', 'activeOffsetX', 'failOffsetY', 'failOffsetX', 'minDist', 'minVelocity', 'minVelocityX', 'minVelocityY', 'minPointers', 'maxPointers', 'avgTouches', 'enableTrackpadTwoFingerGesture'],
  config: {},
  transformProps: managePanProps,
  customNativeProps: ['activeOffsetYStart', 'activeOffsetYEnd', 'activeOffsetXStart', 'activeOffsetXEnd', 'failOffsetYStart', 'failOffsetYEnd', 'failOffsetXStart', 'failOffsetXEnd']
});
exports.PanGestureHandler = PanGestureHandler;
// eslint-disable-next-line @typescript-eslint/no-redeclare -- backward compatibility; see description on the top of this file
const PinchGestureHandler = (0, _createHandler.default)({
  name: 'PinchGestureHandler',
  allowedProps: baseProps,
  config: {}
});
exports.PinchGestureHandler = PinchGestureHandler;
// eslint-disable-next-line @typescript-eslint/no-redeclare -- backward compatibility; see description on the top of this file
const RotationGestureHandler = (0, _createHandler.default)({
  name: 'RotationGestureHandler',
  allowedProps: baseProps,
  config: {}
});
exports.RotationGestureHandler = RotationGestureHandler;
//# sourceMappingURL=gestureHandlers.js.map
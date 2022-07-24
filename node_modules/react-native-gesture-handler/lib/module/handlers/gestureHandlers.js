function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Previous types exported gesture handlers as classes which creates an interface and variable, both named the same as class.
// Without those types, we'd introduce breaking change, forcing users to prefix every handler type specification with typeof
// e.g. React.createRef<TapGestureHandler> -> React.createRef<typeof TapGestureHandler>.
// See https://www.typescriptlang.org/docs/handbook/classes.html#constructor-functions for reference.
import * as React from 'react';
import createHandler from './createHandler';
import PlatformConstants from '../PlatformConstants';
export const baseProps = ['id', 'enabled', 'minPointers', 'waitFor', 'simultaneousHandlers', 'shouldCancelWhenOutside', 'hitSlop', 'onBegan', 'onFailed', 'onCancelled', 'onActivated', 'onEnded', 'onGestureEvent', 'onHandlerStateChange'];
// eslint-disable-next-line @typescript-eslint/no-redeclare -- backward compatibility; see description on the top of this file
export const TapGestureHandler = createHandler({
  name: 'TapGestureHandler',
  allowedProps: [...baseProps, 'maxDurationMs', 'maxDelayMs', 'numberOfTaps', 'maxDeltaX', 'maxDeltaY', 'maxDist', 'minPointers'],
  config: {}
});
// eslint-disable-next-line @typescript-eslint/no-redeclare -- backward compatibility; see description on the top of this file
export const FlingGestureHandler = createHandler({
  name: 'FlingGestureHandler',
  allowedProps: [...baseProps, 'numberOfPointers', 'direction'],
  config: {}
});

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
export const ForceTouchGestureHandler = PlatformConstants !== null && PlatformConstants !== void 0 && PlatformConstants.forceTouchAvailable ? createHandler({
  name: 'ForceTouchGestureHandler',
  allowedProps: [...baseProps, 'minForce', 'maxForce', 'feedbackOnActivation'],
  config: {}
}) : ForceTouchFallback;
ForceTouchGestureHandler.forceTouchAvailable = (PlatformConstants === null || PlatformConstants === void 0 ? void 0 : PlatformConstants.forceTouchAvailable) || false;
// eslint-disable-next-line @typescript-eslint/no-redeclare -- backward compatibility; see description on the top of this file
export const LongPressGestureHandler = createHandler({
  name: 'LongPressGestureHandler',
  allowedProps: [...baseProps, 'minDurationMs', 'maxDist'],
  config: {}
});

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
export const PanGestureHandler = createHandler({
  name: 'PanGestureHandler',
  allowedProps: [...baseProps, 'activeOffsetY', 'activeOffsetX', 'failOffsetY', 'failOffsetX', 'minDist', 'minVelocity', 'minVelocityX', 'minVelocityY', 'minPointers', 'maxPointers', 'avgTouches', 'enableTrackpadTwoFingerGesture'],
  config: {},
  transformProps: managePanProps,
  customNativeProps: ['activeOffsetYStart', 'activeOffsetYEnd', 'activeOffsetXStart', 'activeOffsetXEnd', 'failOffsetYStart', 'failOffsetYEnd', 'failOffsetXStart', 'failOffsetXEnd']
});
// eslint-disable-next-line @typescript-eslint/no-redeclare -- backward compatibility; see description on the top of this file
export const PinchGestureHandler = createHandler({
  name: 'PinchGestureHandler',
  allowedProps: baseProps,
  config: {}
});
// eslint-disable-next-line @typescript-eslint/no-redeclare -- backward compatibility; see description on the top of this file
export const RotationGestureHandler = createHandler({
  name: 'RotationGestureHandler',
  allowedProps: baseProps,
  config: {}
});
//# sourceMappingURL=gestureHandlers.js.map
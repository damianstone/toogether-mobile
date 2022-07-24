function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as React from 'react';
import { StyleSheet, I18nManager, Platform, Keyboard, StatusBar } from 'react-native';
import { PanGestureHandler, TapGestureHandler, State } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import DrawerProgressContext from '../utils/DrawerProgressContext';
const {
  Clock,
  Value,
  onChange,
  clockRunning,
  startClock,
  stopClock,
  interpolate,
  spring,
  abs,
  add,
  and,
  block,
  call,
  cond,
  divide,
  eq,
  event,
  greaterThan,
  lessThan,
  max,
  min,
  multiply,
  neq,
  or,
  set,
  sub
} = Animated;
const TRUE = 1;
const FALSE = 0;
const NOOP = 0;
const UNSET = -1;
const PROGRESS_EPSILON = 0.05;
const DIRECTION_LEFT = 1;
const DIRECTION_RIGHT = -1;
const SWIPE_DISTANCE_THRESHOLD_DEFAULT = 60;
const SWIPE_DISTANCE_MINIMUM = 5;
const SPRING_CONFIG = {
  stiffness: 1000,
  damping: 500,
  mass: 3,
  overshootClamping: true,
  restDisplacementThreshold: 0.01,
  restSpeedThreshold: 0.01
};
export default class Drawer extends React.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "clock", new Clock());

    _defineProperty(this, "isDrawerTypeFront", new Value(this.props.drawerType === 'front' ? TRUE : FALSE));

    _defineProperty(this, "isOpen", new Value(this.props.open ? TRUE : FALSE));

    _defineProperty(this, "nextIsOpen", new Value(UNSET));

    _defineProperty(this, "isSwiping", new Value(FALSE));

    _defineProperty(this, "gestureState", new Value(State.UNDETERMINED));

    _defineProperty(this, "touchX", new Value(0));

    _defineProperty(this, "velocityX", new Value(0));

    _defineProperty(this, "gestureX", new Value(0));

    _defineProperty(this, "offsetX", new Value(0));

    _defineProperty(this, "position", new Value(0));

    _defineProperty(this, "containerWidth", new Value(0));

    _defineProperty(this, "drawerWidth", new Value(0));

    _defineProperty(this, "drawerOpacity", new Value(0));

    _defineProperty(this, "drawerPosition", new Value(this.props.drawerPosition === 'right' ? DIRECTION_RIGHT : DIRECTION_LEFT));

    _defineProperty(this, "touchDistanceFromDrawer", cond(this.isDrawerTypeFront, cond(eq(this.drawerPosition, DIRECTION_LEFT), max( // Distance of touch start from left screen edge - Drawer width
    sub(sub(this.touchX, this.gestureX), this.drawerWidth), 0), min(multiply( // Distance of drawer from left screen edge - Touch start point
    sub(sub(this.containerWidth, this.drawerWidth), sub(this.touchX, this.gestureX)), DIRECTION_RIGHT), 0)), 0));

    _defineProperty(this, "swipeDistanceThreshold", new Value(this.props.swipeDistanceThreshold !== undefined ? this.props.swipeDistanceThreshold : SWIPE_DISTANCE_THRESHOLD_DEFAULT));

    _defineProperty(this, "swipeVelocityThreshold", new Value(this.props.swipeVelocityThreshold));

    _defineProperty(this, "currentOpenValue", this.props.open);

    _defineProperty(this, "pendingOpenValue", void 0);

    _defineProperty(this, "isStatusBarHidden", false);

    _defineProperty(this, "manuallyTriggerSpring", new Value(FALSE));

    _defineProperty(this, "transitionTo", isOpen => {
      const toValue = new Value(0);
      const frameTime = new Value(0);
      const state = {
        position: this.position,
        time: new Value(0),
        finished: new Value(FALSE),
        velocity: new Value(0)
      };
      return block([cond(clockRunning(this.clock), NOOP, [// Animation wasn't running before
      // Set the initial values and start the clock
      set(toValue, multiply(isOpen, this.drawerWidth, this.drawerPosition)), set(frameTime, 0), set(state.time, 0), set(state.finished, FALSE), set(state.velocity, this.velocityX), set(this.isOpen, isOpen), startClock(this.clock), set(this.manuallyTriggerSpring, FALSE)]), spring(this.clock, state, { ...SPRING_CONFIG,
        toValue
      }), cond(state.finished, [// Reset gesture and velocity from previous gesture
      set(this.touchX, 0), set(this.gestureX, 0), set(this.velocityX, 0), set(this.offsetX, 0), // When the animation finishes, stop the clock
      stopClock(this.clock), call([this.isOpen], ([value]) => {
        const open = Boolean(value);

        if (open !== this.props.open) {
          // Sync drawer's state after animation finished
          // This shouldn't be necessary, but there seems to be an issue on iOS
          this.toggleDrawer(this.props.open);
        }
      })])]);
    });

    _defineProperty(this, "dragX", block([onChange(this.isOpen, call([this.isOpen], ([value]) => {
      const open = Boolean(value);
      this.currentOpenValue = open; // Without this check, the drawer can go to an infinite update <-> animate loop for sync updates

      if (open !== this.props.open) {
        // If the mode changed, update state
        if (open) {
          this.props.onOpen();
        } else {
          this.props.onClose();
        }

        this.pendingOpenValue = open; // Force componentDidUpdate to fire, whether user does a setState or not
        // This allows us to detect when the user drops the update and revert back
        // It's necessary to make sure that the state stays in sync

        this.forceUpdate();
      }
    })), onChange(this.nextIsOpen, cond(neq(this.nextIsOpen, UNSET), [// Stop any running animations
    cond(clockRunning(this.clock), stopClock(this.clock)), // Update the open value to trigger the transition
    set(this.isOpen, this.nextIsOpen), set(this.gestureX, 0), set(this.nextIsOpen, UNSET)])), // This block must be after the this.isOpen listener since we check for current value
    onChange(this.isSwiping, // Listen to updates for this value only when it changes
    // Without `onChange`, this will fire even if the value didn't change
    // We don't want to call the listeners if the value didn't change
    call([this.isSwiping], ([value]) => {
      const {
        keyboardDismissMode
      } = this.props;

      if (value === TRUE) {
        if (keyboardDismissMode === 'on-drag') {
          Keyboard.dismiss();
        }

        this.toggleStatusBar(true);
      } else {
        this.toggleStatusBar(this.currentOpenValue);
      }
    })), cond(eq(this.gestureState, State.ACTIVE), [cond(this.isSwiping, NOOP, [// We weren't dragging before, set it to true
    set(this.isSwiping, TRUE), // Also update the drag offset to the last position
    set(this.offsetX, this.position)]), // Update position with previous offset + gesture distance
    set(this.position, add(this.offsetX, this.gestureX, this.touchDistanceFromDrawer)), // Stop animations while we're dragging
    stopClock(this.clock)], [set(this.isSwiping, FALSE), set(this.touchX, 0), this.transitionTo(cond(this.manuallyTriggerSpring, this.isOpen, cond(or(and(greaterThan(abs(this.gestureX), SWIPE_DISTANCE_MINIMUM), greaterThan(abs(this.velocityX), this.swipeVelocityThreshold)), greaterThan(abs(this.gestureX), this.swipeDistanceThreshold)), cond(eq(this.drawerPosition, DIRECTION_LEFT), // If swiped to right, open the drawer, otherwise close it
    greaterThan(cond(eq(this.velocityX, 0), this.gestureX, this.velocityX), 0), // If swiped to left, open the drawer, otherwise close it
    lessThan(cond(eq(this.velocityX, 0), this.gestureX, this.velocityX), 0)), this.isOpen)))]), this.position]));

    _defineProperty(this, "translateX", cond(eq(this.drawerPosition, DIRECTION_RIGHT), min(max(multiply(this.drawerWidth, -1), this.dragX), 0), max(min(this.drawerWidth, this.dragX), 0)));

    _defineProperty(this, "progress", cond( // Check if the drawer width is available to avoid division by zero
    eq(this.drawerWidth, 0), 0, abs(divide(this.translateX, this.drawerWidth))));

    _defineProperty(this, "handleGestureEvent", event([{
      nativeEvent: {
        x: this.touchX,
        translationX: this.gestureX,
        velocityX: this.velocityX
      }
    }]));

    _defineProperty(this, "handleGestureStateChange", event([{
      nativeEvent: {
        state: s => set(this.gestureState, s)
      }
    }]));

    _defineProperty(this, "handleTapStateChange", event([{
      nativeEvent: {
        oldState: s => cond(eq(s, State.ACTIVE), set(this.manuallyTriggerSpring, TRUE))
      }
    }]));

    _defineProperty(this, "handleContainerLayout", e => this.containerWidth.setValue(e.nativeEvent.layout.width));

    _defineProperty(this, "handleDrawerLayout", e => {
      this.drawerWidth.setValue(e.nativeEvent.layout.width);
      this.toggleDrawer(this.props.open); // Until layout is available, drawer is hidden with opacity: 0 by default
      // Show it in the next frame when layout is available
      // If we don't delay it until the next frame, there's a visible flicker

      requestAnimationFrame(() => requestAnimationFrame(() => this.drawerOpacity.setValue(1)));
    });

    _defineProperty(this, "toggleDrawer", open => {
      if (this.currentOpenValue !== open) {
        this.nextIsOpen.setValue(open ? TRUE : FALSE); // This value will also be set shortly after as changing this.nextIsOpen changes this.isOpen
        // However, there's a race condition on Android, so we need to set a bit earlier

        this.currentOpenValue = open;
      }
    });

    _defineProperty(this, "toggleStatusBar", hidden => {
      const {
        hideStatusBar,
        statusBarAnimation
      } = this.props;

      if (hideStatusBar && this.isStatusBarHidden !== hidden) {
        this.isStatusBarHidden = hidden;
        StatusBar.setHidden(hidden, statusBarAnimation);
      }
    });
  }

  componentDidUpdate(prevProps) {
    const {
      open,
      drawerPosition,
      drawerType,
      swipeDistanceThreshold,
      swipeVelocityThreshold,
      hideStatusBar
    } = this.props;

    if ( // If we're not in the middle of a transition, sync the drawer's open state
    typeof this.pendingOpenValue !== 'boolean' || open !== this.pendingOpenValue) {
      this.toggleDrawer(open);
    }

    this.pendingOpenValue = undefined;

    if (open !== prevProps.open && hideStatusBar) {
      this.toggleStatusBar(open);
    }

    if (prevProps.drawerPosition !== drawerPosition) {
      this.drawerPosition.setValue(drawerPosition === 'right' ? DIRECTION_RIGHT : DIRECTION_LEFT);
    }

    if (prevProps.drawerType !== drawerType) {
      this.isDrawerTypeFront.setValue(drawerType === 'front' ? TRUE : FALSE);
    }

    if (prevProps.swipeDistanceThreshold !== swipeDistanceThreshold) {
      this.swipeDistanceThreshold.setValue(swipeDistanceThreshold !== undefined ? swipeDistanceThreshold : SWIPE_DISTANCE_THRESHOLD_DEFAULT);
    }

    if (prevProps.swipeVelocityThreshold !== swipeVelocityThreshold) {
      this.swipeVelocityThreshold.setValue(swipeVelocityThreshold);
    }
  }

  componentWillUnmount() {
    this.toggleStatusBar(false);
  }

  render() {
    const {
      open,
      gestureEnabled,
      drawerPosition,
      drawerType,
      swipeEdgeWidth,
      sceneContainerStyle,
      drawerStyle,
      overlayStyle,
      onGestureRef,
      renderDrawerContent,
      renderSceneContent,
      gestureHandlerProps
    } = this.props;
    const right = drawerPosition === 'right';
    const contentTranslateX = drawerType === 'front' ? 0 : this.translateX;
    const drawerTranslateX = drawerType === 'back' ? I18nManager.isRTL ? multiply(this.drawerWidth, DIRECTION_RIGHT) : this.drawerWidth : this.translateX;
    const offset = I18nManager.isRTL ? '100%' : multiply(this.drawerWidth, -1); // FIXME: Currently hitSlop is broken when on Android when drawer is on right
    // https://github.com/kmagiera/react-native-gesture-handler/issues/569

    const hitSlop = right ? // Extend hitSlop to the side of the screen when drawer is closed
    // This lets the user drag the drawer from the side of the screen
    {
      right: 0,
      width: open ? undefined : swipeEdgeWidth
    } : {
      left: 0,
      width: open ? undefined : swipeEdgeWidth
    };
    return /*#__PURE__*/React.createElement(DrawerProgressContext.Provider, {
      value: this.progress
    }, /*#__PURE__*/React.createElement(PanGestureHandler, _extends({
      ref: onGestureRef,
      activeOffsetX: [-SWIPE_DISTANCE_MINIMUM, SWIPE_DISTANCE_MINIMUM],
      failOffsetY: [-SWIPE_DISTANCE_MINIMUM, SWIPE_DISTANCE_MINIMUM],
      onGestureEvent: this.handleGestureEvent,
      onHandlerStateChange: this.handleGestureStateChange,
      hitSlop: hitSlop,
      enabled: gestureEnabled
    }, gestureHandlerProps), /*#__PURE__*/React.createElement(Animated.View, {
      onLayout: this.handleContainerLayout,
      style: styles.main
    }, /*#__PURE__*/React.createElement(Animated.View, {
      style: [styles.content, {
        transform: [{
          translateX: contentTranslateX
        }]
      }, sceneContainerStyle],
      importantForAccessibility: open ? 'no-hide-descendants' : 'yes'
    }, renderSceneContent({
      progress: this.progress
    }), /*#__PURE__*/React.createElement(TapGestureHandler, {
      enabled: gestureEnabled,
      onHandlerStateChange: this.handleTapStateChange
    }, /*#__PURE__*/React.createElement(Animated.View, {
      style: [styles.overlay, {
        opacity: interpolate(this.progress, {
          inputRange: [PROGRESS_EPSILON, 1],
          outputRange: [0, 1]
        }),
        // We don't want the user to be able to press through the overlay when drawer is open
        // One approach is to adjust the pointerEvents based on the progress
        // But we can also send the overlay behind the screen, which works, and is much less code
        zIndex: cond(greaterThan(this.progress, PROGRESS_EPSILON), 0, -1)
      }, overlayStyle]
    }))), /*#__PURE__*/React.createElement(Animated.Code, {
      exec: block([onChange(this.manuallyTriggerSpring, [cond(eq(this.manuallyTriggerSpring, TRUE), [set(this.nextIsOpen, FALSE), call([], () => this.currentOpenValue = false)])])])
    }), /*#__PURE__*/React.createElement(Animated.View, {
      accessibilityViewIsModal: open,
      removeClippedSubviews: Platform.OS !== 'ios',
      onLayout: this.handleDrawerLayout,
      style: [styles.container, right ? {
        right: offset
      } : {
        left: offset
      }, {
        transform: [{
          translateX: drawerTranslateX
        }],
        opacity: this.drawerOpacity,
        zIndex: drawerType === 'back' ? -1 : 0
      }, drawerStyle]
    }, renderDrawerContent({
      progress: this.progress
    })))));
  }

}

_defineProperty(Drawer, "defaultProps", {
  gestureEnabled: true,
  drawerPostion: I18nManager.isRTL ? 'left' : 'right',
  drawerType: 'front',
  swipeEdgeWidth: 32,
  swipeVelocityThreshold: 500,
  keyboardDismissMode: 'on-drag',
  hideStatusBar: false,
  statusBarAnimation: 'slide'
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '80%',
    maxWidth: '100%'
  },
  overlay: { ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  content: {
    flex: 1
  },
  main: {
    flex: 1,
    overflow: 'hidden'
  }
});
//# sourceMappingURL=Drawer.js.map
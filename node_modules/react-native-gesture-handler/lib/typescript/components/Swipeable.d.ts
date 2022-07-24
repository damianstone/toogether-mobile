import * as React from 'react';
import { Component } from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';
import { PanGestureHandlerProps } from '../handlers/gestureHandlers';
declare type SwipeableExcludes = Exclude<keyof PanGestureHandlerProps, 'onGestureEvent' | 'onHandlerStateChange'>;
interface SwipeableProps extends Pick<PanGestureHandlerProps, SwipeableExcludes> {
    enableTrackpadTwoFingerGesture?: boolean;
    friction?: number;
    leftThreshold?: number;
    rightThreshold?: number;
    overshootLeft?: boolean;
    overshootRight?: boolean;
    overshootFriction?: number;
    onSwipeableLeftOpen?: () => void;
    onSwipeableRightOpen?: () => void;
    onSwipeableOpen?: () => void;
    onSwipeableClose?: () => void;
    onSwipeableLeftWillOpen?: () => void;
    onSwipeableRightWillOpen?: () => void;
    onSwipeableWillOpen?: () => void;
    onSwipeableWillClose?: () => void;
    /**
     *
     * This map describes the values to use as inputRange for extra interpolation:
     * AnimatedValue: [startValue, endValue]
     *
     * progressAnimatedValue: [0, 1]
     * dragAnimatedValue: [0, +]
     *
     * To support `rtl` flexbox layouts use `flexDirection` styling.
     * */
    renderLeftActions?: (progressAnimatedValue: Animated.AnimatedInterpolation, dragAnimatedValue: Animated.AnimatedInterpolation) => React.ReactNode;
    /**
     *
     * This map describes the values to use as inputRange for extra interpolation:
     * AnimatedValue: [startValue, endValue]
     *
     * progressAnimatedValue: [0, 1]
     * dragAnimatedValue: [0, -]
     *
     * To support `rtl` flexbox layouts use `flexDirection` styling.
     * */
    renderRightActions?: (progressAnimatedValue: Animated.AnimatedInterpolation, dragAnimatedValue: Animated.AnimatedInterpolation) => React.ReactNode;
    useNativeAnimations?: boolean;
    animationOptions?: Record<string, unknown>;
    containerStyle?: StyleProp<ViewStyle>;
    childrenContainerStyle?: StyleProp<ViewStyle>;
}
declare type SwipeableState = {
    dragX: Animated.Value;
    rowTranslation: Animated.Value;
    rowState: number;
    leftWidth?: number;
    rightOffset?: number;
    rowWidth?: number;
};
export default class Swipeable extends Component<SwipeableProps, SwipeableState> {
    static defaultProps: {
        friction: number;
        overshootFriction: number;
        useNativeAnimations: boolean;
    };
    constructor(props: SwipeableProps);
    UNSAFE_componentWillUpdate(props: SwipeableProps, state: SwipeableState): void;
    private onGestureEvent?;
    private transX?;
    private showLeftAction?;
    private leftActionTranslate?;
    private showRightAction?;
    private rightActionTranslate?;
    private updateAnimatedEvent;
    private onTapHandlerStateChange;
    private onHandlerStateChange;
    private handleRelease;
    private animateRow;
    private onRowLayout;
    private currentOffset;
    close: () => void;
    openLeft: () => void;
    openRight: () => void;
    render(): JSX.Element;
}
export {};

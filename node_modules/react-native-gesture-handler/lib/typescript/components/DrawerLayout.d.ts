import * as React from 'react';
import { Component } from 'react';
import { Animated, StatusBarAnimation, StyleProp, ViewStyle } from 'react-native';
import { PanGestureHandler } from '../handlers/gestureHandlers';
export declare type DrawerPosition = 'left' | 'right';
export declare type DrawerState = 'Idle' | 'Dragging' | 'Settling';
export declare type DrawerType = 'front' | 'back' | 'slide';
export declare type DrawerLockMode = 'unlocked' | 'locked-closed' | 'locked-open';
export declare type DrawerKeyboardDismissMode = 'none' | 'on-drag';
export interface DrawerLayoutProps {
    renderNavigationView: (progressAnimatedValue: Animated.Value) => React.ReactNode;
    drawerPosition?: DrawerPosition;
    drawerWidth?: number;
    drawerBackgroundColor?: string;
    drawerLockMode?: DrawerLockMode;
    keyboardDismissMode?: DrawerKeyboardDismissMode;
    onDrawerClose?: () => void;
    onDrawerOpen?: () => void;
    onDrawerStateChanged?: (newState: DrawerState, drawerWillShow: boolean) => void;
    useNativeAnimations?: boolean;
    drawerType?: DrawerType;
    edgeWidth?: number;
    minSwipeDistance?: number;
    hideStatusBar?: boolean;
    statusBarAnimation?: StatusBarAnimation;
    overlayColor?: string;
    contentContainerStyle?: StyleProp<ViewStyle>;
    drawerContainerStyle?: StyleProp<ViewStyle>;
    enableTrackpadTwoFingerGesture?: boolean;
    onDrawerSlide?: (position: number) => void;
    onGestureRef?: (ref: PanGestureHandler) => void;
}
export declare type DrawerLayoutState = {
    dragX: Animated.Value;
    touchX: Animated.Value;
    drawerTranslation: Animated.Value;
    containerWidth: number;
};
export declare type DrawerMovementOption = {
    velocity?: number;
    speed?: number;
};
export default class DrawerLayout extends Component<DrawerLayoutProps, DrawerLayoutState> {
    static defaultProps: {
        drawerWidth: number;
        drawerPosition: string;
        useNativeAnimations: boolean;
        drawerType: string;
        edgeWidth: number;
        minSwipeDistance: number;
        overlayColor: string;
        drawerLockMode: string;
        enableTrackpadTwoFingerGesture: boolean;
    };
    constructor(props: DrawerLayoutProps);
    UNSAFE_componentWillUpdate(props: DrawerLayoutProps, state: DrawerLayoutState): void;
    private openValue?;
    private onGestureEvent?;
    private accessibilityIsModalView;
    private pointerEventsView;
    private panGestureHandler;
    private drawerShown;
    static positions: {
        Left: string;
        Right: string;
    };
    private updateAnimatedEvent;
    private handleContainerLayout;
    private emitStateChanged;
    private openingHandlerStateChange;
    private onTapHandlerStateChange;
    private handleRelease;
    private updateShowing;
    private animateDrawer;
    openDrawer: (options?: DrawerMovementOption) => void;
    closeDrawer: (options?: DrawerMovementOption) => void;
    private renderOverlay;
    private renderDrawer;
    private setPanGestureRef;
    render(): JSX.Element;
}

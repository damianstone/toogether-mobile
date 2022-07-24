import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { NativeViewGestureHandlerProps } from '../handlers/NativeViewGestureHandler';
export interface RawButtonProps extends NativeViewGestureHandlerProps {
    exclusive?: boolean;
    rippleColor?: any;
}
export interface BaseButtonProps extends RawButtonProps {
    onPress?: (pointerInside: boolean) => void;
    onActiveStateChange?: (active: boolean) => void;
    style?: StyleProp<ViewStyle>;
    testID?: string;
}
export interface RectButtonProps extends BaseButtonProps {
    underlayColor?: string;
    activeOpacity?: number;
}
export interface BorderlessButtonProps extends BaseButtonProps {
    borderless?: boolean;
    activeOpacity?: number;
}
export declare const RawButton: React.ForwardRefExoticComponent<RawButtonProps & NativeViewGestureHandlerProps & React.RefAttributes<React.ComponentType<any>>>;
export declare class BaseButton extends React.Component<BaseButtonProps> {
    private lastActive;
    constructor(props: BaseButtonProps);
    private handleEvent;
    private onHandlerStateChange;
    private onGestureEvent;
    render(): JSX.Element;
}
export declare class RectButton extends React.Component<RectButtonProps> {
    static defaultProps: {
        activeOpacity: number;
        underlayColor: string;
    };
    private opacity;
    constructor(props: RectButtonProps);
    private onActiveStateChange;
    render(): JSX.Element;
}
export declare class BorderlessButton extends React.Component<BorderlessButtonProps> {
    static defaultProps: {
        activeOpacity: number;
        borderless: boolean;
    };
    private opacity;
    constructor(props: BorderlessButtonProps);
    private onActiveStateChange;
    render(): JSX.Element;
}
export { default as PureNativeButton } from './GestureHandlerButton';

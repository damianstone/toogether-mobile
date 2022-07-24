import * as React from 'react';
import { State } from '../State';
import { ValueOf } from '../typeUtils';
export interface GestureEventPayload {
    handlerTag: number;
    numberOfPointers: number;
    state: ValueOf<typeof State>;
}
export interface HandlerStateChangeEventPayload {
    handlerTag: number;
    numberOfPointers: number;
    state: ValueOf<typeof State>;
    oldState: ValueOf<typeof State>;
}
export interface GestureEvent<ExtraEventPayloadT = Record<string, unknown>> {
    nativeEvent: Readonly<GestureEventPayload & ExtraEventPayloadT>;
}
export interface HandlerStateChangeEvent<ExtraEventPayloadT = Record<string, unknown>> {
    nativeEvent: Readonly<HandlerStateChangeEventPayload & ExtraEventPayloadT>;
}
export declare type BaseGestureHandlerProps<ExtraEventPayloadT extends Record<string, unknown> = Record<string, unknown>> = {
    id?: string;
    enabled?: boolean;
    minPointers?: number;
    waitFor?: React.Ref<unknown> | React.Ref<unknown>[];
    simultaneousHandlers?: React.Ref<unknown> | React.Ref<unknown>[];
    shouldCancelWhenOutside?: boolean;
    hitSlop?: number | Partial<Record<'left' | 'right' | 'top' | 'bottom' | 'vertical' | 'horizontal', number>> | Record<'width' | 'left', number> | Record<'width' | 'right', number> | Record<'height' | 'top', number> | Record<'height' | 'bottom', number>;
    onBegan?: (event: HandlerStateChangeEvent) => void;
    onFailed?: (event: HandlerStateChangeEvent) => void;
    onCancelled?: (event: HandlerStateChangeEvent) => void;
    onActivated?: (event: HandlerStateChangeEvent) => void;
    onEnded?: (event: HandlerStateChangeEvent) => void;
    onGestureEvent?: (event: GestureEvent<ExtraEventPayloadT>) => void;
    onHandlerStateChange?: (event: HandlerStateChangeEvent<ExtraEventPayloadT>) => void;
};
export declare const baseProps: readonly ["id", "enabled", "minPointers", "waitFor", "simultaneousHandlers", "shouldCancelWhenOutside", "hitSlop", "onBegan", "onFailed", "onCancelled", "onActivated", "onEnded", "onGestureEvent", "onHandlerStateChange"];
export declare type TapGestureHandlerEventPayload = {
    x: number;
    y: number;
    absoluteX: number;
    absoluteY: number;
};
export interface TapGestureHandlerProps extends BaseGestureHandlerProps<TapGestureHandlerEventPayload> {
    minPointers?: number;
    maxDurationMs?: number;
    maxDelayMs?: number;
    numberOfTaps?: number;
    maxDeltaX?: number;
    maxDeltaY?: number;
    maxDist?: number;
}
export declare type TapGestureHandler = typeof TapGestureHandler;
export declare const TapGestureHandler: React.ComponentType<TapGestureHandlerProps & React.RefAttributes<any>>;
export declare type FlingGestureHandlerEventPayload = {
    x: number;
    y: number;
    absoluteX: number;
    absoluteY: number;
};
export interface FlingGestureHandlerProps extends BaseGestureHandlerProps<FlingGestureHandlerEventPayload> {
    direction?: number;
    numberOfPointers?: number;
}
export declare type FlingGestureHandler = typeof FlingGestureHandler;
export declare const FlingGestureHandler: React.ComponentType<FlingGestureHandlerProps & React.RefAttributes<any>>;
declare class ForceTouchFallback extends React.Component {
    static forceTouchAvailable: boolean;
    componentDidMount(): void;
    render(): React.ReactNode;
}
export declare type ForceTouchGestureHandlerEventPayload = {
    x: number;
    y: number;
    absoluteX: number;
    absoluteY: number;
    force: number;
};
export interface ForceTouchGestureHandlerProps extends BaseGestureHandlerProps<ForceTouchGestureHandlerEventPayload> {
    minForce?: number;
    maxForce?: number;
    feedbackOnActivation?: boolean;
}
export declare type ForceTouchGestureHandler = typeof ForceTouchGestureHandler & {
    forceTouchAvailable: boolean;
};
export declare const ForceTouchGestureHandler: typeof ForceTouchFallback | React.ComponentClass<ForceTouchGestureHandlerProps & React.RefAttributes<any>, any> | React.FunctionComponent<ForceTouchGestureHandlerProps & React.RefAttributes<any>>;
export declare type LongPressGestureHandlerEventPayload = {
    x: number;
    y: number;
    absoluteX: number;
    absoluteY: number;
};
export interface LongPressGestureHandlerProps extends BaseGestureHandlerProps<LongPressGestureHandlerEventPayload> {
    minDurationMs?: number;
    maxDist?: number;
}
export declare type LongPressGestureHandler = typeof LongPressGestureHandler;
export declare const LongPressGestureHandler: React.ComponentType<LongPressGestureHandlerProps & React.RefAttributes<any>>;
export declare type PanGestureHandlerEventPayload = {
    x: number;
    y: number;
    absoluteX: number;
    absoluteY: number;
    translationX: number;
    translationY: number;
    velocityX: number;
    velocityY: number;
};
export interface PanGestureHandlerProps extends BaseGestureHandlerProps<PanGestureHandlerEventPayload> {
    /** @deprecated  use activeOffsetX*/
    minDeltaX?: number;
    /** @deprecated  use activeOffsetY*/
    minDeltaY?: number;
    /** @deprecated  use failOffsetX*/
    maxDeltaX?: number;
    /** @deprecated  use failOffsetY*/
    maxDeltaY?: number;
    /** @deprecated  use activeOffsetX*/
    minOffsetX?: number;
    /** @deprecated  use failOffsetY*/
    minOffsetY?: number;
    activeOffsetY?: number | number[];
    activeOffsetX?: number | number[];
    failOffsetY?: number | number[];
    failOffsetX?: number | number[];
    minDist?: number;
    minVelocity?: number;
    minVelocityX?: number;
    minVelocityY?: number;
    minPointers?: number;
    maxPointers?: number;
    avgTouches?: boolean;
    enableTrackpadTwoFingerGesture?: boolean;
}
export declare type PanGestureHandler = typeof PanGestureHandler;
export declare const PanGestureHandler: React.ComponentType<PanGestureHandlerProps & React.RefAttributes<any>>;
export declare type PinchGestureHandlerEventPayload = {
    scale: number;
    focalX: number;
    focalY: number;
    velocity: number;
};
export interface PinchGestureHandlerProps extends BaseGestureHandlerProps<PinchGestureHandlerEventPayload> {
}
export declare type PinchGestureHandler = typeof PinchGestureHandler;
export declare const PinchGestureHandler: React.ComponentType<PinchGestureHandlerProps & React.RefAttributes<any>>;
export declare type RotationGestureHandlerEventPayload = {
    rotation: number;
    anchorX: number;
    anchorY: number;
    velocity: number;
};
export interface RotationGestureHandlerProps extends BaseGestureHandlerProps<RotationGestureHandlerEventPayload> {
}
export declare type RotationGestureHandler = typeof RotationGestureHandler;
export declare const RotationGestureHandler: React.ComponentType<RotationGestureHandlerProps & React.RefAttributes<any>>;
export {};

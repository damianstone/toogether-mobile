/// <reference types="react" />
import { BaseGestureHandlerProps } from './gestureHandlers';
export interface NativeViewGestureHandlerProps extends BaseGestureHandlerProps<NativeViewGestureHandlerPayload> {
    shouldActivateOnStart?: boolean;
    disallowInterruption?: boolean;
}
export declare type NativeViewGestureHandlerPayload = {
    pointerInside: boolean;
};
export declare const nativeViewProps: readonly ["id", "enabled", "minPointers", "waitFor", "simultaneousHandlers", "shouldCancelWhenOutside", "hitSlop", "onBegan", "onFailed", "onCancelled", "onActivated", "onEnded", "onGestureEvent", "onHandlerStateChange", "shouldActivateOnStart", "disallowInterruption"];
export declare type NativeViewGestureHandler = typeof NativeViewGestureHandler;
export declare const NativeViewGestureHandler: import("react").ComponentType<NativeViewGestureHandlerProps & import("react").RefAttributes<any>>;

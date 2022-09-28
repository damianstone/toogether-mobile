import { findNodeHandle } from 'react-native';
import { isChromeDebugger } from './PlatformChecker';
export function getTag(view) {
    return findNodeHandle(view);
}
export function measure(animatedRef) {
    'worklet';
    if (!_WORKLET && !isChromeDebugger()) {
        throw new Error('(measure) method cannot be used on RN side!');
    }
    const viewTag = animatedRef();
    const result = _measure(viewTag);
    if (result.x === -1234567) {
        throw new Error(`The view with tag ${viewTag} could not be measured`);
    }
    return result;
}
export function scrollTo(animatedRef, x, y, animated) {
    'worklet';
    if (!_WORKLET && !isChromeDebugger()) {
        return;
    }
    const viewTag = animatedRef();
    _scrollTo(viewTag, x, y, animated);
}
export function setGestureState(handlerTag, newState) {
    'worklet';
    if (!_WORKLET && !isChromeDebugger()) {
        console.warn('[Reanimated] You can not use setGestureState in non-worklet function.');
    }
    _setGestureState(handlerTag, newState);
}

import { View, ScrollView as RNScrollView } from 'react-native';
declare const _default: {
    readonly ScrollView: typeof RNScrollView;
    readonly PanGestureHandler: typeof View;
    readonly attachGestureHandler: () => void;
    readonly createGestureHandler: () => void;
    readonly dropGestureHandler: () => void;
    readonly updateGestureHandler: () => void;
    readonly Directions: {
        readonly RIGHT: 1;
        readonly LEFT: 2;
        readonly UP: 4;
        readonly DOWN: 8;
    };
    readonly State: {
        readonly UNDETERMINED: 0;
        readonly FAILED: 1;
        readonly BEGAN: 2;
        readonly CANCELLED: 3;
        readonly ACTIVE: 4;
        readonly END: 5;
    };
};
export default _default;

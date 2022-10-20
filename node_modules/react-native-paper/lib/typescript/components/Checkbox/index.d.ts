/// <reference types="react" />
declare const Checkbox: (import("react").ComponentType<Pick<import("./Checkbox").Props, "color" | "onPress" | "testID" | "disabled" | "status" | "uncheckedColor"> & {
    theme?: import("@callstack/react-theme-provider").$DeepPartial<ReactNativePaper.Theme> | undefined;
}> & import("@callstack/react-theme-provider/typings/hoist-non-react-statics").NonReactStatics<import("react").ComponentType<import("./Checkbox").Props> & ((props: import("./Checkbox").Props) => JSX.Element), {}>) & {
    Item: import("react").ComponentType<Pick<import("./CheckboxItem").Props, "label" | "style" | "color" | "onPress" | "testID" | "position" | "mode" | "labelStyle" | "disabled" | "status" | "uncheckedColor"> & {
        theme?: import("@callstack/react-theme-provider").$DeepPartial<ReactNativePaper.Theme> | undefined;
    }> & import("@callstack/react-theme-provider/typings/hoist-non-react-statics").NonReactStatics<import("react").ComponentType<import("./CheckboxItem").Props> & {
        ({ style, status, label, onPress, labelStyle, theme, testID, mode, position, disabled, ...props }: import("./CheckboxItem").Props): JSX.Element;
        displayName: string;
    }, {}>;
    Android: import("react").ComponentType<Pick<import("../../types").$RemoveChildren<import("react").ComponentType<Pick<import("react-native").TouchableWithoutFeedbackProps & import("react").RefAttributes<import("react-native").TouchableWithoutFeedback> & {
        borderless?: boolean | undefined;
        background?: Object | undefined;
        centered?: boolean | undefined;
        disabled?: boolean | undefined;
        onPress?: ((e: import("react-native").GestureResponderEvent) => void) | undefined;
        onLongPress?: ((e: import("react-native").GestureResponderEvent) => void) | undefined;
        rippleColor?: string | undefined;
        underlayColor?: string | undefined;
        children: import("react").ReactNode;
        style?: import("react-native").StyleProp<import("react-native").ViewStyle>;
        theme: ReactNativePaper.Theme;
    }, keyof import("react-native").TouchableWithoutFeedbackProps | "background" | "borderless" | "rippleColor" | "underlayColor" | "centered" | keyof import("react").RefAttributes<import("react-native").TouchableWithoutFeedback>> & {
        theme?: import("@callstack/react-theme-provider").$DeepPartial<ReactNativePaper.Theme> | undefined;
    }> & import("@callstack/react-theme-provider/typings/hoist-non-react-statics").NonReactStatics<import("react").ComponentType<import("react-native").TouchableWithoutFeedbackProps & import("react").RefAttributes<import("react-native").TouchableWithoutFeedback> & {
        borderless?: boolean | undefined;
        background?: Object | undefined;
        centered?: boolean | undefined;
        disabled?: boolean | undefined;
        onPress?: ((e: import("react-native").GestureResponderEvent) => void) | undefined;
        onLongPress?: ((e: import("react-native").GestureResponderEvent) => void) | undefined;
        rippleColor?: string | undefined;
        underlayColor?: string | undefined;
        children: import("react").ReactNode;
        style?: import("react-native").StyleProp<import("react-native").ViewStyle>;
        theme: ReactNativePaper.Theme;
    }> & {
        ({ style, background: _background, borderless, disabled: disabledProp, rippleColor, underlayColor: _underlayColor, children, theme, ...rest }: import("../..").TouchableRippleProps): JSX.Element;
        supported: boolean;
    }, {}>> & {
        status: "checked" | "unchecked" | "indeterminate";
        disabled?: boolean | undefined;
        onPress?: (() => void) | undefined;
        uncheckedColor?: string | undefined;
        color?: string | undefined;
        theme: ReactNativePaper.Theme;
        testID?: string | undefined;
    }, "style" | "color" | "onLayout" | "onPress" | "onPressIn" | "onPressOut" | "onLongPress" | "testID" | "accessible" | "accessibilityActions" | "accessibilityLabel" | "accessibilityRole" | "accessibilityState" | "accessibilityHint" | "accessibilityValue" | "onAccessibilityAction" | "accessibilityLiveRegion" | "importantForAccessibility" | "accessibilityElementsHidden" | "accessibilityViewIsModal" | "onAccessibilityEscape" | "onAccessibilityTap" | "onMagicTap" | "accessibilityIgnoresInvertColors" | "key" | "hitSlop" | "delayLongPress" | "delayPressIn" | "delayPressOut" | "disabled" | "onBlur" | "onFocus" | "pressRetentionOffset" | "touchSoundDisabled" | "background" | "borderless" | "rippleColor" | "underlayColor" | "centered" | "status" | "uncheckedColor"> & {
        theme?: import("@callstack/react-theme-provider").$DeepPartial<ReactNativePaper.Theme> | undefined;
    }> & import("@callstack/react-theme-provider/typings/hoist-non-react-statics").NonReactStatics<import("react").ComponentType<import("../../types").$RemoveChildren<import("react").ComponentType<Pick<import("react-native").TouchableWithoutFeedbackProps & import("react").RefAttributes<import("react-native").TouchableWithoutFeedback> & {
        borderless?: boolean | undefined;
        background?: Object | undefined;
        centered?: boolean | undefined;
        disabled?: boolean | undefined;
        onPress?: ((e: import("react-native").GestureResponderEvent) => void) | undefined;
        onLongPress?: ((e: import("react-native").GestureResponderEvent) => void) | undefined;
        rippleColor?: string | undefined;
        underlayColor?: string | undefined;
        children: import("react").ReactNode;
        style?: import("react-native").StyleProp<import("react-native").ViewStyle>;
        theme: ReactNativePaper.Theme;
    }, keyof import("react-native").TouchableWithoutFeedbackProps | "background" | "borderless" | "rippleColor" | "underlayColor" | "centered" | keyof import("react").RefAttributes<import("react-native").TouchableWithoutFeedback>> & {
        theme?: import("@callstack/react-theme-provider").$DeepPartial<ReactNativePaper.Theme> | undefined;
    }> & import("@callstack/react-theme-provider/typings/hoist-non-react-statics").NonReactStatics<import("react").ComponentType<import("react-native").TouchableWithoutFeedbackProps & import("react").RefAttributes<import("react-native").TouchableWithoutFeedback> & {
        borderless?: boolean | undefined;
        background?: Object | undefined;
        centered?: boolean | undefined;
        disabled?: boolean | undefined;
        onPress?: ((e: import("react-native").GestureResponderEvent) => void) | undefined;
        onLongPress?: ((e: import("react-native").GestureResponderEvent) => void) | undefined;
        rippleColor?: string | undefined;
        underlayColor?: string | undefined;
        children: import("react").ReactNode;
        style?: import("react-native").StyleProp<import("react-native").ViewStyle>;
        theme: ReactNativePaper.Theme;
    }> & {
        ({ style, background: _background, borderless, disabled: disabledProp, rippleColor, underlayColor: _underlayColor, children, theme, ...rest }: import("../..").TouchableRippleProps): JSX.Element;
        supported: boolean;
    }, {}>> & {
        status: "checked" | "unchecked" | "indeterminate";
        disabled?: boolean | undefined;
        onPress?: (() => void) | undefined;
        uncheckedColor?: string | undefined;
        color?: string | undefined;
        theme: ReactNativePaper.Theme;
        testID?: string | undefined;
    }> & {
        ({ status, theme, disabled, onPress, testID, ...rest }: import("./CheckboxAndroid").Props): JSX.Element;
        displayName: string;
    }, {}>;
    IOS: import("react").ComponentType<Pick<import("../../types").$RemoveChildren<import("react").ComponentType<Pick<import("react-native").TouchableWithoutFeedbackProps & import("react").RefAttributes<import("react-native").TouchableWithoutFeedback> & {
        borderless?: boolean | undefined;
        background?: Object | undefined;
        centered?: boolean | undefined;
        disabled?: boolean | undefined;
        onPress?: ((e: import("react-native").GestureResponderEvent) => void) | undefined;
        onLongPress?: ((e: import("react-native").GestureResponderEvent) => void) | undefined;
        rippleColor?: string | undefined;
        underlayColor?: string | undefined;
        children: import("react").ReactNode;
        style?: import("react-native").StyleProp<import("react-native").ViewStyle>;
        theme: ReactNativePaper.Theme;
    }, keyof import("react-native").TouchableWithoutFeedbackProps | "background" | "borderless" | "rippleColor" | "underlayColor" | "centered" | keyof import("react").RefAttributes<import("react-native").TouchableWithoutFeedback>> & {
        theme?: import("@callstack/react-theme-provider").$DeepPartial<ReactNativePaper.Theme> | undefined;
    }> & import("@callstack/react-theme-provider/typings/hoist-non-react-statics").NonReactStatics<import("react").ComponentType<import("react-native").TouchableWithoutFeedbackProps & import("react").RefAttributes<import("react-native").TouchableWithoutFeedback> & {
        borderless?: boolean | undefined;
        background?: Object | undefined;
        centered?: boolean | undefined;
        disabled?: boolean | undefined;
        onPress?: ((e: import("react-native").GestureResponderEvent) => void) | undefined;
        onLongPress?: ((e: import("react-native").GestureResponderEvent) => void) | undefined;
        rippleColor?: string | undefined;
        underlayColor?: string | undefined;
        children: import("react").ReactNode;
        style?: import("react-native").StyleProp<import("react-native").ViewStyle>;
        theme: ReactNativePaper.Theme;
    }> & {
        ({ style, background: _background, borderless, disabled: disabledProp, rippleColor, underlayColor: _underlayColor, children, theme, ...rest }: import("../..").TouchableRippleProps): JSX.Element;
        supported: boolean;
    }, {}>> & {
        status: "checked" | "unchecked" | "indeterminate";
        disabled?: boolean | undefined;
        onPress?: (() => void) | undefined;
        color?: string | undefined;
        theme: ReactNativePaper.Theme;
        testID?: string | undefined;
    }, "style" | "color" | "onLayout" | "onPress" | "onPressIn" | "onPressOut" | "onLongPress" | "testID" | "accessible" | "accessibilityActions" | "accessibilityLabel" | "accessibilityRole" | "accessibilityState" | "accessibilityHint" | "accessibilityValue" | "onAccessibilityAction" | "accessibilityLiveRegion" | "importantForAccessibility" | "accessibilityElementsHidden" | "accessibilityViewIsModal" | "onAccessibilityEscape" | "onAccessibilityTap" | "onMagicTap" | "accessibilityIgnoresInvertColors" | "key" | "hitSlop" | "delayLongPress" | "delayPressIn" | "delayPressOut" | "disabled" | "onBlur" | "onFocus" | "pressRetentionOffset" | "touchSoundDisabled" | "background" | "borderless" | "rippleColor" | "underlayColor" | "centered" | "status"> & {
        theme?: import("@callstack/react-theme-provider").$DeepPartial<ReactNativePaper.Theme> | undefined;
    }> & import("@callstack/react-theme-provider/typings/hoist-non-react-statics").NonReactStatics<import("react").ComponentType<import("../../types").$RemoveChildren<import("react").ComponentType<Pick<import("react-native").TouchableWithoutFeedbackProps & import("react").RefAttributes<import("react-native").TouchableWithoutFeedback> & {
        borderless?: boolean | undefined;
        background?: Object | undefined;
        centered?: boolean | undefined;
        disabled?: boolean | undefined;
        onPress?: ((e: import("react-native").GestureResponderEvent) => void) | undefined;
        onLongPress?: ((e: import("react-native").GestureResponderEvent) => void) | undefined;
        rippleColor?: string | undefined;
        underlayColor?: string | undefined;
        children: import("react").ReactNode;
        style?: import("react-native").StyleProp<import("react-native").ViewStyle>;
        theme: ReactNativePaper.Theme;
    }, keyof import("react-native").TouchableWithoutFeedbackProps | "background" | "borderless" | "rippleColor" | "underlayColor" | "centered" | keyof import("react").RefAttributes<import("react-native").TouchableWithoutFeedback>> & {
        theme?: import("@callstack/react-theme-provider").$DeepPartial<ReactNativePaper.Theme> | undefined;
    }> & import("@callstack/react-theme-provider/typings/hoist-non-react-statics").NonReactStatics<import("react").ComponentType<import("react-native").TouchableWithoutFeedbackProps & import("react").RefAttributes<import("react-native").TouchableWithoutFeedback> & {
        borderless?: boolean | undefined;
        background?: Object | undefined;
        centered?: boolean | undefined;
        disabled?: boolean | undefined;
        onPress?: ((e: import("react-native").GestureResponderEvent) => void) | undefined;
        onLongPress?: ((e: import("react-native").GestureResponderEvent) => void) | undefined;
        rippleColor?: string | undefined;
        underlayColor?: string | undefined;
        children: import("react").ReactNode;
        style?: import("react-native").StyleProp<import("react-native").ViewStyle>;
        theme: ReactNativePaper.Theme;
    }> & {
        ({ style, background: _background, borderless, disabled: disabledProp, rippleColor, underlayColor: _underlayColor, children, theme, ...rest }: import("../..").TouchableRippleProps): JSX.Element;
        supported: boolean;
    }, {}>> & {
        status: "checked" | "unchecked" | "indeterminate";
        disabled?: boolean | undefined;
        onPress?: (() => void) | undefined;
        color?: string | undefined;
        theme: ReactNativePaper.Theme;
        testID?: string | undefined;
    }> & {
        ({ status, disabled, onPress, theme, testID, ...rest }: import("./CheckboxIOS").Props): JSX.Element;
        displayName: string;
    }, {}>;
};
export default Checkbox;

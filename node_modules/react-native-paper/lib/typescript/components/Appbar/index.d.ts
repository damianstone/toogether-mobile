/// <reference types="react" />
declare const Appbar: (import("react").ComponentType<Pick<Partial<import("react-native").ViewProps & import("react").RefAttributes<import("react-native").View>> & {
    dark?: boolean | undefined;
    children: import("react").ReactNode;
    theme: ReactNativePaper.Theme;
    style?: import("react-native").StyleProp<import("react-native").ViewStyle>;
}, keyof import("react-native").ViewProps | "dark" | keyof import("react").RefAttributes<import("react-native").View>> & {
    theme?: import("@callstack/react-theme-provider").$DeepPartial<ReactNativePaper.Theme> | undefined;
}> & import("@callstack/react-theme-provider/typings/hoist-non-react-statics").NonReactStatics<import("react").ComponentType<Partial<import("react-native").ViewProps & import("react").RefAttributes<import("react-native").View>> & {
    dark?: boolean | undefined;
    children: import("react").ReactNode;
    theme: ReactNativePaper.Theme;
    style?: import("react-native").StyleProp<import("react-native").ViewStyle>;
}> & (({ children, dark, style, theme, ...rest }: import("./Appbar").Props) => JSX.Element), {}>) & {
    Content: import("react").ComponentType<Pick<import("../../types").$RemoveChildren<typeof import("react-native").View> & {
        color?: string | undefined;
        title: import("react").ReactNode;
        titleStyle?: import("react-native").StyleProp<import("react-native").TextStyle>;
        titleRef?: import("react").RefObject<Text> | undefined;
        subtitle?: import("react").ReactNode;
        subtitleStyle?: import("react-native").StyleProp<import("react-native").TextStyle>;
        onPress?: (() => void) | undefined;
        style?: import("react-native").StyleProp<import("react-native").ViewStyle>;
        theme: ReactNativePaper.Theme;
    }, "style" | "title" | "pointerEvents" | "color" | "onLayout" | "onPress" | "testID" | "nativeID" | "accessible" | "accessibilityActions" | "accessibilityLabel" | "accessibilityRole" | "accessibilityState" | "accessibilityHint" | "accessibilityValue" | "onAccessibilityAction" | "accessibilityLiveRegion" | "importantForAccessibility" | "accessibilityElementsHidden" | "accessibilityViewIsModal" | "onAccessibilityEscape" | "onAccessibilityTap" | "onMagicTap" | "accessibilityIgnoresInvertColors" | "hitSlop" | "removeClippedSubviews" | "collapsable" | "needsOffscreenAlphaCompositing" | "renderToHardwareTextureAndroid" | "focusable" | "shouldRasterizeIOS" | "isTVSelectable" | "hasTVPreferredFocus" | "tvParallaxProperties" | "tvParallaxShiftDistanceX" | "tvParallaxShiftDistanceY" | "tvParallaxTiltAngle" | "tvParallaxMagnification" | "onStartShouldSetResponder" | "onMoveShouldSetResponder" | "onResponderEnd" | "onResponderGrant" | "onResponderReject" | "onResponderMove" | "onResponderRelease" | "onResponderStart" | "onResponderTerminationRequest" | "onResponderTerminate" | "onStartShouldSetResponderCapture" | "onMoveShouldSetResponderCapture" | "onTouchStart" | "onTouchMove" | "onTouchEnd" | "onTouchCancel" | "onTouchEndCapture" | "titleStyle" | "subtitle" | "subtitleStyle" | "titleRef"> & {
        theme?: import("@callstack/react-theme-provider").$DeepPartial<ReactNativePaper.Theme> | undefined;
    }> & import("@callstack/react-theme-provider/typings/hoist-non-react-statics").NonReactStatics<import("react").ComponentType<import("../../types").$RemoveChildren<typeof import("react-native").View> & {
        color?: string | undefined;
        title: import("react").ReactNode;
        titleStyle?: import("react-native").StyleProp<import("react-native").TextStyle>;
        titleRef?: import("react").RefObject<Text> | undefined;
        subtitle?: import("react").ReactNode;
        subtitleStyle?: import("react-native").StyleProp<import("react-native").TextStyle>;
        onPress?: (() => void) | undefined;
        style?: import("react-native").StyleProp<import("react-native").ViewStyle>;
        theme: ReactNativePaper.Theme;
    }> & {
        ({ color: titleColor, subtitle, subtitleStyle, onPress, style, titleRef, titleStyle, theme, title, ...rest }: import("./AppbarContent").Props): JSX.Element;
        displayName: string;
    }, {}>;
    Action: {
        ({ size, color: iconColor, icon, disabled, onPress, accessibilityLabel, ...rest }: import("./AppbarAction").Props): JSX.Element;
        displayName: string;
    };
    BackAction: {
        ({ accessibilityLabel, ...rest }: import("./AppbarBackAction").Props): JSX.Element;
        displayName: string;
    };
    Header: import("react").ComponentType<(Pick<Pick<Partial<import("react-native").ViewProps & import("react").RefAttributes<import("react-native").View>> & {
        dark?: boolean | undefined;
        children: import("react").ReactNode;
        theme: ReactNativePaper.Theme;
        style?: import("react-native").StyleProp<import("react-native").ViewStyle>;
    }, keyof import("react-native").ViewProps | "dark" | keyof import("react").RefAttributes<import("react-native").View>> & {
        theme?: import("@callstack/react-theme-provider").$DeepPartial<ReactNativePaper.Theme> | undefined;
    } & {
        dark?: boolean | undefined;
        statusBarHeight?: number | undefined;
        children: import("react").ReactNode;
        theme: ReactNativePaper.Theme;
        style?: import("react-native").StyleProp<import("react-native").ViewStyle>;
    }, keyof import("react-native").ViewProps | "dark" | keyof import("react").RefAttributes<import("react-native").View> | "statusBarHeight"> | Pick<Pick<Partial<import("react-native").ViewProps & import("react").RefAttributes<import("react-native").View>> & {
        dark?: boolean | undefined;
        children: import("react").ReactNode;
        theme: ReactNativePaper.Theme;
        style?: import("react-native").StyleProp<import("react-native").ViewStyle>;
    }, keyof import("react-native").ViewProps | "dark" | keyof import("react").RefAttributes<import("react-native").View>> & {
        theme?: import("@callstack/react-theme-provider").$DeepPartial<ReactNativePaper.Theme> | undefined;
    } & {
        children?: import("react").ReactNode;
    } & {
        dark?: boolean | undefined;
        statusBarHeight?: number | undefined;
        children: import("react").ReactNode;
        theme: ReactNativePaper.Theme;
        style?: import("react-native").StyleProp<import("react-native").ViewStyle>;
    }, keyof import("react-native").ViewProps | "dark" | keyof import("react").RefAttributes<import("react-native").View> | "statusBarHeight">) & {
        theme?: import("@callstack/react-theme-provider").$DeepPartial<ReactNativePaper.Theme> | undefined;
    }> & import("@callstack/react-theme-provider/typings/hoist-non-react-statics").NonReactStatics<import("react").ComponentType<import("./AppbarHeader").Props> & {
        (props: import("./AppbarHeader").Props): JSX.Element;
        displayName: string;
    }, {}>;
};
export default Appbar;

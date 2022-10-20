/// <reference types="react" />
declare const ToggleButton: (import("react").ComponentType<Pick<import("./ToggleButton").Props, "style" | "color" | "size" | "onPress" | "accessibilityLabel" | "icon" | "value" | "disabled" | "status"> & {
    theme?: import("@callstack/react-theme-provider").$DeepPartial<ReactNativePaper.Theme> | undefined;
}> & import("@callstack/react-theme-provider/typings/hoist-non-react-statics").NonReactStatics<import("react").ComponentType<import("./ToggleButton").Props> & (({ icon, size, theme, accessibilityLabel, disabled, style, value, status, onPress, ...rest }: import("./ToggleButton").Props) => JSX.Element), {}>) & {
    Group: {
        ({ value, onValueChange, children }: import("./ToggleButtonGroup").Props): JSX.Element;
        displayName: string;
    };
    Row: {
        ({ value, onValueChange, children, style }: import("./ToggleButtonRow").Props): JSX.Element;
        displayName: string;
    };
};
export default ToggleButton;

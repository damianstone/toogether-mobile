import * as React from 'react';
import { Text as NativeText, TextStyle, StyleProp } from 'react-native';
export declare type Props = React.ComponentProps<typeof NativeText> & {
    style?: StyleProp<TextStyle>;
    /**
     * @optional
     */
    theme: ReactNativePaper.Theme;
};
declare const _default: React.ComponentType<Pick<import("react-native").TextProps & {
    style?: StyleProp<TextStyle>;
    /**
     * @optional
     */
    theme: ReactNativePaper.Theme;
} & React.RefAttributes<{}>, keyof import("react-native").TextProps | keyof React.RefAttributes<{}>> & {
    theme?: import("@callstack/react-theme-provider").$DeepPartial<ReactNativePaper.Theme> | undefined;
}> & import("@callstack/react-theme-provider/typings/hoist-non-react-statics").NonReactStatics<React.ComponentType<import("react-native").TextProps & {
    style?: StyleProp<TextStyle>;
    /**
     * @optional
     */
    theme: ReactNativePaper.Theme;
} & React.RefAttributes<{}>> & React.ForwardRefExoticComponent<import("react-native").TextProps & {
    style?: StyleProp<TextStyle>;
    /**
     * @optional
     */
    theme: ReactNativePaper.Theme;
} & React.RefAttributes<{}>>, {}>;
export default _default;

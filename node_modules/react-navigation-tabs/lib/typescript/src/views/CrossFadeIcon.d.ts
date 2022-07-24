import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { NavigationRoute } from 'react-navigation';
declare type Props = {
    route: NavigationRoute;
    horizontal?: boolean;
    activeOpacity: number;
    inactiveOpacity: number;
    activeTintColor?: string;
    inactiveTintColor?: string;
    renderIcon: (props: {
        route: NavigationRoute;
        focused: boolean;
        tintColor?: string;
        horizontal?: boolean;
    }) => React.ReactNode;
    style: StyleProp<ViewStyle>;
};
export default class TabBarIcon extends React.Component<Props> {
    render(): JSX.Element;
}
export {};

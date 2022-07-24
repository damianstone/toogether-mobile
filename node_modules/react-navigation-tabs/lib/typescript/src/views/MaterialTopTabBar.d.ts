import * as React from 'react';
import { NavigationRoute } from 'react-navigation';
import { MaterialTabBarProps } from '../types';
declare type Scene = {
    route: NavigationRoute;
    focused: boolean;
    color: string;
};
export default class TabBarTop extends React.PureComponent<MaterialTabBarProps> {
    static defaultProps: {
        activeTintColor: string;
        inactiveTintColor: string;
        showIcon: boolean;
        showLabel: boolean;
        upperCaseLabel: boolean;
        allowFontScaling: boolean;
    };
    _renderLabel: ({ route, focused, color }: Scene) => string | JSX.Element | null | undefined;
    _renderIcon: ({ route, focused, color }: Scene) => JSX.Element | null;
    render(): JSX.Element;
}
export {};

import * as React from 'react';
import { NavigationRoute } from 'react-navigation';
import { NavigationTabProp, NavigationBottomTabOptions, BottomTabBarOptions } from '../types';
declare type Config = {
    lazy?: boolean;
    tabBarComponent?: React.ComponentType<any>;
    tabBarOptions?: BottomTabBarOptions;
    detachInactiveScreens?: boolean;
};
declare const _default: (routes: import("react-navigation").NavigationRouteConfigMap<NavigationBottomTabOptions, NavigationTabProp<NavigationRoute<import("react-navigation").NavigationParams>, any>, unknown>, config?: import("react-navigation").CreateNavigatorConfig<Partial<Config>, import("react-navigation").NavigationTabRouterConfig, Partial<NavigationBottomTabOptions>, NavigationTabProp<NavigationRoute<import("react-navigation").NavigationParams>, any>>) => import("react-navigation").NavigationNavigator<any, import("react-navigation").NavigationProp<import("react-navigation").NavigationState>>;
export default _default;

import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { TabView } from 'react-native-tab-view';
import { NavigationTabProp, NavigationMaterialTabOptions, MaterialTabBarOptions } from '../types';
declare type Route = {
    key: string;
    routeName: string;
};
declare type Config = {
    keyboardDismissMode?: 'none' | 'on-drag';
    swipeEnabled?: boolean;
    swipeDistanceThreshold?: number;
    swipeVelocityThreshold?: number;
    initialLayout?: {
        width?: number;
        height?: number;
    };
    lazy?: boolean;
    lazyPlaceholderComponent?: React.ComponentType<{
        route: Route;
    }>;
    pagerComponent?: React.ComponentType<Parameters<React.ComponentProps<typeof TabView>['renderPager']>[0]>;
    tabBarComponent?: React.ComponentType<any>;
    tabBarOptions?: MaterialTabBarOptions;
    tabBarPosition?: 'top' | 'bottom';
    sceneContainerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
};
declare const _default: (routes: import("react-navigation").NavigationRouteConfigMap<NavigationMaterialTabOptions, NavigationTabProp<import("react-navigation").NavigationRoute<import("react-navigation").NavigationParams>, any>, unknown>, config?: import("react-navigation").CreateNavigatorConfig<Partial<Config>, import("react-navigation").NavigationTabRouterConfig, Partial<NavigationMaterialTabOptions>, NavigationTabProp<import("react-navigation").NavigationRoute<import("react-navigation").NavigationParams>, any>>) => import("react-navigation").NavigationNavigator<any, import("react-navigation").NavigationProp<import("react-navigation").NavigationState>>;
export default _default;

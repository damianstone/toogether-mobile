import * as React from 'react';
import { NavigationRoute, NavigationRouteConfigMap, CreateNavigatorConfig, NavigationTabRouterConfig } from 'react-navigation';
import { NavigationTabProp, NavigationCommonTabOptions, SceneDescriptorMap } from '../types';
declare type RouteConfig<Options> = NavigationRouteConfigMap<Options, NavigationTabProp<NavigationRoute, any>>;
declare type CommonProps = {
    navigation: NavigationTabProp;
    descriptors: SceneDescriptorMap;
    screenProps?: unknown;
};
export declare type RenderIconProps = {
    route: NavigationRoute;
    focused: boolean;
    tintColor?: string;
    horizontal?: boolean;
};
export declare type NavigationViewProps = {
    getLabelText: (props: {
        route: NavigationRoute;
    }) => string | undefined;
    getAccessibilityLabel: (props: {
        route: NavigationRoute;
    }) => string | undefined;
    getTestID: (props: {
        route: NavigationRoute;
    }) => string | undefined;
    renderIcon: (props: RenderIconProps) => React.ReactNode;
    renderScene: (props: {
        route: NavigationRoute;
    }) => React.ReactNode;
    onIndexChange: (index: number) => void;
    onTabPress: (props: {
        route: NavigationRoute;
    }) => void;
    onTabLongPress: (props: {
        route: NavigationRoute;
    }) => void;
};
export default function createTabNavigator<Config extends {}, Options extends NavigationCommonTabOptions, Props extends NavigationViewProps & CommonProps>(TabView: React.ComponentType<Props & Config & Options>): (routes: RouteConfig<Options>, config?: CreateNavigatorConfig<Partial<Config>, NavigationTabRouterConfig, Partial<Options>, NavigationTabProp<NavigationRoute, any>>) => import("react-navigation").NavigationNavigator<any, import("react-navigation").NavigationProp<import("react-navigation").NavigationState>>;
export {};

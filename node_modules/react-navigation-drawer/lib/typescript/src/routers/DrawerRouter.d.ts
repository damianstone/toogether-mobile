import { NavigationAction, NavigationRoute, NavigationRouteConfigMap } from 'react-navigation';
declare const _default: (routeConfigs: NavigationRouteConfigMap<any, any>, config?: {
    unmountInactiveRoutes?: boolean;
    resetOnBlur?: boolean;
    initialRouteName?: string;
}) => {
    getActionCreators(route: NavigationRoute, navStateKey: string): {
        openDrawer: () => any;
        closeDrawer: () => any;
        toggleDrawer: () => any;
    };
    getStateForAction(action: NavigationAction, state?: (import("react-navigation").NavigationLeafRoute<import("react-navigation").NavigationParams> & {
        isDrawerOpen?: any;
    }) | (import("react-navigation").NavigationLeafRoute<import("react-navigation").NavigationParams> & import("react-navigation").NavigationState & {
        isDrawerOpen?: any;
    }) | undefined): any;
    getActionForPathAndParams: (path: string, params?: import("react-navigation").NavigationParams | undefined) => import("react-navigation").NavigationInitAction | import("react-navigation").NavigationNavigateAction | import("react-navigation").NavigationBackAction | import("react-navigation").NavigationSetParamsAction | import("react-navigation").NavigationResetAction | import("react-navigation").NavigationReplaceAction | import("react-navigation").NavigationPopAction | import("react-navigation").NavigationPushAction | import("react-navigation").NavigationPopToTopAction | import("react-navigation").NavigationCompleteTransitionAction | import("react-navigation").NavigationDrawerOpenedAction | import("react-navigation").NavigationDrawerClosedAction | import("react-navigation").NavigationOpenDrawerAction | import("react-navigation").NavigationCloseDrawerAction | import("react-navigation").NavigationToggleDrawerAction | import("react-navigation").NavigationJumpToAction | {
        type: "CHILD_ACTION";
        key?: string | undefined;
    } | null;
    getPathAndParamsForState: (state: any) => {
        path: string;
        params?: import("react-navigation").NavigationParams | undefined;
    };
    getComponentForRouteName: (routeName: string) => import("react-navigation").NavigationComponent<{}, import("react-navigation").NavigationScreenProp<NavigationRoute<import("react-navigation").NavigationParams>, import("react-navigation").NavigationParams>>;
    getComponentForState: (state: any) => import("react-navigation").NavigationComponent<{}, import("react-navigation").NavigationScreenProp<NavigationRoute<import("react-navigation").NavigationParams>, import("react-navigation").NavigationParams>>;
    getScreenOptions: import("react-navigation").NavigationScreenOptionsGetter<any>;
};
export default _default;

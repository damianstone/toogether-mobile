import { NavigationRouteConfigMap, CreateNavigatorConfig, NavigationRoute } from 'react-navigation';
import { NavigationDrawerOptions, NavigationDrawerProp, NavigationDrawerConfig, NavigationDrawerRouterConfig } from '../types';
declare const DrawerNavigator: (routeConfigs: NavigationRouteConfigMap<NavigationDrawerOptions, NavigationDrawerProp<NavigationRoute, any>>, config?: CreateNavigatorConfig<NavigationDrawerConfig, NavigationDrawerRouterConfig, NavigationDrawerOptions, NavigationDrawerProp<NavigationRoute, any>>) => import("react-navigation").NavigationNavigator<any, import("react-navigation").NavigationProp<import("react-navigation").NavigationState>>;
export default DrawerNavigator;

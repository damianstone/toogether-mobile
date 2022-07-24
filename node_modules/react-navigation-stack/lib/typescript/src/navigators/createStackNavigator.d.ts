import { NavigationRouteConfigMap, NavigationStackRouterConfig, CreateNavigatorConfig } from 'react-navigation';
import type { StackNavigationConfig, StackNavigationOptions, StackNavigationProp } from '../vendor/types';
declare function createStackNavigator(routeConfigMap: NavigationRouteConfigMap<StackNavigationOptions, StackNavigationProp>, stackConfig?: CreateNavigatorConfig<StackNavigationConfig, NavigationStackRouterConfig, StackNavigationOptions, StackNavigationProp>): import("react-navigation").NavigationNavigator<any, import("react-navigation").NavigationProp<import("react-navigation").NavigationState>>;
export default createStackNavigator;

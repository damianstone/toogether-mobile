/// <reference types="react" />
import { NavigationScreenProp, NavigationState, NavigationRoute, NavigationParams, NavigationDescriptor, SupportedThemes, NavigationScreenConfig } from 'react-navigation';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';
import Animated from 'react-native-reanimated';
export declare type Scene = {
    route: NavigationRoute;
    index: number;
    focused: boolean;
    tintColor?: string;
};
export declare type NavigationDrawerState = NavigationState & {
    isDrawerOpen: boolean;
};
export declare type NavigationDrawerProp<State = NavigationRoute, Params = NavigationParams> = NavigationScreenProp<State, Params> & {
    openDrawer: () => void;
    closeDrawer: () => void;
    toggleDrawer: () => void;
    jumpTo: (routeName: string, key?: string) => void;
};
export declare type DrawerLockMode = 'unlocked' | 'locked-closed' | 'locked-open';
export declare type DrawerIconProps = {
    tintColor?: string;
    focused: boolean;
};
export declare type DrawerLabelProps = {
    tintColor?: string;
    focused: boolean;
};
export declare type NavigationDrawerOptions = {
    title?: string;
    drawerLabel?: React.ReactNode | ((props: DrawerLabelProps) => React.ReactNode);
    drawerIcon?: React.ReactNode | ((props: DrawerIconProps) => React.ReactNode);
    drawerLockMode?: DrawerLockMode;
};
export declare type NavigationDrawerConfig = {
    contentComponent?: React.ComponentType<DrawerContentComponentProps>;
    edgeWidth?: number;
    minSwipeDistance?: number;
    drawerWidth?: number | (() => number);
    drawerPosition?: 'left' | 'right';
    drawerType?: 'front' | 'back' | 'slide';
    drawerLockMode?: DrawerLockMode;
    keyboardDismissMode?: 'none' | 'on-drag';
    swipeEdgeWidth?: number;
    swipeDistanceThreshold?: number;
    swipeVelocityThreshold?: number;
    hideStatusBar?: boolean;
    statusBarAnimation?: 'slide' | 'none' | 'fade';
    drawerBackgroundColor?: ThemedColor;
    overlayColor?: ThemedColor;
    screenContainerStyle?: StyleProp<ViewStyle>;
    detachInactiveScreens?: boolean;
};
export declare type NavigationDrawerRouterConfig = {
    unmountInactiveRoutes?: boolean;
    resetOnBlur?: boolean;
    initialRouteName?: string;
    contentComponent?: React.ComponentType<DrawerContentComponentProps>;
    contentOptions?: object;
    backBehavior?: 'none' | 'initialRoute' | 'history';
};
export declare type ThemedColor = string | {
    light: string;
    dark: string;
};
export declare type DrawerNavigatorItemsProps = {
    items: NavigationRoute[];
    activeItemKey?: string | null;
    activeTintColor?: string | ThemedColor;
    activeBackgroundColor?: string | ThemedColor;
    inactiveTintColor?: string | ThemedColor;
    inactiveBackgroundColor?: string | ThemedColor;
    getLabel: (scene: Scene) => React.ReactNode;
    renderIcon: (scene: Scene) => React.ReactNode;
    onItemPress: (scene: {
        route: NavigationRoute;
        focused: boolean;
    }) => void;
    itemsContainerStyle?: StyleProp<ViewStyle>;
    itemStyle?: StyleProp<ViewStyle>;
    labelStyle?: StyleProp<TextStyle>;
    activeLabelStyle?: StyleProp<TextStyle>;
    inactiveLabelStyle?: StyleProp<TextStyle>;
    iconContainerStyle?: StyleProp<ViewStyle>;
    drawerPosition: 'left' | 'right';
    screenProps: unknown;
};
export declare type DrawerContentComponentProps = DrawerNavigatorItemsProps & {
    navigation: NavigationScreenProp<NavigationDrawerState>;
    descriptors: SceneDescriptorMap;
    drawerOpenProgress: Animated.Node<number>;
    screenProps: unknown;
};
export declare type NavigationDrawerScreenProps<Params = NavigationParams, ScreenProps = unknown> = {
    theme: SupportedThemes;
    navigation: NavigationDrawerProp<NavigationRoute, Params>;
    screenProps: ScreenProps;
};
export declare type NavigationDrawerScreenComponent<Params = NavigationParams, ScreenProps = unknown> = React.ComponentType<NavigationDrawerScreenProps<Params, ScreenProps>> & {
    navigationOptions?: NavigationScreenConfig<NavigationDrawerOptions, NavigationDrawerProp<NavigationRoute, Params>, ScreenProps>;
};
export declare type SceneDescriptorMap = {
    [key: string]: NavigationDescriptor<NavigationParams, NavigationDrawerOptions, NavigationDrawerProp<NavigationRoute, any>>;
};

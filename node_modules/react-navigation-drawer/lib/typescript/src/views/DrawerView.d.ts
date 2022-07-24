import * as React from 'react';
import { ViewStyle } from 'react-native';
import { ThemeContext, NavigationScreenProp } from 'react-navigation';
import { NavigationDrawerState, DrawerContentComponentProps, SceneDescriptorMap } from '../types';
import { PanGestureHandler } from 'react-native-gesture-handler';
declare type DrawerOptions = {
    drawerBackgroundColor?: string;
    overlayColor?: string;
    minSwipeDistance?: number;
    drawerPosition: 'left' | 'right';
    drawerType: 'front' | 'back' | 'slide';
    drawerLockMode?: 'unlocked' | 'locked-closed' | 'locked-open';
    keyboardDismissMode?: 'on-drag' | 'none';
    drawerWidth: number | (() => number);
    statusBarAnimation: 'slide' | 'none' | 'fade';
    onDrawerClose?: () => void;
    onDrawerOpen?: () => void;
    sceneContainerStyle?: ViewStyle;
    edgeWidth: number;
    hideStatusBar?: boolean;
    style?: ViewStyle;
    gestureHandlerProps?: React.ComponentProps<typeof PanGestureHandler>;
};
declare type Props = {
    lazy: boolean;
    navigation: NavigationScreenProp<NavigationDrawerState>;
    descriptors: SceneDescriptorMap;
    navigationConfig: DrawerOptions & {
        contentComponent?: React.ComponentType<DrawerContentComponentProps>;
        unmountInactiveRoutes?: boolean;
        contentOptions?: object;
    };
    screenProps: unknown;
    detachInactiveScreens: boolean;
};
declare type State = {
    loaded: number[];
    drawerWidth: number;
};
/**
 * Component that renders the drawer.
 */
export default class DrawerView extends React.PureComponent<Props, State> {
    static contextType: React.Context<import("react-navigation").SupportedThemes>;
    static defaultProps: {
        lazy: boolean;
    };
    static getDerivedStateFromProps(nextProps: Props, prevState: State): {
        loaded: number[];
    };
    state: State;
    componentDidMount(): void;
    componentDidUpdate(prevProps: Props): void;
    componentWillUnmount(): void;
    context: React.ContextType<typeof ThemeContext>;
    private drawerGestureRef;
    private getLockMode;
    private handleDrawerOpen;
    private handleDrawerClose;
    private updateWidth;
    private renderNavigationView;
    private renderContent;
    private setDrawerGestureRef;
    private getDrawerBackgroundColor;
    private getOverlayColor;
    render(): JSX.Element;
}
export {};

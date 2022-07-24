import * as React from 'react';
import { ViewStyle } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import Animated from 'react-native-reanimated';
import { NavigationDrawerState, DrawerContentComponentProps, SceneDescriptorMap } from '../types';
declare type Props = {
    contentComponent?: React.ComponentType<DrawerContentComponentProps>;
    contentOptions?: object;
    screenProps?: unknown;
    navigation: NavigationScreenProp<NavigationDrawerState>;
    descriptors: SceneDescriptorMap;
    drawerOpenProgress: Animated.Node<number>;
    drawerPosition: 'left' | 'right';
    style?: ViewStyle;
};
/**
 * Component that renders the sidebar screen of the drawer.
 */
declare class DrawerSidebar extends React.PureComponent<Props> {
    private getScreenOptions;
    private getLabel;
    private renderIcon;
    private handleItemPress;
    render(): JSX.Element | null;
}
export default DrawerSidebar;

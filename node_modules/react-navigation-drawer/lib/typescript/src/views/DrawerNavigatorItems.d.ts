import * as React from 'react';
import { ThemeContext } from 'react-navigation';
import { DrawerNavigatorItemsProps } from '../types';
/**
 * Component that renders the navigation list in the drawer.
 */
export default class DrawerNavigatorItems extends React.Component<DrawerNavigatorItemsProps> {
    static defaultProps: {
        activeTintColor: {
            light: string;
            dark: string;
        };
        activeBackgroundColor: {
            light: string;
            dark: string;
        };
        inactiveTintColor: {
            light: string;
            dark: string;
        };
        inactiveBackgroundColor: {
            light: string;
            dark: string;
        };
    };
    static contextType: React.Context<import("react-navigation").SupportedThemes>;
    context: React.ContextType<typeof ThemeContext>;
    private getActiveTintColor;
    private getInactiveTintColor;
    private getActiveBackgroundColor;
    private getInactiveBackgroundColor;
    render(): JSX.Element;
}

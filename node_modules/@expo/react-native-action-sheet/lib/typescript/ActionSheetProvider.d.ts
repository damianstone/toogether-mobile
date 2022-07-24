import * as React from 'react';
import ActionSheet from './ActionSheet';
import { ActionSheetProps } from './types';
interface Props {
    children: React.ReactNode;
    useNativeDriver?: boolean;
}
export default class ActionSheetProvider extends React.Component<Props> {
    _actionSheetRef: React.RefObject<ActionSheet>;
    _context: ActionSheetProps;
    constructor(props: Props);
    getContext(): ActionSheetProps;
    render(): JSX.Element;
}
export {};

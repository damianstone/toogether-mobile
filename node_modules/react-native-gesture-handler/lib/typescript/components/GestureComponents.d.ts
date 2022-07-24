import * as React from 'react';
import { ScrollViewProps as RNScrollViewProps, SwitchProps as RNSwitchProps, TextInputProps as RNTextInputProps, DrawerLayoutAndroidProps as RNDrawerLayoutAndroidProps, FlatList as RNFlatList, FlatListProps as RNFlatListProps } from 'react-native';
import { NativeViewGestureHandlerProps } from '../handlers/NativeViewGestureHandler';
export declare const ScrollView: React.ForwardRefExoticComponent<RNScrollViewProps & {
    children?: React.ReactNode;
} & NativeViewGestureHandlerProps & React.RefAttributes<React.ComponentType<any>>>;
export declare type ScrollView = typeof ScrollView & {
    scrollTo(y?: number | {
        x?: number;
        y?: number;
        animated?: boolean;
    }, x?: number, animated?: boolean): void;
    scrollToEnd(options?: {
        animated: boolean;
    }): void;
};
export declare const Switch: React.ForwardRefExoticComponent<RNSwitchProps & NativeViewGestureHandlerProps & React.RefAttributes<React.ComponentType<any>>>;
export declare type Switch = typeof Switch;
export declare const TextInput: React.ForwardRefExoticComponent<RNTextInputProps & NativeViewGestureHandlerProps & React.RefAttributes<React.ComponentType<any>>>;
export declare type TextInput = typeof TextInput;
export declare const DrawerLayoutAndroid: React.ForwardRefExoticComponent<RNDrawerLayoutAndroidProps & {
    children?: React.ReactNode;
} & NativeViewGestureHandlerProps & React.RefAttributes<React.ComponentType<any>>>;
export declare type DrawerLayoutAndroid = typeof DrawerLayoutAndroid;
export declare const FlatList: React.ForwardRefExoticComponent<RNFlatListProps<any> & React.RefAttributes<RNFlatList<any>>>;
export declare type FlatList<ItemT> = React.ComponentType<RNFlatListProps<ItemT> & NativeViewGestureHandlerProps & React.RefAttributes<any>> & {
    scrollToEnd: (params?: {
        animated?: boolean;
    }) => void;
    scrollToIndex: (params: {
        animated?: boolean;
        index: number;
        viewOffset?: number;
        viewPosition?: number;
    }) => void;
    scrollToItem: (params: {
        animated?: boolean;
        item: ItemT;
        viewPosition?: number;
    }) => void;
    scrollToOffset: (params: {
        animated?: boolean;
        offset: number;
    }) => void;
};

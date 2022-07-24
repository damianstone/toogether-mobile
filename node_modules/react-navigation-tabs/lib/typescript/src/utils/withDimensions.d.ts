import * as React from 'react';
declare type DimensionsType = {
    width: number;
    height: number;
};
declare type InjectedProps = {
    dimensions: DimensionsType;
    isLandscape: boolean;
};
export declare const isOrientationLandscape: ({ width, height }: DimensionsType) => boolean;
export default function withDimensions<Props extends InjectedProps>(WrappedComponent: React.ComponentType<Props>): React.ComponentType<Pick<Props, Exclude<keyof Props, keyof InjectedProps>>>;
export {};

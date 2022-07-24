import type { StackNavigationHelpers, StackNavigationConfig, StackDescriptorMap } from '../vendor/types';
declare type Props = {
    navigation: StackNavigationHelpers;
    descriptors: StackDescriptorMap;
    navigationConfig: StackNavigationConfig;
    screenProps: unknown;
};
export default function StackView({ navigation, descriptors: originalDescriptors, navigationConfig, ...rest }: Props): JSX.Element;
export {};

export declare type IBBoolean = 'YES' | 'NO' | boolean;
export declare type IBItem<H extends Record<string, any>, B extends Record<string, any[]> = {
    [key: string]: any;
}> = {
    $: H;
} & B;
export declare type Rect = {
    key: string;
    x: number;
    y: number;
    width: number;
    height: number;
};
export declare type IBRect = IBItem<Rect>;
export declare type ImageContentMode = 'scaleAspectFit' | 'scaleAspectFill';
export declare type ConstraintAttribute = 'top' | 'bottom' | 'trailing' | 'leading';
export declare type IBImageView = IBItem<{
    id: string;
    userLabel: string;
    image: string;
    clipsSubviews?: IBBoolean;
    userInteractionEnabled: IBBoolean;
    contentMode: string | 'scaleAspectFill';
    horizontalHuggingPriority: number;
    verticalHuggingPriority: number;
    insetsLayoutMarginsFromSafeArea?: IBBoolean;
    translatesAutoresizingMaskIntoConstraints?: IBBoolean;
}, {
    rect: IBRect[];
}>;
export declare type IBConstraint = IBItem<{
    firstItem: string;
    firstAttribute: ConstraintAttribute;
    secondItem: string;
    secondAttribute: ConstraintAttribute;
    id: string;
}>;
export declare type IBViewController = IBItem<{
    id: string;
    placeholderIdentifier?: string;
    userLabel: string;
    sceneMemberID: string;
}, {
    view: IBItem<{
        id: string;
        key: string;
        userInteractionEnabled: IBBoolean;
        contentMode: string | 'scaleToFill';
        insetsLayoutMarginsFromSafeArea: IBBoolean;
        userLabel: string;
    }, {
        rect: IBRect[];
        autoresizingMask: IBItem<{
            key: string;
            flexibleMaxX: IBBoolean;
            flexibleMaxY: IBBoolean;
        }>[];
        subviews: IBItem<object, {
            imageView: IBImageView[];
        }>[];
        color: IBItem<{
            key: string | 'backgroundColor';
            systemColor: string | 'systemBackgroundColor';
        }>[];
        constraints: IBItem<object, {
            constraint: IBConstraint[];
        }>[];
        viewLayoutGuide: IBItem<{
            id: string;
            key: string | 'safeArea';
        }>[];
    }>[];
}>;
export declare type IBPoint = IBItem<{
    key: string | 'canvasLocation';
    x: number;
    y: number;
}>;
export declare type IBScene = IBItem<{
    sceneID: string;
}, {
    objects: {
        viewController: IBViewController[];
        placeholder: IBItem<{
            id: string;
            placeholderIdentifier?: string;
            userLabel: string;
            sceneMemberID: string;
        }>[];
    }[];
    point: IBPoint[];
}>;
declare type IBResourceImage = IBItem<{
    name: string;
    width: number;
    height: number;
}>;
declare type IBDevice = IBItem<{
    id: string;
    orientation: string | 'portrait';
    appearance: string | 'light';
}>;
export declare type IBSplashScreenDocument = {
    document: IBItem<{
        type: 'com.apple.InterfaceBuilder3.CocoaTouch.Storyboard.XIB' | string;
        version: '3.0' | string;
        toolsVersion: number;
        targetRuntime: 'iOS.CocoaTouch' | string;
        propertyAccessControl: 'none' | string;
        useAutolayout: IBBoolean;
        launchScreen: IBBoolean;
        useTraitCollections: IBBoolean;
        useSafeAreas: IBBoolean;
        colorMatched: IBBoolean;
        initialViewController: string;
    }, {
        device: IBDevice[];
        dependencies: unknown[];
        scenes: {
            scene: IBScene[];
        }[];
        resources: {
            image: IBResourceImage[];
        }[];
    }>;
};
export declare function applyImageToSplashScreenXML(xml: IBSplashScreenDocument, { imageName, contentMode, }: {
    imageName: string;
    contentMode: ImageContentMode;
}): IBSplashScreenDocument;
export declare function createTemplateSplashScreenAsync(): Promise<IBSplashScreenDocument>;
export declare function toString(xml: any): string;
export {};

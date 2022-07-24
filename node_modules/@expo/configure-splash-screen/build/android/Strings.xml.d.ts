import { SplashScreenImageResizeModeType } from '../constants';
/**
 * @param androidMainPath Path to the main directory containing code and resources in Android project. In general that would be `android/app/src/main`.
 */
export default function configureStringsXml(androidMainPath: string, config?: {
    imageResizeMode?: SplashScreenImageResizeModeType;
    statusBar?: {
        translucent?: boolean;
    };
}): Promise<void>;

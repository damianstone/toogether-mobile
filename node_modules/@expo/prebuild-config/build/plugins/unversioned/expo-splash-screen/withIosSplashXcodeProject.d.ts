import { ConfigPlugin } from '@expo/config-plugins';
import { XcodeProject } from 'xcode';
import { IOSSplashConfig } from './getIosSplashConfig';
export declare const withIosSplashXcodeProject: ConfigPlugin<IOSSplashConfig>;
/**
 * Creates [STORYBOARD] file containing ui description of Splash/Launch Screen.
 */
export declare function getSplashStoryboardContentsAsync(config?: Partial<Pick<IOSSplashConfig, 'image' | 'resizeMode'>>): Promise<string>;
export declare function setSplashStoryboardAsync({ projectPath, projectName, project, }: {
    projectPath: string;
    projectName: string;
    project: XcodeProject;
}, config?: Partial<Pick<IOSSplashConfig, 'image' | 'resizeMode'>>): Promise<XcodeProject>;

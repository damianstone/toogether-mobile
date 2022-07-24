import { XcodeProject } from 'xcode';
export declare function getAllXcodeProjectPaths(projectRoot: string): string[];
export declare function getAllPBXProjectPaths(projectRoot: string): string[];
export declare function getApplicationNativeTarget({ project, projectName, }: {
    project: XcodeProject;
    projectName: string;
}): {
    uuid: string;
    target: import("xcode").PBXNativeTarget;
};

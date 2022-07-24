export interface ProjectFile<L extends string = string> {
    path: string;
    language: L;
    contents: string;
}
export declare function assert(value: any, message?: string | Error): asserts value;
export declare type ApplicationProjectFile = ProjectFile<'java' | 'kt'>;
export declare function getMainActivityAsync(projectRoot: string): Promise<ApplicationProjectFile>;

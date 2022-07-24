export default allBuilds;
declare const allBuilds: ({
    input: string;
    output: {
        file: any;
        format: string;
        sourcemap: boolean;
        name?: undefined;
    };
    plugins: any[];
    external: (id: any) => boolean;
    treeshake: {
        moduleSideEffects: boolean;
    };
} | {
    input: any;
    output: {
        file: any;
        format: string;
        name: string;
        sourcemap: boolean;
    };
    plugins: any[];
    external: (id: any) => boolean;
    treeshake: {
        moduleSideEffects: boolean;
    };
})[];

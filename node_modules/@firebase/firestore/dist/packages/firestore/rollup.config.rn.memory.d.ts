declare namespace _default {
    const input: string;
    namespace output {
        const file: string;
        const format: string;
        const sourcemap: boolean;
    }
    const plugins: any[];
    const external: (id: any) => boolean;
    namespace treeshake {
        const moduleSideEffects: boolean;
    }
}
export default _default;

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMainActivityAsync = exports.assert = void 0;
const assert_1 = __importDefault(require("assert"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const glob_1 = require("glob");
const path = __importStar(require("path"));
function assert(value, message) {
    // TODO: Upgrade node? TypeScript isn't properly asserting values without this wrapper.
    return assert_1.default(value, message);
}
exports.assert = assert;
async function getProjectFileAsync(projectRoot, name) {
    const mainActivityJavaPath = glob_1.sync(path.join(projectRoot, `android/app/src/main/java/**/${name}.{java,kt}`))[0];
    assert(mainActivityJavaPath, `Project file "${name}" does not exist in android project for root "${projectRoot}"`);
    const mainActivityPathJava = path.resolve(mainActivityJavaPath, `../${name}.java`);
    const mainActivityPathKotlin = path.resolve(mainActivityJavaPath, `../${name}.kt`);
    const isJava = await fs_extra_1.default.pathExists(mainActivityPathJava);
    const isKotlin = !isJava && (await fs_extra_1.default.pathExists(mainActivityPathKotlin));
    if (!isJava && !isKotlin) {
        throw new Error(`Failed to find '${name}' file for project: ${projectRoot}.`);
    }
    const filePath = isJava ? mainActivityPathJava : mainActivityPathKotlin;
    return {
        path: path.normalize(filePath),
        contents: fs_extra_1.default.readFileSync(filePath, 'utf8'),
        language: isJava ? 'java' : 'kt',
    };
}
async function getMainActivityAsync(projectRoot) {
    return getProjectFileAsync(projectRoot, 'MainActivity');
}
exports.getMainActivityAsync = getMainActivityAsync;
//# sourceMappingURL=Paths.js.map
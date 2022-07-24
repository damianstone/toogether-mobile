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
exports.getApplicationNativeTarget = exports.getAllPBXProjectPaths = exports.getAllXcodeProjectPaths = void 0;
// Copied over from `@expo/config-plugins/src/ios/Paths`
const assert_1 = __importDefault(require("assert"));
const fs_extra_1 = require("fs-extra");
const glob_1 = require("glob");
const path = __importStar(require("path"));
const ignoredPaths = ['**/@(Carthage|Pods|vendor|node_modules)/**'];
function getAllXcodeProjectPaths(projectRoot) {
    const iosFolder = 'ios';
    const pbxprojPaths = glob_1.sync('**/*.xcodeproj', { cwd: projectRoot, ignore: ignoredPaths })
        .filter(project => !/test|example|sample/i.test(project) || path.dirname(project) === iosFolder)
        .sort(project => (path.dirname(project) === iosFolder ? -1 : 1))
        // sort alphabetically to ensure this works the same across different devices (Fail in CI (linux) without this)
        .sort();
    if (!pbxprojPaths.length) {
        throw new Error(`Failed to locate the ios/*.xcodeproj files relative to path "${projectRoot}".`);
    }
    return pbxprojPaths.map(value => path.join(projectRoot, value));
}
exports.getAllXcodeProjectPaths = getAllXcodeProjectPaths;
function getAllPBXProjectPaths(projectRoot) {
    const projectPaths = getAllXcodeProjectPaths(projectRoot);
    const paths = projectPaths
        .map(value => path.join(value, 'project.pbxproj'))
        .filter(value => fs_extra_1.pathExistsSync(value));
    if (!paths.length) {
        throw new Error(`Failed to locate the ios/*.xcodeproj/project.pbxproj files relative to path "${projectRoot}".`);
    }
    return paths;
}
exports.getAllPBXProjectPaths = getAllPBXProjectPaths;
function getApplicationNativeTarget({ project, projectName, }) {
    const applicationNativeTarget = project.getTarget('com.apple.product-type.application');
    assert_1.default(applicationNativeTarget, `Couldn't locate application PBXNativeTarget in '.xcodeproj' file.`);
    assert_1.default(String(applicationNativeTarget.target.name) === projectName, `Application native target name mismatch. Expected ${projectName}, but found ${applicationNativeTarget.target.name}.`);
    return applicationNativeTarget;
}
exports.getApplicationNativeTarget = getApplicationNativeTarget;
//# sourceMappingURL=Paths.js.map
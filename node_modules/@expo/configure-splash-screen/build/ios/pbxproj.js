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
const path = __importStar(require("path"));
const xcode_1 = __importDefault(require("xcode"));
const Paths_1 = require("./Paths");
function getProjectConfig(projectRoot) {
    return {
        projectPath: Paths_1.getAllXcodeProjectPaths(projectRoot)[0],
        pbxprojPath: Paths_1.getAllPBXProjectPaths(projectRoot)[0],
    };
}
/**
 * Reads iOS project and locates `.pbxproj` file for further parsing and modifications.
 */
async function readPbxProject(projectRootPath) {
    const config = getProjectConfig(projectRootPath);
    const { projectPath: xcodeProjPath, pbxprojPath } = config;
    const projectPath = xcodeProjPath.substring(0, xcodeProjPath.length - '.xcodeproj'.length);
    const projectName = path.basename(projectPath);
    const pbxProject = xcode_1.default.project(pbxprojPath);
    await new Promise(resolve => pbxProject.parse(err => {
        if (err) {
            throw new Error(`.pbxproj file parsing issue: ${err.message}.`);
        }
        resolve();
    }));
    const applicationNativeTarget = Paths_1.getApplicationNativeTarget({ project: pbxProject, projectName });
    return {
        projectName,
        projectPath,
        pbxProject,
        applicationNativeTarget,
    };
}
exports.default = readPbxProject;
//# sourceMappingURL=pbxproj.js.map
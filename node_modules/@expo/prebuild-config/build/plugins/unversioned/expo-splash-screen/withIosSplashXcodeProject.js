"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSplashStoryboardContentsAsync = getSplashStoryboardContentsAsync;
exports.setSplashStoryboardAsync = setSplashStoryboardAsync;
exports.withIosSplashXcodeProject = void 0;

function _configPlugins() {
  const data = require("@expo/config-plugins");

  _configPlugins = function () {
    return data;
  };

  return data;
}

function _debug() {
  const data = _interopRequireDefault(require("debug"));

  _debug = function () {
    return data;
  };

  return data;
}

function _fsExtra() {
  const data = _interopRequireDefault(require("fs-extra"));

  _fsExtra = function () {
    return data;
  };

  return data;
}

function path() {
  const data = _interopRequireWildcard(require("path"));

  path = function () {
    return data;
  };

  return data;
}

function _InterfaceBuilder() {
  const data = require("./InterfaceBuilder");

  _InterfaceBuilder = function () {
    return data;
  };

  return data;
}

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const debug = (0, _debug().default)('expo:prebuild-config:expo-splash-screen:ios:xcodeproj');
const STORYBOARD_FILE_PATH = './SplashScreen.storyboard';

const withIosSplashXcodeProject = (config, splash) => {
  return (0, _configPlugins().withXcodeProject)(config, async config => {
    const projectPath = _configPlugins().IOSConfig.Paths.getSourceRoot(config.modRequest.projectRoot);

    config.modResults = await setSplashStoryboardAsync({
      projectPath,
      projectName: config.modRequest.projectName,
      project: config.modResults
    }, splash);
    return config;
  });
};
/**
 * Modifies `.pbxproj` by:
 * - adding reference for `.storyboard` file
 */


exports.withIosSplashXcodeProject = withIosSplashXcodeProject;

function updatePbxProject({
  projectName,
  project
}) {
  // Check if `${projectName}/SplashScreen.storyboard` already exists
  // Path relative to `ios` directory
  const storyboardFilePath = path().join(projectName, STORYBOARD_FILE_PATH);

  if (!project.hasFile(storyboardFilePath)) {
    debug(`Adding ${storyboardFilePath} to Xcode project`);

    _configPlugins().IOSConfig.XcodeUtils.addResourceFileToGroup({
      filepath: storyboardFilePath,
      groupName: projectName,
      project
    });
  }
}

function getImageContentMode(resizeMode) {
  switch (resizeMode) {
    case 'contain':
      return 'scaleAspectFit';

    case 'cover':
      return 'scaleAspectFill';

    default:
      throw new Error(`{ resizeMode: "${resizeMode}" } is not supported for iOS platform.`);
  }
}
/**
 * Creates [STORYBOARD] file containing ui description of Splash/Launch Screen.
 */


async function getSplashStoryboardContentsAsync(config) {
  const resizeMode = config === null || config === void 0 ? void 0 : config.resizeMode;
  const splashScreenImagePresent = Boolean(config === null || config === void 0 ? void 0 : config.image);
  let xml = await (0, _InterfaceBuilder().createTemplateSplashScreenAsync)(); // Only get the resize mode when the image is present.

  if (splashScreenImagePresent) {
    const contentMode = getImageContentMode(resizeMode || 'contain');
    xml = (0, _InterfaceBuilder().applyImageToSplashScreenXML)(xml, {
      contentMode,
      imageName: 'SplashScreen'
    });
  }

  return (0, _InterfaceBuilder().toString)(xml);
}

async function setSplashStoryboardAsync({
  projectPath,
  projectName,
  project
}, config) {
  const contents = await getSplashStoryboardContentsAsync(config);
  const filePath = path().resolve(projectPath, STORYBOARD_FILE_PATH);
  await _fsExtra().default.ensureDir(projectPath);
  await _fsExtra().default.writeFile(filePath, contents);
  await updatePbxProject({
    projectName,
    project
  });
  return project;
}
//# sourceMappingURL=withIosSplashXcodeProject.js.map
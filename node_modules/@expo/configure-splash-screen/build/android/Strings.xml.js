"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const constants_1 = require("../constants");
const xml_manipulation_1 = require("../xml-manipulation");
const STRINGS_XML_FILE_PATH = './res/values/strings.xml';
const DEFAULT_RESIZE_MODE = constants_1.SplashScreenImageResizeMode.CONTAIN;
const DEFAULT_STATUS_BAT_TRANSLUCENT = false;
function ensureDesiredXmlContent(xml, { imageResizeMode, statusBarTranslucent, }) {
    let idx = 0;
    const result = xml_manipulation_1.mergeXmlElements(xml, {
        elements: [
            {
                name: 'resources',
                elements: [
                    {
                        idx: idx++,
                        comment: ` Below line is handled by '@expo/configure-splash-screen' command and it's discouraged to modify it manually `,
                    },
                    {
                        deletionFlag: !imageResizeMode,
                        idx: !imageResizeMode ? undefined : idx++,
                        name: 'string',
                        attributes: {
                            name: 'expo_splash_screen_resize_mode',
                            translatable: 'false',
                        },
                        elements: [
                            {
                                text: imageResizeMode !== null && imageResizeMode !== void 0 ? imageResizeMode : DEFAULT_RESIZE_MODE,
                            },
                        ],
                    },
                    {
                        deletionFlag: !statusBarTranslucent,
                        idx: !statusBarTranslucent ? undefined : idx++,
                        name: 'string',
                        attributes: {
                            name: 'expo_splash_screen_status_bar_translucent',
                            translatable: 'false',
                        },
                        elements: [
                            {
                                text: String(statusBarTranslucent !== null && statusBarTranslucent !== void 0 ? statusBarTranslucent : DEFAULT_STATUS_BAT_TRANSLUCENT),
                            },
                        ],
                    },
                ],
            },
        ],
    });
    return result;
}
/**
 * @param androidMainPath Path to the main directory containing code and resources in Android project. In general that would be `android/app/src/main`.
 */
async function configureStringsXml(androidMainPath, config = {}) {
    var _a, _b, _c;
    const imageResizeMode = (_a = config.imageResizeMode) !== null && _a !== void 0 ? _a : constants_1.SplashScreenImageResizeMode.CONTAIN;
    const statusBarTranslucent = (_c = (_b = config.statusBar) === null || _b === void 0 ? void 0 : _b.translucent) !== null && _c !== void 0 ? _c : false;
    const filePath = path_1.default.resolve(androidMainPath, STRINGS_XML_FILE_PATH);
    const xmlContent = await xml_manipulation_1.readXmlFile(filePath);
    const configuredXmlContent = ensureDesiredXmlContent(xmlContent, {
        imageResizeMode,
        statusBarTranslucent,
    });
    await xml_manipulation_1.writeXmlFile(filePath, configuredXmlContent);
}
exports.default = configureStringsXml;
//# sourceMappingURL=Strings.xml.js.map
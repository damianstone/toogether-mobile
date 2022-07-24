"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NativeViewGestureHandler = exports.nativeViewProps = void 0;

var _createHandler = _interopRequireDefault(require("./createHandler"));

var _gestureHandlers = require("./gestureHandlers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const nativeViewProps = [..._gestureHandlers.baseProps, 'shouldActivateOnStart', 'disallowInterruption'];
exports.nativeViewProps = nativeViewProps;
// eslint-disable-next-line @typescript-eslint/no-redeclare -- backward compatibility; see description on the top of gestureHandlers.ts file
const NativeViewGestureHandler = (0, _createHandler.default)({
  name: 'NativeViewGestureHandler',
  allowedProps: nativeViewProps,
  config: {}
});
exports.NativeViewGestureHandler = NativeViewGestureHandler;
//# sourceMappingURL=NativeViewGestureHandler.js.map
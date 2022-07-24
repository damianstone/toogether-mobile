"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHandler = getHandler;
exports.createGestureHandler = createGestureHandler;
exports.dropGestureHandler = dropGestureHandler;
exports.getNodes = getNodes;
const gestures = {};

function getHandler(tag) {
  if (tag in gestures) return gestures[tag];
  throw new Error("No handler for tag ".concat(tag));
}

function createGestureHandler(handlerTag, handler) {
  if (handlerTag in gestures) {
    throw new Error("Handler with tag ".concat(handlerTag, " already exists"));
  }

  gestures[handlerTag] = handler; // @ts-ignore no types for web handlers yet

  gestures[handlerTag].handlerTag = handlerTag;
}

function dropGestureHandler(handlerTag) {
  getHandler(handlerTag).destroy(); // eslint-disable-next-line @typescript-eslint/no-dynamic-delete

  delete gestures[handlerTag];
}

function getNodes() {
  return { ...gestures
  };
}
//# sourceMappingURL=NodeManager.js.map
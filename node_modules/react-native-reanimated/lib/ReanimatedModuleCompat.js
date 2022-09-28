var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default {
    disconnectNodeFromView() {
        return __awaiter(this, void 0, void 0, function* () {
            // noop
        });
    },
    attachEvent(_viewTag, _eventName, _nodeID) {
        return __awaiter(this, void 0, void 0, function* () {
            // noop
        });
    },
    detachEvent(_viewTag, _eventName, _nodeID) {
        return __awaiter(this, void 0, void 0, function* () {
            // noop
        });
    },
    createNode(_nodeID, _config) {
        return __awaiter(this, void 0, void 0, function* () {
            // noop
        });
    },
    dropNode(_nodeID) {
        return __awaiter(this, void 0, void 0, function* () {
            // noop
        });
    },
    configureProps(_nativeProps, _uiProps) {
        return __awaiter(this, void 0, void 0, function* () {
            // noop
        });
    },
    disconnectNodes() {
        return __awaiter(this, void 0, void 0, function* () {
            // noop
        });
    },
    addListener() {
        return __awaiter(this, void 0, void 0, function* () {
            // noop
        });
    },
    removeListeners() {
        return __awaiter(this, void 0, void 0, function* () {
            // noop
        });
    },
    removeAllListeners() {
        return __awaiter(this, void 0, void 0, function* () {
            // noop
        });
    },
    animateNextTransition() {
        return __awaiter(this, void 0, void 0, function* () {
            console.warn('Reanimated: animateNextTransition is unimplemented on current platform');
        });
    },
};

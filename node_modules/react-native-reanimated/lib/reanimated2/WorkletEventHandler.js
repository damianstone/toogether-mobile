import NativeReanimatedModule from './NativeReanimated';
function jsListener(eventName, handler) {
    return (evt) => {
        handler(Object.assign(Object.assign({}, evt.nativeEvent), { eventName }));
    };
}
export default class WorkletEventHandler {
    constructor(worklet, eventNames = []) {
        this.worklet = worklet;
        this.eventNames = eventNames;
        this.reattachNeeded = false;
        this.listeners = {};
        this.viewTag = undefined;
        this.registrations = [];
        if (!NativeReanimatedModule.native) {
            this.listeners = eventNames.reduce((acc, eventName) => {
                acc[eventName] = jsListener(eventName, worklet);
                return acc;
            }, {});
        }
    }
    updateWorklet(newWorklet) {
        this.worklet = newWorklet;
        this.reattachNeeded = true;
    }
    registerForEvents(viewTag, fallbackEventName) {
        this.viewTag = viewTag;
        this.registrations = this.eventNames.map((eventName) => NativeReanimatedModule.registerEventHandler(viewTag + eventName, this.worklet));
        if (this.registrations.length === 0 && fallbackEventName) {
            this.registrations.push(NativeReanimatedModule.registerEventHandler(viewTag + fallbackEventName, this.worklet));
        }
    }
    unregisterFromEvents() {
        this.registrations.forEach((id) => NativeReanimatedModule.unregisterEventHandler(id));
        this.registrations = [];
    }
}

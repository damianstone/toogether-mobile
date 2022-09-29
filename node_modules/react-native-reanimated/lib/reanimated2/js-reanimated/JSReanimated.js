import MapperRegistry from './MapperRegistry';
import MutableValue from './MutableValue';
import Mapper from './Mapper';
import { NativeReanimated } from '../NativeReanimated/NativeReanimated';
export default class JSReanimated extends NativeReanimated {
    constructor() {
        super(false);
        this._valueSetter = undefined;
        this._renderRequested = false;
        this._mapperRegistry = new MapperRegistry(this);
        this._frames = [];
        if (process.env.JEST_WORKER_ID) {
            this.timeProvider = { now: () => Date.now() };
        }
        else {
            this.timeProvider = { now: () => window.performance.now() };
        }
    }
    pushFrame(frame) {
        this._frames.push(frame);
        this.maybeRequestRender();
    }
    getTimestamp() {
        return this.timeProvider.now();
    }
    maybeRequestRender() {
        if (!this._renderRequested) {
            this._renderRequested = true;
            requestAnimationFrame((_timestampMs) => {
                this._renderRequested = false;
                this._onRender(this.getTimestamp());
            });
        }
    }
    _onRender(timestampMs) {
        this._mapperRegistry.execute();
        const frames = [...this._frames];
        this._frames = [];
        for (let i = 0, len = frames.length; i < len; ++i) {
            frames[i](timestampMs);
        }
        if (this._mapperRegistry.needRunOnRender) {
            this._mapperRegistry.execute();
        }
    }
    installCoreFunctions(valueSetter) {
        this._valueSetter = valueSetter;
    }
    makeShareable(value) {
        return value;
    }
    makeMutable(value) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return new MutableValue(value, this._valueSetter);
    }
    makeRemote(object = {}) {
        return object;
    }
    startMapper(mapper, inputs = [], outputs = []) {
        const instance = new Mapper(this, mapper, inputs, outputs);
        const mapperId = this._mapperRegistry.startMapper(instance);
        this.maybeRequestRender();
        return mapperId;
    }
    stopMapper(mapperId) {
        this._mapperRegistry.stopMapper(mapperId);
    }
    registerEventHandler(_, __) {
        // noop
        return '';
    }
    unregisterEventHandler(_) {
        // noop
    }
    enableLayoutAnimations() {
        console.warn('[Reanimated] enableLayoutAnimations is not available for WEB yet');
    }
}

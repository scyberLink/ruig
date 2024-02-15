var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable require-jsdoc */
import SharedConfig from './SharedConfig';
import md5, { rand } from './md5';
import { API_VERSION, BASE } from '../configs/RestEndpoints';
import axios from 'axios';
var FetcherResponseType;
(function (FetcherResponseType) {
    FetcherResponseType[FetcherResponseType["JSON"] = 0] = "JSON";
    FetcherResponseType[FetcherResponseType["RESPONSE"] = 1] = "RESPONSE";
    FetcherResponseType[FetcherResponseType["BLOB"] = 2] = "BLOB";
})(FetcherResponseType || (FetcherResponseType = {}));
class Fetcher {
    constructor() {
        this.base_url = `${BASE}/${API_VERSION}`;
        this.listeners = {};
        this.frequency = 30000;
        this.FAIL_SAFE_THRESHOLD = 500;
    }
    addListenerForUrl(fetchOptions, listener, frequency = this.frequency, returnType = FetcherResponseType.JSON, failstop = this.FAIL_SAFE_THRESHOLD) {
        if (!fetchOptions)
            throw new Error('Invalid fetch options provided');
        if (!listener)
            throw new Error('Invalid listener provided');
        if (!returnType)
            throw new Error('Invalid returnType provided');
        if (!frequency)
            throw new Error('Invalid frequency provided');
        if (!failstop)
            throw new Error('Invalid failstop provided');
        const id = this.getId();
        const intervalId = setInterval(() => __awaiter(this, void 0, void 0, function* () {
            const intervalOwner = this.listeners[id];
            const hasReachThreshHold = intervalOwner.fail - intervalOwner.success >= failstop;
            try {
                const data = yield this.fetch(fetchOptions, returnType);
                if (data) {
                    ++intervalOwner.success;
                    listener(data);
                }
                else {
                    if (hasReachThreshHold) {
                        this.removeListener(id);
                    }
                    else {
                        ++intervalOwner.fail;
                    }
                }
            }
            catch (e) {
                if (hasReachThreshHold) {
                    this.removeListener(id);
                }
                else {
                    ++intervalOwner.fail;
                }
            }
        }), frequency);
        this.listeners[id] = {
            fetchOptions: fetchOptions,
            listener: listener,
            intervalId: intervalId,
            fail: 0,
            success: 0,
        };
        return id;
    }
    removeListener(id) {
        if (!id)
            throw Error('Id required to remove listener');
        if (Object.hasOwnProperty.call(this.listeners, id)) {
            this.clear(this.listeners[id].intervalId);
            delete this.listeners[id];
        }
    }
    release() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                let listenersArr = Object.values(this.listeners);
                listenersArr.forEach((listener) => {
                    this.clear(listener.intervalId);
                });
                this.listeners = {};
                listenersArr = [];
                resolve(true);
            });
        });
    }
    fetch(options, returnType = FetcherResponseType.JSON) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let url;
            const defaultOptions = {
                method: 'POST',
            };
            if (typeof options === 'string') {
                url = options;
                defaultOptions.method = 'GET';
                options = defaultOptions;
            }
            else {
                url = options.url;
                if (url) {
                    delete options.url;
                }
                else {
                    throw new Error('URL not found in options');
                }
                options = Object.assign(Object.assign({}, defaultOptions), options);
            }
            options.headers = Object.assign({ Accept: 'application/json', 'Content-Type': 'application/json', 'Cache-Control': ' no-cache' }, options.headers);
            const auth = SharedConfig === null || SharedConfig === void 0 ? void 0 : SharedConfig.getLocalData('auth');
            auth && (options.headers['Authorization'] = auth);
            if (url.search('http') < 1) {
                url = `${this.base_url}${url}`;
            }
            options = Object.assign({ url }, options);
            returnType == FetcherResponseType.BLOB && (options = Object.assign(Object.assign({}, options), { responseType: 'blob' }));
            let res;
            try {
                res = yield axios(options);
            }
            catch (err) {
                if (!((_a = err === null || err === void 0 ? void 0 : err.response) === null || _a === void 0 ? void 0 : _a.data)) {
                    throw new Error(err.message);
                }
                res = err.response;
            }
            const data = res === null || res === void 0 ? void 0 : res.data;
            if (((_b = data === null || data === void 0 ? void 0 : data.connection) === null || _b === void 0 ? void 0 : _b.statusCode) == 401) {
                SharedConfig.removeLocalData('auth');
            }
            return returnType == FetcherResponseType.RESPONSE ? res : data;
        });
    }
    clear(intervalId) {
        clearInterval(intervalId);
    }
    getId() {
        let id = md5(`${rand()}`);
        while (Object.hasOwnProperty.call(this.listeners, id)) {
            id = md5(rand());
        }
        return id;
    }
}
export { FetcherResponseType };
export default Fetcher;

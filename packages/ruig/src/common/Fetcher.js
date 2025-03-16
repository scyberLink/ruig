/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable require-jsdoc */
import { SharedConfig } from './SharedConfig';
import { md5, rand } from './md5';
import { API_VERSION, BASE } from '../configs/RestEndpoints';
import axios from 'axios';
var FetcherResponseType;
(function (FetcherResponseType) {
    FetcherResponseType[FetcherResponseType["JSON"] = 0] = "JSON";
    FetcherResponseType[FetcherResponseType["RESPONSE"] = 1] = "RESPONSE";
    FetcherResponseType[FetcherResponseType["BLOB"] = 2] = "BLOB";
})(FetcherResponseType || (FetcherResponseType = {}));
class Fetcher {
    static instance;
    base_url;
    listeners;
    frequency;
    FAIL_SAFE_THRESHOLD;
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
        const intervalId = setInterval(async () => {
            const intervalOwner = this.listeners[id];
            const hasReachThreshHold = intervalOwner.fail - intervalOwner.success >= failstop;
            try {
                const data = await this.fetch(fetchOptions, returnType);
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
        }, frequency);
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
    async release() {
        return new Promise((resolve) => {
            let listenersArr = Object.values(this.listeners);
            listenersArr.forEach((listener) => {
                this.clear(listener.intervalId);
            });
            this.listeners = {};
            listenersArr = [];
            resolve(true);
        });
    }
    async fetch(options, returnType = FetcherResponseType.JSON) {
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
            options = { ...defaultOptions, ...options };
        }
        options.headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Cache-Control': ' no-cache',
            ...options.headers,
        };
        const auth = SharedConfig?.getLocalData('auth');
        auth && (options.headers['Authorization'] = auth);
        if (url.search('http') < 1) {
            url = `${this.base_url}${url}`;
        }
        options = { url, ...options };
        returnType == FetcherResponseType.BLOB && (options = { ...options, responseType: 'blob' });
        let res;
        try {
            res = await axios(options);
        }
        catch (err) {
            if (!err?.response?.data) {
                throw new Error(err.message);
            }
            res = err.response;
        }
        const data = res?.data;
        if (data?.connection?.statusCode == 401) {
            SharedConfig.removeLocalData('auth');
        }
        return returnType == FetcherResponseType.RESPONSE ? res : data;
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
export { Fetcher };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmV0Y2hlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkZldGNoZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsdURBQXVEO0FBQ3ZELGtDQUFrQztBQUNsQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUE7QUFDN0MsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxPQUFPLENBQUE7QUFDakMsT0FBTyxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQTtBQUM1RCxPQUFPLEtBQXdCLE1BQU0sT0FBTyxDQUFBO0FBSTVDLElBQUssbUJBSUo7QUFKRCxXQUFLLG1CQUFtQjtJQUN0Qiw2REFBSSxDQUFBO0lBQ0oscUVBQVEsQ0FBQTtJQUNSLDZEQUFJLENBQUE7QUFDTixDQUFDLEVBSkksbUJBQW1CLEtBQW5CLG1CQUFtQixRQUl2QjtBQUVELE1BQU0sT0FBTztJQUNYLE1BQU0sQ0FBQyxRQUFRLENBQVM7SUFFeEIsUUFBUSxDQUFRO0lBQ2hCLFNBQVMsQ0FBWTtJQUNyQixTQUFTLENBQVE7SUFDakIsbUJBQW1CLENBQVE7SUFFM0I7UUFDRSxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFBO1FBQ3hDLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFBO1FBQ25CLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFBO1FBQ3RCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxHQUFHLENBQUE7SUFDaEMsQ0FBQztJQUVELGlCQUFpQixDQUNmLFlBQXdCLEVBQ3hCLFFBQWlDLEVBQ2pDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxFQUMxQixVQUFVLEdBQUcsbUJBQW1CLENBQUMsSUFBSSxFQUNyQyxRQUFRLEdBQUcsSUFBSSxDQUFDLG1CQUFtQjtRQUVuQyxJQUFJLENBQUMsWUFBWTtZQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0NBQWdDLENB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
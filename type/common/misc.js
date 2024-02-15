var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/* eslint-disable require-jsdoc */
import fetcher from './SharedFetcher';
import { FetcherResponseType } from './Fetcher';
export const isActivePath = (routeName) => {
    const path = window.location.pathname;
    const splitted = path.split('/');
    for (let i = 0; i < splitted.length; i++) {
        const segment = splitted[i];
        const routing = routeName.split('/')[1];
        if (segment === routing) {
            return 'active';
        }
    }
    return null;
};
export function objectEquals(obj1, obj2) {
    // Check if both object are strictly equal
    if (obj1 === obj2) {
        return true;
    }
    // Check if either object is null or not
    if (typeof obj1 !== 'object' || obj1 == null || typeof obj2 !== 'object' || obj2 == null) {
        return false;
    }
    // Get the keys of both objects
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    // Check if the number of keys is the same
    if (keys1.length !== keys2.length) {
        return false;
    }
    // Iterate through the keys and recursively check for equality
    for (const key of keys1) {
        if (!keys2.includes(key) || !objectEquals(obj1[key], obj2[key])) {
            return false;
        }
    }
    return true;
}
export function encodeQuery(object = {}) {
    return btoa(JSON.stringify(object));
}
export function getDataUrl(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield new Promise((resolve, reject) => {
            try {
                const reader = new FileReader();
                reader.readAsDataURL(data);
                reader.onloadend = () => {
                    const uri = reader.result;
                    resolve(uri);
                };
            }
            catch (err) {
                reject(err);
            }
        });
    });
}
export function getDataUrlFromUrl(url) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield new Promise((resolve, reject) => {
            function runner() {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const imo = {
                            url,
                            method: 'GET',
                        };
                        const idata = (yield fetcher.fetch(imo, FetcherResponseType.BLOB));
                        const uri = yield getDataUrl(idata);
                        resolve(uri);
                    }
                    catch (err) {
                        reject(err);
                    }
                });
            }
            runner();
        });
    });
}
export const getCurrentUrl = (includeHostName = false) => {
    const url = window.location.href;
    if (includeHostName) {
        return url;
    }
    const noScheme = url === null || url === void 0 ? void 0 : url.split('//')[1];
    const pathWithoutShemeAndHostname = noScheme === null || noScheme === void 0 ? void 0 : noScheme.split('/')[1];
    return `../${pathWithoutShemeAndHostname}`;
};

/* eslint-disable require-jsdoc */
export var StorageType;
(function (StorageType) {
    StorageType[StorageType["MEMORY_STORAGE"] = 0] = "MEMORY_STORAGE";
    StorageType[StorageType["LOCAL_STORAGE"] = 1] = "LOCAL_STORAGE";
    StorageType[StorageType["SESSION_STORAGE"] = 2] = "SESSION_STORAGE";
    StorageType[StorageType["DESTROY_ALL"] = 3] = "DESTROY_ALL";
})(StorageType || (StorageType = {}));
class GlobalConfig {
    constructor() {
        if (!GlobalConfig._instance) {
            GlobalConfig._instance = this;
            this.dynamicConfig = {};
            Object.freeze(GlobalConfig);
            Object.seal(GlobalConfig);
            this.__get = (key, where) => {
                try {
                    key = btoa(key);
                }
                catch (_err) {
                    /* empty */
                }
                let value;
                switch (where) {
                    case StorageType.LOCAL_STORAGE:
                        value = localStorage.getItem(key);
                        value = GlobalConfig.parse(value);
                        break;
                    case StorageType.SESSION_STORAGE:
                        value = sessionStorage.getItem(key);
                        value = GlobalConfig.parse(value);
                        break;
                    default:
                        value = this.dynamicConfig[key];
                        break;
                }
                return value;
            };
            const switchSet = (key, value, where) => {
                try {
                    key = btoa(key);
                }
                catch (_err) {
                    /* empty */
                }
                switch (where) {
                    case StorageType.LOCAL_STORAGE:
                        value = GlobalConfig.stringify(value);
                        localStorage.setItem(key, value);
                        break;
                    case StorageType.SESSION_STORAGE:
                        value = GlobalConfig.stringify(value);
                        sessionStorage.setItem(key, value);
                        break;
                    default:
                        this.dynamicConfig[key] = value;
                        break;
                }
            };
            this.__set = (key, value, where) => {
                if (key instanceof Object) {
                    let configKey;
                    let configObj;
                    if (key instanceof Array && value instanceof Array) {
                        configKey = key;
                        configObj = value;
                    }
                    else {
                        configKey = Object.keys(key);
                        configObj = Object.values(key);
                    }
                    for (let i = 0; i < configKey.length; i++) {
                        const k = configKey[i];
                        const v = configObj[i];
                        if (k) {
                            switchSet(k, v, where);
                        }
                    }
                }
                else {
                    if (key) {
                        switchSet(key, value, where);
                    }
                }
            };
            this.__remove = (key, where) => {
                let { key: copiedKey } = { key };
                try {
                    copiedKey = btoa(copiedKey);
                }
                catch (_err) {
                    /* empty */
                }
                let value;
                switch (where) {
                    case StorageType.LOCAL_STORAGE:
                        value = this.__get(key, StorageType.LOCAL_STORAGE);
                        if (value)
                            localStorage.removeItem(copiedKey);
                        break;
                    case StorageType.SESSION_STORAGE:
                        value = this.__get(key, StorageType.SESSION_STORAGE);
                        if (value)
                            sessionStorage.removeItem(copiedKey);
                        break;
                    default:
                        value = this.__get(key, StorageType.MEMORY_STORAGE);
                        if (value)
                            delete this.dynamicConfig[copiedKey];
                        break;
                }
                return value;
            };
            this.__destroy = (where) => {
                switch (where) {
                    case StorageType.LOCAL_STORAGE:
                        localStorage.clear();
                        break;
                    case StorageType.SESSION_STORAGE:
                        sessionStorage.clear();
                        break;
                    case StorageType.DESTROY_ALL:
                        this.dynamicConfig = {};
                        localStorage.clear();
                        sessionStorage.clear();
                        break;
                    default:
                        this.dynamicConfig = {};
                        break;
                }
            };
            this.__removeFrom = (fromKey, valueToRemove, where = StorageType.MEMORY_STORAGE) => {
                const exist = this.__get(fromKey, where);
                if (!exist)
                    return false;
                if (exist instanceof Array) {
                    let deleted;
                    if (!valueToRemove) {
                        deleted = exist.pop();
                    }
                    else {
                        const [deleted_temp] = [...exist[exist.indexOf(valueToRemove)]];
                        delete exist[exist.indexOf(valueToRemove)];
                        deleted = deleted_temp;
                    }
                    if (deleted) {
                        this.__set(fromKey, exist, where);
                    }
                    return deleted;
                }
                return false;
            };
            this.__has = (key, where) => {
                const exist = this.__get(key, where);
                return !!exist;
            };
        }
        return GlobalConfig._instance;
    }
    get(key) {
        return this.__get(key, StorageType.MEMORY_STORAGE);
    }
    set(key, value) {
        this.__set(key, value, StorageType.MEMORY_STORAGE);
    }
    addTo(parentKey, valueToAdd) {
        if (!Object.hasOwnProperty.call(this.dynamicConfig, parentKey)) {
            this.dynamicConfig[parentKey] = [];
        }
        if (!(this.dynamicConfig[parentKey] instanceof Array)) {
            this.dynamicConfig[parentKey] = [this.dynamicConfig[parentKey]];
        }
        this.dynamicConfig[parentKey].push(valueToAdd);
        return this.dynamicConfig[parentKey];
    }
    addToFlashData(parentKey, valueToAdd) {
        return this.addToLocalData(parentKey, valueToAdd);
    }
    addToLocalData(parentKey, valueToAdd) {
        let exist = this.__get(parentKey, StorageType.LOCAL_STORAGE);
        if (!exist)
            exist = [];
        if (!(exist instanceof Array)) {
            exist = [exist];
        }
        exist.push(valueToAdd);
        this.__set(parentKey, exist, StorageType.LOCAL_STORAGE);
        return exist;
    }
    addToSessionData(parentKey, valueToAdd) {
        let exist = this.__get(parentKey, StorageType.SESSION_STORAGE);
        if (!exist)
            exist = [];
        if (!(exist instanceof Array)) {
            exist = [exist];
        }
        exist.push(valueToAdd);
        this.__set(parentKey, exist, StorageType.SESSION_STORAGE);
        return exist;
    }
    removeFrom(parentKey, valueToRemove) {
        return this.__removeFrom(parentKey, valueToRemove, StorageType.MEMORY_STORAGE);
    }
    removeFromFlashData(parentKey, valueToRemove) {
        return this.removeFromLocalData(parentKey, valueToRemove);
    }
    removeFromLocalData(parentKey, valueToRemove) {
        return this.__removeFrom(parentKey, valueToRemove, StorageType.LOCAL_STORAGE);
    }
    removeFromSessionData(parentKey, valueToRemove) {
        return this.__removeFrom(parentKey, valueToRemove, StorageType.SESSION_STORAGE);
    }
    getFlashData(key) {
        return this.__remove(key, StorageType.LOCAL_STORAGE);
    }
    setFlashData(key, value) {
        this.setLocalData(key, value);
    }
    getLocalData(key) {
        return this.__get(key, StorageType.LOCAL_STORAGE);
    }
    setLocalData(key, value) {
        this.__set(key, value, StorageType.LOCAL_STORAGE);
    }
    getSessionData(key) {
        return this.__get(key, StorageType.SESSION_STORAGE);
    }
    setSessionData(key, value) {
        this.__set(key, value, StorageType.SESSION_STORAGE);
    }
    has(key) {
        return this.__has(key, StorageType.MEMORY_STORAGE);
    }
    isFlashData(key) {
        return this.isLocalData(key);
    }
    isLocalData(key) {
        return this.__has(key, StorageType.LOCAL_STORAGE);
    }
    isSessionData(key) {
        return this.__has(key, StorageType.SESSION_STORAGE);
    }
    remove(key) {
        return this.__remove(key, StorageType.MEMORY_STORAGE);
    }
    removeSessionData(key) {
        return this.__remove(key, StorageType.SESSION_STORAGE);
    }
    removeLocalData(key) {
        return this.__remove(key, StorageType.LOCAL_STORAGE);
    }
    removeFlashData(key) {
        return this.removeLocalData(key);
    }
    destroy() {
        this.__destroy(StorageType.MEMORY_STORAGE);
    }
    destroyLocalData() {
        this.__destroy(StorageType.LOCAL_STORAGE);
    }
    destroySessionData() {
        this.__destroy(StorageType.SESSION_STORAGE);
    }
    destroyAll() {
        this.__destroy(StorageType.DESTROY_ALL);
    }
    increment(key, throwIfNotfound = false) {
        if (Object.hasOwnProperty.call(this.dynamicConfig, key)) {
            if (typeof Number.parseInt(this.dynamicConfig[key]) === 'number') {
                ++this.dynamicConfig[key];
                return this.dynamicConfig[key];
            }
            else {
                throw new Error("Specified key is not a number can't increment");
            }
        }
        else {
            if (throwIfNotfound)
                throw new Error('Key not found');
        }
        return (this.dynamicConfig[key] = 1);
    }
    decrement(key, throwIfNotfound = false) {
        if (Object.hasOwnProperty.call(this.dynamicConfig, key)) {
            if (typeof Number.parseInt(this.dynamicConfig[key]) === 'number') {
                --this.dynamicConfig[key];
                return this.dynamicConfig[key];
            }
            else {
                throw new Error("Specified key is not a number can't decrement");
            }
        }
        else {
            if (throwIfNotfound)
                throw new Error('Key not found');
        }
        return (this.dynamicConfig[key] = -1);
    }
}
GlobalConfig.parse = (value) => {
    if (value) {
        try {
            value = atob(value);
        }
        catch (_err) {
            /* empty */
        }
        try {
            value = JSON.parse(value);
        }
        catch (error) {
            /* empty */
        }
    }
    return value;
};
GlobalConfig.stringify = (value) => {
    try {
        if (value instanceof Object) {
            value = JSON.stringify(value);
        }
    }
    catch (_err) {
        /* empty */
    }
    try {
        value = btoa(value);
    }
    catch (_err) {
        /* empty */
    }
    return value;
};
const SharedConfig = new GlobalConfig();
export default SharedConfig;

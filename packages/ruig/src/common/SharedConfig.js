/* eslint-disable require-jsdoc */
import { SHAREDCONFIG_ADDTOOBJECT_INITIAL_INDEX } from './constants';
class GlobalConfig {
    static _instance;
    dynamicConfig;
    __get;
    __set;
    __remove;
    __destroy;
    __removeFrom;
    __has;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    __removeFromObject;
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
                    case 1 /* StorageType.LOCAL_STORAGE */:
                        value = localStorage.getItem(key);
                        value = GlobalConfig.parse(value);
                        break;
                    case 2 /* StorageType.SESSION_STORAGE */:
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
                    case 1 /* StorageType.LOCAL_STORAGE */:
                        value = GlobalConfig.stringify(value);
                        localStorage.setItem(key, value);
                        break;
                    case 2 /* StorageType.SESSION_STORAGE */:
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
                    case 1 /* StorageType.LOCAL_STORAGE */:
                        value = this.__get(key, 1 /* StorageType.LOCAL_STORAGE */);
                        if (value)
                            localStorage.removeItem(copiedKey);
                        break;
                    case 2 /* StorageType.SESSION_STORAGE */:
                        value = this.__get(key, 2 /* StorageType.SESSION_STORAGE */);
                        if (value)
                            sessionStorage.removeItem(copiedKey);
                        break;
                    default:
                        value = this.__get(key, 0 /* StorageType.MEMORY_STORAGE */);
                        if (value)
                            delete this.dynamicConfig[copiedKey];
                        break;
                }
                return value;
            };
            this.__destroy = (where) => {
                switch (where) {
                    case 1 /* StorageType.LOCAL_STORAGE */:
                        localStorage.clear();
                        break;
                    case 2 /* StorageType.SESSION_STORAGE */:
                        sessionStorage.clear();
                        break;
                    case 3 /* StorageType.DESTROY_ALL */:
                        this.dynamicConfig = {};
                        localStorage.clear();
                        sessionStorage.clear();
                        break;
                    default:
                        this.dynamicConfig = {};
                        break;
                }
            };
            this.__removeFrom = (fromKey, valueToRemove, where = 0 /* StorageType.MEMORY_STORAGE */) => {
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
            this.__removeFromObject = (fromKey, keyToRemove, where = 0 /* StorageType.MEMORY_STORAGE */) => {
                const exist = this.__get(fromKey, where);
                if (!exist)
                    return false;
                if (!(exist instanceof Array)) {
                    const tempName = `${keyToRemove}_temp`;
                    const { [tempName]: temp } = { [tempName]: exist[keyToRemove] };
                    delete exist[keyToRemove];
                    const deleted = temp;
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
        return this.__get(key, 0 /* StorageType.MEMORY_STORAGE */);
    }
    set(key, value) {
        this.__set(key, value, 0 /* StorageType.MEMORY_STORAGE */);
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
        let exist = this.__get(parentKey, 1 /* StorageType.LOCAL_STORAGE */);
        if (!exist)
            exist = [];
        if (!(exist instanceof Array)) {
            exist = [exist];
        }
        exist.push(valueToAdd);
        this.__set(parentKey, exist, 1 /* StorageType.LOCAL_STORAGE */);
        return exist;
    }
    addToSessionData(parentKey, valueToAdd) {
        let exist = this.__get(parentKey, 2 /* StorageType.SESSION_STORAGE */);
        if (!exist)
            exist = [];
        if (!(exist instanceof Array)) {
            exist = [exist];
        }
        exist.push(valueToAdd);
        this.__set(parentKey, exist, 2 /* StorageType.SESSION_STORAGE */);
        return exist;
    }
    removeFrom(parentKey, valueToRemove) {
        return this.__removeFrom(parentKey, valueToRemove, 0 /* StorageType.MEMORY_STORAGE */);
    }
    removeFromFlashData(parentKey, valueToRemove) {
        return this.removeFromLocalData(parentKey, valueToRemove);
    }
    removeFromLocalData(parentKey, valueToRemove) {
        return this.__removeFrom(parentKey, valueToRemove, 1 /* StorageType.LOCAL_STORAGE */);
    }
    removeFromSessionData(parentKey, valueToRemove) {
        return this.__removeFrom(parentKey, valueToRemove, 2 /* StorageType.SESSION_STORAGE */);
    }
    addToObject(parentKey, key, value) {
        if (!Object.hasOwnProperty.call(this.dynamicConfig, parentKey)) {
            this.dynamicConfig[parentKey] = {};
        }
        if (typeof this.dynamicConfig[parentKey] == 'string' ||
            typeof this.dynamicConfig[parentKey] == 'number' ||
            typeof this.dynamicConfig[parentKey] == 'boolean') {
            this.dynamicConfig[parentKey] = { [SHAREDCONFIG_ADDTOOBJECT_INITIAL_INDEX]: this.dynamicConfig[parentKey] };
        }
        this.dynamicConfig[parentKey][key] = value;
        return this.dynamicConfig[parentKey];
    }
    addToObjectFlashData(parentKey, key, value) {
        return this.addToObjectLocalData(parentKey, key, value);
    }
    addToObjectLocalData(parentKey, key, value) {
        let exist = this.__get(parentKey, 1 /* StorageType.LOCAL_STORAGE */);
        if (!exist)
            exist = {};
        if (typeof exist == 'string' || typeof exist == 'number' || typeof exist == 'boolean') {
            exist = { [SHAREDCONFIG_ADDTOOBJECT_INITIAL_INDEX]: exist };
        }
        exist[key] = value;
        this.__set(parentKey, exist, 1 /* StorageType.LOCAL_STORAGE */);
        return exist;
    }
    addToObjectSessionData(parentKey, key, value) {
        let exist = this.__get(parentKey, 2 /* StorageType.SESSION_STORAGE */);
        if (!exist)
            exist = {};
        if (typeof exist == 'string' || typeof exist == 'number' || typeof exist == 'boolean') {
            exist = { [SHAREDCONFIG_ADDTOOBJECT_INITIAL_INDEX]: exist };
        }
        exist[key] = value;
        this.__set(parentKey, exist, 2 /* StorageType.SESSION_STORAGE */);
        return exist;
    }
    removeFromObject(parentKey, keyToRemove) {
        return this.__removeFromObject(parentKey, keyToRemove, 0 /* StorageType.MEMORY_STORAGE */);
    }
    removeFromObjectFlashData(parentKey, keyToRemove) {
        return this.removeFromObjectLocalData(parentKey, keyToRemove);
    }
    removeFromObjectLocalData(parentKey, keyToRemove) {
        return this.__removeFromObject(parentKey, keyToRemove, 1 /* StorageType.LOCAL_STORAGE */);
    }
    removeFromObjectSessionData(parentKey, keyToRemove) {
        return this.__removeFromObject(parentKey, keyToRemove, 2 /* StorageType.SESSION_STORAGE */);
    }
    getFlashData(key) {
        return this.__remove(key, 1 /* StorageType.LOCAL_STORAGE */);
    }
    setFlashData(key, value) {
        this.setLocalData(key, value);
    }
    getLocalData(key) {
        return this.__get(key, 1 /* StorageType.LOCAL_STORAGE */);
    }
    setLocalData(key, value) {
        this.__set(key, value, 1 /* StorageType.LOCAL_STORAGE */);
    }
    getSessionData(key) {
        return this.__get(key, 2 /* StorageType.SESSION_STORAGE */);
    }
    setSessionData(key, value) {
        this.__set(key, value, 2 /* StorageType.SESSION_STORAGE */);
    }
    has(key) {
        return this.__has(key, 0 /* StorageType.MEMORY_STORAGE */);
    }
    isFlashData(key) {
        return this.isLocalData(key);
    }
    isLocalData(key) {
        return this.__has(key, 1 /* StorageType.LOCAL_STORAGE */);
    }
    isSessionData(key) {
        return this.__has(key, 2 /* StorageType.SESSION_STORAGE */);
    }
    remove(key) {
        return this.__remove(key, 0 /* StorageType.MEMORY_STORAGE */);
    }
    removeSessionData(key) {
        return this.__remove(key, 2 /* StorageType.SESSION_STORAGE */);
    }
    removeLocalData(key) {
        return this.__remove(key, 1 /* StorageType.LOCAL_STORAGE */);
    }
    removeFlashData(key) {
        return this.removeLocalData(key);
    }
    destroy() {
        this.__destroy(0 /* StorageType.MEMORY_STORAGE */);
    }
    destroyLocalData() {
        this.__destroy(1 /* StorageType.LOCAL_STORAGE */);
    }
    destroySessionData() {
        this.__destroy(2 /* StorageType.SESSION_STORAGE */);
    }
    destroyAll() {
        this.__destroy(3 /* StorageType.DESTROY_ALL */);
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
    static parse = (value) => {
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
    static stringify = (value) => {
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
}
const SharedConfig = new GlobalConfig();
export { SharedConfig };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2hhcmVkQ29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU2hhcmVkQ29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGtDQUFrQztBQUVsQyxPQUFPLEVBQUUsc0NBQXNDLEVBQUUsTUFBTSxhQUFhLENBQUE7QUFVcEUsTUFBTSxZQUFZO0lBQ04sTUFBTSxDQUFDLFNBQVMsQ0FBYztJQUVoQyxhQUFhLENBQWE7SUFDMUIsS0FBSyxDQUFrRTtJQUN2RSxLQUFLLENBQXFGO0lBQzFGLFFBQVEsQ0FBa0U7SUFDMUUsU0FBUyxDQUErQjtJQUN4QyxZQUFZLENBSVc7SUFDdkIsS0FBSyxDQUErQztJQUM1RCw4REFBOEQ7SUFDdEQsa0JBQWtCLENBQXFFO0lBRS9GO1FBQ0UsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUU7WUFDM0IsWUFBWSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUE7WUFDN0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUE7WUFDdkIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQTtZQUMzQixNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFBO1lBRXpCLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLEVBQUUsS0FBa0IsRUFBRSxFQUFFO2dCQUN2QyxJQUFJO29CQUNGLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7aUJBQ2hCO2dCQUFDLE9BQU8sSUFBSSxFQUFFO29CQUNiLFdBQVc7aUJBQ1o7Z0JBRUQsSUFBSSxLQUFvQixDQUFBO2dCQUV4QixRQUFRLEtBQUssRUFBRTtvQkFDYjt3QkFDRSxLQUFLLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQTt3QkFDakMsS0FBSyxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7d0JBQ2pDLE1BQUs7b0JBRVA7d0JBQ0UsS0FBSyxHQUFHLGNBQWMsQ0FBQyxP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
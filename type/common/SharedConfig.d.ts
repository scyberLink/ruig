import IAnyObject from './models/IAnyObject';
export declare const enum StorageType {
    MEMORY_STORAGE = 0,
    LOCAL_STORAGE = 1,
    SESSION_STORAGE = 2,
    DESTROY_ALL = 3
}
declare class GlobalConfig {
    protected static _instance: GlobalConfig;
    private dynamicConfig;
    private __get;
    private __set;
    private __remove;
    private __destroy;
    private __removeFrom;
    private __has;
    constructor();
    get(key: string): string | IAnyObject | null;
    set(key: string, value: string | IAnyObject): void;
    addTo(parentKey: string, valueToAdd: string | IAnyObject): any;
    addToFlashData(parentKey: string, valueToAdd: string | IAnyObject): IAnyObject;
    addToLocalData(parentKey: string, valueToAdd: string | IAnyObject): IAnyObject;
    addToSessionData(parentKey: string, valueToAdd: string | IAnyObject): IAnyObject;
    removeFrom(parentKey: string, valueToRemove?: IAnyObject | string): string | IAnyObject | null;
    removeFromFlashData(parentKey: string, valueToRemove?: IAnyObject | string): string | IAnyObject | null;
    removeFromLocalData(parentKey: string, valueToRemove?: IAnyObject | string): string | IAnyObject | null;
    removeFromSessionData(parentKey: string, valueToRemove?: IAnyObject | string): string | IAnyObject | null;
    getFlashData(key: string): string | IAnyObject | null;
    setFlashData(key: string, value: string | IAnyObject): void;
    getLocalData(key: string): string | IAnyObject | null;
    setLocalData(key: string, value: string | IAnyObject): void;
    getSessionData(key: string): string | IAnyObject | null;
    setSessionData(key: string, value: string | IAnyObject): void;
    has(key: string): boolean;
    isFlashData(key: string): boolean;
    isLocalData(key: string): boolean;
    isSessionData(key: string): boolean;
    remove(key: string): string | IAnyObject | null;
    removeSessionData(key: string): string | IAnyObject | null;
    removeLocalData(key: string): string | IAnyObject | null;
    removeFlashData(key: string): string | IAnyObject | null;
    destroy(): void;
    destroyLocalData(): void;
    destroySessionData(): void;
    destroyAll(): void;
    increment(key: string, throwIfNotfound?: boolean): any;
    decrement(key: string, throwIfNotfound?: boolean): any;
    static parse: (value: string | null) => string | null;
    static stringify: (value: string | IAnyObject) => string | IAnyObject;
}
declare const SharedConfig: GlobalConfig;
export default SharedConfig;

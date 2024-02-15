import IAnyObject from './models/IAnyObject';
export declare const isActivePath: (routeName: string) => "active" | null;
export declare function objectEquals(obj1: IAnyObject, obj2: IAnyObject): boolean;
export declare function encodeQuery(object?: {}): string;
export declare function getDataUrl(data: Blob): Promise<unknown>;
export declare function getDataUrlFromUrl(url: string): Promise<unknown>;
export declare const getCurrentUrl: (includeHostName?: boolean) => string;

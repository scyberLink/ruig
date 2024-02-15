import { AxiosResponse } from 'axios';
import IAnyObject from './models/IAnyObject';
import IFetchData from './models/IFetchData';
declare enum FetcherResponseType {
    JSON = 0,
    RESPONSE = 1,
    BLOB = 2
}
declare class Fetcher {
    static instance: Fetcher;
    base_url: string;
    listeners: IAnyObject;
    frequency: number;
    FAIL_SAFE_THRESHOLD: number;
    constructor();
    addListenerForUrl(fetchOptions: IAnyObject, listener: (arg0: unknown) => void, frequency?: number, returnType?: FetcherResponseType, failstop?: number): string;
    removeListener(id: string): void;
    release(): Promise<unknown>;
    fetch(options: IAnyObject | string, returnType?: FetcherResponseType): Promise<IFetchData | AxiosResponse | Blob>;
    clear(intervalId: any): void;
    getId(): string;
}
export { FetcherResponseType };
export default Fetcher;

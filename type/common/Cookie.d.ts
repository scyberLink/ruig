declare class Cookie {
    name: string;
    value: any;
    maxAge: number;
    path: string;
    constructor(name: string, value: any, maxAge?: number, path?: string);
    set(): void;
    static get(name: string, returnJsonIfPossible?: boolean): string | null;
    static delete(name: string): void;
    static has(key: string): string | false;
    static replace(name: string, value: any, maxAge?: number, path?: string): string | false;
}
export default Cookie;

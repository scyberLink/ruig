import IExtensionId from './IExtensionId';
declare class ExtensionId implements IExtensionId {
    private _id;
    get id(): string;
    set id(value: string);
    constructor(id: string);
    hash(id: string): string;
}
export default ExtensionId;

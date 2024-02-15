import RemoteExtension from './RemoteExtension';
export interface SearchOption {
    searchBy: string;
    version: string;
    searchRegexOption: string;
}
declare class RemoteExtensionManager {
    search(regex: string, option: SearchOption): RemoteExtension[];
    getExtension(id: string): RemoteExtension;
    hasUpgrade(id: string): boolean;
}
export default RemoteExtensionManager;

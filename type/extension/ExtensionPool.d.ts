import IAppContainer from '../layers/view/application/components/base/model/IAppContainer';
declare class ExtensionPool {
    private appContainer;
    private loader;
    private builtin;
    private installed;
    private enabled;
    private disabled;
    constructor(appContainer: IAppContainer);
    private init;
    loadExtension(): void;
    install(id: string): boolean;
    uninstall(id: string): boolean;
    private remove;
    private delete;
    private add;
    enable(id: string): void;
    disable(id: string): void;
    isEnabled(id: string): boolean;
    isDisabled(id: string): boolean;
    isInstalled(id: string): boolean;
    isBuiltin(id: string): boolean;
    private getIndex;
}
export default ExtensionPool;

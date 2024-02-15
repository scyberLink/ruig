import IAppContainer from '../layers/view/application/components/base/model/IAppContainer';
declare class ExtensionLoader {
    private appContainer;
    constructor(appContainer: IAppContainer);
    load(id: string, builtin?: boolean): Promise<boolean>;
}
export default ExtensionLoader;

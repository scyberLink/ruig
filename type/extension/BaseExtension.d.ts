import IAppContainer from '../layers/view/application/components/base/model/IAppContainer';
import ExtensionPool from './ExtensionPool';
declare abstract class BaseExtension {
    appContainer: IAppContainer;
    pool: ExtensionPool;
    constructor(appContainer: IAppContainer);
    abstract init(): void;
    start(): void;
    install(): void;
    enable(): void;
    disable(): void;
    upgrade(): void;
    enableAutoUpgrade(): void;
    disableAutoUpgrade(): void;
}
export default BaseExtension;

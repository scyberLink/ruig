import ExtensionPool from './ExtensionPool';
class BaseExtension {
    constructor(appContainer) {
        this.appContainer = appContainer;
        this.pool = new ExtensionPool(this.appContainer);
    }
    start() { }
    install() { }
    enable() { }
    disable() { }
    upgrade() { }
    enableAutoUpgrade() { }
    disableAutoUpgrade() { }
}
export default BaseExtension;

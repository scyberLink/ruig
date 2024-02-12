import AppContainer from "../layers/view/application/components/base/AppContainer";

abstract class BaseExtension {
    appContainer: AppContainer
    pool: ExtensionPool

    constructor(appContainer: AppContainer) {
this.appContainer = appContainer
    }

    abstract init(): void;

    start() {

    }

    install() {
        
    }

    enable() {
        
    }

    disable() {
        
    }

    upgrade() {
        
    }

    enableAutoUpgrade() {
        
    }

    disableAutoUpgrade() {
        
    }

}

export default BaseExtension
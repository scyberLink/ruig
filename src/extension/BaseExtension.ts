import IAppContainer from "../layers/view/application/components/base/model/IAppContainer"
import ExtensionPool from "./ExtensionPool"

abstract class BaseExtension {
    appContainer: IAppContainer
    pool: ExtensionPool

    constructor(appContainer: IAppContainer) {
        this.appContainer = appContainer
        this.pool = new ExtensionPool(this.appContainer)

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
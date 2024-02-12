import IAppContainer from "../layers/view/application/components/base/model/IAppContainer"
import ExtensionId from "./ExtensionId"
import ExtensionLoader from "./ExtensionLoader"
import IExtensionId from "./IExtensionId"

class ExtensionPool {
    appContainer: IAppContainer
    loader: ExtensionLoader
    
    installed: IExtensionId[] = []
    enabled: IExtensionId[] = []
    disabled: IExtensionId[] = []

    constructor(appContainer: IAppContainer) {
        this.appContainer = appContainer
        this.loader = new ExtensionLoader(this.appContainer)
        this.init()
    }

    init() {
        throw new Error("Method not implemented.")
    }
    

    install(id: string) {
        let extensionId = new ExtensionId(id);
        //successfullyInstalled
        this.installed.push(extensionId)
        this.enabled.push(extensionId)

    }

    remove(id: string) {
        let extensionId = new ExtensionId(id);
        //successfullyInstalled
        this.installed.push(extensionId)
        this.enabled.push(extensionId)

    }

    enable(id: string) {
        let extensionId = new ExtensionId(id);
        //successfullyInstalled
        this.installed.push(extensionId)
        this.enabled.push(extensionId)

    }

    disable(id: string) {
        let extensionId = new ExtensionId(id);
        //successfullyInstalled
        this.installed.push(extensionId)
        this.enabled.push(extensionId)

    }

    isEnabled(id: string) {
        let extId = new ExtensionId(id)
        let index = this.enabled.findIndex(extensionId => extensionId.id === extId.id)
        return index >= 0
    }

    isDisabled(id: string) {
        let extId = new ExtensionId(id)
        let index = this.disabled.findIndex(extensionId => extensionId.id === extId.id)
        return index >= 0
    }
}

export default ExtensionPool
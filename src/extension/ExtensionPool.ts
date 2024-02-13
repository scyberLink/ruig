import SharedConfig from "../common/SharedConfig"
import { INSTALLED_EXTENSION, ENABLED_EXTENSION, DISABLED_EXTENSION } from "../common/constants"
import IAppContainer from "../layers/view/application/components/base/model/IAppContainer"
import ExtensionId from "./ExtensionId"
import ExtensionLoader from "./ExtensionLoader"
import IExtensionId from "./IExtensionId"

enum ExtensionState {
    ENABLE = 'enable',
    DISABLE = 'disable',
    INSTALL = 'install',
}

class ExtensionPool {
    private appContainer: IAppContainer
    private loader: ExtensionLoader

    private installed: IExtensionId[] = []
    private enabled: IExtensionId[] = []
    private disabled: IExtensionId[] = []

    constructor(appContainer: IAppContainer) {
        this.appContainer = appContainer
        this.loader = new ExtensionLoader(this.appContainer)
        this.init()
    }

    private init() {
        let installed = SharedConfig.getLocalData(INSTALLED_EXTENSION)
        let enabled = SharedConfig.getLocalData(ENABLED_EXTENSION)
        let disabled = SharedConfig.getLocalData(DISABLED_EXTENSION)

        if (installed) {
            this.installed = installed
        }

        if (enabled) {
            this.enabled = enabled
        }
        
        if (disabled) {
            this.disabled = disabled
        }
    }

    loadExtension() {
        for (const enabledExtension of this.enabled) {
            this.loader.load(enabledExtension.id)
        }
    }


    install(id: string) {
        this.remove(id)
        this.add(id, ExtensionState.INSTALL, ExtensionState.ENABLE)
        return true
    }

    uninstall(id: string) {
        this.remove(id)
        return true
    }

    private remove(id: string, ...states: ExtensionState[]) {
        let extId = new ExtensionId(id)

        if (!states || states.length < 1) {
            let indexEnabledAll = this.enabled.findIndex(extensionId => extensionId.id === extId.id)
            let indexDisabledAll = this.disabled.findIndex(extensionId => extensionId.id === extId.id)
            let indexInstalledAll = this.installed.findIndex(extensionId => extensionId.id === extId.id)

            if (indexEnabledAll >= 0) {
                delete this.enabled[indexEnabledAll]
            }

            if (indexDisabledAll >= 0) {
                delete this.disabled[indexDisabledAll]
            }

            if (indexInstalledAll >= 0) {
                delete this.installed[indexInstalledAll]
            }

            SharedConfig.removeFromLocalData(INSTALLED_EXTENSION, extId)
            SharedConfig.removeFromLocalData(ENABLED_EXTENSION, extId)
            SharedConfig.removeFromLocalData(DISABLED_EXTENSION, extId)
        }

        for (const state of states) {
            switch (state) {
                case ExtensionState.DISABLE:
                    let indexDisabled = this.disabled.findIndex(extensionId => extensionId.id === extId.id)

                    if (indexDisabled >= 0) {
                        delete this.disabled[indexDisabled]
                    }
                    SharedConfig.removeFromLocalData(DISABLED_EXTENSION, extId)
                    break;

                case ExtensionState.ENABLE:
                    let indexEnabled = this.enabled.findIndex(extensionId => extensionId.id === extId.id)

                    if (indexEnabled >= 0) {
                        delete this.enabled[indexEnabled]
                    }
                    SharedConfig.removeFromLocalData(ENABLED_EXTENSION, extId)
                    break;

                case ExtensionState.INSTALL:
                    let indexInstalled = this.installed.findIndex(extensionId => extensionId.id === extId.id)

                    if (indexInstalled >= 0) {
                        delete this.installed[indexInstalled]
                    }
                    SharedConfig.removeFromLocalData(INSTALLED_EXTENSION, extId)
                    break;
            }
        }
    }

    private add(id: string, ...states: ExtensionState[]) {
        let extId = new ExtensionId(id)

        for (const state of states) {
            switch (state) {

                case ExtensionState.DISABLE:
                    SharedConfig.addToLocalData(DISABLED_EXTENSION, extId)
                    this.disabled.push(extId)
                    break;

                case ExtensionState.ENABLE:
                    SharedConfig.addToLocalData(ENABLED_EXTENSION, extId)
                    this.enabled.push(extId)
                    break;

                case ExtensionState.INSTALL:
                    SharedConfig.addToLocalData(INSTALLED_EXTENSION, extId)
                    this.installed.push(extId)
                    break;
            }
        }
    }

    enable(id: string) {
        this.remove(id, ExtensionState.DISABLE)
        this.add(id, ExtensionState.ENABLE)

    }

    disable(id: string) {
        this.remove(id, ExtensionState.ENABLE)
        this.add(id, ExtensionState.DISABLE)
    }

    isEnabled(id: string) {
        let index = this.getIndex(id, ExtensionState.ENABLE)
        return index >= 0
    }

    isDisabled(id: string) {
        let index = this.getIndex(id, ExtensionState.DISABLE)
        return index >= 0
    }

    isInstalled(id: string) {
        let index = this.getIndex(id, ExtensionState.INSTALL)
        return index >= 0
    }

    getIndex(id: string, state: ExtensionState) {
        let extId = new ExtensionId(id)

        let index = -1

        switch (state) {

            case ExtensionState.DISABLE:
                index = this.disabled.findIndex(extensionId => extensionId.id === extId.id)
                break;

            case ExtensionState.ENABLE:
                index = this.enabled.findIndex(extensionId => extensionId.id === extId.id)
                break;

            case ExtensionState.INSTALL:
                index = this.installed.findIndex(extensionId => extensionId.id === extId.id)
                break;
        }

        return index
    }
}

export default ExtensionPool
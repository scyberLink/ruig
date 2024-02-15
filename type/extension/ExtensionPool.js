var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import SharedConfig from '../common/SharedConfig';
import { INSTALLED_EXTENSION, ENABLED_EXTENSION, DISABLED_EXTENSION, BUILTIN_EXTENSION } from '../common/constants';
import ExtensionLoadingException from '../common/exceptions/ExtensionLoadingException';
import ExtensionId from './ExtensionId';
import ExtensionLoader from './ExtensionLoader';
import builtinExtensions from '../builtinextensions.json';
var ExtensionState;
(function (ExtensionState) {
    ExtensionState["BUILTIN"] = "builtin";
    ExtensionState["ENABLE"] = "enable";
    ExtensionState["DISABLE"] = "disable";
    ExtensionState["INSTALL"] = "install";
})(ExtensionState || (ExtensionState = {}));
class ExtensionPool {
    constructor(appContainer) {
        this.builtin = [];
        this.installed = [];
        this.enabled = [];
        this.disabled = [];
        this.appContainer = appContainer;
        this.loader = new ExtensionLoader(this.appContainer);
        this.init();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const builtin = SharedConfig.getLocalData(BUILTIN_EXTENSION);
            const installed = SharedConfig.getLocalData(INSTALLED_EXTENSION);
            const enabled = SharedConfig.getLocalData(ENABLED_EXTENSION);
            const disabled = SharedConfig.getLocalData(DISABLED_EXTENSION);
            if (builtin && Array.isArray(builtin)) {
                this.builtin = builtin;
            }
            if (installed && Array.isArray(installed)) {
                this.installed = installed;
            }
            if (enabled && Array.isArray(enabled)) {
                this.enabled = enabled;
            }
            if (disabled && Array.isArray(disabled)) {
                this.disabled = disabled;
            }
            if (!this.builtin || this.builtin.length <= 0) {
                try {
                    for (const id of builtinExtensions) {
                        this.add(id, ExtensionState.BUILTIN, ExtensionState.ENABLE);
                    }
                }
                catch (error) {
                    throw new ExtensionLoadingException('Error loading builtin exetensions');
                }
            }
        });
    }
    loadExtension() {
        for (const enabledExtension of this.enabled) {
            this.loader.load(enabledExtension);
        }
    }
    install(id) {
        const extId = new ExtensionId(id);
        this.remove(extId.id);
        this.add(extId.id, ExtensionState.INSTALL, ExtensionState.ENABLE);
        return true;
    }
    uninstall(id) {
        const extId = new ExtensionId(id);
        this.remove(extId.id);
        return true;
    }
    remove(id, ...states) {
        if (!states || states.length < 1) {
            this.delete(id, ExtensionState.DISABLE);
            this.delete(id, ExtensionState.ENABLE);
            this.delete(id, ExtensionState.INSTALL);
            SharedConfig.removeFromLocalData(INSTALLED_EXTENSION, id);
            SharedConfig.removeFromLocalData(ENABLED_EXTENSION, id);
            SharedConfig.removeFromLocalData(DISABLED_EXTENSION, id);
            return;
        }
        for (const state of states) {
            switch (state) {
                case ExtensionState.DISABLE:
                    this.delete(id, ExtensionState.DISABLE);
                    SharedConfig.removeFromLocalData(DISABLED_EXTENSION, id);
                    break;
                case ExtensionState.ENABLE:
                    this.delete(id, ExtensionState.ENABLE);
                    SharedConfig.removeFromLocalData(ENABLED_EXTENSION, id);
                    break;
                case ExtensionState.INSTALL:
                    this.delete(id, ExtensionState.INSTALL);
                    SharedConfig.removeFromLocalData(INSTALLED_EXTENSION, id);
                    break;
            }
        }
    }
    delete(id, state) {
        const index = this.getIndex(id, state);
        switch (state) {
            case ExtensionState.DISABLE:
                if (index >= 0) {
                    delete this.disabled[index];
                }
                break;
            case ExtensionState.ENABLE:
                if (index >= 0) {
                    delete this.enabled[index];
                }
                break;
            case ExtensionState.INSTALL:
                if (index >= 0) {
                    delete this.installed[index];
                }
                break;
        }
    }
    add(id, ...states) {
        for (const state of states) {
            switch (state) {
                case ExtensionState.DISABLE:
                    SharedConfig.addToLocalData(DISABLED_EXTENSION, id);
                    this.disabled.push(id);
                    break;
                case ExtensionState.ENABLE:
                    SharedConfig.addToLocalData(ENABLED_EXTENSION, id);
                    this.enabled.push(id);
                    break;
                case ExtensionState.INSTALL:
                    SharedConfig.addToLocalData(INSTALLED_EXTENSION, id);
                    this.installed.push(id);
                    break;
                case ExtensionState.BUILTIN:
                    SharedConfig.addToLocalData(BUILTIN_EXTENSION, id);
                    this.installed.push(id);
                    break;
            }
        }
    }
    enable(id) {
        const extId = new ExtensionId(id);
        this.remove(extId.id, ExtensionState.DISABLE);
        this.add(extId.id, ExtensionState.ENABLE);
    }
    disable(id) {
        const extId = new ExtensionId(id);
        this.remove(extId.id, ExtensionState.ENABLE);
        this.add(extId.id, ExtensionState.DISABLE);
    }
    isEnabled(id) {
        const extId = new ExtensionId(id);
        const index = this.getIndex(extId.id, ExtensionState.ENABLE);
        return index >= 0;
    }
    isDisabled(id) {
        const extId = new ExtensionId(id);
        const index = this.getIndex(extId.id, ExtensionState.DISABLE);
        return index >= 0;
    }
    isInstalled(id) {
        const extId = new ExtensionId(id);
        const index = this.getIndex(extId.id, ExtensionState.INSTALL);
        return index >= 0;
    }
    isBuiltin(id) {
        const extId = new ExtensionId(id);
        const index = this.getIndex(extId.id, ExtensionState.BUILTIN);
        return index >= 0;
    }
    getIndex(id, state) {
        let index = -1;
        switch (state) {
            case ExtensionState.DISABLE:
                index = this.disabled.findIndex((extensionId) => extensionId === id);
                break;
            case ExtensionState.ENABLE:
                index = this.enabled.findIndex((extensionId) => extensionId === id);
                break;
            case ExtensionState.INSTALL:
                index = this.installed.findIndex((extensionId) => extensionId === id);
                break;
            case ExtensionState.BUILTIN:
                index = this.builtin.findIndex((extensionId) => extensionId === id);
                break;
        }
        return index;
    }
}
export default ExtensionPool;

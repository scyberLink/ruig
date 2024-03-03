import SharedConfig from '../common/SharedConfig'
import {
  INSTALLED_EXTENSION,
  ENABLED_EXTENSION,
  DISABLED_EXTENSION,
  EXTENSION_EVENT_DATA,
  EVENT_EXTENSION_DISABLE,
  EVENT_EXTENSION_ENABLE,
  EVENT_EXTENSION_INSTALL,
  EVENT_EXTENSION_MANUAL_INSTALL,
  EVENT_EXTENSION_UNINSTALL,
  MANUAL_INSTALLED_EXTENSION,
} from '../common/constants'
import IAppContainer from '../layers/view/application/components/base/model/IAppContainer'
import ExtensionLoader from './ExtensionLoader'
import builtinExtensions from '../builtinextensions.json'
import IExtension from './IExtension'
import NullException from '../common/exceptions/NullException'
import IAnyObject from '../common/models/IAnyObject'

export enum ExtensionState {
  BUILTIN = 'builtin',
  ENABLE = 'enable',
  DISABLE = 'disable',
  INSTALL = 'install',
  MANUAL_INSTALL = 'manualInstall',
}

export interface EXTENSION_EVENT_DATA_TYPE {
  [EXTENSION_EVENT_DATA]: string
}

export interface ExtensionStore {
  [key: string]: IExtension
}

class ExtensionPool {
  private appContainer?: IAppContainer
  private loader!: ExtensionLoader

  private builtin: string[] = []
  private installed: ExtensionStore = {}
  private enabled: ExtensionStore = {}
  private disabled: ExtensionStore = {}
  private manualInstalled: ExtensionStore = {}

  constructor(appContainer?: IAppContainer, load?: boolean) {
    this.appContainer = appContainer
    this.loader = new ExtensionLoader()

    this.init(load)
  }

  getEvent(id: string, eventType: string) {
    return new CustomEvent<EXTENSION_EVENT_DATA_TYPE>(eventType, {
      detail: { [EXTENSION_EVENT_DATA]: id },
    })
  }

  dispatchEvent(id: string, eventType: string) {
    dispatchEvent(this.getEvent(id, eventType))
  }

  private async init(load?: boolean) {
    const installed: ExtensionStore = SharedConfig.getLocalData(INSTALLED_EXTENSION) as IAnyObject
    const enabled: ExtensionStore = SharedConfig.getLocalData(ENABLED_EXTENSION) as IAnyObject
    const disabled: ExtensionStore = SharedConfig.getLocalData(DISABLED_EXTENSION) as IAnyObject
    const manualInstalled: ExtensionStore = SharedConfig.getLocalData(MANUAL_INSTALLED_EXTENSION) as IAnyObject

    if (installed) {
      this.installed = installed
    }

    if (enabled) {
      this.enabled = enabled
    }

    if (disabled) {
      this.disabled = disabled
    }

    if (manualInstalled) {
      this.manualInstalled = manualInstalled
    }

    this.builtin = builtinExtensions

    if (!this.installed || Object.values(this.installed).length <= 0) {
      for (const id of this.builtin) {
        this.install(id)
      }
    }

    this.loadExtension(load)
  }

  loadExtension(load?: boolean) {
    if (load && !this.appContainer) {
      throw new NullException('Cannot load extensions. App Container Object is null')
    }
    if (load) {
      for (const enabledExtension of Object.values(this.enabled)) {
        this.loader.load(enabledExtension.code, this.appContainer as IAppContainer)
      }
    }
  }

  async install(id: string) {
    if (this.installed[id]) {
      return false
    }

    this.remove(id)

    const extension: IExtension = (await this.loader.getExtension(id)) as IExtension
    extension!.builtin = this.builtin.some((extensionId) => id == extensionId)
    if (extension) {
      return false
    }

    this.add(extension, ExtensionState.INSTALL, ExtensionState.ENABLE)
    this.dispatchEvent(id, EVENT_EXTENSION_INSTALL)
    return true
  }

  manualInstall(extension: IExtension) {
    this.remove(extension.id)
    this.add(extension, ExtensionState.MANUAL_INSTALL, ExtensionState.INSTALL, ExtensionState.ENABLE)
    this.dispatchEvent(extension.id, EVENT_EXTENSION_MANUAL_INSTALL)
    return true
  }

  uninstall(id: string) {
    const removed = this.remove(id)
    this.dispatchEvent(id, EVENT_EXTENSION_UNINSTALL)
    return removed
  }

  private remove(id: string, ...states: ExtensionState[]) {
    if (!states || states.length < 1) {
      this.delete(id, ExtensionState.DISABLE)
      this.delete(id, ExtensionState.ENABLE)
      this.delete(id, ExtensionState.INSTALL)
      this.delete(id, ExtensionState.MANUAL_INSTALL)

      SharedConfig.removeFromObjectLocalData(INSTALLED_EXTENSION, id)
      SharedConfig.removeFromObjectLocalData(ENABLED_EXTENSION, id)
      SharedConfig.removeFromObjectLocalData(DISABLED_EXTENSION, id)
      SharedConfig.removeFromObjectLocalData(MANUAL_INSTALLED_EXTENSION, id)
      return true
    }

    for (const state of states) {
      switch (state) {
        case ExtensionState.DISABLE:
          this.delete(id, ExtensionState.DISABLE)
          return SharedConfig.removeFromObjectLocalData(DISABLED_EXTENSION, id)
          break

        case ExtensionState.ENABLE:
          this.delete(id, ExtensionState.ENABLE)
          return SharedConfig.removeFromObjectLocalData(ENABLED_EXTENSION, id)
          break

        case ExtensionState.INSTALL:
          this.delete(id, ExtensionState.INSTALL)
          return SharedConfig.removeFromObjectLocalData(INSTALLED_EXTENSION, id)
          break

        case ExtensionState.MANUAL_INSTALL:
          this.delete(id, ExtensionState.MANUAL_INSTALL)
          return SharedConfig.removeFromObjectLocalData(MANUAL_INSTALLED_EXTENSION, id)
          break
      }
    }
  }

  private delete(id: string, state: ExtensionState) {
    const extension = this.installed[id]
    if (!extension) {
      return false
    }
    let deleted

    switch (state) {
      case ExtensionState.DISABLE:
        deleted = { deleted: this.disabled[id] }.deleted
        delete this.disabled[id]
        break

      case ExtensionState.ENABLE:
        deleted = { deleted: this.disabled[id] }.deleted
        delete this.enabled[id]
        break

      case ExtensionState.INSTALL:
        deleted = { deleted: this.disabled[id] }.deleted
        delete this.installed[id]
        break

      case ExtensionState.MANUAL_INSTALL:
        deleted = { deleted: this.disabled[id] }.deleted
        delete this.manualInstalled[id]
        break
    }

    return deleted
  }

  private add(extension: IExtension, ...states: ExtensionState[]) {
    for (const state of states) {
      switch (state) {
        case ExtensionState.DISABLE:
          SharedConfig.addToObjectLocalData(DISABLED_EXTENSION, extension.id, extension)
          this.disabled[extension.id] = extension
          break

        case ExtensionState.ENABLE:
          SharedConfig.addToObjectLocalData(ENABLED_EXTENSION, extension.id, extension)
          this.enabled[extension.id] = extension
          break

        case ExtensionState.INSTALL:
          SharedConfig.addToObjectLocalData(INSTALLED_EXTENSION, extension.id, extension)
          this.installed[extension.id] = extension
          break

        case ExtensionState.MANUAL_INSTALL:
          SharedConfig.addToObjectLocalData(MANUAL_INSTALLED_EXTENSION, extension.id, extension)
          this.installed[extension.id] = extension
          break
      }
    }
  }

  enable(id: string) {
    const extension = this.installed[id]
    if (!extension) {
      return false
    }
    this.remove(id, ExtensionState.DISABLE)
    this.add(extension, ExtensionState.ENABLE)
    this.dispatchEvent(id, EVENT_EXTENSION_ENABLE)
    return true
  }

  disable(id: string) {
    const extension = this.installed[id]
    if (!extension) {
      return false
    }
    this.remove(id, ExtensionState.ENABLE)
    this.add(extension, ExtensionState.DISABLE)
    this.dispatchEvent(id, EVENT_EXTENSION_DISABLE)
    return true
  }

  isEnabled(id: string) {
    return !!this.enabled[id]
  }

  isDisabled(id: string) {
    return !!this.disabled[id]
  }

  isInstalled(id: string) {
    return !!this.installed[id]
  }

  isBuiltin(id: string) {
    return !!this.installed[id]?.builtin
  }
}

export default ExtensionPool

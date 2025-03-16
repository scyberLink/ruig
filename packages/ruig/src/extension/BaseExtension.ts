import { NullException } from '../common/exceptions/NullException'
import { IAppContainer } from '../layers/view/application/components/base/model/IAppContainer'
import { ExtensionPool } from './ExtensionPool'

abstract class BaseExtension {
  appContainer?: IAppContainer
  pool: ExtensionPool

  constructor(appContainer?: IAppContainer) {
    this.appContainer = appContainer
    this.pool = new ExtensionPool(this.appContainer)
    this.init()
  }

  static extensionAuthor: string
  static extensionName: string

  static getId(extension: typeof BaseExtension) {
    if (!(extension.prototype instanceof BaseExtension)) {
      throw new Error(`Class does not extend BaseExtension`)
    }

    if (!extension.extensionAuthor || !extension.extensionName) {
      throw new NullException(`You have not defined either extensionAuthor or extensionName`)
    }

    return `${extension.extensionAuthor}.${extension.extensionName}`
  }

  abstract init(): void

  start() {}

  install() {}

  enable() {}

  disable() {}

  upgrade() {}

  enableAutoUpgrade() {}

  disableAutoUpgrade() {}
}

export { BaseExtension }

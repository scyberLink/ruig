import NullException from '../common/exceptions/NullException'
import IAppContainer from '../layers/view/application/components/base/model/IAppContainer'
import ExtensionPool from './ExtensionPool'

abstract class BaseExtension {
  appContainer: IAppContainer
  pool: ExtensionPool

  constructor(appContainer: IAppContainer) {
    this.appContainer = appContainer
    this.pool = new ExtensionPool(this.appContainer)
  }

  static extension: typeof BaseExtension
  static extensionAuthor: string
  static extensionName: string

  static get id() {
    if (!BaseExtension.extension.extensionAuthor || !BaseExtension.extension.extensionName) {
      throw new NullException(
        `You have not defined either extensionAuthor or extensionName in ${BaseExtension.extension.name}`,
      )
    }
    return `${BaseExtension.extension.extensionAuthor}.${BaseExtension.extension.extensionName}`
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

export default BaseExtension

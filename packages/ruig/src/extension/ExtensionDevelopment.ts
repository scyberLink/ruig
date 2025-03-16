import { BaseExtension } from './BaseExtension'
import { ExtensionPool } from './ExtensionPool'

class ExtensionDevelopment {
  extensionPool: ExtensionPool

  constructor() {
    this.extensionPool = new ExtensionPool()
  }

  install(extension: typeof BaseExtension) {
    this.extensionPool.manualInstall({
      id: extension.getId(extension),
      rating: 0,
      downloads: 0,
      builtin: false,
    })
  }
}

export { ExtensionDevelopment }

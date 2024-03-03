import BaseExtension from './BaseExtension'
import ExtensionPool from './ExtensionPool'

class ExtensionDevelopment {
  extensionPool: ExtensionPool

  constructor() {
    this.extensionPool = new ExtensionPool()
  }

  install(extension: typeof BaseExtension) {
    this.extensionPool.manualInstall({
      id: extension.getId(extension),
      name: `${extension.extensionAuthor}::Dev. mode`,
      author: extension.extensionAuthor,
      code: extension.toString(),
      rating: 0,
      downloads: 0,
      builtin: false,
      version: '0',
    })
  }
}

export default ExtensionDevelopment

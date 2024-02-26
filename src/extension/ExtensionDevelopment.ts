import BaseExtension from './BaseExtension'
import ExtensionPool from './ExtensionPool'

class ExtensionDevelopment {
  extensionPool: ExtensionPool

  constructor() {
    this.extensionPool = new ExtensionPool()
  }

  install(extension: typeof BaseExtension) {
    this.extensionPool.manualInstall({
      id: extension.id,
      author: extension.extensionAuthor,
      code: extension.toString(),
      rating: 0,
      downloads: 0,
      builtin: false,
      name: 'Development mode',
      version: '0',
    })
  }
}

export default ExtensionDevelopment

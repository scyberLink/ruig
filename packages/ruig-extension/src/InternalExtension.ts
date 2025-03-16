import { REI } from 'ruig'
import { PickTool } from './tool/PickTool'
import { PreviewTool } from './tool/PreviewTool'
import { IAppContainer } from 'ruig'

class InternalExtension extends REI.BaseExtension {
  static extensionAuthor = 'Ruig'
  static extensionName = 'InternalExtension'
  init() {
    new PreviewTool(this.appContainer as IAppContainer)
    new PickTool(this.appContainer as IAppContainer)
  }
}

export { InternalExtension }

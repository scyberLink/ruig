import { IAnyObject } from '../../../../../common/models/IAnyObject'
import { BaseComponent } from '../base/BaseComponent'
import { IToolBar } from '../base/model/IToolBar'

class ToolBar extends BaseComponent implements IToolBar {
  constructor(style?: IAnyObject) {
    super({
      ...(style ?? {}),
    })
  }
}

export { ToolBar }

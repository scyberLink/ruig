import { IAnyObject } from '../../../../../common/models/IAnyObject'
import { BaseComponent } from '../base/BaseComponent'
import { IStatusBar } from '../base/model/IStatusBar'

class StatusBar extends BaseComponent implements IStatusBar {
  constructor(style?: IAnyObject) {
    super({
      ...(style ?? {}),
    })
  }
}

export { StatusBar }

import { IAnyObject } from '../../../../../../common/models/IAnyObject'
import { BaseComponent } from '../../base/BaseComponent'
import { ILeftSideBar } from '../../base/model/ILeftSideBar'

class LeftSideBar extends BaseComponent implements ILeftSideBar {
  constructor(style?: IAnyObject) {
    super({
      ...(style ?? {}),
    })
  }
}

export { LeftSideBar }

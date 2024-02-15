import IAnyObject from '../../../../../common/models/IAnyObject'
import BaseComponent from '../base/BaseComponent'
import IActionBar from '../base/model/IActionBar'

class ActionBar extends BaseComponent implements IActionBar {
  constructor(style?: IAnyObject) {
    super({
      ...(style ?? {}),
    })
  }
}

export default ActionBar

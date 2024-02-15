import IAnyObject from '../../../../../common/models/IAnyObject'
import BaseComponent from '../base/BaseComponent'
import ITabPane from '../base/model/ITabPane'

class TabPane extends BaseComponent implements ITabPane {
  constructor(style?: IAnyObject) {
    super({
      background: 'red',
      ...(style ?? {}),
    })
  }
}

export default TabPane

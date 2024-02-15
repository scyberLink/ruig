import IAnyObject from '../../../../../common/models/IAnyObject'
import BaseComponent from '../base/BaseComponent'
import IContextMenu from '../base/model/IContextMenu'

class ContextMenu extends BaseComponent implements IContextMenu {
  constructor(style?: IAnyObject) {
    super({
      background: 'green',
      ...(style ?? {}),
    })
  }
}

export default ContextMenu

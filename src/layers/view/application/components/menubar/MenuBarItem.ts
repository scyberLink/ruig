import IAnyObject from '../../../../../common/models/IAnyObject'
import { showContextContent } from '../../../common/utils'
import Tool from '../../common/Tool'
import ContextItem from '../contextmenu/ContextItem'

class MenuBarItem extends Tool {
  contextItems: ContextItem[] = []

  constructor(style?: IAnyObject) {
    super({
      width: 'unset',
      ...(style ?? {}),
      position: 'relative',
    })
  }

  addItems(...items: ContextItem[]) {
    this.contextItems.push(...items.filter(Boolean))
  }

  activate = async () => {
    showContextContent(this.contextItems, { onHide: () => this.disable() })
  }
}

export default MenuBarItem

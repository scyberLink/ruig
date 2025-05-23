import { IAnyObject } from '../../../../../common/models/IAnyObject'
import { showContextContent } from '../../../common/utils'
import { Tool } from '../../common/Tool'
import { ContextItem } from '../contextmenu/ContextItem'

class MenuBarItemManager extends Tool {
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

import Reblend from 'reblendjs'

async function MenuBarItem({ style }: { style: ReblendTyping.CSSProperties }) {
  return (
    <div
      style={{
        width: 'unset',
        ...(style ?? {}),
        position: 'relative' as any,
      }}
      title="MenuBarItem"
    ></div>
  )
}

export { MenuBarItemManager, MenuBarItem }

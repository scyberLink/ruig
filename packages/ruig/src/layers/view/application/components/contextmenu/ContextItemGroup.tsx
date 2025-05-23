
import { BaseManager } from '../base/BaseComponent'
import { ContextItem } from './ContextItem'

class ContextItemGroupManager extends BaseManager {
  constructor() {
    super({
      position: 'initial',
      background: 'transparent',
      margin: '5px 0',
      border: '0',
      'border-color': 'gray',
      'border-top': '1px solid',
      'border-bottom': '1px solid',
    })
    this.hovered({ borderColor: 'blue' })
  }

  init(groupName: string, ...contextItems: ContextItem[]) {
    this.title = groupName
    this.appendChildren(...contextItems)
  }
}

import Reblend from 'reblendjs'

async function ContextItemGroup({ style }: { style: ReblendTyping.CSSProperties }) {
  return (
    <div
      style={{
        position: 'initial',
        background: 'transparent',
        margin: '5px 0',
        border: '0',
        'border-color': 'gray',
        'border-top': '1px solid',
        'border-bottom': '1px solid',
        ...style,
      }}
    >
      ContextItemGroup
    </div>
  )
}

export { ContextItemGroupManager, ContextItemGroup }

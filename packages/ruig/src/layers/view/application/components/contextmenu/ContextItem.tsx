/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseComponent } from '../base/BaseComponent'

class ContextItemManager extends BaseComponent {
  groupName = 'Miscellenous'

  constructor() {
    super({
      position: 'initial',
      background: 'transparent',
      overflow: 'hidden',
      'max-height': '500px',
      //'min-height': '20px',
      'max-width': '500px',
      //'min-width': '100px',
      border: '0',
      margin: '20px 0',
    })
  }

  init(htmlInstance: HTMLElement | Text, groupName?: string) {
    this.groupName = groupName || this.groupName
    this.appendChild(htmlInstance)
  }
}

import Reblend from 'reblendjs'

async function ContextItem({ style }: { style: ReblendTyping.CSSProperties }) {
  return (
    <div
      style={{
        position: 'initial',
        background: 'transparent',
        overflow: 'hidden',
        'max-height': '500px',
        //'min-height': '20px',
        'max-width': '500px',
        //'min-width': '100px',
        border: '0',
        margin: '20px 0',
      }}
    >
      ContextItem
    </div>
  )
}

export { ContextItemManager, ContextItem }

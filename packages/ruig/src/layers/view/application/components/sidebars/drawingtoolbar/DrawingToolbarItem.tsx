import { IAnyObject } from '../../../../../../common/models/IAnyObject'
import { Tool } from '../../../common/Tool'

class DrawingToolbarItemManager extends Tool {
  constructor(style?: IAnyObject) {
    super({
      ...(style ?? {}),
      position: 'relative',
    })
  }
}

import Reblend from 'reblendjs'

async function DrawingToolbarItem({ style }: { style: ReblendTyping.CSSProperties }) {
  return (
    <div
      style={{
        ...(style ?? {}),
        position: 'relative' as any,
      }}
    >
      DrawingToolbarItem
    </div>
  )
}

export { DrawingToolbarItemManager, DrawingToolbarItem }

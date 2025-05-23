import { IAnyObject } from '../../../../../../common/models/IAnyObject'
import { Color } from '../../../common/Color'
import { BaseManager } from '../../base/BaseComponent'
import { IHorizontalScrollBar } from '../../base/model/IHorizontalScrollBar'

class HorizontalScrollBarManager extends BaseManager implements IHorizontalScrollBar {
  constructor(style?: IAnyObject) {
    super({
      ...(style ?? {}),
      background: 'gray',
    })
  }
}

import Reblend from 'reblendjs'

async function HorizontalScrollBar({ style }: { style: ReblendTyping.CSSProperties }) {
  return (
    <div
      style={{
        ...(style ?? {}),
        border: `0.5px solid ${Color.ash}`,
      }}
      title="HorizontalScrollBar"
    ></div>
  )
}

export { HorizontalScrollBarManager, HorizontalScrollBar }

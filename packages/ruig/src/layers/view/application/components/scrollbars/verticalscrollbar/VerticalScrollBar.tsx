import { IAnyObject } from '../../../../../../common/models/IAnyObject'
import { Color } from '../../../common/Color'
import { BaseComponent } from '../../base/BaseComponent'
import { IVerticalScrollBar } from '../../base/model/IVerticalScrollBar'

class VerticalScrollBarManager extends BaseComponent implements IVerticalScrollBar {
  constructor(style?: IAnyObject) {
    super({
      background: 'red',
      ...(style ?? {}),
    })
  }
}

import Reblend from 'reblendjs'

async function VerticalScrollBar({ style }: { style: ReblendTyping.CSSProperties }) {
  return (
    <div
      style={{
        border: `0.5px solid ${Color.ash}`,
        ...(style ?? {}),
      }}
      title="VerticalScrollBar"
    ></div>
  )
}

export { VerticalScrollBarManager, VerticalScrollBar }

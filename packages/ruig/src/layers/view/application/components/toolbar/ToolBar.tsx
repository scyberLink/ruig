import { IAnyObject } from '../../../../../common/models/IAnyObject'
import { Color } from '../../common/Color'
import { BaseManager } from '../base/BaseComponent'
import { IToolBar } from '../base/model/IToolBar'

class ToolBarManager extends BaseManager implements IToolBar {
  constructor(style?: IAnyObject) {
    super({
      ...(style ?? {}),
    })
  }
}

import Reblend from 'reblendjs'

async function ToolBar({ style }: { style: ReblendTyping.CSSProperties }) {
  return (
    <div
      style={{
        border: `0.5px solid ${Color.ash}`,
        ...style,
      }}
    ></div>
  )
}

export { ToolBarManager, ToolBar }

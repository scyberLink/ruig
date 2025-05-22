import { IAnyObject } from '../../../../../common/models/IAnyObject'
import { Color } from '../../common/Color'
import { BaseComponent } from '../base/BaseComponent'
import { IStatusBar } from '../base/model/IStatusBar'

class StatusBarManager extends BaseComponent implements IStatusBar {
  constructor(style?: IAnyObject) {
    super({
      ...(style ?? {}),
    })
  }
}

import Reblend from 'reblendjs'

async function StatusBar({ style }: { style: ReblendTyping.CSSProperties }) {
  return (
    <div
      style={{
        border: `0.5px solid ${Color.ash}`,
        ...style,
      }}
    ></div>
  )
}

export { StatusBarManager, StatusBar }

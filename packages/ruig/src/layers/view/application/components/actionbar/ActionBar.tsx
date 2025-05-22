import { IAnyObject } from '../../../../../common/models/IAnyObject'
import { Color } from '../../common/Color'
import { BaseComponent } from '../base/BaseComponent'
import { IActionBar } from '../base/model/IActionBar'

class ActionBarManager extends BaseComponent implements IActionBar {
  constructor(style?: IAnyObject) {
    super({
      ...(style ?? {}),
    })
  }
}

import Reblend from 'reblendjs'

async function ActionBar({ style }: { style: ReblendTyping.CSSProperties }) {
  return (
    <div
      style={{
        border: `0.5px solid ${Color.ash}`,
        ...style,
      }}
      title="ActionBar"
    ></div>
  )
}

export { ActionBarManager, ActionBar }

import { IAnyObject } from '../../../../../../common/models/IAnyObject'
import { Color } from '../../../common/Color'
import { BaseComponent } from '../../base/BaseComponent'
import { ILeftSideBar } from '../../base/model/ILeftSideBar'

class LeftSideBarManager extends BaseComponent implements ILeftSideBar {
  constructor(style?: IAnyObject) {
    super({
      ...(style ?? {}),
    })
  }
}

import Reblend from 'reblendjs'

async function LeftSideBar({ style }: { style: ReblendTyping.CSSProperties }) {
  return (
    <div
      style={{
        border: `0.5px solid ${Color.ash}`,
        ...style,
      }}
      title="LeftSideBar"
    ></div>
  )
}

export { LeftSideBarManager, LeftSideBar }

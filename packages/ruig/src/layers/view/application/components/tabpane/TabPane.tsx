import { IAnyObject } from '../../../../../common/models/IAnyObject'
import { Color } from '../../common/Color'
import { BaseManager } from '../base/BaseComponent'
import { ITabPane } from '../base/model/ITabPane'

class TabPaneManager extends BaseManager implements ITabPane {
  constructor(style?: IAnyObject) {
    super()
  }
}

import Reblend from 'reblendjs'

async function TabPane({ style }: { style: ReblendTyping.CSSProperties }) {
  return (
    <div
      style={{
        border: `0.5px solid ${Color.ash}`,
        ...(style ?? {}),
      }}
    ></div>
  )
}

export { TabPaneManager, TabPane }

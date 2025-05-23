import { IAnyObject } from '../../../../../common/models/IAnyObject'
import { Color } from '../../common/Color'
import { BaseManager } from '../base/BaseComponent'
import { IObjectManagerSelector } from '../base/model/IObjectManagerSelector'

class ObjectManagerSelectorManager extends BaseManager implements IObjectManagerSelector {
  constructor(style?: IAnyObject) {
    super({
      ...(style ?? {}),
    })
  }
}

import Reblend from 'reblendjs'

async function ObjectManagerSelector({ style }: { style: ReblendTyping.CSSProperties }) {
  return (
    <div
      style={{
        border: `0.5px solid ${Color.ash}`,
        ...style,
      }}
      title="ObjectManagerSelector"
    ></div>
  )
}

export { ObjectManagerSelectorManager, ObjectManagerSelector }

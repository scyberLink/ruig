import { IAnyObject } from '../../../../../../common/models/IAnyObject'
import { Color } from '../../../common/Color'
import { BaseManager } from '../../base/BaseComponent'
import { IVerticalRuler } from '../../base/model/IVerticalRuler'

class VerticalRulerManager extends BaseManager implements IVerticalRuler {
  constructor(style?: IAnyObject) {
    super({
      ...(style ?? {}),
    })
  }
}

import Reblend from 'reblendjs'

async function VerticalRuler({ style }: { style: ReblendTyping.CSSProperties }) {
  return (
    <div
      style={{
        border: `0.5px solid ${Color.ash}`,
        ...style,
      }}
      title="VerticalRuler"
    ></div>
  )
}

export { VerticalRulerManager, VerticalRuler }

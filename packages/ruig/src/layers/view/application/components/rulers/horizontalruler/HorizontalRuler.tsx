import { IAnyObject } from '../../../../../../common/models/IAnyObject'
import { Color } from '../../../common/Color'
import { BaseComponent } from '../../base/BaseComponent'
import { IHorizontalRuler } from '../../base/model/IHorizontalRuler'

class HorizontalRulerManager extends BaseComponent implements IHorizontalRuler {
  constructor(style?: IAnyObject) {
    super({
      ...(style ?? {}),
    })
  }
}

import Reblend from 'reblendjs'

async function HorizontalRuler({ style }: { style: ReblendTyping.CSSProperties }) {
  return (
    <div
      style={{
        border: `0.5px solid ${Color.ash}`,
        ...style,
      }}
      title="HorizontalRuler"
    ></div>
  )
}

export { HorizontalRulerManager, HorizontalRuler }

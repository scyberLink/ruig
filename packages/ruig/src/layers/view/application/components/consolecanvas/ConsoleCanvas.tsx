import { IAnyObject } from '../../../../../common/models/IAnyObject'
import { Color } from '../../common/Color'
import { BaseComponent } from '../base/BaseComponent'
import { IConsoleCanvas } from '../base/model/IConsoleCanvas'

class ConsoleCanvasManager extends BaseComponent implements IConsoleCanvas {
  constructor(style?: IAnyObject) {
    super({
      ...(style ?? {}),
    })
  }
}

import Reblend from 'reblendjs'

async function ConsoleCanvas({ style }: { style: ReblendTyping.CSSProperties }) {
  return (
    <div
      style={{
        border: `0.5px solid ${Color.ash}`,
        ...style,
      }}
      title="ConsoleCanvas"
    ></div>
  )
}

export { ConsoleCanvasManager, ConsoleCanvas }

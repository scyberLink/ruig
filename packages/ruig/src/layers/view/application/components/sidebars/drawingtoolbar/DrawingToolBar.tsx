import { Color } from '../../../common/Color'
import { BaseManager } from '../../base/BaseComponent'
import { IDrawingToolBar } from '../../base/model/IDrawingToolBar'
import { IStyle } from '../../base/model/IStyle'
import { DrawingToolbarItem } from './DrawingToolbarItem'

class DrawingToolBarManager extends BaseManager implements IDrawingToolBar {
  constructor(style?: IStyle) {
    super({
      ...(style ?? {}),
      display: 'flex',
      'flex-wrap': 'nowrap',
      'flex-direction': 'column',
      'justify-content': 'space-around',
    })
  }

  appendChildren(...children: DrawingToolbarItem[]): void {
    super.appendChildren(...children)
  }
}

import Reblend, { ReblendTyping } from 'reblendjs'

async function DrawingToolBar({ style }: { style: ReblendTyping.CSSProperties }) {
  return (
    <div
      style={{
        ...(style ?? {}),
        display: 'flex',
        border: `0.5px solid ${Color.ash}`,
        flexWrap: 'nowrap',
        flexDirection: 'column',
        justifyContent: 'space-around',
      }}
    ></div>
  )
}

export { DrawingToolBarManager, DrawingToolBar }

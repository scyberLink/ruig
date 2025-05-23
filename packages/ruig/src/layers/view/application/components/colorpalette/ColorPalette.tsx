import { IAnyObject } from '../../../../../common/models/IAnyObject'
import { Color } from '../../common/Color'
import { BaseManager } from '../base/BaseComponent'
import { IColorPalette } from '../base/model/IColorPalette'

class ColorPaletteManager extends BaseManager implements IColorPalette {
  constructor(style?: IAnyObject) {
    super({
      ...(style ?? {}),
    })
  }
}

import Reblend from 'reblendjs'

async function ColorPalette({ style }: { style: ReblendTyping.CSSProperties }) {
  return (
    <div
      style={{
        border: `0.5px solid ${Color.ash}`,
        ...style,
      }}
      title="ColorPalette"
    ></div>
  )
}

export { ColorPaletteManager, ColorPalette }

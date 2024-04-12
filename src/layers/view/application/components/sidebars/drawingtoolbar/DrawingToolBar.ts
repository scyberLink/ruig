import BaseComponent from '../../base/BaseComponent'
import IDrawingToolBar from '../../base/model/IDrawingToolBar'
import IStyle from '../../base/model/IStyle'
import DrawingToolbarItem from './DrawingToolbarItem'

class DrawingToolBar extends BaseComponent implements IDrawingToolBar {
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

export default DrawingToolBar

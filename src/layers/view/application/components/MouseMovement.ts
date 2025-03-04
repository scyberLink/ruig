/* eslint-disable @typescript-eslint/no-unused-vars */
import SharedConfig from '../../../../common/SharedConfig'
import { DRAWING_CANVAS } from '../../../../common/constants'
import IAnyObject from '../../../../common/models/IAnyObject'
import BaseComponent from './base/BaseComponent'
import IDrawingCanvas from './base/model/IDrawingCanvas'
import IMouseMovement from './base/model/IMouseMovement'

class MouseMovement extends BaseComponent implements IMouseMovement {
  clientX: number = 0
  clientY: number = 0
  screenX: number = 0
  screenY: number = 0

  constructor(style?: IAnyObject) {
    super({
      ...(style ?? {}),
      position: 'fixed',
      bottom: 0,
      right: 0,
    })
    const coordinate = document.createElement('span')

    window.onmousemove = (event) => {
      this.clientX = event.clientX
      this.clientY = event.clientY
      this.screenX = event.screenX
      this.screenY = event.screenY
    }
    this.appendChildren(coordinate)
  }

  getDimension(): IMouseMovement {
    return {
      clientX: this.clientX,
      clientY: this.clientY,
      screenX: this.screenX,
      screenY: this.screenY,
    }
  }
}

export default MouseMovement

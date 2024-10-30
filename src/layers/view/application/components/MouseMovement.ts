import SharedConfig from '../../../../common/SharedConfig'
import { DRAWING_CANVAS } from '../../../../common/constants'
import IAnyObject from '../../../../common/models/IAnyObject'
import BaseComponent from './base/BaseComponent'
import IDrawingCanvas from './base/model/IDrawingCanvas'
import IMouseMovement from './base/model/IMouseMovement'

class MouseMovement extends BaseComponent implements IMouseMovement {
  cx: number = 0
  cy: number = 0
  sx: number = 0
  sy: number = 0

  constructor(style?: IAnyObject) {
    super({
      ...(style ?? {}),
      position: 'fixed',
      bottom: 0,
      right: 0,
    })
    const coordinate = document.createElement('span')

    /* window.onmousemove = (event) => {
      this.cx = event.clientX
      this.cy = event.clientY
      this.sx = event.screenX
      this.sy = event.screenY
      const canvas = SharedConfig.get(DRAWING_CANVAS) as IDrawingCanvas
      coordinate.innerHTML = `
        <div>${canvas.scale} scale</div>

        <div>${this.cx - (30 + this.cx * canvas.scale)} scalex</div>
        <div>${this.cy - (90 + this.cy * canvas.scale)} scaley</div>

        <div>${this.cx - (canvas.scale < 0 ? 30 * canvas.scale : -(30 * canvas.scale))} ccrx</div>
        <div>${this.cy - (canvas.scale < 0 ? 90 * canvas.scale : -(90 * canvas.scale))} ccry</div>

        <div>${this.cx} cx</div>
        <div>${this.cy} cy</div>
        <div>${this.sx} sx</div>
        <div>${this.sy} sy</div>      
      `
    } 
    this.appendChildren(coordinate)*/
  }
}

export default MouseMovement

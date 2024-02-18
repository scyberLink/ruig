import SharedConfig from '../../../../../common/SharedConfig'
import { ACTIVE_ELEMENT, MIN_Z_INDEX } from '../../../../../common/constants'
import NullException from '../../../../../common/exceptions/NullException'
import IAnyObject from '../../../../../common/models/IAnyObject'
import IPosition from '../../../../../common/models/IPosition'
import { spreadTo } from '../../../../../common/utils'
import DesignElement from '../../../design/DesignElement'
import BaseComponent from '../base/BaseComponent'
import IDrawingCanvas from '../base/model/IDrawingCanvas'

class DrawingCanvas extends BaseComponent implements IDrawingCanvas {
  constructor(style?: IAnyObject) {
    super({
      ...(style ?? {}),
      background: 'transparent',
      'z-index': MIN_Z_INDEX,
    })
  }

  /* connectedCallback() {
  } */

  addDesignElement(element: HTMLElement, position?: IPosition) {
    if (!element) {
      throw NullException
    }

    const { x, y } = position || { x: 10, y: 10, metric: 'px' }

    spreadTo(element.style, {
      position: 'absolute',
      top: `${y}${position?.metric || 'px'}`,
      left: `${x}${position?.metric || 'px'}`,
    })

    this.appendChildren(element)

    return element
  }

  onclick = (event: MouseEvent) => {
    event.preventDefault()
    const element: DesignElement = SharedConfig.get(ACTIVE_ELEMENT) as DesignElement
    element?.deselect()
  }

  /* ondrop = (event: DragEvent) => {
    event.preventDefault();
    let element =  SharedConfig.get(ACTIVE_ELEMENT) as HTMLElement
    if (!element) {
      return;
    }
    const thisRect: DOMRect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const x = event.clientX - thisRect.left;
    const y = event.clientY - thisRect.top;
    element!.style.left = x + 'px';
    element!.style.top = y + 'px';
  }
 */
}

export { DrawingCanvas as DC }

export default DrawingCanvas

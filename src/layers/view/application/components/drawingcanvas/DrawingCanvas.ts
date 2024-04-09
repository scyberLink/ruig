import { MIN_Z_INDEX } from '../../../../../common/constants'
import NullException from '../../../../../common/exceptions/NullException'
import IAnyObject from '../../../../../common/models/IAnyObject'
import IPosition from '../../../../../common/models/IPosition'
import { spreadTo } from '../../../../../common/utils'
import BaseDesignComponent from '../../../design/base/BaseDesignComponent'
import BaseComponent from '../base/BaseComponent'
import IDrawingCanvas from '../base/model/IDrawingCanvas'

export enum DesignMode {
  PREVIEWING,
  DESIGNING,
}

class DrawingCanvas extends BaseComponent implements IDrawingCanvas {
  mode = DesignMode.PREVIEWING

  constructor(style?: IAnyObject) {
    super({
      ...(style ?? {}),
      background: 'transparent',
      'z-index': MIN_Z_INDEX,
    })
  }

  onwheel = (event: WheelEvent) => {
    // Check if Ctrl key is pressed
    if (event.ctrlKey) {
      //event.preventDefault();

      // Calculate the new scale factor based on the wheel delta

      const delta = event.deltaY
      const zoomFactor = 0.02 // You can adjust this value based on your zoom sensitivity
      const currentScale = parseFloat(this.style.transform.replace('scale(', '').replace(')', '')) || 1
      let scale
      if (delta < 0) {
        scale = currentScale + zoomFactor
      } else {
        scale = currentScale - zoomFactor
      }

      // Set the new scale factor
      this.scale = scale
    }
  }

  activateDesignMode() {
    this.traverseAndActivateDesignMode(this)
    this.mode = DesignMode.DESIGNING
  }

  activatePreviewMode() {
    this.traverseAndActivatePreviewMode(this)
    this.mode = DesignMode.PREVIEWING
  }

  private traverseAndActivateDesignMode(element: HTMLElement) {
    for (let i = 0; i < element.children.length; i++) {
      const child = element.children.item(i)
      if (child instanceof HTMLElement) {
        if (!(child instanceof BaseDesignComponent)) {
          const newChild = BaseDesignComponent.new(child)
          element.replaceChild(newChild, child)
        } else {
          this.traverseAndActivateDesignMode(child)
        }
      }
    }
  }

  private traverseAndActivatePreviewMode(element: HTMLElement) {
    for (let i = 0; i < element.children.length; i++) {
      const child = element.children.item(i)
      if (child instanceof BaseDesignComponent) {
        const originalChild = child.childNodes[0] as HTMLElement
        if (originalChild) {
          element.replaceChild(originalChild, child)
        }
      } else if (child instanceof HTMLElement) {
        this.traverseAndActivatePreviewMode(child)
      }
    }
  }

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

    if (!(element instanceof BaseDesignComponent)) {
      element = BaseDesignComponent.new(element)
    }

    this.appendChildren(element)

    return element
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

export default DrawingCanvas

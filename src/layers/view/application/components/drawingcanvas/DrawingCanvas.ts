/* eslint-disable @typescript-eslint/no-explicit-any */
import { MIN_Z_INDEX } from '../../../../../common/constants'
import NullException from '../../../../../common/exceptions/NullException'
import IPosition from '../../../../../common/models/IPosition'
import { spreadTo } from '../../../../../common/utils'
import DesignElement from '../../../design/base/DesignElement'
import BaseComponent from '../base/BaseComponent'
import IDrawingCanvas from '../base/model/IDrawingCanvas'
import IStyle from '../base/model/IStyle'

export enum DesignMode {
  PREVIEWING,
  DESIGNING,
}

class DrawingCanvas extends BaseComponent implements IDrawingCanvas {
  mode = DesignMode.PREVIEWING
  designElements: DesignElement[] = []
  constructor(style?: IStyle) {
    super({
      ...(style ?? {}),
      background: 'transparent',
      overflow: 'none',
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
    for (let i = 0; i < this.children.length; i++) {
      const child = this.children.item(i) as HTMLElement
      if (child && !(child instanceof DesignElement)) {
        const newChild = new DesignElement(child)
        if (this.contains(child)) {
          this.replaceChild(newChild, child)
        }
      }
    }
    this.mode = DesignMode.DESIGNING
  }

  activatePreviewMode() {
    for (let i = 0; i < this.children.length; i++) {
      const child = this.children.item(i)
      if (child instanceof DesignElement) {
        const originalChild = child.childNodes[0] as HTMLElement
        if (originalChild && this.contains(child)) {
          this.replaceChild(originalChild, child)
        }
      }
    }
    this.mode = DesignMode.PREVIEWING
  }

  addDesignElement(element: HTMLElement, position?: IPosition) {
    if (!element) {
      throw NullException
    }

    const { x, y } = position || { x: 1, y: 1, metric: 'px' }

    spreadTo(element.style, {
      top: `${y}${position?.metric || 'px'}`,
      left: `${x}${position?.metric || 'px'}`,
    })

    if (!(element instanceof DesignElement)) {
      element = new DesignElement(element)
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

  addEventToDesignElement(eventName: string, listener: (e: Event) => any) {
    for (const designElement of this.designElements) {
      designElement.addEventListener(eventName, listener)
    }
  }
}

export default DrawingCanvas

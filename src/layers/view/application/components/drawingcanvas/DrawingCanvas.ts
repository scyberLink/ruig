import SharedConfig from "../../../../../common/SharedConfig";
import { CONTEXT_MENU, DESIGN_ELEMENT_WRAPPER, DRAWING_CANVAS } from "../../../../../common/constants";
import NullException from "../../../../../common/exceptions/NullException";
import IAnyObject from "../../../../../common/models/IAnyObject";
import IPosition from "../../../../../common/models/IPosition";
import { appendChildren, spreadTo } from "../../../../../common/utils";
import ShadowMode from "../../common/ShadowMode";
import BaseComponent from "../base/BaseComponent";

class DrawingCanvas extends BaseComponent {

  constructor(style?: IAnyObject) {
    super({
      ...(style ?? {}),
      'z-index': '-9999'
    }, ShadowMode.OPEN);

  }

  /* connectedCallback() {
  } */

  addDesignElement(element: HTMLElement, position?: IPosition) {
    if (!element) {
      throw NullException
    }

    let { x = 0, y = 0 } = position ?? { x: 0, y: 0 }
    spreadTo(element.style, {
      position: 'absolute',
      top: y,
      left: x,
    })

    appendChildren(this, element)

    return element
  }

  /* onmouseover = (event: any) => {
    this.focus()
  }; */
}

export { DrawingCanvas as DC }

export default BaseComponent.register(DrawingCanvas);
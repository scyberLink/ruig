import SharedConfig from '../../../common/SharedConfig'
import { CLIPBOARD, CONTEXT_MENU, DESIGN_ELEMENT_EVENT_DATA } from '../../../common/constants'
import NullException from '../../../common/exceptions/NullException'
import IAnyObject from '../../../common/models/IAnyObject'
import BaseComponent from '../application/components/base/BaseComponent'
import IDesignElement from './models/IDesignElement'
import DesignElementTypes from '../common/DesignElementTypes'
import IPosition from '../../../common/models/IPosition'
import BaseDesignComponent from './base/BaseDesignComponent'

export interface DESIGN_ELEMENT_EVENT_DATA_TYPE {
  [DESIGN_ELEMENT_EVENT_DATA]: IDesignElement
}

abstract class DesignElement extends BaseDesignComponent implements IDesignElement {
  abstract type: DesignElementTypes
  protected extendedElement!: HTMLElement

  lock = false

  position: IPosition = { x: 1, y: 2, metric: '%' }
  zIndex!: number

  constructor(style?: IAnyObject) {
    super({
      ...(style ?? {}),
    })
    this.initExtendedElement()
  }

  initExtendedElement() {
    this.extendedElement = document.createElement(`${this.type}`)
  }

  oncontextmenu = () => {
    this.showPopover()
    return true
  }

  hidePopover(): void {
    this.removeLastChild()
  }

  showPopover(): void {
    const contextMenu: BaseComponent = SharedConfig.get(CONTEXT_MENU) as IAnyObject as BaseComponent

    if (!contextMenu) {
      throw new NullException('Context Menu element not found')
    }

    this.appendChildren(contextMenu)
    contextMenu.focus()
    contextMenu.onblur = (e) => {
      e?.preventDefault()
      this.hidePopover()
    }
  }

  oncopy = (ev: ClipboardEvent) => {
    ev?.preventDefault()
    SharedConfig.set(CLIPBOARD, this)
  }

  oncut = (ev: ClipboardEvent) => {
    ev?.preventDefault()
    SharedConfig.set(CLIPBOARD, this.cloneNode(true))
    this.parentElement?.removeChild(this)
  }

  onpaste = (ev: ClipboardEvent) => {
    ev?.preventDefault()
    const copiedDesignElement: DesignElement = SharedConfig.get(CLIPBOARD) as IAnyObject as DesignElement
    if (copiedDesignElement && (this.type == DesignElementTypes.DIV || this.type == DesignElementTypes.SPAN)) {
      this.appendChildren(copiedDesignElement)
    }
  }

  autofocus: boolean = false

  set index(index: number) {
    this.zIndex = index
    this.style.zIndex = `${index}`
  }

  get index() {
    return this.zIndex
  }

  /* onmousemove = (event: MouseEvent) => {
        event?.preventDefault()
        if (this.isDragging) {
            const containerRect: DOMRect = SharedConfig.get(DRAWING_CANVAS)!.getBoundingClientRect();
            const x = event.clientX - containerRect.left - this.evenetOffsetX;
            const y = event.clientY - containerRect.top - this.evenetOffsetY;
            this.style.left = x + 'px';
            this.style.top = y + 'px';
        }
    }

    onmousedown = (event: MouseEvent) => {
        event?.preventDefault()
        this.isDragging = true;
        this.evenetOffsetX = event.offsetX;
        this.evenetOffsetY = event.offsetY;
    }

    onmouseup = (event: MouseEvent) => {
        event?.preventDefault()
        this.isDragging = false;
    } */
}

export default DesignElement

import SharedConfig from '../../../common/SharedConfig'
import {
  ACTIVE_ELEMENT,
  CLIPBOARD,
  CONTEXT_MENU,
  DESIGN_ELEMENT_EVENT_DATA,
  EVENT_DESELECT,
  EVENT_SELECT,
  MAX_Z_INDEX,
} from '../../../common/constants'
import NullException from '../../../common/exceptions/NullException'
import IAnyObject from '../../../common/models/IAnyObject'
import BaseComponent from '../application/components/base/BaseComponent'
import IDesignElement from './models/IDesignElement'
import { removeLastChild, spreadTo } from '../../../common/utils'
import DesignElementTypes from '../common/DesignElementTypes'
import IPosition from '../../../common/models/IPosition'
import DesignElementSelectionWrapper from './DesignElementSelectionWrapper'

export interface DESIGN_ELEMENT_EVENT_DATA_TYPE {
  [DESIGN_ELEMENT_EVENT_DATA]: IDesignElement
}

abstract class DesignElement extends BaseComponent implements IDesignElement {
  abstract type: DesignElementTypes
  protected extendedElement!: HTMLElement

  lock = false
  private _deselectEvent
  private _selectEvent

  position: IPosition = { x: 1, y: 2, metric: '%' }
  zIndex!: number
  focusWrapper: HTMLDivElement
  wasFocusing!: boolean

  constructor(style?: IAnyObject) {
    super({
      ...(style ?? {}),
    })
    this._deselectEvent = new CustomEvent<DESIGN_ELEMENT_EVENT_DATA_TYPE>(EVENT_DESELECT, {
      detail: { [DESIGN_ELEMENT_EVENT_DATA]: this },
    })
    this._selectEvent = new CustomEvent<DESIGN_ELEMENT_EVENT_DATA_TYPE>(EVENT_SELECT, {
      detail: { [DESIGN_ELEMENT_EVENT_DATA]: this },
    })
    this.initExtendedElement()
    this.focusWrapper = document.createElement('div')

    spreadTo(this.focusWrapper.style, {
      background: 'transparent',
      border: '0.5px solid red',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      'z-index': MAX_Z_INDEX,
    })
  }

  initExtendedElement() {
    this.extendedElement = document.createElement(`${this.type}`)
  }

  deselectEvent(): void {
    this.dispatchEvent(this._deselectEvent)
  }

  selectEvent(): void {
    this.dispatchEvent(this._selectEvent)
  }

  attachWrapper(): void {
    const wrapper = new DesignElementSelectionWrapper()

    if (!wrapper) {
      throw new NullException('Design element wrapper not found')
    }
    wrapper.style.zIndex = `${this.zIndex + 1}`
    wrapper.setElementToWrap(this)
    this.appendChildren(wrapper)
  }

  detachWrapper(): void {
    removeLastChild(this)
  }

  private showFocus() {
    if (!this.isSelected) {
      const width = this.clientWidth
      const height = this.clientHeight

      this.focusWrapper.style.width = width + 5 + 'px'
      this.focusWrapper.style.height = height + 5 + 'px'
      this.appendChild(this.focusWrapper)
      this.wasFocusing = true
    }
  }

  private hideFocus() {
    if (this.wasFocusing) {
      this.removeChild(this.focusWrapper)
      this.wasFocusing = false
    }
  }

  onmouseover = (event: MouseEvent) => {
    this.showFocus()
    event.stopPropagation()
  }

  onmouseout = (event: MouseEvent) => {
    this.hideFocus()
    event.stopPropagation()
  }

  onmousedown = (event: MouseEvent) => {
    //event.preventDefault()
    this.click()
    event.stopPropagation
  }

  private _isSelected: boolean = false

  set isSelected(_value: boolean) {
    return
  }

  get isSelected() {
    return this._isSelected
  }

  deselect() {
    if (!this._isSelected) {
      return
    }
    SharedConfig.remove(ACTIVE_ELEMENT)
    this._isSelected = false
    this.detachWrapper()
    this.deselectEvent()
  }

  select() {
    const activeElement = SharedConfig.get(ACTIVE_ELEMENT) as IAnyObject
    activeElement?.deselect()
    SharedConfig.set(ACTIVE_ELEMENT, this)
    this._isSelected = true
    this.hideFocus()
    this.attachWrapper()
    this.selectEvent()
  }

  onclick = (e?: Event) => {
    e?.preventDefault()
    this.select()
    e?.stopPropagation()
  }

  click(): void {
    this.onclick()
  }

  oncontextmenu = () => {
    this.showPopover()
    return true
  }

  hidePopover(): void {
    removeLastChild(this)
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
    SharedConfig.set(CLIPBOARD, { thiz: this }.thiz)
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

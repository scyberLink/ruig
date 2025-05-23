


import { SharedConfig } from '../../../../common/SharedConfig'
import { DRAWING_CANVAS } from '../../../../common/constants'
import { NullException } from '../../../../common/exceptions/NullException'
import { rand } from '../../../../common/md5'
import { IAnyObject } from '../../../../common/models/IAnyObject'
import { IPair } from '../../../../common/models/IPair'
import { cssString, snakeCase } from '../../../../common/utils'
import { IDelegateModel } from '../../application/components/base/IDelegateModel'
import { IDrawingCanvas } from '../../application/components/base/model/IDrawingCanvas'
import { InvalidTagNameException } from '../../application/components/exceptions/InvalidTagNameException'
import { DumpElement } from '../../common/DumpElement'

class DesignElement extends HTMLElement implements IDelegateModel {
  protected shadowWrapper: HTMLElement
  protected shadowStyle: HTMLStyleElement
  private _scale: number = 1
  private _rotate: number = 0
  private initialDisplay: string = 'initial'
  private showing: boolean = true
  class: string
  drawingCanvas: IDrawingCanvas

  public get rotate(): number {
    return this._rotate
  }

  public set rotate(value: number) {
    this._rotate = value
    this.style.rotate = `${value}deg`
  }

  public get scale(): number {
    return this._scale
  }

  public set scale(value: number) {
    this._scale = value
    this.style.transform = `scale(${value})`
  }

  constructor(element: HTMLElement, drawingCanvas?: IDrawingCanvas) {
    if (!element) {
      throw new NullException()
    }
    super()
    if (!drawingCanvas) {
      this.drawingCanvas = SharedConfig.get(DRAWING_CANVAS) as any
    } else {
      this.drawingCanvas = drawingCanvas
    }
    this.shadowWrapper = element
    this.shadowStyle = document.createElement('style')
    this.class = `${this.tagName?.toLowerCase() + rand()}`
    this.shadowWrapper.classList?.add(this.class)
    this.shadowStyle.textContent = `
    .${this.class} {
        ${cssString({})}
      }
    `
    this.appendChild(this.shadowWrapper)
    this.appendChild(this.shadowStyle)
  }

  removeChild<T extends Node>(child: T): T {
    return this.shadowWrapper.removeChild(child)
  }

  // Delegate properties and methods to the shadowWrapper

  get accessKey(): string {
    return this.shadowWrapper.accessKey
  }

  set accessKey(value: string) {
    this.shadowWrapper.accessKey = value
  }

  get attributes(): NamedNodeMap {
    return this.shadowWrapper.attributes
  }

  get classList(): DOMTokenList {
    return this.shadowWrapper.classList
  }

  get className(): string {
    return this.shadowWrapper.className
  }

  set className(value: string) {
    this.shadowWrapper.className = value
  }

  get contentEditable(): string {
    return this.shadowWrapper.contentEditable
  }

  set contentEditable(value: string) {
    this.shadowWrapper.contentEditable = value
  }

  get clientWidth(): number {
    return this.shadowWrapper.clientWidth
  }

  set clientWidth(value: number) {
    ;(this.shadowWrapper as any).clientWidth = value
  }

  get clientHeight(): number {
    return this.shadowWrapper.clientHeight
  }

  set clientHeight(value: number) {
    ;(this.shadowWrapper as any).clientHeight = value
  }

  get innerText(): string {
    return this.shadowWrapper.innerText
  }

  set innerText(value: string) {
    this.shadowWrapper.innerText = value
  }

  get innerHTML(): string {
    return this.shadowWrapper.innerHTML
  }

  set innerHTML(value: string) {
    this.shadowWrapper.innerHTML = value
  }

  get dataset(): DOMStringMap {
    return this.shadowWrapper.dataset
  }

  get dir(): string {
    return this.shadowWrapper.dir
  }

  appendChildren(...children: HTMLElement[]) {
    for (const child of children) {
      this.appendChild(child)
    }
  }

  set dir(value: string) {
    this.shadowWrapper.dir = value
  }

  get draggable(): boolean {
    return this.shadowWrapper.draggable
  }

  set draggable(value: boolean) {
    this.shadowWrapper.draggable = value
  }

  get children() {
    return this.shadowWrapper.children
  }

  get hidden(): boolean {
    return this.shadowWrapper.hidden
  }

  set hidden(value: boolean) {
    this.shadowWrapper.hidden = value
  }

  get id(): string {
    return this.shadowWrapper.id
  }

  set id(value: string) {
    this.shadowWrapper.id = value
  }

  get textContent(): string {
    return this.shadowWrapper.textContent!
  }

  set textContent(value: string) {
    this.shadowWrapper.textContent = value
  }

  toggleDisplay() {
    if (this.showing) {
      this.initialDisplay = this.shadowWrapper.style.display || this.initialDisplay
      this.shadowWrapper.style.display = 'none'
    } else {
      this.shadowWrapper.style.display = this.initialDisplay
    }
    this.showing = !this.showing
  }

  get lang(): string {
    return this.shadowWrapper.lang
  }

  set lang(value: string) {
    this.shadowWrapper.lang = value
  }

  get offsetHeight(): number {
    return this.shadowWrapper.offsetHeight
  }

  get offsetLeft(): number {
    return this.shadowWrapper.offsetLeft
  }

  get offsetParent(): Element | null {
    return this.shadowWrapper.offsetParent
  }

  get offsetTop(): number {
    return this.shadowWrapper.offsetTop
  }

  get offsetWidth(): number {
    return this.shadowWrapper.offsetWidth
  }

  get disabled() {
    return this.getDisable()
  }

  set disabled(value: boolean) {
    this.setDisable(value)
  }

  getDisable() {
    return this.shadowWrapper.hasAttribute('disabled')
  }

  /*   appendChild<T extends Node>(node: T): T {
    return this.shadowWrapper.appendChild(node)
  } */

  setDisable(value: boolean) {
    if (value) {
      this.shadowWrapper.setAttribute('disabled', '')
    } else {
      this.shadowWrapper.removeAttribute('disabled')
    }
  }

  get style(): CSSStyleDeclaration {
    return this.shadowWrapper.style
  }

  get tabIndex(): number {
    return this.shadowWrapper.tabIndex
  }

  set tabIndex(value: number) {
    this.shadowWrapper.tabIndex = value
  }

  get title(): string {
    return this.shadowWrapper.title
  }

  set title(value: string) {
    this.shadowWrapper.title = value
  }

  set onselect(value: any) {}

  oncopy = (ev: any) => {
    ev?.preventDefault()
  }

  addEvent(eventName: string, listener: (e: any) => any) {
    this.shadowWrapper.addEventListener(eventName, listener)
  }

  oncut = (ev: any) => {
    ev?.preventDefault()
  }

  onpaste = (ev: any) => {
    ev?.preventDefault()
  }

  onresize = (ev: any) => {
    ev?.preventDefault()
  }

  ondragover = (event: DragEvent) => {
    event.preventDefault()
  }

  ondrop = (event: DragEvent) => {
    event.preventDefault()
  }
  // ... (other delegated methods)

  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions,
  ): void {
    this.shadowWrapper.addEventListener(type, listener, options)
  }

  getBoundingClientRect(): DOMRect {
    return this.shadowWrapper.getBoundingClientRect()
  }

  append(...nodes: Array<Node | string>): void {
    this.shadowWrapper.append(...nodes)
  }

  blur(): void {
    this.shadowWrapper.blur()
  }

  click(): void {
    this.shadowWrapper.click()
  }

  oncontextmenu = (e: any) => {
    e?.preventDefault()
  }

  closest(selectors: string): Element | null {
    return this.shadowWrapper.closest(selectors)
  }

  dispatchEvent(event: Event): boolean {
    return this.shadowWrapper.dispatchEvent(event)
  }

  focus(options?: FocusOptions): void {
    this.shadowWrapper.focus(options)
  }

  getAttribute(name: string): string | null {
    return this.shadowWrapper.getAttribute(name)
  }

  getAttributeNS(namespaceURI: string | null, localName: string): string | null {
    return this.shadowWrapper.getAttributeNS(namespaceURI, localName)
  }

  getAttributeNode(name: string): Attr | null {
    return this.shadowWrapper.getAttributeNode(name)
  }

  getAttributeNodeNS(namespaceURI: string | null, localName: string): Attr | null {
    return this.shadowWrapper.getAttributeNodeNS(namespaceURI, localName)
  }

  hasAttribute(name: string): boolean {
    return this.shadowWrapper.hasAttribute(name)
  }

  hasAttributeNS(namespaceURI: string | null, localName: string): boolean {
    return this.shadowWrapper.hasAttributeNS(namespaceURI, localName)
  }

  hasAttributes(): boolean {
    return this.shadowWrapper.hasAttributes()
  }

  insertAdjacentElement(position: InsertPosition, insertedElement: Element): Element | null {
    return this.shadowWrapper.insertAdjacentElement(position, insertedElement)
  }

  insertAdjacentHTML(position: InsertPosition, text: string): void {
    this.shadowWrapper.insertAdjacentHTML(position, text)
  }

  insertAdjacentText(position: InsertPosition, text: string): void {
    this.shadowWrapper.insertAdjacentText(position, text)
  }

  removeAttribute(name: string): void {
    this.shadowWrapper.removeAttribute(name)
  }

  removeAttributeNS(namespaceURI: string | null, localName: string): void {
    this.shadowWrapper.removeAttributeNS(namespaceURI, localName)
  }

  removeAttributeNode(attr: Attr): Attr {
    return this.shadowWrapper.removeAttributeNode(attr)
  }

  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions,
  ): void {
    this.shadowWrapper.removeEventListener(type, listener, options)
  }

  setAttribute(name: string, value: string): void {
    this.shadowWrapper.setAttribute(name, value)
  }

  setAttributeNS(namespaceURI: string | null, qualifiedName: string, value: string): void {
    this.shadowWrapper.setAttributeNS(namespaceURI, qualifiedName, value)
  }

  setAttributeNode(attr: Attr): Attr | null {
    return this.shadowWrapper.setAttributeNode(attr)
  }

  setAttributeNodeNS(attr: Attr): Attr | null {
    return this.shadowWrapper.setAttributeNodeNS(attr)
  }

  toggleAttribute(qualifiedName: string, force?: boolean): boolean {
    return this.shadowWrapper.toggleAttribute(qualifiedName, force)
  }

  public getShadowWrapper(): HTMLElement {
    return this.shadowWrapper
  }

  /* addStylesheets(...paths: string[]) {
    this.addStyle(...paths)
    throw new Error("Not implemented")
  } */

  addStyle(styles: string[]): HTMLStyleElement
  addStyle(style: IAnyObject): HTMLStyleElement
  addStyle(style: string): HTMLStyleElement
  addStyle(style: string[] | IAnyObject | string): HTMLStyleElement {
    let styleString: string = ''
    let previousStyle = this.shadowStyle.textContent ?? ''
    if (typeof style === 'string') {
      styleString = style
      this.shadowStyle.textContent = previousStyle + styleString
    } else if (!Array.isArray(style)) {
      styleString = `${cssString(style)}`
      const startOfThisIdStyle = `.${this.class} {`
      previousStyle = previousStyle.replace(startOfThisIdStyle, `${startOfThisIdStyle}${styleString}`)
      this.shadowStyle.textContent = previousStyle
    } else if (Array.isArray(style)) {
      for (const styleI of style) {
        styleString = styleString?.concat('\n\n', styleI)
      }
      this.shadowStyle.textContent = previousStyle + styleString
    }

    return this.shadowStyle
  }

  addPseudoClass(clazz: string, style: IAnyObject) {
    if (!clazz) {
      throw new NullException('Pseudo Class name not provided')
    }

    if (!style) {
      throw new NullException('Pseudo Class style not provided')
    }

    if (!clazz.includes(':')) {
      clazz = `:${clazz}`
    }
    clazz = `${this.class}${clazz}`
    this.addStyle(`.${clazz}{${cssString(style)}}`)
  }

  hovered(style: IAnyObject) {
    this.addPseudoClass('hover', style)
  }

  setCursor(name: string) {
    import(`../../../../assets/raws/cursor/${name}.svg`)
      .then(({ default: cursor }) => {
        this.style.cursor = `url(${cursor}), auto`
      })
      .catch((error) => {
        console.error('Failed to load cursor:', error)
      })
  }

  addInlineStyle({ name, value }: IPair) {
    this.shadowWrapper.style[name as any] = value
  }

  addClassNames(...classNames: string[]) {
    this.shadowWrapper.classList.add(...classNames)
  }

  removeClassNames(...classNames: string[]) {
    this.shadowWrapper.classList.remove(...classNames)
  }

  replaceClassName(oldClassName: string, newClassName: string) {
    return this.shadowWrapper.classList.replace(oldClassName, newClassName)
  }

  public static register(
    element: typeof DesignElement | typeof HTMLElement,
  ): typeof DesignElement | typeof HTMLElement {
    if (!element) {
      throw new InvalidTagNameException()
    }
    const tagName = snakeCase(element.name)
    try {
      customElements.define(tagName, element)
    } catch (error: any) {
      console.warn(error.message)
    }
    return element
  }

  setScale(scale: number) {
    this.scale = scale
  }
}

export { DesignElement }

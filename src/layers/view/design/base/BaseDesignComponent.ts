/* eslint-disable @typescript-eslint/no-explicit-any */
import NullException from '../../../../common/exceptions/NullException'
import IAnyObject from '../../../../common/models/IAnyObject'
import IPair from '../../../../common/models/IPair'
import { cssString } from '../../../../common/utils'
import Color from '../../application/common/Color'
import IDelegateModel from '../../application/components/base/IDelegateModel'

class BaseDesignComponent extends HTMLElement implements IDelegateModel {
  protected shadowStyle: HTMLStyleElement
  private _scale: number = 1
  private _rotate: number = 0

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

  constructor(style?: IAnyObject) {
    super()
    this.shadowStyle = document.createElement('style')
    this.id = `${this.tagName?.toLowerCase()}`
    this.shadowStyle.textContent = `
    #${this.tagName?.toLowerCase()} {
        ${cssString({
          background: Color.lightAsh,
          color: Color.black,
          border: `0.5px solid ${Color.ash}`,
          display: 'block',
          position: 'fixed',
          'user-select': 'none',
          ...(style ?? {}),
        })}
      }
    `
    this.appendChild(this.shadowStyle)
  }

  removeChild<T extends Node>(child: T): T {
    return this.removeChild(child)
  }

  // Delegate properties and methods to the shadowWrapper

  get accessKey(): string {
    return this.accessKey
  }

  set accessKey(value: string) {
    this.accessKey = value
  }

  get attributes(): NamedNodeMap {
    return this.attributes
  }

  get classList(): DOMTokenList {
    return this.classList
  }

  get className(): string {
    return this.className
  }

  set className(value: string) {
    this.className = value
  }

  get contentEditable(): string {
    return this.contentEditable
  }

  set contentEditable(value: string) {
    this.contentEditable = value
  }

  get clientWidth(): number {
    return this.clientWidth
  }

  set clientWidth(value: number) {
    ;(this as any).clientWidth = value
  }

  get clientHeight(): number {
    return this.clientHeight
  }

  set clientHeight(value: number) {
    ;(this as any).clientHeight = value
  }

  get innerText(): string {
    return this.innerText
  }

  set innerText(value: string) {
    this.innerText = value
  }

  get innerHTML(): string {
    return this.innerHTML
  }

  set innerHTML(value: string) {
    this.innerHTML = value
  }

  get dataset(): DOMStringMap {
    return this.dataset
  }

  get dir(): string {
    return this.dir
  }

  appendChildren(...children: HTMLElement[]) {
    for (const child of children) {
      this.appendChild(child)
    }
  }

  set dir(value: string) {
    this.dir = value
  }

  get draggable(): boolean {
    return this.draggable
  }

  set draggable(value: boolean) {
    this.draggable = value
  }

  get hidden(): boolean {
    return this.hidden
  }

  set hidden(value: boolean) {
    this.hidden = value
  }

  get id(): string {
    return this.id
  }

  set id(value: string) {
    this.id = value
  }

  get textContent(): string {
    return this.textContent as string
  }

  set textContent(value: string) {
    this.textContent = value
  }

  get lang(): string {
    return this.lang
  }

  set lang(value: string) {
    this.lang = value
  }

  get offsetHeight(): number {
    return this.offsetHeight
  }

  get offsetLeft(): number {
    return this.offsetLeft
  }

  get offsetParent(): Element | null {
    return this.offsetParent
  }

  get offsetTop(): number {
    return this.offsetTop
  }

  get offsetWidth(): number {
    return this.offsetWidth
  }

  get disabled() {
    return this.getDisable()
  }

  set disabled(value: boolean) {
    this.setDisable(value)
  }

  getDisable() {
    return this.hasAttribute('disabled')
  }

  appendChild<T extends Node>(node: T): T {
    return this.appendChild(node)
  }

  setDisable(value: boolean) {
    if (value) {
      this.setAttribute('disabled', '')
    } else {
      this.removeAttribute('disabled')
    }
  }

  get style(): CSSStyleDeclaration {
    return this.style
  }

  get tabIndex(): number {
    return this.tabIndex
  }

  set tabIndex(value: number) {
    this.tabIndex = value
  }

  get title(): string {
    return this.title
  }

  set title(value: string) {
    this.title = value
  }

  set onselect(value: any) {}

  oncopy = (ev: any) => {
    ev?.preventDefault()
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

  onwheel = (ev: any) => {
    ev?.preventDefault()
  }

  // ... (other delegated methods)

  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions,
  ): void {
    this.addEventListener(type, listener, options)
  }

  getBoundingClientRect(): DOMRect {
    return this.getBoundingClientRect()
  }

  append(...nodes: (Node | string)[]): void {
    this.append(...nodes)
  }

  blur(): void {
    this.blur()
  }

  click(): void {
    this.click()
  }

  oncontextmenu = (e: any) => {
    e?.preventDefault()
  }

  closest(selectors: string): Element | null {
    return this.closest(selectors)
  }

  dispatchEvent(event: Event): boolean {
    return this.dispatchEvent(event)
  }

  focus(options?: FocusOptions): void {
    this.focus(options)
  }

  getAttribute(name: string): string | null {
    return this.getAttribute(name)
  }

  getAttributeNS(namespaceURI: string | null, localName: string): string | null {
    return this.getAttributeNS(namespaceURI, localName)
  }

  getAttributeNode(name: string): Attr | null {
    return this.getAttributeNode(name)
  }

  getAttributeNodeNS(namespaceURI: string | null, localName: string): Attr | null {
    return this.getAttributeNodeNS(namespaceURI, localName)
  }

  hasAttribute(name: string): boolean {
    return this.hasAttribute(name)
  }

  hasAttributeNS(namespaceURI: string | null, localName: string): boolean {
    return this.hasAttributeNS(namespaceURI, localName)
  }

  hasAttributes(): boolean {
    return this.hasAttributes()
  }

  insertAdjacentElement(position: InsertPosition, insertedElement: Element): Element | null {
    return this.insertAdjacentElement(position, insertedElement)
  }

  insertAdjacentHTML(position: InsertPosition, text: string): void {
    this.insertAdjacentHTML(position, text)
  }

  insertAdjacentText(position: InsertPosition, text: string): void {
    this.insertAdjacentText(position, text)
  }

  removeAttribute(name: string): void {
    this.removeAttribute(name)
  }

  removeAttributeNS(namespaceURI: string | null, localName: string): void {
    this.removeAttributeNS(namespaceURI, localName)
  }

  removeAttributeNode(attr: Attr): Attr {
    return this.removeAttributeNode(attr)
  }

  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions,
  ): void {
    this.removeEventListener(type, listener, options)
  }

  setAttribute(name: string, value: string): void {
    this.setAttribute(name, value)
  }

  setAttributeNS(namespaceURI: string | null, qualifiedName: string, value: string): void {
    this.setAttributeNS(namespaceURI, qualifiedName, value)
  }

  setAttributeNode(attr: Attr): Attr | null {
    return this.setAttributeNode(attr)
  }

  setAttributeNodeNS(attr: Attr): Attr | null {
    return this.setAttributeNodeNS(attr)
  }

  toggleAttribute(qualifiedName: string, force?: boolean): boolean {
    return this.toggleAttribute(qualifiedName, force)
  }

  public getShadowWrapper(): HTMLElement {
    return this
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
    if (typeof style == 'string') {
      styleString = style
      this.shadowStyle.textContent = previousStyle + styleString
    } else if (!Array.isArray(style)) {
      styleString = `${cssString(style as IAnyObject)}`
      const startOfThisIdStyle = `#${this.id} {`
      previousStyle = previousStyle.replace(startOfThisIdStyle, `${startOfThisIdStyle}${styleString}`)
      this.shadowStyle.textContent = previousStyle
    } else if (Array.isArray(style)) {
      for (const styleI of style) {
        styleString = styleString?.concat('\n\n', styleI)
      }
      this.shadowStyle.textContent = previousStyle + styleString
    }

    return this.shadowStyle as HTMLStyleElement
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
    clazz = `${this.id}${clazz}`
    this.addStyle(`#${clazz}{${cssString(style)}}`)
  }

  hovered(style: IAnyObject) {
    this.addPseudoClass('hover', style)
  }

  setCursor(name: string) {
    this.style.cursor = `url('cursor/${name}.svg'), auto`
  }

  addInlineStyle({ name, value }: IPair) {
    this.style[name as never] = value
  }

  addClassNames(...classNames: string[]) {
    this.classList.add(...classNames)
  }

  removeClassNames(...classNames: string[]) {
    this.classList.remove(...classNames)
  }

  replaceClassName(oldClassName: string, newClassName: string) {
    return this.classList.replace(oldClassName, newClassName)
  }

  public static new(element: BaseDesignComponent | HTMLElement): BaseDesignComponent {
    if (!element) {
      throw new NullException()
    }
    const wrapper = new BaseDesignComponent()
    wrapper.appendChildren(element)
    return wrapper
  }

  setScale(scale: number) {
    this.scale = scale
  }

  ondragover = (event: DragEvent) => {
    event.preventDefault()
  }

  ondrop = (event: DragEvent) => {
    event.preventDefault()
  }

  removeLastChild() {
    this.removeChild(this.lastChild as HTMLElement)
  }
}

export default BaseDesignComponent

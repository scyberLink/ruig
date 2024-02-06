/* import NullException from "../../../../common/exceptions/NullException"
import IAnyObject from "../../../../common/models/IAnyObject"
import IPair from "../../../../common/models/IPair"
import { cssString, snakeCase } from "../../../../common/utils"
import Color from "../../application/common/Color"
import ShadowMode from "../../application/common/ShadowMode"
import IDelegateModel from "../../application/components/base/IDelegateModel"
import InvalidTagNameException from "../../application/components/exceptions/InvalidTagNameException"


class BaseDesignComponent extends HTMLElement implements IDelegateModel {
  protected shadowStyle: HTMLStyleElement

  constructor(style?: IAnyObject, mode?: ShadowMode) {
    super()
    this.shadowWrapper = document.createElement('div')
    this.shadowStyle = document.createElement('style')
    this.shadowWrapper.id = `${this.tagName?.toLowerCase()}`
    this.shadowStyle.textContent = `
    #${this.tagName?.toLowerCase()} {
        ${cssString({
      background: Color.lightAsh,
      color: Color.black,
      border: `0.5px solid ${Color.ash}`,
      display: 'block',
      position: 'fixed',
      ...(style ?? {})
    })}
      }
    `
    this.shadow.appendChild(this.shadowWrapper)
    this.shadow.appendChild(this.shadowStyle)
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

  set dir(value: string) {
    this.shadowWrapper.dir = value
  }

  get draggable(): boolean {
    return this.shadowWrapper.draggable
  }

  set draggable(value: boolean) {
    this.shadowWrapper.draggable = value
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

  appendChild<T extends Node>(node: T): T {
    return this.shadowWrapper.appendChild(node)
  }

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

  set onselect(value: any) {
  }

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
    options?: boolean | AddEventListenerOptions
  ): void {
    this.shadowWrapper.addEventListener(type, listener, options)
  }

  append(...nodes: (Node | string)[]): void {
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

  getAttributeNS(
    namespaceURI: string | null,
    localName: string
  ): string | null {
    return this.shadowWrapper.getAttributeNS(namespaceURI, localName)
  }

  getAttributeNode(name: string): Attr | null {
    return this.shadowWrapper.getAttributeNode(name)
  }

  getAttributeNodeNS(
    namespaceURI: string | null,
    localName: string
  ): Attr | null {
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

  insertAdjacentElement(
    position: InsertPosition,
    insertedElement: Element
  ): Element | null {
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
    options?: boolean | EventListenerOptions
  ): void {
    this.shadowWrapper.removeEventListener(type, listener, options)
  }

  setAttribute(name: string, value: string): void {
    this.shadowWrapper.setAttribute(name, value)
  }

  setAttributeNS(
    namespaceURI: string | null,
    qualifiedName: string,
    value: string
  ): void {
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

  addStylesheets(...paths: string[]) {
    this.addStyle(...paths)
    throw new Error("Not implemented")
  }

  addStyle(...styles: string[]) {
    if (!styles) {
      throw new NullException()
    }
    let styleString: string = this.shadowStyle.textContent ?? ""
    for (const style of styles) {
      styleString = styleString?.concat("\n\n", style)
    }
    this.shadowStyle.textContent = styleString

    return this.shadowStyle as HTMLStyleElement
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

  public static register(element: typeof BaseDesignComponent | typeof HTMLElement): typeof BaseDesignComponent | typeof HTMLElement {
    if (!element) {
      throw new InvalidTagNameException()
    }
    let tagName = snakeCase(element.name)
    try {
      customElements.define(tagName, element)
    } catch (error: any) {
      console.warn(error.message)
    }
    return element
  }
}

export default BaseDesignComponent
 */
export {}
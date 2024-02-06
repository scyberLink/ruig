interface IDelegateModel {
    // Properties
    accessKey: string;
    attributes: NamedNodeMap;
    classList: DOMTokenList;
    className: string;
    contentEditable: string;
    dataset: DOMStringMap;
    dir: string;
    draggable: boolean;
    hidden: boolean;
    id: string;
    lang: string;
    offsetHeight: number;
    offsetLeft: number;
    offsetParent: Element | null;
    offsetTop: number;
    offsetWidth: number;
    style: CSSStyleDeclaration;
    tabIndex: number;
    title: string;
    disabled: boolean;

    // Methods
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    append(...nodes: (Node | string)[]): void;
    blur(): void;
    click(): void;
    closest(selectors: string): Element | null;
    dispatchEvent(event: Event): boolean;
    focus(options?: FocusOptions): void;
    getAttribute(name: string): string | null;
    getAttributeNS(namespaceURI: string | null, localName: string): string | null;
    getAttributeNode(name: string): Attr | null;
    getAttributeNodeNS(namespaceURI: string | null, localName: string): Attr | null;
    hasAttribute(name: string): boolean;
    hasAttributeNS(namespaceURI: string | null, localName: string): boolean;
    hasAttributes(): boolean;
    insertAdjacentElement(position: InsertPosition, insertedElement: Element): Element | null;
    insertAdjacentHTML(position: InsertPosition, text: string): void;
    insertAdjacentText(position: InsertPosition, text: string): void;
    removeAttribute(name: string): void;
    removeAttributeNS(namespaceURI: string | null, localName: string): void;
    removeAttributeNode(attr: Attr): Attr;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    setAttribute(name: string, value: string): void;
    setAttributeNS(namespaceURI: string | null, qualifiedName: string, value: string): void;
    setAttributeNode(attr: Attr): Attr | null;
    setAttributeNodeNS(attr: Attr): Attr | null;
    toggleAttribute(qualifiedName: string, force?: boolean): boolean;
}

export default IDelegateModel
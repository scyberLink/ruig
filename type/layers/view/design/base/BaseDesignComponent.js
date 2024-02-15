/* eslint-disable @typescript-eslint/no-explicit-any */
import NullException from '../../../../common/exceptions/NullException';
import { cssString, snakeCase } from '../../../../common/utils';
import Color from '../../application/common/Color';
import InvalidTagNameException from '../../application/components/exceptions/InvalidTagNameException';
class BaseComponent extends HTMLElement {
    get rotate() {
        return this._rotate;
    }
    set rotate(value) {
        this._rotate = value;
        this.style.rotate = `${value}deg`;
    }
    get scale() {
        return this._scale;
    }
    set scale(value) {
        this._scale = value;
        this.style.transform = `scale(${value})`;
    }
    constructor(style) {
        var _a, _b;
        super();
        this._scale = 1;
        this._rotate = 0;
        this.oncopy = (ev) => {
            ev === null || ev === void 0 ? void 0 : ev.preventDefault();
        };
        this.oncut = (ev) => {
            ev === null || ev === void 0 ? void 0 : ev.preventDefault();
        };
        this.onpaste = (ev) => {
            ev === null || ev === void 0 ? void 0 : ev.preventDefault();
        };
        this.onresize = (ev) => {
            ev === null || ev === void 0 ? void 0 : ev.preventDefault();
        };
        this.onwheel = (ev) => {
            ev === null || ev === void 0 ? void 0 : ev.preventDefault();
        };
        this.oncontextmenu = (e) => {
            e === null || e === void 0 ? void 0 : e.preventDefault();
        };
        this.shadowStyle = document.createElement('style');
        this.id = `${(_a = this.tagName) === null || _a === void 0 ? void 0 : _a.toLowerCase()}`;
        this.shadowStyle.textContent = `
    #${(_b = this.tagName) === null || _b === void 0 ? void 0 : _b.toLowerCase()} {
        ${cssString(Object.assign({ background: Color.lightAsh, color: Color.black, border: `0.5px solid ${Color.ash}`, display: 'block', position: 'fixed', 'user-select': 'none' }, (style !== null && style !== void 0 ? style : {})))}
      }
    `;
        this.appendChild(this.shadowStyle);
    }
    removeChild(child) {
        return this.removeChild(child);
    }
    // Delegate properties and methods to the shadowWrapper
    get accessKey() {
        return this.accessKey;
    }
    set accessKey(value) {
        this.accessKey = value;
    }
    get attributes() {
        return this.attributes;
    }
    get classList() {
        return this.classList;
    }
    get className() {
        return this.className;
    }
    set className(value) {
        this.className = value;
    }
    get contentEditable() {
        return this.contentEditable;
    }
    set contentEditable(value) {
        this.contentEditable = value;
    }
    get clientWidth() {
        return this.clientWidth;
    }
    set clientWidth(value) {
        ;
        this.clientWidth = value;
    }
    get clientHeight() {
        return this.clientHeight;
    }
    set clientHeight(value) {
        ;
        this.clientHeight = value;
    }
    get innerText() {
        return this.innerText;
    }
    set innerText(value) {
        this.innerText = value;
    }
    get innerHTML() {
        return this.innerHTML;
    }
    set innerHTML(value) {
        this.innerHTML = value;
    }
    get dataset() {
        return this.dataset;
    }
    get dir() {
        return this.dir;
    }
    appendChildren(...children) {
        for (const child of children) {
            this.appendChild(child);
        }
    }
    set dir(value) {
        this.dir = value;
    }
    get draggable() {
        return this.draggable;
    }
    set draggable(value) {
        this.draggable = value;
    }
    get hidden() {
        return this.hidden;
    }
    set hidden(value) {
        this.hidden = value;
    }
    get id() {
        return this.id;
    }
    set id(value) {
        this.id = value;
    }
    get textContent() {
        return this.textContent;
    }
    set textContent(value) {
        this.textContent = value;
    }
    get lang() {
        return this.lang;
    }
    set lang(value) {
        this.lang = value;
    }
    get offsetHeight() {
        return this.offsetHeight;
    }
    get offsetLeft() {
        return this.offsetLeft;
    }
    get offsetParent() {
        return this.offsetParent;
    }
    get offsetTop() {
        return this.offsetTop;
    }
    get offsetWidth() {
        return this.offsetWidth;
    }
    get disabled() {
        return this.getDisable();
    }
    set disabled(value) {
        this.setDisable(value);
    }
    getDisable() {
        return this.hasAttribute('disabled');
    }
    appendChild(node) {
        return this.appendChild(node);
    }
    setDisable(value) {
        if (value) {
            this.setAttribute('disabled', '');
        }
        else {
            this.removeAttribute('disabled');
        }
    }
    get style() {
        return this.style;
    }
    get tabIndex() {
        return this.tabIndex;
    }
    set tabIndex(value) {
        this.tabIndex = value;
    }
    get title() {
        return this.title;
    }
    set title(value) {
        this.title = value;
    }
    set onselect(value) { }
    // ... (other delegated methods)
    addEventListener(type, listener, options) {
        this.addEventListener(type, listener, options);
    }
    getBoundingClientRect() {
        return this.getBoundingClientRect();
    }
    append(...nodes) {
        this.append(...nodes);
    }
    blur() {
        this.blur();
    }
    click() {
        this.click();
    }
    closest(selectors) {
        return this.closest(selectors);
    }
    dispatchEvent(event) {
        return this.dispatchEvent(event);
    }
    focus(options) {
        this.focus(options);
    }
    getAttribute(name) {
        return this.getAttribute(name);
    }
    getAttributeNS(namespaceURI, localName) {
        return this.getAttributeNS(namespaceURI, localName);
    }
    getAttributeNode(name) {
        return this.getAttributeNode(name);
    }
    getAttributeNodeNS(namespaceURI, localName) {
        return this.getAttributeNodeNS(namespaceURI, localName);
    }
    hasAttribute(name) {
        return this.hasAttribute(name);
    }
    hasAttributeNS(namespaceURI, localName) {
        return this.hasAttributeNS(namespaceURI, localName);
    }
    hasAttributes() {
        return this.hasAttributes();
    }
    insertAdjacentElement(position, insertedElement) {
        return this.insertAdjacentElement(position, insertedElement);
    }
    insertAdjacentHTML(position, text) {
        this.insertAdjacentHTML(position, text);
    }
    insertAdjacentText(position, text) {
        this.insertAdjacentText(position, text);
    }
    removeAttribute(name) {
        this.removeAttribute(name);
    }
    removeAttributeNS(namespaceURI, localName) {
        this.removeAttributeNS(namespaceURI, localName);
    }
    removeAttributeNode(attr) {
        return this.removeAttributeNode(attr);
    }
    removeEventListener(type, listener, options) {
        this.removeEventListener(type, listener, options);
    }
    setAttribute(name, value) {
        this.setAttribute(name, value);
    }
    setAttributeNS(namespaceURI, qualifiedName, value) {
        this.setAttributeNS(namespaceURI, qualifiedName, value);
    }
    setAttributeNode(attr) {
        return this.setAttributeNode(attr);
    }
    setAttributeNodeNS(attr) {
        return this.setAttributeNodeNS(attr);
    }
    toggleAttribute(qualifiedName, force) {
        return this.toggleAttribute(qualifiedName, force);
    }
    getShadowWrapper() {
        return this;
    }
    addStyle(style) {
        var _a;
        let styleString = '';
        let previousStyle = (_a = this.shadowStyle.textContent) !== null && _a !== void 0 ? _a : '';
        if (typeof style == 'string') {
            styleString = style;
            this.shadowStyle.textContent = previousStyle + styleString;
        }
        else if (!Array.isArray(style)) {
            styleString = `${cssString(style)}`;
            const startOfThisIdStyle = `#${this.id} {`;
            previousStyle = previousStyle.replace(startOfThisIdStyle, `${startOfThisIdStyle}${styleString}`);
            this.shadowStyle.textContent = previousStyle;
        }
        else if (Array.isArray(style)) {
            for (const styleI of style) {
                styleString = styleString === null || styleString === void 0 ? void 0 : styleString.concat('\n\n', styleI);
            }
            this.shadowStyle.textContent = previousStyle + styleString;
        }
        return this.shadowStyle;
    }
    addPseudoClass(clazz, style) {
        if (!clazz) {
            throw new NullException('Pseudo Class name not provided');
        }
        if (!style) {
            throw new NullException('Pseudo Class style not provided');
        }
        if (!clazz.includes(':')) {
            clazz = `:${clazz}`;
        }
        clazz = `${this.id}${clazz}`;
        this.addStyle(`#${clazz}{${cssString(style)}}`);
    }
    hovered(style) {
        this.addPseudoClass('hover', style);
    }
    setCursor(name) {
        this.style.cursor = `url('cursor/${name}.svg'), auto`;
    }
    addInlineStyle({ name, value }) {
        this.style[name] = value;
    }
    addClassNames(...classNames) {
        this.classList.add(...classNames);
    }
    removeClassNames(...classNames) {
        this.classList.remove(...classNames);
    }
    replaceClassName(oldClassName, newClassName) {
        return this.classList.replace(oldClassName, newClassName);
    }
    static register(element) {
        if (!element) {
            throw new InvalidTagNameException();
        }
        const tagName = snakeCase(element.name);
        try {
            customElements.define(tagName, element);
        }
        catch (error) {
            console.warn(error.message);
        }
        return element;
    }
    setScale(scale) {
        this.scale = scale;
    }
}
export default BaseComponent;

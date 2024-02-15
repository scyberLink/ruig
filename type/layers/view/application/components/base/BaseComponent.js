/* eslint-disable @typescript-eslint/no-explicit-any */
import NullException from '../../../../../common/exceptions/NullException';
import { cssString, snakeCase } from '../../../../../common/utils';
import Color from '../../common/Color';
import ShadowMode from '../../common/ShadowMode';
import InvalidTagNameException from '../exceptions/InvalidTagNameException';
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
    constructor(style, mode) {
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
        this.ondragover = (event) => {
            event.preventDefault();
        };
        this.ondrop = (event) => {
            event.preventDefault();
        };
        this.oncontextmenu = (e) => {
            e === null || e === void 0 ? void 0 : e.preventDefault();
        };
        this.shadow = this.attachShadow({ mode: mode !== null && mode !== void 0 ? mode : ShadowMode.CLOSE });
        this.shadowWrapper = document.createElement('div');
        this.shadowStyle = document.createElement('style');
        this.id = `${(_a = this.tagName) === null || _a === void 0 ? void 0 : _a.toLowerCase()}`;
        this.shadowStyle.textContent = `
    #${(_b = this.tagName) === null || _b === void 0 ? void 0 : _b.toLowerCase()} {
        ${cssString(Object.assign({ background: Color.lightAsh, color: Color.black, border: `0.5px solid ${Color.ash}`, display: 'block', position: 'fixed', 'user-select': 'none' }, (style !== null && style !== void 0 ? style : {})))}
      }
    `;
        this.shadow.appendChild(this.shadowWrapper);
        this.shadow.appendChild(this.shadowStyle);
    }
    removeChild(child) {
        return this.shadowWrapper.removeChild(child);
    }
    // Delegate properties and methods to the shadowWrapper
    get accessKey() {
        return this.shadowWrapper.accessKey;
    }
    set accessKey(value) {
        this.shadowWrapper.accessKey = value;
    }
    get attributes() {
        return this.shadowWrapper.attributes;
    }
    get classList() {
        return this.shadowWrapper.classList;
    }
    get className() {
        return this.shadowWrapper.className;
    }
    set className(value) {
        this.shadowWrapper.className = value;
    }
    get contentEditable() {
        return this.shadowWrapper.contentEditable;
    }
    set contentEditable(value) {
        this.shadowWrapper.contentEditable = value;
    }
    get clientWidth() {
        return this.shadowWrapper.clientWidth;
    }
    set clientWidth(value) {
        ;
        this.shadowWrapper.clientWidth = value;
    }
    get clientHeight() {
        return this.shadowWrapper.clientHeight;
    }
    set clientHeight(value) {
        ;
        this.shadowWrapper.clientHeight = value;
    }
    get innerText() {
        return this.shadowWrapper.innerText;
    }
    set innerText(value) {
        this.shadowWrapper.innerText = value;
    }
    get innerHTML() {
        return this.shadowWrapper.innerHTML;
    }
    set innerHTML(value) {
        this.shadowWrapper.innerHTML = value;
    }
    get dataset() {
        return this.shadowWrapper.dataset;
    }
    get dir() {
        return this.shadowWrapper.dir;
    }
    appendChildren(...children) {
        for (const child of children) {
            this.appendChild(child);
        }
    }
    set dir(value) {
        this.shadowWrapper.dir = value;
    }
    get draggable() {
        return this.shadowWrapper.draggable;
    }
    set draggable(value) {
        this.shadowWrapper.draggable = value;
    }
    get hidden() {
        return this.shadowWrapper.hidden;
    }
    set hidden(value) {
        this.shadowWrapper.hidden = value;
    }
    get id() {
        return this.shadowWrapper.id;
    }
    set id(value) {
        this.shadowWrapper.id = value;
    }
    get textContent() {
        return this.shadowWrapper.textContent;
    }
    set textContent(value) {
        this.shadowWrapper.textContent = value;
    }
    get lang() {
        return this.shadowWrapper.lang;
    }
    set lang(value) {
        this.shadowWrapper.lang = value;
    }
    get offsetHeight() {
        return this.shadowWrapper.offsetHeight;
    }
    get offsetLeft() {
        return this.shadowWrapper.offsetLeft;
    }
    get offsetParent() {
        return this.shadowWrapper.offsetParent;
    }
    get offsetTop() {
        return this.shadowWrapper.offsetTop;
    }
    get offsetWidth() {
        return this.shadowWrapper.offsetWidth;
    }
    get disabled() {
        return this.getDisable();
    }
    set disabled(value) {
        this.setDisable(value);
    }
    getDisable() {
        return this.shadowWrapper.hasAttribute('disabled');
    }
    appendChild(node) {
        return this.shadowWrapper.appendChild(node);
    }
    setDisable(value) {
        if (value) {
            this.shadowWrapper.setAttribute('disabled', '');
        }
        else {
            this.shadowWrapper.removeAttribute('disabled');
        }
    }
    get style() {
        return this.shadowWrapper.style;
    }
    get tabIndex() {
        return this.shadowWrapper.tabIndex;
    }
    set tabIndex(value) {
        this.shadowWrapper.tabIndex = value;
    }
    get title() {
        return this.shadowWrapper.title;
    }
    set title(value) {
        this.shadowWrapper.title = value;
    }
    set onselect(value) { }
    // ... (other delegated methods)
    addEventListener(type, listener, options) {
        this.shadowWrapper.addEventListener(type, listener, options);
    }
    getBoundingClientRect() {
        return this.shadowWrapper.getBoundingClientRect();
    }
    append(...nodes) {
        this.shadowWrapper.append(...nodes);
    }
    blur() {
        this.shadowWrapper.blur();
    }
    click() {
        this.shadowWrapper.click();
    }
    closest(selectors) {
        return this.shadowWrapper.closest(selectors);
    }
    dispatchEvent(event) {
        return this.shadowWrapper.dispatchEvent(event);
    }
    focus(options) {
        this.shadowWrapper.focus(options);
    }
    getAttribute(name) {
        return this.shadowWrapper.getAttribute(name);
    }
    getAttributeNS(namespaceURI, localName) {
        return this.shadowWrapper.getAttributeNS(namespaceURI, localName);
    }
    getAttributeNode(name) {
        return this.shadowWrapper.getAttributeNode(name);
    }
    getAttributeNodeNS(namespaceURI, localName) {
        return this.shadowWrapper.getAttributeNodeNS(namespaceURI, localName);
    }
    hasAttribute(name) {
        return this.shadowWrapper.hasAttribute(name);
    }
    hasAttributeNS(namespaceURI, localName) {
        return this.shadowWrapper.hasAttributeNS(namespaceURI, localName);
    }
    hasAttributes() {
        return this.shadowWrapper.hasAttributes();
    }
    insertAdjacentElement(position, insertedElement) {
        return this.shadowWrapper.insertAdjacentElement(position, insertedElement);
    }
    insertAdjacentHTML(position, text) {
        this.shadowWrapper.insertAdjacentHTML(position, text);
    }
    insertAdjacentText(position, text) {
        this.shadowWrapper.insertAdjacentText(position, text);
    }
    removeAttribute(name) {
        this.shadowWrapper.removeAttribute(name);
    }
    removeAttributeNS(namespaceURI, localName) {
        this.shadowWrapper.removeAttributeNS(namespaceURI, localName);
    }
    removeAttributeNode(attr) {
        return this.shadowWrapper.removeAttributeNode(attr);
    }
    removeEventListener(type, listener, options) {
        this.shadowWrapper.removeEventListener(type, listener, options);
    }
    setAttribute(name, value) {
        this.shadowWrapper.setAttribute(name, value);
    }
    setAttributeNS(namespaceURI, qualifiedName, value) {
        this.shadowWrapper.setAttributeNS(namespaceURI, qualifiedName, value);
    }
    setAttributeNode(attr) {
        return this.shadowWrapper.setAttributeNode(attr);
    }
    setAttributeNodeNS(attr) {
        return this.shadowWrapper.setAttributeNodeNS(attr);
    }
    toggleAttribute(qualifiedName, force) {
        return this.shadowWrapper.toggleAttribute(qualifiedName, force);
    }
    getShadowWrapper() {
        return this.shadowWrapper;
    }
    addStyle(style) {
        var _a;
        let styleString = '';
        let previousStyle = (_a = this.shadowStyle.textContent) !== null && _a !== void 0 ? _a : '';
        if (typeof style === 'string') {
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
        this.shadowWrapper.style[name] = value;
    }
    addClassNames(...classNames) {
        this.shadowWrapper.classList.add(...classNames);
    }
    removeClassNames(...classNames) {
        this.shadowWrapper.classList.remove(...classNames);
    }
    replaceClassName(oldClassName, newClassName) {
        return this.shadowWrapper.classList.replace(oldClassName, newClassName);
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

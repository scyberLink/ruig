import SharedConfig from '../../../common/SharedConfig';
import { ACTIVE_ELEMENT, CLIPBOARD, CONTEXT_MENU, EVENT_DATA, EVENT_DESELECT, EVENT_SELECT, MAX_Z_INDEX, } from '../../../common/constants';
import NullException from '../../../common/exceptions/NullException';
import BaseComponent from '../application/components/base/BaseComponent';
import { removeLastChild, spreadTo } from '../../../common/utils';
import DesignElementTypes from '../common/DesignElementTypes';
import DesignElementSelectionWrapper from './DesignElementSelectionWrapper';
class DesignElement extends BaseComponent {
    constructor(style) {
        super(Object.assign({}, (style !== null && style !== void 0 ? style : {})));
        this.lock = false;
        this.position = { x: 1, y: 2, metric: '%' };
        this.onmouseover = (event) => {
            this.showFocus();
            event.stopPropagation();
        };
        this.onmouseout = (event) => {
            this.hideFocus();
            event.stopPropagation();
        };
        this.onmousedown = (event) => {
            //event.preventDefault()
            this.click();
            event.stopPropagation;
        };
        this._isSelected = false;
        this.onclick = (e) => {
            e === null || e === void 0 ? void 0 : e.preventDefault();
            this.select();
            e === null || e === void 0 ? void 0 : e.stopPropagation();
        };
        this.oncontextmenu = () => {
            this.showPopover();
            return true;
        };
        this.oncopy = (ev) => {
            ev === null || ev === void 0 ? void 0 : ev.preventDefault();
            SharedConfig.set(CLIPBOARD, this);
        };
        this.oncut = (ev) => {
            var _a;
            ev === null || ev === void 0 ? void 0 : ev.preventDefault();
            SharedConfig.set(CLIPBOARD, { thiz: this }.thiz);
            (_a = this.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(this);
        };
        this.onpaste = (ev) => {
            ev === null || ev === void 0 ? void 0 : ev.preventDefault();
            const copiedDesignElement = SharedConfig.get(CLIPBOARD);
            if (copiedDesignElement && (this.type == DesignElementTypes.DIV || this.type == DesignElementTypes.SPAN)) {
                this.appendChildren(copiedDesignElement);
            }
        };
        this.autofocus = false;
        this._deselectEvent = new CustomEvent(EVENT_DESELECT, {
            detail: { [EVENT_DATA]: this },
        });
        this._selectEvent = new CustomEvent(EVENT_SELECT, {
            detail: { [EVENT_DATA]: this },
        });
        this.initExtendedElement();
        this.focusWrapper = document.createElement('div');
        spreadTo(this.focusWrapper.style, {
            background: 'transparent',
            border: '0.5px solid red',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            'z-index': MAX_Z_INDEX,
        });
    }
    initExtendedElement() {
        this.extendedElement = document.createElement(`${this.type}`);
    }
    deselectEvent() {
        this.dispatchEvent(this._deselectEvent);
    }
    selectEvent() {
        this.dispatchEvent(this._selectEvent);
    }
    attachWrapper() {
        const wrapper = new DesignElementSelectionWrapper();
        if (!wrapper) {
            throw new NullException('Design element wrapper not found');
        }
        wrapper.style.zIndex = `${this.zIndex + 1}`;
        wrapper.setElementToWrap(this);
        this.appendChildren(wrapper);
    }
    detachWrapper() {
        removeLastChild(this);
    }
    showFocus() {
        if (!this.isSelected) {
            const width = this.clientWidth;
            const height = this.clientHeight;
            this.focusWrapper.style.width = width + 5 + 'px';
            this.focusWrapper.style.height = height + 5 + 'px';
            this.appendChild(this.focusWrapper);
            this.wasFocusing = true;
        }
    }
    hideFocus() {
        if (this.wasFocusing) {
            this.removeChild(this.focusWrapper);
            this.wasFocusing = false;
        }
    }
    set isSelected(_value) {
        return;
    }
    get isSelected() {
        return this._isSelected;
    }
    deselect() {
        if (!this._isSelected) {
            return;
        }
        SharedConfig.remove(ACTIVE_ELEMENT);
        this._isSelected = false;
        this.detachWrapper();
        this.deselectEvent();
    }
    select() {
        const activeElement = SharedConfig.get(ACTIVE_ELEMENT);
        activeElement === null || activeElement === void 0 ? void 0 : activeElement.deselect();
        SharedConfig.set(ACTIVE_ELEMENT, this);
        this._isSelected = true;
        this.hideFocus();
        this.attachWrapper();
        this.selectEvent();
    }
    click() {
        this.onclick();
    }
    hidePopover() {
        removeLastChild(this);
    }
    showPopover() {
        const contextMenu = SharedConfig.get(CONTEXT_MENU);
        if (!contextMenu) {
            throw new NullException('Context Menu element not found');
        }
        this.appendChildren(contextMenu);
        contextMenu.focus();
        contextMenu.onblur = (e) => {
            e === null || e === void 0 ? void 0 : e.preventDefault();
            this.hidePopover();
        };
    }
    set index(index) {
        this.zIndex = index;
        this.style.zIndex = `${index}`;
    }
    get index() {
        return this.zIndex;
    }
}
export default DesignElement;

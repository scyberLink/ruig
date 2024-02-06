import SharedConfig from "../../../common/SharedConfig";
import { ACTIVE_ELEMENT, CLIPBOARD, CONTEXT_MENU, DESIGN_ELEMENT_WRAPPER, EVENT_DATA, EVENT_DESELECT, EVENT_SELECT } from "../../../common/constants";
import NullException from "../../../common/exceptions/NullException";
import IAnyObject from "../../../common/models/IAnyObject";
import BaseComponent from "../application/components/base/BaseComponent";
import IDesignElement from "./models/IDesignElement";
import { appendChildren, removeLastChild } from "../../../common/utils";
import DesignElementTypes from "../common/DesignElementTypes";
import IPosition from "../../../common/models/IPosition";

export interface DESIGN_ELEMENT_EVENT_DATA_TYPE { [EVENT_DATA]: IDesignElement }

abstract class DesignElement extends BaseComponent implements IDesignElement {

    abstract type: DesignElementTypes;
    protected extendedElement!: HTMLElement;

    lock = false;
    private _deselectEvent
    private _selectEvent

    position: IPosition = { x: 0, y: 0 };
    zIndex: number;

    constructor(style?: IAnyObject) {
        super({
            ...(style ?? {}),
        });
        this.draggable = true;
        this._deselectEvent = new CustomEvent<DESIGN_ELEMENT_EVENT_DATA_TYPE>(EVENT_DESELECT, { detail: { [EVENT_DATA]: this } })
        this._selectEvent = new CustomEvent<DESIGN_ELEMENT_EVENT_DATA_TYPE>(EVENT_SELECT, { detail: { [EVENT_DATA]: this } })
        this.initExtendedElement()
    }

    initExtendedElement() {
        this.extendedElement = document.createElement(`${this.type}`);
    }

    deselectEvent(): void {
        this.dispatchEvent(this._deselectEvent)
    }

    selectEvent(): void {
        this.dispatchEvent(this._selectEvent)
    }

    attachWrapper(): void {
        let wrapper = SharedConfig.get(DESIGN_ELEMENT_WRAPPER)

        if (!wrapper) {
            throw new NullException("Design element wrapper not found")
        }
        wrapper.style.zIndex = this.zIndex + 1
        wrapper.setElementToWrap(this)
        appendChildren(this, wrapper)
    }

    detachWrapper(): void {
        removeLastChild(this)
    }

    private _isSelected: boolean = false;

    set isSelected(_value: boolean) {
        return;
    }

    get isSelected() {
        return this._isSelected
    }

    deselect() {
        if (!this._isSelected) {
            return;
        }
        SharedConfig.remove(ACTIVE_ELEMENT)
        this._isSelected = false;
        this.detachWrapper()
        this.deselectEvent()
    }

    select() {
        let activeElement = SharedConfig.get(ACTIVE_ELEMENT)
        activeElement?.deselect()
        SharedConfig.set(ACTIVE_ELEMENT, this)
        this._isSelected = true;
        this.attachWrapper()
        this.selectEvent()
    }

    onclick = (e?: Event) => {
        e?.preventDefault()
        this.select()
    }

    click(): void {
        this.onclick()
    }

    oncontextmenu = (ev: MouseEvent) => {
        this.showPopover()
        return true;
    }

    hidePopover(): void {
        removeLastChild(this)
    }

    showPopover(): void {
        let contextMenu: BaseComponent = SharedConfig.get(CONTEXT_MENU)

        if (!contextMenu) {
            throw new NullException("Context Menu element not found")
        }

        appendChildren(this as BaseComponent, contextMenu)
        contextMenu.focus()
        contextMenu.onblur = (e) => {
            e?.preventDefault()
            this.hidePopover()
        }
    }

    oncopy = (ev: any) => {
        ev?.preventDefault()
        SharedConfig.set(CLIPBOARD, this)
    }

    oncut = (ev: any) => {
        ev?.preventDefault()
        SharedConfig.set(CLIPBOARD, {this}.this)
        this.parentElement?.removeChild(this)
    };

    onpaste = (ev: any) => {
        ev?.preventDefault()
        const copiedDesignElement: DesignElement = SharedConfig.get(CLIPBOARD)
        if (copiedDesignElement && (this.type == DesignElementTypes.DIV || this.type == DesignElementTypes.SPAN)) {
            appendChildren(this as BaseComponent, copiedDesignElement)
        }

    };

    autofocus: boolean = false;

    set index(index: number) {
        this.zIndex = index
        this.style.zIndex = `${index}`
    }

    get index() {
        return this.zIndex
    }
}

export default DesignElement

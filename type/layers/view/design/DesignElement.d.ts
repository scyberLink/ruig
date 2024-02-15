import { EVENT_DATA } from '../../../common/constants';
import IAnyObject from '../../../common/models/IAnyObject';
import BaseComponent from '../application/components/base/BaseComponent';
import IDesignElement from './models/IDesignElement';
import DesignElementTypes from '../common/DesignElementTypes';
import IPosition from '../../../common/models/IPosition';
export interface DESIGN_ELEMENT_EVENT_DATA_TYPE {
    [EVENT_DATA]: IDesignElement;
}
declare abstract class DesignElement extends BaseComponent implements IDesignElement {
    abstract type: DesignElementTypes;
    protected extendedElement: HTMLElement;
    lock: boolean;
    private _deselectEvent;
    private _selectEvent;
    position: IPosition;
    zIndex: number;
    focusWrapper: HTMLDivElement;
    wasFocusing: boolean;
    constructor(style?: IAnyObject);
    initExtendedElement(): void;
    deselectEvent(): void;
    selectEvent(): void;
    attachWrapper(): void;
    detachWrapper(): void;
    private showFocus;
    private hideFocus;
    onmouseover: (event: MouseEvent) => void;
    onmouseout: (event: MouseEvent) => void;
    onmousedown: (event: MouseEvent) => void;
    private _isSelected;
    set isSelected(_value: boolean);
    get isSelected(): boolean;
    deselect(): void;
    select(): void;
    onclick: (e?: Event) => void;
    click(): void;
    oncontextmenu: () => boolean;
    hidePopover(): void;
    showPopover(): void;
    oncopy: (ev: ClipboardEvent) => void;
    oncut: (ev: ClipboardEvent) => void;
    onpaste: (ev: ClipboardEvent) => void;
    autofocus: boolean;
    set index(index: number);
    get index(): number;
}
export default DesignElement;

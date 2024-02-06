import SharedConfig from "../../../../common/SharedConfig";
import { ACTIVE_ELEMENT, EVENT_DATA, EVENT_DESELECT, EVENT_SELECT } from "../../../../common/constants";
import NullException from "../../../../common/exceptions/NullException";
import IAnyObject from "../../../../common/models/IAnyObject";
import DesignElementTypes from "../../common/DesignElementTypes";
import { createSVGElement } from "../../common/utils";
import DesignElement, { DESIGN_ELEMENT_EVENT_DATA_TYPE } from "../../design/DesignElement";
import BaseComponent from "../components/base/BaseComponent";
import Color from "./Color";
import IAction, { IActionInit } from "./IAction";
import ShadowMode from "./ShadowMode";

abstract class ActionableIcon extends BaseComponent implements IAction {

    constructor(style?: IAnyObject, mode?: ShadowMode) {
        super({
            width: '18px',
            height: '18px',
            border: '0',
            'padding-left': '2px',
            ' padding-right': '2px',
            ...(style ?? {}),
        }, mode);

        this.addStyle(
            `
            #${this.tagName?.toLowerCase()}:hover {
              background: ${Color.lightBlue};
              cursor: pointer;
            }
            `
        )
        this.subscribe()
    }

    svgPathData!: string;
    hint!: string;
    description!: string;

    init(init: IActionInit) {
        let { svgPathData, hint, description } = init
        this.svgPathData = svgPathData
        this.hint = hint
        this.description = description
        let svg = createSVGElement({ path: this.svgPathData })
        this.appendChild(svg)
        this.title = this.hint
    }

    enable() {
        this.disabled = false;
    }

    disable() {
        this.disabled = true;
    }

    abstract supportedDesignElements: DesignElementTypes | DesignElementTypes[];

    action = (designElement: DesignElement) => {}

    subscribe(): void {
        window.addEventListener(EVENT_DESELECT, this.disableCheck)
        window.addEventListener(EVENT_SELECT, this.enableCheck)
        this.setAttribute('title', this.hint)
        //this.addClassNames(this.fontAwesomeSolidIcon, this.icon.includes(this.fontAwesome) ? this.icon : `${this.fontAwesome}${this.icon}`, this.fontAwesomeXtraSmallIcon)
    }

    /* notFontAwesomeIcon() {
        this.removeClassNames(this.fontAwesomeSolidIcon, `${this.fontAwesome}*`)
        this.addClassNames(this.icon)
    } */

    disableCheck(ev: any) {
        ev?.preventDefault()
        this.disable()
    }

    enableCheck(ev: any) {
        ev?.preventDefault()
        let { [EVENT_DATA]: designElement } = ev?.detail as DESIGN_ELEMENT_EVENT_DATA_TYPE

        if (designElement) {
            let designType = designElement.type
            if (this.isTypeSupported(designType)) {
                return this.enable()
            }
        }
        this.disable()
    }

    isTypeSupported(type?: DesignElementTypes) {
        if (this.supportedDesignElements == DesignElementTypes.All) {
            return true
        }
        for (const designType of this.supportedDesignElements) {
            if (designType === type) {
                return true
            }
        }
        return false
    }

    onclick = (event: any) => {
        event?.preventDefault()
        let activeElement = SharedConfig.get(ACTIVE_ELEMENT)
        this.action(activeElement)
    }
}

export default ActionableIcon
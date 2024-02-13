import { MAX_Z_INDEX } from "../../../common/constants";
import NullException from "../../../common/exceptions/NullException";
import IAnyObject from "../../../common/models/IAnyObject";
import BaseComponent from "../application/components/base/BaseComponent";
import DesignElement from "./DesignElement";
import ResizerElement from "./designselectionwrapperitem/ResizerElement";
import RotatorElement from "./designselectionwrapperitem/RotatorElement";
import IDesignElementSelectWrapper from "./models/IDesignElementSelectionWrapper";

class DesignElementSelectionWrapper extends BaseComponent implements IDesignElementSelectWrapper {
    private rotatorElement = new RotatorElement
    private resizerElement = new ResizerElement

    private wrappedElement!: DesignElement;
    initialBorder: any

    constructor(style?: IAnyObject) {
        super({
            background: 'transparent',
            border: '0.5px solid red',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            ...(style ?? {}),
            'z-index': MAX_Z_INDEX,
        });
        this.appendChildren(
            this.rotatorElement,
            this.resizerElement,
        )
    }

    setElementToWrap(element: DesignElement): void {
        if (!element) {
            throw new NullException
        }
        this.wrappedElement = element

        this.updateSize(element)

        this.rotatorElement.setWrapper(this)
        this.resizerElement.setWrapper(this)
    }

    updateSize(element: DesignElement) {
        let width = element.clientWidth
        let height = element.clientHeight

        this.style.width = (width + 15) + 'px'
        this.style.height = (height + 15) + 'px'
    }

    getWrappedElement() {
        return this.wrappedElement
    }

    hide() {
        this.initialBorder = this.style.border
        this.style.border = '0'
        this.resizerElement.style.display = 'none'
    }

    show() {
        this.style.border = this.initialBorder
        this.resizerElement.style.display = 'initial'
    }
}

export { DesignElementSelectionWrapper as DesignElementWrapper }

export default (DesignElementSelectionWrapper);

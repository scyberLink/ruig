import NullException from "../../../common/exceptions/NullException";
import IAnyObject from "../../../common/models/IAnyObject";
import { appendChildren } from "../../../common/utils";
import BaseComponent from "../application/components/base/BaseComponent";
import DesignElement from "./DesignElement";

class DesignElementSelectionWrapper extends BaseComponent {
    /* topRightElement = new BaseComponent
    bottomRightElement = new BaseComponent
    bottomLeftElement = new BaseComponent
    topLeftElement = new BaseComponent
    rotatorElement = new BaseComponent
    resizerElement = new BaseComponent
    topElement = new BaseComponent
    leftElement = new BaseComponent
    bottomElement = new BaseComponent
    rightElement = new BaseComponent */

    wrappedElement!: DesignElement;

    constructor(style?: IAnyObject) {
        super({
            background: 'transparent',
            border: '0.5px solid red',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '110%',
            height: '180%',
            ...(style ?? {})
        });

        /* appendChildren(this,
            this.topRightElement,
            this.bottomRightElement,
            this.bottomLeftElement,
            this.topLeftElement,
            this.rotatorElement,
            this.resizerElement,
            this.topElement,
            this.leftElement,
            this.bottomElement,
            this.rightElement,
        ) */
    }

    setElementToWrap(element: DesignElement): void {
        if (!element) {
            throw new NullException
        }
        this.wrappedElement = element
    }

}

export default BaseComponent.register(DesignElementSelectionWrapper);

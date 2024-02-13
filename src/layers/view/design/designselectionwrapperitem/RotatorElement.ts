import { MAX_Z_INDEX } from "../../../../common/constants"
import NullException from "../../../../common/exceptions/NullException"
import IAnyObject from "../../../../common/models/IAnyObject"
import BaseComponent from "../../application/components/base/BaseComponent"
import DesignElement from "../DesignElement"
import { DesignElementWrapper } from "../DesignElementSelectionWrapper"
import DesignSelectionWrapperItem from "./DesignSelectionWrapperItem"
import BottomLeftRotateElement from "./rotating/BottomLeftRotateElement"
import BottomRightRotateElement from "./rotating/BottomRightRotateElement"
import CenterRotateElement from "./rotating/CenterRotateElement"
import TopLeftRotateElement from "./rotating/TopLeftRotateElement"
import TopRightRotateElement from "./rotating/TopRightRotateElement"

class RotatorElement extends BaseComponent {

    private centerRotateElement: DesignSelectionWrapperItem = new CenterRotateElement as DesignSelectionWrapperItem
    private topRightRotateElement: DesignSelectionWrapperItem = new TopRightRotateElement as DesignSelectionWrapperItem
    private bottomRightRotateElement: DesignSelectionWrapperItem = new BottomRightRotateElement as DesignSelectionWrapperItem
    private bottomLeftRotateElement: DesignSelectionWrapperItem = new BottomLeftRotateElement as DesignSelectionWrapperItem
    private topLeftRotateElement: DesignSelectionWrapperItem = new TopLeftRotateElement as DesignSelectionWrapperItem

    private wrappedElement!: DesignElement;
    initialBorder: any

    constructor(style?: IAnyObject) {
        super({
            background: 'transparent',
            border: '0',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            ...(style ?? {}),
            'z-index': MAX_Z_INDEX,
        });

        this.appendChildren(
            this.centerRotateElement,
            this.topRightRotateElement,
            this.bottomLeftRotateElement,
            this.bottomRightRotateElement,
            this.topLeftRotateElement,
            
        )
    }

    setElementToWrapAndWrapper(element: DesignElement, wrapper: DesignElementWrapper): void {
        if (!element) {
            throw new NullException
        }
        this.wrappedElement = element

        this.updateSize(element)

        this.topRightRotateElement.setWrapper(wrapper)
        this.bottomRightRotateElement.setWrapper(wrapper)
        this.bottomLeftRotateElement.setWrapper(wrapper)
        this.topLeftRotateElement.setWrapper(wrapper)
        this.centerRotateElement.setWrapper(wrapper)
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
}

export default (RotatorElement);
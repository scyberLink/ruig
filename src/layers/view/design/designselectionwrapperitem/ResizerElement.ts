import { MAX_Z_INDEX } from "../../../../common/constants"
import NullException from "../../../../common/exceptions/NullException"
import IAnyObject from "../../../../common/models/IAnyObject"
import BaseComponent from "../../application/components/base/BaseComponent"
import DesignElement from "../DesignElement"
import DesignSelectionWrapperItem from "./DesignSelectionWrapperItem"
import BottomElement from "./resizing/BottomElement"
import BottomLeftElement from "./resizing/BottomLeftElement"
import BottomRightElement from "./resizing/BottomRightElement"
import CenterItem from "./resizing/CenterItem"
import RightElement from "./resizing/RightElement"
import LeftElement from "./resizing/LeftElement"
import TopElement from "./resizing/TopElement"
import TopLeftElement from "./resizing/TopLeftElement"
import TopRightElement from "./resizing/TopRightElement"
import IDesignElementSelectionWrapper from "../models/IDesignElementSelectionWrapper"
import { DesignElementWrapper } from "../DesignElementSelectionWrapper"

class ResizerElement extends BaseComponent {
    private centerElement: DesignSelectionWrapperItem = new CenterItem as DesignSelectionWrapperItem
    private topRightElement: DesignSelectionWrapperItem = new TopRightElement as DesignSelectionWrapperItem
    private bottomRightElement: DesignSelectionWrapperItem = new BottomRightElement as DesignSelectionWrapperItem
    private bottomLeftElement: DesignSelectionWrapperItem = new BottomLeftElement as DesignSelectionWrapperItem
    private topLeftElement: DesignSelectionWrapperItem = new TopLeftElement as DesignSelectionWrapperItem
    private topElement: DesignSelectionWrapperItem = new TopElement as DesignSelectionWrapperItem
    private leftElement: DesignSelectionWrapperItem = new LeftElement as DesignSelectionWrapperItem
    private bottomElement: DesignSelectionWrapperItem = new BottomElement as DesignSelectionWrapperItem
    private rightElement: DesignSelectionWrapperItem = new RightElement as DesignSelectionWrapperItem

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
            this.centerElement,

            this.topElement,
            this.leftElement,
            this.bottomElement,
            this.rightElement,

            this.topRightElement,
            this.bottomLeftElement,
            this.bottomRightElement,
            this.topLeftElement,
        )
    }

    setElementToWrapAndWrapper(element: DesignElement, wrapper: DesignElementWrapper): void {
        if (!element) {
            throw new NullException
        }
        this.wrappedElement = element

        this.updateSize(element)

        this.topRightElement.setWrapper(wrapper)
        this.bottomRightElement.setWrapper(wrapper)
        this.bottomLeftElement.setWrapper(wrapper)
        this.topLeftElement.setWrapper(wrapper)
        this.topElement.setWrapper(wrapper)
        this.leftElement.setWrapper(wrapper)
        this.bottomElement.setWrapper(wrapper)
        this.rightElement.setWrapper(wrapper)
        this.centerElement.setWrapper(wrapper)
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

export default (ResizerElement);

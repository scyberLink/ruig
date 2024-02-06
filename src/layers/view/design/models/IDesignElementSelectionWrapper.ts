import IDesignElement from "./IDesignElement"

interface IDesignElementOnSelectWrapper {

    topRightElement: HTMLElement
    bottomRightElement: HTMLElement
    bottomLeftElement: HTMLElement
    topLeftElement: HTMLElement

    rotatorElement: HTMLElement
    resizerElement: HTMLElement

    topElement: HTMLElement
    leftElement: HTMLElement
    bottomElement: HTMLElement
    rightElement: HTMLElement

    wrappedElement: IDesignElement
    setElementToWrap(element: IDesignElement): void
}

export default IDesignElementOnSelectWrapper
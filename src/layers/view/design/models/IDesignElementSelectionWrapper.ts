import DesignElement from "../DesignElement"
import IDesignElement from "./IDesignElement"

interface IDesignElementSelectWrapper {
    getWrappedElement(): DesignElement
    updateSize(element: DesignElement): void
    hide(): void
    show(): void
    setElementToWrap(element: IDesignElement): void
}

export default IDesignElementSelectWrapper
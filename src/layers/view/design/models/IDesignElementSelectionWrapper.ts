import DesignElement from "../DesignElement"
import IDesignElement from "./IDesignElement"

interface IDesignElementSelectWrapper {
    getWrappedElement(): DesignElement
    updateSize(element: DesignElement): void
    setElementToWrap(element: IDesignElement): void
}

export default IDesignElementSelectWrapper
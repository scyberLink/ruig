import SharedConfig from "../../../../common/SharedConfig";
import { DRAWING_CANVAS } from "../../../../common/constants";
import IAnyObject from "../../../../common/models/IAnyObject";
import ShadowMode from "../../application/common/ShadowMode";
import BaseComponent from "../../application/components/base/BaseComponent";
import { DC } from "../../application/components/drawingcanvas/DrawingCanvas";
import DesignElement from "../DesignElement";
import { DesignElementWrapper } from "../DesignElementSelectionWrapper";

class DesignSelectionWrapperItem extends BaseComponent {
    private designElementWrapper!: DesignElementWrapper

    constructor(style?: IAnyObject, mode?: ShadowMode) {
        super({
            position: 'absolute',
            border: '0',
            background: 'transparent',
            ...(style ?? {}),
        }, mode)
    }

    setWrapper(designElementWrapper: DesignElementWrapper) {
        this.designElementWrapper = designElementWrapper
    }

    getWrapper() {
        return this.designElementWrapper
    }

    getWrapped(): DesignElement {
        return this.designElementWrapper.getWrappedElement() as DesignElement
    }

    getWrappedParent(): HTMLElement {
        return this.getWrapped().parentElement as HTMLElement
    }

    getDrawingCanvas(): DC {
        return SharedConfig.get(DRAWING_CANVAS)
    }

    ondrag = (event: DragEvent) => {
        
    }
}

export default DesignSelectionWrapperItem
import IAnyObject from "../../../../../common/models/IAnyObject";
import ShadowMode from "../../../application/common/ShadowMode";
import DesignSelectionWrapperItem from "../DesignSelectionWrapperItem";

class BottomElement extends DesignSelectionWrapperItem {
    constructor(style?: IAnyObject, mode?: ShadowMode) {
        super({
            bottom: '0',
            left: '0',
            right: '0',
            height: '5px',
            ...(style ?? {}),
        }, mode)

        this.setCursor('ns-resize')
    }
}

export default (BottomElement);
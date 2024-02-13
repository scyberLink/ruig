import IAnyObject from "../../../../../common/models/IAnyObject";
import ShadowMode from "../../../application/common/ShadowMode";
import DesignSelectionWrapperItem from "../DesignSelectionWrapperItem";

class TopLeftRotateElement extends DesignSelectionWrapperItem {
    constructor(style?: IAnyObject, mode?: ShadowMode) {
        super({
            top: '0',
            left: '0',
            width: '5px',
            height: '5px',
            ...(style ?? {}),
        }, mode)

        this.setCursor('rotate')
    }

}

export default (TopLeftRotateElement);
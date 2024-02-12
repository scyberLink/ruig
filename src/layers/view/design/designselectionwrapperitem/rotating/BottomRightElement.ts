import IAnyObject from "../../../../../common/models/IAnyObject";
import ShadowMode from "../../../application/common/ShadowMode";
import DesignSelectionWrapperItem from "../DesignSelectionWrapperItem";

class BottomRightElement extends DesignSelectionWrapperItem {
    constructor(style?: IAnyObject, mode?: ShadowMode) {
        super({
            width: '5px',
            height: '5px',
            right: '0',
            bottom: '0',
            ...(style ?? {}),
        }, mode)

        this.setCursor('rotate')
    }
}

export default (BottomRightElement);
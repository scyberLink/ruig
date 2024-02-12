import IAnyObject from "../../../../../common/models/IAnyObject";
import ShadowMode from "../../../application/common/ShadowMode";
import DesignSelectionWrapperItem from "../DesignSelectionWrapperItem";

class BottomLeftElement extends DesignSelectionWrapperItem {
    constructor(style?: IAnyObject, mode?: ShadowMode) {
        super({
            width: '5px',
            height: '5px',
            left: '0',
            bottom: '0',
            ...(style ?? {}),
        }, mode)

        this.setCursor('nesw-resize')
    }

}

export default (BottomLeftElement);
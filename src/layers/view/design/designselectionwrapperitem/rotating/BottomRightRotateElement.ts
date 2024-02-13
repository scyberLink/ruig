import IAnyObject from "../../../../../common/models/IAnyObject";
import ShadowMode from "../../../application/common/ShadowMode";
import RotatingItem from "./RotatingItem";

class BottomRightRotateElement extends RotatingItem {
    constructor(style?: IAnyObject, mode?: ShadowMode) {
        super({
            width: '5px',
            height: '5px',
            right: '0',
            bottom: '0',
            ...(style ?? {}),
        }, mode)
        this.setSvg('se-rotate')
    }
}

export default (BottomRightRotateElement);
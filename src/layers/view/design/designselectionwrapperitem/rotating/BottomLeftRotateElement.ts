import IAnyObject from "../../../../../common/models/IAnyObject";
import ShadowMode from "../../../application/common/ShadowMode";
import RotatingItem from "./RotatingItem";

class BottomLeftRotateElement extends RotatingItem {
    constructor(style?: IAnyObject, mode?: ShadowMode) {
        super({
            width: '5px',
            height: '5px',
            left: '0',
            bottom: '0',
            ...(style ?? {}),
        }, mode)    
    this.setSvg('sw-rotate')
    }

}

export default (BottomLeftRotateElement);
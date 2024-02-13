import IAnyObject from "../../../../../common/models/IAnyObject";
import ShadowMode from "../../../application/common/ShadowMode";
import RotatingItem from "./RotatingItem";

class TopRightRotateElement extends RotatingItem {
  constructor(style?: IAnyObject, mode?: ShadowMode) {
    super({
      top: '0',
      right: '0',
      width: '5px',
      height: '5px',
      ...(style ?? {}),
    }, mode)

    this.setSvg('ne-rotate')
  }
}

export default (TopRightRotateElement);
import IAnyObject from '../../../../../common/models/IAnyObject'
import ShadowMode from '../../../application/common/ShadowMode'
import RotatingItem from './RotatingItem'

class BottomLeftRotateElement extends RotatingItem {
  constructor(style?: IAnyObject, mode?: ShadowMode) {
    super(
      {
        left: '0',
        bottom: '0',
        margin: '-5px',
        ...(style ?? {}),
      },
      mode,
    )
    this.setSvg('sw-rotate')
  }
}

export default BottomLeftRotateElement

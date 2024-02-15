import IAnyObject from '../../../../../common/models/IAnyObject'
import ShadowMode from '../../../application/common/ShadowMode'
import RotatingItem from './RotatingItem'

class TopLeftRotateElement extends RotatingItem {
  constructor(style?: IAnyObject, mode?: ShadowMode) {
    super(
      {
        top: '0',
        left: '0',
        margin: '-5px',
        ...(style ?? {}),
      },
      mode,
    )

    this.setSvg('nw-rotate')
  }
}

export default TopLeftRotateElement

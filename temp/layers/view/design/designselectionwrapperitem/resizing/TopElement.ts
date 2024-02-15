import IAnyObject from '../../../../../common/models/IAnyObject'
import ShadowMode from '../../../application/common/ShadowMode'
import DesignSelectionWrapperItem from '../DesignSelectionWrapperItem'

class TopElement extends DesignSelectionWrapperItem {
  constructor(style?: IAnyObject, mode?: ShadowMode) {
    super(
      {
        top: '0',
        left: '0',
        right: '0',
        height: '5px',
        ...(style ?? {}),
      },
      mode,
    )

    this.setCursor('ns-resize')
  }
}

export default TopElement

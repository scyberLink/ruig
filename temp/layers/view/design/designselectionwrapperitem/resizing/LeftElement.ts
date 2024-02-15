import IAnyObject from '../../../../../common/models/IAnyObject'
import ShadowMode from '../../../application/common/ShadowMode'
import DesignSelectionWrapperItem from '../DesignSelectionWrapperItem'

class LeftElement extends DesignSelectionWrapperItem {
  constructor(style?: IAnyObject, mode?: ShadowMode) {
    super(
      {
        left: '0',
        top: '0',
        bottom: '0',
        width: '5px',
        ...(style ?? {}),
      },
      mode,
    )

    this.setCursor('ew-resize')
  }
}

export default LeftElement

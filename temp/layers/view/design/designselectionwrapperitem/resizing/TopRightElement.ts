import IAnyObject from '../../../../../common/models/IAnyObject'
import ShadowMode from '../../../application/common/ShadowMode'
import DesignSelectionWrapperItem from '../DesignSelectionWrapperItem'

class TopRightElement extends DesignSelectionWrapperItem {
  constructor(style?: IAnyObject, mode?: ShadowMode) {
    super(
      {
        top: '0',
        right: '0',
        width: '5px',
        height: '5px',
        ...(style ?? {}),
      },
      mode,
    )

    this.setCursor('nesw-resize')
  }
}

export default TopRightElement

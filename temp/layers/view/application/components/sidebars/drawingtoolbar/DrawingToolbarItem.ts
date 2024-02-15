import IAnyObject from '../../../../../../common/models/IAnyObject'
import DesignElementTypes from '../../../../common/DesignElementTypes'
import DesignElement from '../../../../design/DesignElement'
import ActionableIcon from '../../../common/ActionableIcon'

class DrawingToolbarItem extends ActionableIcon {
  supportedDesignElements = DesignElementTypes.All

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  action = (designElement: DesignElement) => {
    throw new Error('Method not implemented.')
  }

  constructor(style?: IAnyObject) {
    super({
      ...(style ?? {}),
      position: 'relative',
    })
  }
}

export default DrawingToolbarItem

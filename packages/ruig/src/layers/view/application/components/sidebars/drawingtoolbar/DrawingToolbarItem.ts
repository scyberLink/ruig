import { IAnyObject } from '../../../../../../common/models/IAnyObject'
import { Tool } from '../../../common/Tool'

class DrawingToolbarItem extends Tool {
  constructor(style?: IAnyObject) {
    super({
      ...(style ?? {}),
      position: 'relative',
    })
  }
}

export { DrawingToolbarItem }

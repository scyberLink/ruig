import { IAnyObject } from '../../../../common/models/IAnyObject'
import { ShadowMode } from './ShadowMode'
import { Tool } from './Tool'

class Icon extends Tool {
  constructor(style?: IAnyObject, mode?: ShadowMode) {
    super(
      {
        ...(style ?? {}),
        width: 'unset',
      },
      mode,
    )
  }
}

export { Icon }

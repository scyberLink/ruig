import IAnyObject from '../../../../common/models/IAnyObject'
import DesignElementTypes from '../../common/DesignElementTypes'
import DesignElement from '../../design/DesignElement'
import ActionableIcon from './ActionableIcon'
import ShadowMode from './ShadowMode'

class Icon extends ActionableIcon {
  constructor(style?: IAnyObject, mode?: ShadowMode) {
    super(
      {
        ...(style ?? {}),
        width: 'unset',
      },
      mode,
    )
  }

  supportedDesignElements: DesignElementTypes[] = []

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  action = (_designElement: DesignElement) => {}

  subscribe() {}
}

export default Icon

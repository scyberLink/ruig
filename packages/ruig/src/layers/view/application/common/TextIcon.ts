import { IAnyObject } from '../../../../common/models/IAnyObject'
import { DesignElementTypes } from '../../common/DesignElementTypes'
import { DesignElement } from '../../design/base/DesignElement'
import { ActionableIcon } from './ActionableIcon'
import { IActionInit } from './IAction'
import { ShadowMode } from './ShadowMode'

class TextIcon extends ActionableIcon {
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

  action = (_designElement: DesignElement) => {}

  subscribe() {}

  init(init: IActionInit): void {
    super.init(init)
    this.innerText = this.hint
  }
}

export { TextIcon }

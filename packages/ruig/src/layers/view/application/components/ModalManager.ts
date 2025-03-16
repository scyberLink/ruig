import { IAnyObject } from '../../../../common/models/IAnyObject'
import { BaseComponent } from './base/BaseComponent'

class ModalManager extends BaseComponent {
  constructor(style?: IAnyObject) {
    super({
      ...(style ?? {}),
    })
  }
}

export { ModalManager }

import { IAnyObject } from '../../../../common/models/IAnyObject'
import { BaseManager } from './base/BaseComponent'

class ModalManager extends BaseManager {
  constructor(style?: IAnyObject) {
    super({
      ...(style ?? {}),
    })
  }
}

export { ModalManager }

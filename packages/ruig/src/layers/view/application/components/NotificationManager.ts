import { IAnyObject } from '../../../../common/models/IAnyObject'
import { BaseComponent } from './base/BaseComponent'

class NotificationManager extends BaseComponent {
  constructor(style?: IAnyObject) {
    super({
      ...(style ?? {}),
    })
  }
}

export { NotificationManager }

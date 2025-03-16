import { IAnyObject } from '../../../../../common/models/IAnyObject'
import { BaseComponent } from '../base/BaseComponent'
import { IObjectManagerSelector } from '../base/model/IObjectManagerSelector'

class ObjectManagerSelector extends BaseComponent implements IObjectManagerSelector {
  constructor(style?: IAnyObject) {
    super({
      ...(style ?? {}),
    })
  }
}

export { ObjectManagerSelector }

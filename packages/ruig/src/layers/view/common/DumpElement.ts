import { IAnyObject } from '../../../common/models/IAnyObject'
import { BaseManager } from '../application/components/base/BaseComponent'
import { IDumpElement } from './models/IDumpElement'

class DumpElement extends BaseManager implements IDumpElement {
  constructor(style?: IAnyObject) {
    super({
      ...(style ?? {}),
    })
  }
}

export { DumpElement }

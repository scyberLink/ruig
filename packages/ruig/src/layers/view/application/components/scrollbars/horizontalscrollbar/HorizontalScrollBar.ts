import { IAnyObject } from '../../../../../../common/models/IAnyObject'
import { BaseComponent } from '../../base/BaseComponent'
import { IHorizontalScrollBar } from '../../base/model/IHorizontalScrollBar'

class HorizontalScrollBar extends BaseComponent implements IHorizontalScrollBar {
  constructor(style?: IAnyObject) {
    super({
      ...(style ?? {}),
      background: 'gray',
    })
  }
}

export { HorizontalScrollBar }

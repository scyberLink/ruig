import IAnyObject from '../../../../../../common/models/IAnyObject'
import BaseComponent from '../../base/BaseComponent'
import IVerticalRuler from '../../base/model/IVerticalRuler'

class VerticalRuler extends BaseComponent implements IVerticalRuler {
  constructor(style?: IAnyObject) {
    super({
      ...(style ?? {}),
    })
  }
}

export default VerticalRuler

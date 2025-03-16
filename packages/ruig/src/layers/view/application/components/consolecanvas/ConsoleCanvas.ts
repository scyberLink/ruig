import { IAnyObject } from '../../../../../common/models/IAnyObject'
import { BaseComponent } from '../base/BaseComponent'
import { IConsoleCanvas } from '../base/model/IConsoleCanvas'

class ConsoleCanvas extends BaseComponent implements IConsoleCanvas {
  constructor(style?: IAnyObject) {
    super({
      ...(style ?? {}),
    })
  }
}

export { ConsoleCanvas }

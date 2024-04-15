import IAnyObject from '../../../../common/models/IAnyObject'
import BaseComponent from './base/BaseComponent'
import IParserContainer from './base/model/IParserContainer'

class ParserContainer extends BaseComponent implements IParserContainer {
  constructor(style?: IAnyObject) {
    super({
      display: 'none',
      position: 'initial',
      ...(style ?? {}),
    })
  }

  parse(html = ''): HTMLElement[] {
    this.innerHTML = html
    const parsed: HTMLElement[] = []
    for (const child of this.children) {
      parsed.push(child as HTMLElement)
    }
    this.innerHTML = ''
    return parsed
  }
}

export default ParserContainer

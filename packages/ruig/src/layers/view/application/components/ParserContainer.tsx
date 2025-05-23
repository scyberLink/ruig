import { IAnyObject } from '../../../../common/models/IAnyObject'
import { BaseManager } from './base/BaseComponent'
import { IParserContainer } from './base/model/IParserContainer'

class ParserContainerManager extends BaseManager implements IParserContainer {
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

import Reblend from 'reblendjs'

async function ParserContainer({ style }: { style: ReblendTyping.CSSProperties }) {
  return <div style={style}></div>
}

export { ParserContainerManager, ParserContainer }

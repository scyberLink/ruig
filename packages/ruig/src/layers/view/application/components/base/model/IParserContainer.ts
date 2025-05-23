import { BaseManager } from '../BaseComponent'

interface IParserContainer extends BaseManager {
  parse(html: string): HTMLElement[]
}

export { IParserContainer }

import { BaseComponent } from '../BaseComponent'

interface IParserContainer extends BaseComponent {
  parse(html: string): HTMLElement[]
}

export { IParserContainer }

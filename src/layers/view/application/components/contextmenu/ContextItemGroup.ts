/* eslint-disable @typescript-eslint/no-explicit-any */
import BaseComponent from '../base/BaseComponent'
import ContextItem from './ContextItem'

class ContextItemGroup extends BaseComponent {
  constructor() {
    super({
      position: 'initial',
      background: 'transparent',
      margin: '5px 0',
      border: '0',
      'border-color': 'gray',
      'border-top': '1px solid',
      'border-bottom': '1px solid',
    })
    this.hovered({ borderColor: 'blue' })
  }

  init(groupName: string, ...contextItems: ContextItem[]) {
    this.title = groupName
    this.appendChildren(...contextItems)
  }
}

export default ContextItemGroup

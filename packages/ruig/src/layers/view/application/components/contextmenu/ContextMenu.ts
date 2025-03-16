/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAnyObject } from '../../../../../common/models/IAnyObject'
import { BaseComponent } from '../base/BaseComponent'
import { IContextMenu } from '../base/model/IContextMenu'
import { ContextContentContainer } from './ContextContentContainer'
import { ContextItem } from './ContextItem'
import { ContextConfig } from './ContextSession'

class ContextMenu extends BaseComponent implements IContextMenu {
  contextContentContainer = new ContextContentContainer()

  constructor(style?: IAnyObject) {
    super({
      background: 'transparent',
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      border: '0',
      ...(style ?? {}),
    })

    this.toggleDisplay(true)
    this.appendChild(this.contextContentContainer)
  }

  onclick = () => {
    this.toggleDisplay(true)
    this.contextContentContainer.hide()
  }

  oncontextmenu = (e: Event) => {
    e.preventDefault()
    e.stopPropagation()
  }

  async showContextContent(contextItems: ContextItem[], config?: ContextConfig) {
    this.contextContentContainer.show(contextItems, config)
    this.toggleDisplay()
  }

  async hide(detachAllSession = false) {
    this.contextContentContainer.hide(detachAllSession)
  }
}

export { ContextMenu }

/* eslint-disable @typescript-eslint/no-explicit-any */
import IAnyObject from '../../../../../common/models/IAnyObject'
import BaseComponent from '../base/BaseComponent'
import ContextItem from './ContextItem'
import ContextItemGroup from './ContextItemGroup'
import ContextSession, { ContextConfig, ContextGroup } from './ContextSession'

class ContextContentContainer extends BaseComponent {
  sessions: ContextSession[] = []

  constructor(style?: IAnyObject) {
    super({
      background: 'transparent',
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      ...(style ?? {}),
    })
  }

  async show(contextItems: ContextItem[], config?: ContextConfig) {
    const group: { [groupName: string]: ContextItem[] } = {}
    for (const contextItem of contextItems) {
      if (!group[contextItem.groupName]) {
        group[contextItem.groupName] = []
      }
      group[contextItem.groupName].push(contextItem)
    }

    const groups: ContextGroup = []

    for (const [groupName, groupItems] of Object.entries(group)) {
      const group = new ContextItemGroup()
      group.init(groupName, ...groupItems)
      groups.push(group)
    }

    const session = new ContextSession()
    session.init(groups, config)
    this.appendChild(session)

    this.sessions.push(session)
  }

  async hide(detachAllSession = false) {
    if (detachAllSession) {
      this.sessions.forEach((session) => {
        session.remove()
        session.config?.onHide && session.config?.onHide()
      })
      this.sessions = []
    } else {
      const session = this.sessions.pop()
      if (!session) {
        return
      }
      session.remove()
      session.config?.onHide && session.config?.onHide()
    }
  }
}

export default ContextContentContainer

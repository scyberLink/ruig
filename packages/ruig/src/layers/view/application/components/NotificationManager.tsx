import { IAnyObject } from '../../../../common/models/IAnyObject'
import { BaseManager } from './base/BaseComponent'
import Reblend from 'reblendjs'

class NotificationManager extends BaseManager {
  constructor(style?: IAnyObject) {
    super({
      ...(style ?? {}),
    })
  }
}

async function Notification({ style }: { style: ReblendTyping.CSSProperties }) {
  return <div style={style}></div>
}

export { NotificationManager, Notification }

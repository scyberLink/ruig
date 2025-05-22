/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAnyObject } from '../../../../../common/models/IAnyObject'
import { getMouseMovement } from '../../../common/utils'
import { BaseComponent } from '../base/BaseComponent'
import { ContextItemGroup } from './ContextItemGroup'

export type ContextConfig = {
  onShow?: () => void
  onHide?: () => void
}

export type ContextGroup = ContextItemGroup[]

class ContextSessionManager extends BaseComponent {
  group?: ContextGroup
  config?: ContextConfig

  constructor(style?: IAnyObject) {
    super({
      background: 'white',
      display: 'flex',
      position: 'absolute',
      top: 0,
      left: 0,
      'border-radius': '10px',
      'max-height': '500px',
      'max-width': '400px',
      'flex-direction': 'column',
      'flex-wrap': 'nowrap',
      border: '0',
      padding: '5px 10px',
      margin: '5px 0',
      'overflow-y': 'scroll',
      'overflow-x': 'hidden',
      'box-shadow': '0 4px 8px rgba(0, 0, 0, 0.1)',
      ...(style ?? {}),
    })
  }

  init(group: ContextGroup, config?: ContextConfig) {
    this.config = config
    const mouseMovement = getMouseMovement()
    this.rotate
    this.style.transform = `translate(${(mouseMovement?.clientX || 0) - 10}px, ${(mouseMovement?.clientY || 0) + 5}px)`
    this.appendChildren(...group)
    config?.onShow && config?.onShow()
  }

  onclick = (e: Event) => {
    e.preventDefault()
    e.stopPropagation()
  }
}

import Reblend from 'reblendjs'

async function ContextSession({ style }: { style: ReblendTyping.CSSProperties }) {
  return (
    <div
      style={{
        background: 'white',
        display: 'flex',
        position: 'absolute',
        top: 0,
        left: 0,
        'border-radius': '10px',
        'max-height': '500px',
        'max-width': '400px',
        'flex-direction': 'column',
        'flex-wrap': 'nowrap',
        border: '0',
        padding: '5px 10px',
        margin: '5px 0',
        'overflow-y': 'scroll',
        'overflow-x': 'hidden',
        'box-shadow': '0 4px 8px rgba(0, 0, 0, 0.1)',
        ...(style ?? {}),
      }}
    >
      ContextSession
    </div>
  )
}

export { ContextSessionManager, ContextSession }

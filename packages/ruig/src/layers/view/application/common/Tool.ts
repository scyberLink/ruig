/* eslint-disable @typescript-eslint/no-explicit-any */
import { SharedConfig } from '../../../../common/SharedConfig'
import { ACTIVE_TOOL } from '../../../../common/constants'
import { IAnyObject } from '../../../../common/models/IAnyObject'
import { createSVGElement } from '../../common/utils'
import { BaseComponent } from '../components/base/BaseComponent'
import { Color } from './Color'
import { ShadowMode } from './ShadowMode'

export interface IToolInit {
  svgPathData: string
  hint: string
  description: string
  deactivate?: () => void
  activate?: () => Promise<void>
}

abstract class Tool extends BaseComponent {
  active = false
  initialBackgroundColor: string = 'initial'

  constructor(style?: IAnyObject, mode?: ShadowMode) {
    super(
      {
        position: 'relative',
        width: '18px',
        height: '18px',
        border: '0',
        padding: '1px 2px',
        'border-radius': '5px',
        ...(style ?? {}),
      },
      mode,
    )

    this.hovered({
      background: `${Color.lightBlue}`,
    })

    this.setCursor('pointer')
  }

  svgPathData!: string
  hint!: string
  description!: string
  deactivate?: () => any

  enable() {
    this.initialBackgroundColor = this.style.background
    this.style.background = 'blue'
    this.active = true
  }

  disable() {
    this.style.background = this.initialBackgroundColor
    this.active = false
  }

  init(init: IToolInit) {
    const { svgPathData, hint, description, deactivate, activate } = init
    this.svgPathData = svgPathData || this.svgPathData
    this.hint = hint || this.hint
    this.description = description || this.description
    this.deactivate = deactivate || this.deactivate
    this.activate = activate || this.activate
    if (this.svgPathData) {
      const svg = createSVGElement({ path: this.svgPathData })
      this.appendChild(svg)
      this.title = this.hint
    } else {
      this.innerHTML = this.hint
    }
  }

  onclick = (event: MouseEvent) => {
    event?.preventDefault()
    const previousActiveTool: Tool = SharedConfig.get(ACTIVE_TOOL) as any
    previousActiveTool?.disable()
    previousActiveTool?.deactivate && previousActiveTool?.deactivate()
    this.activate && this.activate()
    this.enable()
    SharedConfig.set(ACTIVE_TOOL, this)
  }

  activate?: () => Promise<void>
}

export { Tool }

/* eslint-disable @typescript-eslint/no-explicit-any */
import SharedConfig from '../../../../common/SharedConfig'
import { ACTIVE_TOOL } from '../../../../common/constants'
import IAnyObject from '../../../../common/models/IAnyObject'
import { createSVGElement } from '../../common/utils'
import BaseComponent from '../components/base/BaseComponent'
import Color from './Color'
import ShadowMode from './ShadowMode'

export interface IToolInit {
  svgPathData: string
  hint: string
  description: string
  deactivate(): void
  activate(): void
}

abstract class Tool extends BaseComponent {
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
  deactivate!: () => any
  activate!: () => any

  enable() {
    this.style.background = 'blue'
  }

  disable() {
    this.style.background = 'white'
  }

  init(init: IToolInit) {
    const { svgPathData, hint, description, deactivate, activate } = init
    this.svgPathData = svgPathData
    this.hint = hint
    this.description = description
    this.deactivate = deactivate
    this.activate = activate
    const svg = createSVGElement({ path: this.svgPathData })
    this.appendChild(svg)
    this.title = this.hint
  }

  onclick = (event: MouseEvent) => {
    event?.preventDefault()
    const previousActiveTool: Tool = SharedConfig.get(ACTIVE_TOOL) as any
    previousActiveTool?.disable()
    previousActiveTool?.deactivate()
    this.activate()
    this.enable()
    SharedConfig.set(ACTIVE_TOOL, this)
  }
}

export default Tool

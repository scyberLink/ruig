import DesignElementTypes from '../../common/DesignElementTypes'
import DesignElement from '../../design/base/DesignElement'

export type IActionInit = {
  svgPathData: string
  hint: string
  description: string
  action: (designElement?: DesignElement) => void
  subscribe?: () => void
}

interface IAction {
  supportedDesignElements: DesignElementTypes | DesignElementTypes[]
  svgPathData: string
  hint: string
  description: string
  init(init: IActionInit): void
  action: (designElement: DesignElement) => void
  enable(): void
  disable(): void
  subscribe(): void
}

export default IAction

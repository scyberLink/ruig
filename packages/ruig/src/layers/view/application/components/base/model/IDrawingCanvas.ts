import { IPosition } from '../../../../../../common/models/IPosition'
import { BaseManager } from '../BaseComponent'

interface IDrawingCanvas extends BaseManager {
  activateDesignMode(): void
  activatePreviewMode(): void
  addDesignElement(element: HTMLElement, position?: IPosition): HTMLElement
}

export { IDrawingCanvas }

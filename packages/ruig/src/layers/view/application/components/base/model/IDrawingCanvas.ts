import { IPosition } from '../../../../../../common/models/IPosition'
import { BaseComponent } from '../BaseComponent'

interface IDrawingCanvas extends BaseComponent {
  activateDesignMode(): void
  activatePreviewMode(): void
  addDesignElement(element: HTMLElement, position?: IPosition): HTMLElement
}

export { IDrawingCanvas }

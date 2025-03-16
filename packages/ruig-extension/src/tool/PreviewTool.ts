import { REI } from 'ruig'
import { BaseComponent } from 'ruig'
import { IAppContainer } from 'ruig'
import { IDrawingCanvas } from 'ruig'

class PreviewTool extends REI.DrawingToolbarItem {
  appContainer: IAppContainer
  canvas: IDrawingCanvas

  constructor(appContainer: IAppContainer) {
    super()
    this.appContainer = appContainer
    this.canvas = appContainer.getDrawingCanvas()
    const data: any = {
      svgPathData:
        'M6.20558,0.72041c13.60336,0,19.58883,3.11358,19.58883,11.18582-.65296,9.34073-13.91333,8.84662-14.25632,9.34073-.22866.32941-.22866,3.67362,0,10.03264h-5.33251v-30.55919ZM16,17.06148c3.39658,0,6.15006-2.80193,6.15006-6.25828s-2.75348-6.25828-6.15006-6.25828-6.15006,2.80193-6.15006,6.25828s2.75348,6.25828,6.15006,6.25828Z',
      hint: 'Preview tool',
      description: 'Activate preview mode',
      activate: () => this.canvas.activatePreviewMode(),
      deactivate: () => this.canvas.activateDesignMode(),
    }
    this.init(data)
    ;(appContainer.getDrawingToolBar() as BaseComponent).appendChildren(this)
  }
}
REI.registerElement('PreviewTool', PreviewTool as unknown as any)

export { PreviewTool }

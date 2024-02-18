import SharedConfig from '../../../../../common/SharedConfig'
import { DRAWING_CANVAS } from '../../../../../common/constants'
import IAnyObject from '../../../../../common/models/IAnyObject'
import ShadowMode from '../../../application/common/ShadowMode'
import DrawingCanvas from '../../../application/components/drawingcanvas/DrawingCanvas'
import DesignSelectionWrapperItem from '../DesignSelectionWrapperItem'

class CenterElement extends DesignSelectionWrapperItem {
  initialBorder!: string
  dragOffsetX!: number
  dragOffsetY!: number
  lastClientX = 0
  lastClientY = 0

  constructor(style?: IAnyObject, mode?: ShadowMode) {
    super(
      {
        top: '0',
        left: '0',
        bottom: '0',
        right: '0',
        ...(style ?? {}),
      },
      mode,
    )

    this.draggable = true

    this.setCursor('move')
  }

  ondrag = (event: DragEvent) => {
    event.preventDefault()
    const drawingCanvas = SharedConfig.get(DRAWING_CANVAS) as DrawingCanvas
    let x2 = event.clientX
    let y2 = event.clientY

    if (x2 <= 0 || y2 <= 0) {
      x2 = this.lastClientX
      y2 = this.lastClientY
    } else {
      this.lastClientX = x2
      this.lastClientY = y2
    }

    const canvasRect = drawingCanvas.getBoundingClientRect()
    const x1 = canvasRect.left
    const y1 = canvasRect.top

    const x = (x2 - x1) * (1 / drawingCanvas.scale)
    const y = (y2 - y1) * (1 / drawingCanvas.scale)

    const newX = x - this.dragOffsetX
    const newY = y - this.dragOffsetY

    this.getWrapped().style.left = `${newX}px`
    this.getWrapped().style.top = `${newY}px`
    event.stopPropagation()
  }

  ondragstart = (event: DragEvent) => {
    //event.preventDefault()
    event.dataTransfer?.setDragImage(new Image(), 0, 0)
    this.dragOffsetX = event.offsetX
    this.dragOffsetY = event.offsetY
    this.hide()
    //event.stopPropagation()
  }

  ondragend = (event: DragEvent) => {
    event.preventDefault()
    this.show()
    event.stopPropagation()
  }

  onclick = (event: MouseEvent) => {
    event.preventDefault()
    this.getWrapper().toggleMode()
    event.stopPropagation()
  }

  onmousedown = (event: MouseEvent) => {
    //event.preventDefault()
    event.stopPropagation()
  }
}

export default CenterElement

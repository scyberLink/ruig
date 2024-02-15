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
    const x2 = Math.abs(event.clientX)
    const y2 = Math.abs(event.clientY)
    const canvasRect = drawingCanvas.getBoundingClientRect()
    const x1 = canvasRect.left
    const y1 = canvasRect.top

    const x = (x2 - x1) * (1 / drawingCanvas.scale)
    const y = (y2 - y1) * (1 / drawingCanvas.scale)

    // Calculate the boundaries of the canvas
    const canvasWidth = drawingCanvas.offsetWidth
    const canvasHeight = drawingCanvas.offsetHeight

    const childWidth = this.getWrapped().offsetWidth
    const childHeight = this.getWrapped().offsetHeight

    // Ensure the child element does not go outside the canvas
    const newX = Math.min(Math.max(x - this.dragOffsetX, 0), canvasWidth - childWidth)
    const newY = Math.min(Math.max(y - this.dragOffsetY, 0), canvasHeight - childHeight)

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

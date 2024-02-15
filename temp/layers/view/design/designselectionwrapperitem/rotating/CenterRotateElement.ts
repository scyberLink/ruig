import IAnyObject from '../../../../../common/models/IAnyObject'
import ShadowMode from '../../../application/common/ShadowMode'
import RotatingItem from './RotatingItem'

class CenterRotateElement extends RotatingItem {
  initialBorder!: string
  dragOffsetX!: number
  dragOffsetY!: number

  constructor(style?: IAnyObject, mode?: ShadowMode) {
    super(
      {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        ...(style ?? {}),
      },
      mode,
    )

    this.draggable = true
    const img = new Image(20, 20)
    img.src = 'cursor/rotate.svg'
    this.appendChild(img)
    this.setCursor('grab')
  }

  ondrag = (event: DragEvent) => {
    event.preventDefault()
    const drawingCanvas = this.getWrapped()
    const x2 = Math.abs(event.clientX)
    const y2 = Math.abs(event.clientY)
    const canvasRect = drawingCanvas.getBoundingClientRect()
    const x1 = canvasRect.left
    const y1 = canvasRect.top

    const x = (x2 - x1 - 15) * (1 / drawingCanvas.scale)
    const y = (y2 - y1 - 15) * (1 / drawingCanvas.scale)
    this.style.left = x - this.dragOffsetX + 'px'
    this.style.top = y - this.dragOffsetY + 'px'
    event.stopPropagation()
  }

  ondragstart = (event: DragEvent) => {
    //event.preventDefault()
    event.dataTransfer?.setDragImage(new Image(), 0, 0)
    this.dragOffsetX = event.offsetX
    this.dragOffsetY = event.offsetY
    event.stopPropagation()
  }

  /* 
  ondrag = (event: DragEvent) => {
    const drawingCanvas = SharedConfig.get(DRAWING_CANVAS)
    const x2 = Math.abs(event.clientX)
    const y2 = Math.abs(event.clientY)
    const canvasRect = drawingCanvas.getBoundingClientRect()
    const x1 = canvasRect.left
    const y1 = canvasRect.top

    const x = (x2 - x1) * (1 / drawingCanvas.scale)
    const y = (y2 - y1) * (1 / drawingCanvas.scale)
    this.style.left = x - this.dragOffsetX + 'px'
    this.style.top = y - this.dragOffsetY + 'px'
    event.stopPropagation()
  }

  ondragstart = (event: DragEvent) => {
    event.dataTransfer?.setDragImage(new Image(), 0, 0)
    this.dragOffsetX = event.offsetX
    this.dragOffsetY = event.offsetY
    event.stopPropagation()
  } */
}

export default CenterRotateElement

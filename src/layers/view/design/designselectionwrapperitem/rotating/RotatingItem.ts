import IAnyObject from '../../../../../common/models/IAnyObject'
import ShadowMode from '../../../application/common/ShadowMode'
import DesignSelectionWrapperItem from '../DesignSelectionWrapperItem'

class RotatingItem extends DesignSelectionWrapperItem {
  initialBorder!: string

  constructor(style?: IAnyObject, mode?: ShadowMode) {
    super(
      {
        width: '20px',
        height: '20px',
        ...(style ?? {}),
      },
      mode,
    )

    this.draggable = true
    this.setCursor('rotate')
  }

  setSvg(svg: string) {
    const img = new Image(20, 20)
    import(`../../../../../assets/raws/cursor/${svg}.svg`)
      .then(({ default: cursor }) => {
        img.src = cursor
      })
      .catch((error) => {
        console.error('Failed to load svg:', error)
      })
    this.appendChild(img)
  }

  // Define startX and startY variables to store the initial position of the mouse pointer
  private startX!: number
  private startY!: number

  ondragstart = (event: DragEvent) => {
    //event.preventDefault()
    const img = new Image()
    img.src = 'cursor/rotate.svg'
    event.dataTransfer?.setDragImage(img, 0, 0)
    this.startX = event.clientX
    this.startY = event.clientY
    event.stopPropagation()
  }

  ondrag = (event: DragEvent) => {
    event.preventDefault()
    const deltaX = event.clientX - this.startX
    const deltaY = event.clientY - this.startY
    const angle = Math.atan2(deltaY, deltaX)
    const rotate = angle * (180 / Math.PI)
    this.getWrapped().rotate = rotate
    event.stopPropagation()
  }

  onmousedown = (event: MouseEvent) => {
    //event.preventDefault()
    event.stopPropagation()
  }
}

export default RotatingItem

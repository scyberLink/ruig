import SharedConfig from '../../../../common/SharedConfig'
import { DRAWING_CANVAS } from '../../../../common/constants'
import IAnyObject from '../../../../common/models/IAnyObject'
import ShadowMode from '../../application/common/ShadowMode'
import BaseComponent from '../../application/components/base/BaseComponent'
import DrawingCanvas from '../../application/components/drawingcanvas/DrawingCanvas'
import DesignElement from '../DesignElement'
import DesignElementSelectionWrapper from '../DesignElementSelectionWrapper'

class DesignSelectionWrapperItem extends BaseComponent {
  private designElementWrapper!: DesignElementSelectionWrapper
  initialBorder!: string

  constructor(style?: IAnyObject, mode?: ShadowMode) {
    super(
      {
        position: 'absolute',
        border: '0',
        background: 'transparent',
        ...(style ?? {}),
      },
      mode,
    )
  }

  setWrapper(designElementWrapper: DesignElementSelectionWrapper) {
    this.designElementWrapper = designElementWrapper
  }

  getWrapper() {
    return this.designElementWrapper
  }

  getWrapped(): DesignElement {
    return this.designElementWrapper.getWrappedElement() as DesignElement
  }

  getWrappedParent(): HTMLElement {
    return this.getWrapped().parentElement as HTMLElement
  }

  getDrawingCanvas(): DrawingCanvas {
    return SharedConfig.get(DRAWING_CANVAS) as DrawingCanvas
  }

  hide() {
    this.initialBorder = this.parentElement!.style.border
    this.parentElement!.style.border = '0'
    //this.style.display = 'none'
  }

  show() {
    this.parentElement!.style.border = this.initialBorder ?? '0.5px solid red'
    //this.style.display = 'initial'
  }
}

export default DesignSelectionWrapperItem

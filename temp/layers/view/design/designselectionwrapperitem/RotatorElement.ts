import { MAX_Z_INDEX } from '../../../../common/constants'
import NullException from '../../../../common/exceptions/NullException'
import IAnyObject from '../../../../common/models/IAnyObject'
import BaseComponent from '../../application/components/base/BaseComponent'
import DesignElement from '../DesignElement'
import { DesignElementWrapper } from '../DesignElementSelectionWrapper'
import DesignSelectionWrapperItem from './DesignSelectionWrapperItem'
import BottomLeftRotateElement from './rotating/BottomLeftRotateElement'
import BottomRightRotateElement from './rotating/BottomRightRotateElement'
import CenterRotateElement from './rotating/CenterRotateElement'
import TopLeftRotateElement from './rotating/TopLeftRotateElement'
import TopRightRotateElement from './rotating/TopRightRotateElement'

class RotatorElement extends BaseComponent {
  private centerRotateElement: DesignSelectionWrapperItem = new CenterRotateElement() as DesignSelectionWrapperItem
  private topRightRotateElement: DesignSelectionWrapperItem = new TopRightRotateElement() as DesignSelectionWrapperItem
  private bottomRightRotateElement: DesignSelectionWrapperItem =
    new BottomRightRotateElement() as DesignSelectionWrapperItem
  private bottomLeftRotateElement: DesignSelectionWrapperItem =
    new BottomLeftRotateElement() as DesignSelectionWrapperItem
  private topLeftRotateElement: DesignSelectionWrapperItem = new TopLeftRotateElement() as DesignSelectionWrapperItem

  private wrappedElement!: DesignElement
  private wrapper!: DesignElementWrapper
  initialBorder!: string

  constructor(style?: IAnyObject) {
    super({
      display: 'none',
      background: 'transparent',
      border: '0',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      ...(style ?? {}),
      'z-index': MAX_Z_INDEX,
    })

    this.appendChildren(
      this.topRightRotateElement,
      this.bottomLeftRotateElement,
      this.bottomRightRotateElement,
      this.topLeftRotateElement,
      this.centerRotateElement,
    )
  }

  setElementToWrapAndWrapper(element: DesignElement, wrapper: DesignElementWrapper): void {
    if (!element) {
      throw new NullException()
    }
    this.wrappedElement = element
    this.wrapper = wrapper

    this.updateSize(element)

    this.topRightRotateElement.setWrapper(wrapper)
    this.bottomRightRotateElement.setWrapper(wrapper)
    this.bottomLeftRotateElement.setWrapper(wrapper)
    this.topLeftRotateElement.setWrapper(wrapper)
    this.centerRotateElement.setWrapper(wrapper)
  }

  updateSize(element: DesignElement) {
    const width = element.clientWidth
    const height = element.clientHeight

    this.style.width = width + 15 + 'px'
    this.style.height = height + 15 + 'px'
  }

  getWrappedElement() {
    return this.wrappedElement
  }
}

export default RotatorElement

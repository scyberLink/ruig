import SharedConfig from '../../../common/SharedConfig'
import { ACTIVE_ELEMENT } from '../../../common/constants'
import NullException from '../../../common/exceptions/NullException'
import IAnyObject from '../../../common/models/IAnyObject'
import BaseComponent from '../application/components/base/BaseComponent'
import DesignElement from './DesignElement'
import ResizerElement from './designselectionwrapperitem/ResizerElement'
import RotatorElement from './designselectionwrapperitem/RotatorElement'
import IDesignElementSelectWrapper from './models/IDesignElementSelectionWrapper'

enum DesignElementSelectionMode {
  ROTATE,
  RESIZE,
}

class DesignElementSelectionWrapper extends BaseComponent implements IDesignElementSelectWrapper {
  private rotatorElement = new RotatorElement({
    display: 'none',
  })
  private resizerElement = new ResizerElement()

  private wrappedElement!: DesignElement
  private mode = DesignElementSelectionMode.RESIZE

  constructor(style?: IAnyObject) {
    super({
      background: 'transparent',
      border: '0',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      ...(style ?? {}),
    })
    this.appendChildren(this.rotatorElement, this.resizerElement)

    window.onkeydown = (event: KeyboardEvent) => {
      event.preventDefault()
      const activeElement = SharedConfig.get(ACTIVE_ELEMENT) as DesignElement
      let moveFactor = 1

      if (event.ctrlKey) {
        moveFactor = 5
      }

      if (activeElement) {
        const currentTop = activeElement.offsetTop
        const currentLeft = activeElement.offsetLeft

        switch (event.key) {
          case 'ArrowUp':
            activeElement.style.top = currentTop - moveFactor + 'px'
            break
          case 'ArrowDown':
            activeElement.style.top = currentTop + moveFactor + 'px'
            break
          case 'ArrowLeft':
            activeElement.style.left = currentLeft - moveFactor + 'px'
            break
          case 'ArrowRight':
            activeElement.style.left = currentLeft + moveFactor + 'px'
            break
        }
      }
    }
  }

  setElementToWrap(element: DesignElement): void {
    if (!element) {
      throw new NullException()
    }
    this.wrappedElement = element

    this.updateSize(element)

    this.rotatorElement.setElementToWrapAndWrapper(element, this)
    this.resizerElement.setElementToWrapAndWrapper(element, this)
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

  toggleMode() {
    switch (this.mode) {
      case DesignElementSelectionMode.RESIZE:
        this.resizerElement.style.display = 'none'
        this.rotatorElement.style.display = 'initial'
        break

      case DesignElementSelectionMode.ROTATE:
        this.rotatorElement.style.display = 'none'
        this.resizerElement.style.display = 'initial'
        break

      default:
        break
    }
  }
}

export { DesignElementSelectionWrapper as DesignElementWrapper }

export default DesignElementSelectionWrapper

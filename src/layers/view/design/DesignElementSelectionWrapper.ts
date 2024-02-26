import NullException from '../../../common/exceptions/NullException'
import IAnyObject from '../../../common/models/IAnyObject'
import BaseComponent from '../application/components/base/BaseComponent'
import DesignElement from './DesignElement'
import IDesignElementSelectWrapper from './models/IDesignElementSelectionWrapper'

class DesignElementSelectionWrapper extends BaseComponent implements IDesignElementSelectWrapper {
  private wrappedElement!: DesignElement

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
  }

  setElementToWrap(element: DesignElement): void {
    if (!element) {
      throw new NullException()
    }
    this.wrappedElement = element

    this.updateSize(element)
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

export default DesignElementSelectionWrapper

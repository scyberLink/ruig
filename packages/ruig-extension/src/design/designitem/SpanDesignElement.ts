import { REI } from 'ruig'
import { IAnyObject } from 'ruig'

class LinkDesignElementBase extends REI.DesignElement {
  type = REI.DesignElementTypes.SPAN

  constructor() {
    super(document.createElement('a'))

    //this.extendedElement.textContent = 'Span'
  }
}

export const LinkDesignElement = REI.registerElement('LinkDesignElement', LinkDesignElementBase as unknown as any)

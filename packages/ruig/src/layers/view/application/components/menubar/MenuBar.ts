import { IAnyObject } from '../../../../../common/models/IAnyObject'
import { ShadowMode } from '../../common/ShadowMode'
import { BaseComponent } from '../base/BaseComponent'
import { IMenuBar } from '../base/model/IMenuBar'
import { ContextItem } from '../contextmenu/ContextItem'
import { MenuBarItem } from './MenuBarItem'

class MenuBar extends BaseComponent implements IMenuBar {
  menuItems: { [menuItemName: string]: MenuBarItem }

  constructor(style?: IAnyObject, mode?: ShadowMode) {
    super(
      {
        display: 'flex',
        overflow: 'hidden',
        ...(style ?? {}),
      },
      mode,
    )

    const fileMenuItem = new MenuBarItem()
    const editMenuItem = new MenuBarItem()
    const viewMenuItem = new MenuBarItem()
    const toolMenuItem = new MenuBarItem()

    fileMenuItem.init({ hint: 'File', description: '', svgPathData: '' })
    editMenuItem.init({ hint: 'Edit', description: '', svgPathData: '' })
    viewMenuItem.init({ hint: 'View', description: '', svgPathData: '' })
    toolMenuItem.init({ hint: 'Tool', description: '', svgPathData: '' })

    this.menuItems = { fileMenuItem, editMenuItem, viewMenuItem, toolMenuItem }

    const items = new Array(10).fill(0).map((_, i) => {
      const item = new ContextItem()
      const span = document.createElement('div')
      span.innerText = 'This is context item ' + i
      span.onclick = () => alert(span.innerText)
      item.init(span, 'First Group')
      return item
    })

    const items1 = new Array(10).fill(0).map((_, i) => {
      const item = new ContextItem()
      item.init(document.createTextNode('This is context item ' + i), 'Second Group')
      return item
    })

    fileMenuItem.addItems(...items)
    editMenuItem.addItems(...items1)

    this.appendChildren(...Object.values(this.menuItems))
  }

  getFileMenu(): MenuBarItem {
    return this.menuItems['fileMenuItem']
  }

  getEditMenu(): MenuBarItem {
    return this.menuItems['editMenuItem']
  }

  getViewMenu(): MenuBarItem {
    return this.menuItems['viewMenuItem']
  }

  getToolMenu(): MenuBarItem {
    return this.menuItems['toolMenuItem']
  }
}

export { MenuBar }

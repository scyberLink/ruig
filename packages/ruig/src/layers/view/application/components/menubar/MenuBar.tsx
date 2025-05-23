import { IAnyObject } from '../../../../../common/models/IAnyObject'
import { Color } from '../../common/Color'
import { ShadowMode } from '../../common/ShadowMode'
import { BaseManager } from '../base/BaseComponent'
import { IMenuBar } from '../base/model/IMenuBar'
import { ContextItem } from '../contextmenu/ContextItem'
import { Menu } from './Menu'
import { MenuBarItem } from './MenuItem'

enum MenuItemNames {
  FILE = 'File',
  EDIT = 'Edit',
  VIEW = 'View',
  TOOL = 'Tool',
}

const menus: { [key: string]: ReblendTyping.ReblendElement[] } = {}
Object.values(MenuItemNames).forEach((item) => (menus[item] = []))

const menuContext = createContext(menus)

/* class MenuBarManager extends BaseManager implements IMenuBar {
  initialize(): void {
  }
  static MenuItemNames = MenuItemNames

  private constructor() {
    super()
  }

  menuItems: { [menuItemName: string]: MenuBarItem }

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
} */

import Reblend, { createContext, ReblendTyping } from 'reblendjs'

async function MenuBar({ style }: { style: ReblendTyping.CSSProperties }) {
  return (
    <>
      <div
        style={{
          ...{
            display: 'flex',
            border: `0.5px solid ${Color.ash}`,
            overflowX: 'hidden' as any,
            ...(style ?? {}),
          },
          ...style,
        }}
        title="MenuBar"
      >
        {Object.values(MenuItemNames).map((title, i) => (
          <Menu title={title} content={[i as never]} />
        ))}
      </div>
    </>
  )
}

export { /* MenuBarManager,  */MenuBar }

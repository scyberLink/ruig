import { MenuBarItem } from '../../menubar/MenuBarItem'

interface IMenuBar {
  getFileMenu(): MenuBarItem
  getEditMenu(): MenuBarItem
  getViewMenu(): MenuBarItem
  getToolMenu(): MenuBarItem
}

export { IMenuBar }

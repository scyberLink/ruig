import { MenuBarItem } from '../../menubar/MenuItem'

interface IMenuBar {
  getFileMenu(): MenuBarItem
  getEditMenu(): MenuBarItem
  getViewMenu(): MenuBarItem
  getToolMenu(): MenuBarItem
}

export { IMenuBar }

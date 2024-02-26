import IAnyObject from '../../../../../common/models/IAnyObject'
import ActionableIcon from '../../common/ActionableIcon'
import ShadowMode from '../../common/ShadowMode'
import TextIcon from '../../common/TextIcon'
import BaseComponent from '../base/BaseComponent'
import IMenuBar from '../base/model/IMenuBar'

class MenuBar extends BaseComponent implements IMenuBar {
  fileMenuItem: ActionableIcon = new TextIcon() as ActionableIcon
  editMenuItem: ActionableIcon = new TextIcon() as ActionableIcon
  viewMenuItem: ActionableIcon = new TextIcon() as ActionableIcon
  toolMenuItem: ActionableIcon = new TextIcon() as ActionableIcon

  constructor(style?: IAnyObject, mode?: ShadowMode) {
    super(
      {
        display: 'flex',
        overflow: 'hidden',
        ...(style ?? {}),
      },
      mode,
    )

    this.fileMenuItem.init({ hint: 'File', description: '', svgPathData: '' })
    this.editMenuItem.init({ hint: 'Edit', description: '', svgPathData: '' })
    this.viewMenuItem.init({ hint: 'View', description: '', svgPathData: '' })
    this.toolMenuItem.init({ hint: 'Tool', description: '', svgPathData: '' })

    this.appendChildren(this.fileMenuItem, this.editMenuItem, this.viewMenuItem, this.toolMenuItem)
  }

  getFileMenu(): ActionableIcon {
    return this.fileMenuItem
  }

  getEditMenu(): ActionableIcon {
    return this.editMenuItem
  }

  getViewMenu(): ActionableIcon {
    return this.viewMenuItem
  }

  getToolMenu(): ActionableIcon {
    return this.toolMenuItem
  }
}

export default MenuBar

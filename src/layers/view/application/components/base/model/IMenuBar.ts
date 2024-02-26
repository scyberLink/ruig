import ActionableIcon from '../../../common/ActionableIcon'

interface IMenuBar {
  getFileMenu(): ActionableIcon
  getEditMenu(): ActionableIcon
  getViewMenu(): ActionableIcon
  getToolMenu(): ActionableIcon
}

export default IMenuBar

import SharedConfig from '../common/SharedConfig'
import { registerElement, register } from '../customElementRegistration'
import ParserContainer from '../layers/view/application/components/ParserContainer'
import ActionBar from '../layers/view/application/components/actionbar/ActionBar'
import AppContainer from '../layers/view/application/components/base/AppContainer'
import ColorPalette from '../layers/view/application/components/colorpalette/ColorPalette'
import ConsoleCanvas from '../layers/view/application/components/consolecanvas/ConsoleCanvas'
import ContextMenu from '../layers/view/application/components/contextmenu/ContextMenu'
import DrawingCanvas from '../layers/view/application/components/drawingcanvas/DrawingCanvas'
import MenuBar from '../layers/view/application/components/menubar/MenuBar'
import ObjectManagerSelector from '../layers/view/application/components/objectmanagerselector/ObjectManagerSelector'
import HorizontalRuler from '../layers/view/application/components/rulers/horizontalruler/HorizontalRuler'
import VerticalRuler from '../layers/view/application/components/rulers/verticalruler/VerticalRuler'
import HorizontalScrollBar from '../layers/view/application/components/scrollbars/horizontalscrollbar/HorizontalScrollBar'
import VerticalScrollBar from '../layers/view/application/components/scrollbars/verticalscrollbar/VerticalScrollBar'
import DrawingToolBar from '../layers/view/application/components/sidebars/drawingtoolbar/DrawingToolBar'
import LeftSideBar from '../layers/view/application/components/sidebars/leftsidebar/LeftSideBar'
import StatusBar from '../layers/view/application/components/statusbar/StatusBar'
import TabPane from '../layers/view/application/components/tabpane/TabPane'
import ToolBar from '../layers/view/application/components/toolbar/ToolBar'
import BaseComponent from '../layers/view/design/base/BaseDesignComponent'
import BaseExtension from './BaseExtension'

export {
  BaseExtension,
  AppContainer,
  ActionBar,
  BaseComponent,
  ColorPalette,
  DrawingCanvas,
  DrawingToolBar,
  HorizontalRuler,
  HorizontalScrollBar,
  MenuBar,
  ObjectManagerSelector,
  StatusBar,
  ToolBar,
  VerticalRuler,
  VerticalScrollBar,
  ConsoleCanvas,
  LeftSideBar,
  TabPane,
  ParserContainer,
  ContextMenu,
  SharedConfig,
  register,
  registerElement,
}

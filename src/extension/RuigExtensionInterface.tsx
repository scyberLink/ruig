import { register, registerElement } from '../customElementRegistration'
import BaseExtension from './BaseExtension'
import ExtensionDevelopment from './ExtensionDevelopment'
import DesignElementTypes from '../layers/view/common/DesignElementTypes'
import DesignElement from '../layers/view/design/base/DesignElement'
import ParserContainer from '../layers/view/application/components/ParserContainer'
import ActionBar from '../layers/view/application/components/actionbar/ActionBar'
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
import DrawingToolbarItem from '../layers/view/application/components/sidebars/drawingtoolbar/DrawingToolbarItem'
import LeftSideBar from '../layers/view/application/components/sidebars/leftsidebar/LeftSideBar'
import StatusBar from '../layers/view/application/components/statusbar/StatusBar'
import TabPane from '../layers/view/application/components/tabpane/TabPane'
import ToolBar from '../layers/view/application/components/toolbar/ToolBar'
import AppContainer from '../layers/view/application/components/base/AppContainer'
import BaseComponent from '../layers/view/application/components/base/BaseComponent'
import App from '../App'
import initAppContainer from '../init'

const REI = {
  BaseExtension,
  ExtensionDevelopment,
  ActionBar,
  BaseComponent,
  ColorPalette,
  DrawingCanvas,
  DrawingToolBar,
  DrawingToolbarItem,
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
  register,
  registerElement,
  AppContainer,
  DesignElement,
  DesignElementTypes,
  App: ({ extensions }: { extensions?: BaseExtension[] }) => (
    <App appContainer={initAppContainer()} extensions={extensions} />
  ),
}

export default REI

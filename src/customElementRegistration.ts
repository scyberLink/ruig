/* eslint-disable @typescript-eslint/no-explicit-any */
import { snakeCase } from './common/utils'
import TextIcon from './layers/view/application/common/TextIcon'
import ParserContainer from './layers/view/application/components/ParserContainer'
import ActionBar from './layers/view/application/components/actionbar/ActionBar'
import AppContainer from './layers/view/application/components/base/AppContainer'
import BaseComponent from './layers/view/application/components/base/BaseComponent'
import ColorPalette from './layers/view/application/components/colorpalette/ColorPalette'
import ConsoleCanvas from './layers/view/application/components/consolecanvas/ConsoleCanvas'
import ContextMenu from './layers/view/application/components/contextmenu/ContextMenu'
import DrawingCanvas from './layers/view/application/components/drawingcanvas/DrawingCanvas'
import InvalidTagNameException from './layers/view/application/components/exceptions/InvalidTagNameException'
import MenuBar from './layers/view/application/components/menubar/MenuBar'
import ObjectManagerSelector from './layers/view/application/components/objectmanagerselector/ObjectManagerSelector'
import HorizontalRuler from './layers/view/application/components/rulers/horizontalruler/HorizontalRuler'
import VerticalRuler from './layers/view/application/components/rulers/verticalruler/VerticalRuler'
import HorizontalScrollBar from './layers/view/application/components/scrollbars/horizontalscrollbar/HorizontalScrollBar'
import VerticalScrollBar from './layers/view/application/components/scrollbars/verticalscrollbar/VerticalScrollBar'
import DrawingToolBar from './layers/view/application/components/sidebars/drawingtoolbar/DrawingToolBar'
import DrawingToolbarItem from './layers/view/application/components/sidebars/drawingtoolbar/DrawingToolbarItem'
import LeftSideBar from './layers/view/application/components/sidebars/leftsidebar/LeftSideBar'
import StatusBar from './layers/view/application/components/statusbar/StatusBar'
import TabPane from './layers/view/application/components/tabpane/TabPane'
import ToolBar from './layers/view/application/components/toolbar/ToolBar'
import DumpElement from './layers/view/common/DumpElement'
import DesignElement from './layers/view/design/DesignElement'
import DesignElementSelectionWrapper from './layers/view/design/DesignElementSelectionWrapper'
import BaseDesignComponent from './layers/view/design/base/BaseDesignComponent'
import LinkDesignElement from './layers/view/design/designitem/LinkDesignElement'

export function register() {
  const CustomElements: any = {
    TextIcon,
    AppContainer,
    ActionBar,
    ParserContainer,
    BaseComponent,
    ColorPalette,
    ConsoleCanvas,
    ContextMenu,
    DrawingCanvas,
    MenuBar,
    ObjectManagerSelector,
    HorizontalRuler,
    VerticalRuler,
    HorizontalScrollBar,
    VerticalScrollBar,
    DrawingToolBar,
    DrawingToolbarItem,
    LeftSideBar,
    StatusBar,
    TabPane,
    ToolBar,
    DumpElement,
    DesignElement,
    DesignElementSelectionWrapper,
    BaseDesignComponent,
    LinkDesignElement,
  }

  for (const [name, customElement] of Object.entries<typeof HTMLElement>(CustomElements)) {
    registerElement(name, customElement)
  }
}

export function registerElement(name: string, element: typeof HTMLElement): typeof BaseComponent | typeof HTMLElement {
  if (!element) {
    throw new InvalidTagNameException()
  }

  const tagName = snakeCase(name)

  if (!customElements.get(tagName)) {
    try {
      customElements.define(tagName, element)
    } catch (error: any) {
      console.warn(error.message)
    }
  }

  return element
}

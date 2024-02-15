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
import LinkDesignElement from './layers/view/design/designitem/LinkDesignElement'
import DesignSelectionWrapperItem from './layers/view/design/designselectionwrapperitem/DesignSelectionWrapperItem'
import ResizerElement from './layers/view/design/designselectionwrapperitem/ResizerElement'
import RotatorElement from './layers/view/design/designselectionwrapperitem/RotatorElement'
import BottomElement from './layers/view/design/designselectionwrapperitem/resizing/BottomElement'
import BottomLeftElement from './layers/view/design/designselectionwrapperitem/resizing/BottomLeftElement'
import BottomRightElement from './layers/view/design/designselectionwrapperitem/resizing/BottomRightElement'
import CenterElement from './layers/view/design/designselectionwrapperitem/resizing/CenterItem'
import LeftElement from './layers/view/design/designselectionwrapperitem/resizing/LeftElement'
import RightElement from './layers/view/design/designselectionwrapperitem/resizing/RightElement'
import TopElement from './layers/view/design/designselectionwrapperitem/resizing/TopElement'
import TopLeftElement from './layers/view/design/designselectionwrapperitem/resizing/TopLeftElement'
import TopRightElement from './layers/view/design/designselectionwrapperitem/resizing/TopRightElement'
import BottomLeftRotateElement from './layers/view/design/designselectionwrapperitem/rotating/BottomLeftRotateElement'
import BottomRightRotateElement from './layers/view/design/designselectionwrapperitem/rotating/BottomRightRotateElement'
import CenterRotateElement from './layers/view/design/designselectionwrapperitem/rotating/CenterRotateElement'
import TopLeftRotateElement from './layers/view/design/designselectionwrapperitem/rotating/TopLeftRotateElement'
import TopRightRotateElement from './layers/view/design/designselectionwrapperitem/rotating/TopRightRotateElement'
import TranslatorElement from './layers/view/design/designselectionwrapperitem/rotating/TranslatorElement'

export function register() {
  const CustomElements: any = {
    TextIcon: TextIcon,
    AppContainer: AppContainer,
    ActionBar: ActionBar,
    ParserContainer: ParserContainer,
    BaseComponent: BaseComponent,
    ColorPalette: ColorPalette,
    ConsoleCanvas: ConsoleCanvas,
    ContextMenu: ContextMenu,
    DrawingCanvas: DrawingCanvas,
    MenuBar: MenuBar,
    ObjectManagerSelector: ObjectManagerSelector,
    HorizontalRuler: HorizontalRuler,
    VerticalRuler: VerticalRuler,
    HorizontalScrollBar: HorizontalScrollBar,
    VerticalScrollBar: VerticalScrollBar,
    DrawingToolBar: DrawingToolBar,
    DrawingToolbarItem: DrawingToolbarItem,
    LeftSideBar: LeftSideBar,
    StatusBar: StatusBar,
    TabPane: TabPane,
    ToolBar: ToolBar,
    DumpElement: DumpElement,
    DesignElement: DesignElement,
    DesignElementSelectionWrapper: DesignElementSelectionWrapper,
    //BaseDesignComponent: BaseDesignComponent,
    LinkDesignElement: LinkDesignElement,
    BottomElement: BottomElement,
    BottomLeftElement: BottomLeftElement,
    BottomRightElement: BottomRightElement,
    BottomLeftRotateElement: BottomLeftRotateElement,
    BottomRighRotatetElement: BottomRightRotateElement,
    CenterElement: CenterElement,
    CenterRotateElement: CenterRotateElement,
    DesignSelectionWrapperItem: DesignSelectionWrapperItem,
    LeftElement: LeftElement,
    RightElement: RightElement,
    RotatorElement: RotatorElement,
    ResizerElement: ResizerElement,
    TopElement: TopElement,
    TopLeftElement: TopLeftElement,
    TopRightElement: TopRightElement,
    TopLeftRotateElement: TopLeftRotateElement,
    TopRightRotateElement: TopRightRotateElement,
    TranslatorElement: TranslatorElement,
  }
  for (const [name, customElement] of Object.entries<typeof HTMLElement>(CustomElements)) {
    (customElement.prototype as any).name = name
    registerElement(customElement)
  }
}

export function registerElement(element: typeof HTMLElement): typeof BaseComponent | typeof HTMLElement {
  if (!element) {
    throw new InvalidTagNameException()
  }
  const tagName = snakeCase(element.name)
  try {
    customElements.define(tagName, element)
  } catch (error: any) {
    console.warn(error.message)
  }
  return element
}

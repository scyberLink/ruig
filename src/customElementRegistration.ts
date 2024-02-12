import { snakeCase } from "./common/utils"
import TextIcon from "./layers/view/application/common/TextIcon"
import ParserContainer from "./layers/view/application/components/ParserContainer"
import ActionBar from "./layers/view/application/components/actionbar/ActionBar"
import AppContainer from "./layers/view/application/components/base/AppContainer"
import BaseComponent from "./layers/view/application/components/base/BaseComponent"
import ColorPalette from "./layers/view/application/components/colorpalette/ColorPalette"
import ConsoleCanvas from "./layers/view/application/components/consolecanvas/ConsoleCanvas"
import ContextMenu from "./layers/view/application/components/contextmenu/ContextMenu"
import DrawingCanvas from "./layers/view/application/components/drawingcanvas/DrawingCanvas"
import InvalidTagNameException from "./layers/view/application/components/exceptions/InvalidTagNameException"
import MenuBar from "./layers/view/application/components/menubar/MenuBar"
import ObjectManagerSelector from "./layers/view/application/components/objectmanagerselector/ObjectManagerSelector"
import HorizontalRuler from "./layers/view/application/components/rulers/horizontalruler/HorizontalRuler"
import VerticalRuler from "./layers/view/application/components/rulers/verticalruler/VerticalRuler"
import HorizontalScrollBar from "./layers/view/application/components/scrollbars/horizontalscrollbar/HorizontalScrollBar"
import VerticalScrollBar from "./layers/view/application/components/scrollbars/verticalscrollbar/VerticalScrollBar"
import DrawingToolBar from "./layers/view/application/components/sidebars/drawingtoolbar/DrawingToolBar"
import DrawingToolbarItem from "./layers/view/application/components/sidebars/drawingtoolbar/DrawingToolbarItem"
import LeftSideBar from "./layers/view/application/components/sidebars/leftsidebar/LeftSideBar"
import StatusBar from "./layers/view/application/components/statusbar/StatusBar"
import TabPane from "./layers/view/application/components/tabpane/TabPane"
import ToolBar from "./layers/view/application/components/toolbar/ToolBar"
import DumpElement from "./layers/view/common/DumpElement"
import DesignElement from "./layers/view/design/DesignElement"
import DesignElementSelectionWrapper from "./layers/view/design/DesignElementSelectionWrapper"
import LinkDesignElement from "./layers/view/design/designitem/LinkDesignElement"
import BottomElement from "./layers/view/design/designselectionwrapperitem/BottomElement"
import BottomLeftElement from "./layers/view/design/designselectionwrapperitem/BottomLeftElement"
import BottomRightElement from "./layers/view/design/designselectionwrapperitem/BottomRightElement"
import CenterElement from "./layers/view/design/designselectionwrapperitem/CenterItem"
import DesignSelectionWrapperItem from "./layers/view/design/designselectionwrapperitem/DesignSelectionWrapperItem"
import LeftElement from "./layers/view/design/designselectionwrapperitem/LeftElement"
import RightElement from "./layers/view/design/designselectionwrapperitem/RightElement"
import RotatorElement from "./layers/view/design/designselectionwrapperitem/RotatorElement"
import TopElement from "./layers/view/design/designselectionwrapperitem/TopElement"
import TopLeftElement from "./layers/view/design/designselectionwrapperitem/TopLeftElement"
import TopRightElement from "./layers/view/design/designselectionwrapperitem/TopRightElement"
import TranslatorElement from "./layers/view/design/designselectionwrapperitem/TranslatorElement"

export function register() {
    const CustomElements: typeof HTMLElement[] = [
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
        //BaseDesignComponent,
        LinkDesignElement,
        BottomElement,
        BottomLeftElement,
        BottomRightElement,
        CenterElement,
        DesignSelectionWrapperItem,
        LeftElement,
        RightElement,
        RotatorElement,
        TopElement,
        TopLeftElement,
        TopRightElement,
        TranslatorElement,
    ]
    
    for(const customElement of CustomElements) {
        registerElement(customElement)
    
    }
}

export function registerElement (element: typeof HTMLElement): typeof BaseComponent | typeof HTMLElement {
    if (!element) {
      throw new InvalidTagNameException()
    }
    let tagName = snakeCase(element.name)
    try {
      customElements.define(tagName, element)
    } catch (error: any) {
      console.warn(error.message)
    }
    return element
  }
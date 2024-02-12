import DesignElementSelectionWrapper from "../../../../design/DesignElementSelectionWrapper"
import ParserContainer from "../../ParserContainer"
import ActionBar from "../../actionbar/ActionBar"
import ColorPalette from "../../colorpalette/ColorPalette"
import ConsoleCanvas from "../../consolecanvas/ConsoleCanvas"
import ContextMenu from "../../contextmenu/ContextMenu"
import DrawingCanvas from "../../drawingcanvas/DrawingCanvas"
import MenuBar from "../../menubar/MenuBar"
import HorizontalRuler from "../../rulers/horizontalruler/HorizontalRuler"
import VerticalRuler from "../../rulers/verticalruler/VerticalRuler"
import HorizontalScrollBar from "../../scrollbars/horizontalscrollbar/HorizontalScrollBar"
import VerticalScrollBar from "../../scrollbars/verticalscrollbar/VerticalScrollBar"
import DrawingToolBar from "../../sidebars/drawingtoolbar/DrawingToolBar"
import LeftSideBar from "../../sidebars/leftsidebar/LeftSideBar"
import StatusBar from "../../statusbar/StatusBar"
import TabPane from "../../tabpane/TabPane"
import ToolBar from "../../toolbar/ToolBar"

interface IAppContainer {
    getMenuBar(): IMenuBar
    getToolBar(): IToolBar
    getActionBar(): IActionBar
    getHorizontalRuler(): IHorizontalRuler
    getVerticalRuler(): IVerticalRuler
    getDrawingToolBar(): IDrawingToolBar
    getDrawingCanvas(): IDrawingCanvas
    getColorPalette(): IColorPalette
    getVerticalScrollBar(): IVerticalScrollBar
    getHorizontalScrollBar(): IHorizontalScrollBar
    getStatusBar(): IStatusBar
    getConsoleCanvas(): IConsoleCanvas
    getLeftSideBar(): ILeftSideBar
    getParserContainer(): IParserContainer
    getTabPane(): ITabPane
    getDesignElementSelectionWrapper(): IDesignElementSelectionWrapper
    getContextMenu(): IContextMenu
}

export default IAppContainer
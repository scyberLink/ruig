import IDesignElementSelectionWrapper from "../../../../design/models/IDesignElementSelectionWrapper"
import IActionBar from "./IActionBar"
import IColorPalette from "./IColorPalette"
import IConsoleCanvas from "./IConsoleCanvas"
import IContextMenu from "./IContextMenu"
import IDrawingCanvas from "./IDrawingCanvas"
import IDrawingToolBar from "./IDrawingToolBar"
import IHorizontalRuler from "./IHorizontalRuler"
import IHorizontalScrollBar from "./IHorizontalScrollBar"
import ILeftSideBar from "./ILeftSideBar"
import IMenuBar from "./IMenuBar"
import IParserContainer from "./IParserContainer"
import IStatusBar from "./IStatusBar"
import ITabPane from "./ITabPane"
import IToolBar from "./IToolBar"
import IVerticalRuler from "./IVerticalRuler"
import IVerticalScrollBar from "./IVerticalScrollBar"


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
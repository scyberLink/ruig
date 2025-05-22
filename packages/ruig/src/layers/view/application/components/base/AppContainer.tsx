/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-duplicate-enum-values */
import { ActionBar } from '../actionbar/ActionBar'
import { ColorPalette } from '../colorpalette/ColorPalette'
import { DrawingCanvas } from '../drawingcanvas/DrawingCanvas'
import { DrawingToolBar } from '../sidebars/drawingtoolbar/DrawingToolBar'
import { HorizontalRuler } from '../rulers/horizontalruler/HorizontalRuler'
import { HorizontalScrollBar } from '../scrollbars/horizontalscrollbar/HorizontalScrollBar'
import { MenuBar } from '../menubar/MenuBar'
import { StatusBar } from '../statusbar/StatusBar'
import { ToolBar } from '../toolbar/ToolBar'
import { VerticalRuler } from '../rulers/verticalruler/VerticalRuler'
import { VerticalScrollBar } from '../scrollbars/verticalscrollbar/VerticalScrollBar'
import { ConsoleCanvas } from '../consolecanvas/ConsoleCanvas'
import { LeftSideBar } from '../sidebars/leftsidebar/LeftSideBar'
import { TabPane } from '../tabpane/TabPane'
import { ParserContainer } from '../ParserContainer'
import { ContextMenu } from '../contextmenu/ContextMenu'
import { ObjectManagerSelector } from '../objectmanagerselector/ObjectManagerSelector'
import { MouseMovement } from '../MouseMovement'
import { Notification } from '../NotificationManager'

enum Dimension {
  top = '0',
  bottom = '0',
  fullWidth = '100%',
  fullHeight = '100%',
  halfWidth = '50%',
  halfHeight = '50%',

  menubarHeight = '20px',
  toolBarHeight = '30px',

  actionBarHeight = '29px',
  actionBarTop = '50px',

  horizontalRulerHeight = '10px',
  horizontalRulerTop = '80px',
  horizontalRulerLeft = '30px',

  drawingToolBarWidth = '20px',
  drawingToolBarTop = '80px',
  drawingToolBarLeft = '0',

  verticalRulerWidth = '10px',
  verticalRulerLeft = '20px',
  verticalRulerTop = '90px',

  drawingCanvasWidth = '100%',
  drawingCanvasHeight = '100%',
  drawingCanvasLeft = '30px', //verticalRulerLeft + verticalRulerWidth
  drawingCanvasTop = '90px',
  drawingCanvasBottom = '20px',
  drawingCanvasRight = '20px',

  colorPaletteWidth = '20px',
  colorPaletteHeight = '100%',
  colorPaletteRight = '0',
  colorPaletteTop = '80px',

  objectManagerSelectorWidth = '20px',
  objectManagerSelectorHeight = '20px',
  objectManagerSelectorRight = '0',
  objectManagerSelectorBottom = '20px',

  statusBarWidth = '100%',
  statusBarHeight = '20px',
  statusBarBottom = '0',
}

/* class AppContainerManager extends BaseComponent implements IAppContainer {
  private menuBar: MenuBar = new MenuBar(
    {
      width: Dimension.fullWidth,
      height: Dimension.menubarHeight,
      top: Dimension.top,
    },
    ShadowMode.OPEN,
  )

  private toolBar: BaseComponent = new ToolBar({
    width: Dimension.fullWidth,
    height: Dimension.toolBarHeight,
    top: Dimension.menubarHeight,
  }) as BaseComponent

  private actionBar: BaseComponent = new ActionBar({
    width: Dimension.fullWidth,
    height: Dimension.actionBarHeight,
    top: Dimension.actionBarTop,
  }) as BaseComponent

  private horizontalRuler: BaseComponent = new HorizontalRuler({
    width: Dimension.fullWidth,
    height: Dimension.horizontalRulerHeight,
    top: Dimension.horizontalRulerTop,
    left: Dimension.horizontalRulerLeft,
  }) as BaseComponent

  private verticalRuler: BaseComponent = new VerticalRuler({
    width: Dimension.verticalRulerWidth,
    top: Dimension.verticalRulerTop,
    height: Dimension.fullHeight,
    left: Dimension.verticalRulerLeft,
  }) as BaseComponent

  private drawingToolBar: BaseComponent = new DrawingToolBar({
    width: Dimension.drawingToolBarWidth,
    top: Dimension.drawingToolBarTop,
    height: Dimension.fullHeight,
    left: Dimension.drawingToolBarLeft,
  }) as BaseComponent

  private drawingCanvas: IDrawingCanvas = new DrawingCanvas({
    left: Dimension.drawingCanvasLeft,
    top: Dimension.drawingCanvasTop,
    bottom: Dimension.drawingCanvasBottom,
    right: Dimension.drawingCanvasRight,
    overflow: 'auto',
  }) as IDrawingCanvas

  private colorPalette: BaseComponent = new ColorPalette({
    width: Dimension.colorPaletteWidth,
    height: Dimension.colorPaletteHeight,
    right: Dimension.colorPaletteRight,
    top: Dimension.colorPaletteTop,
  }) as BaseComponent

   private objectManagerSelector: BaseComponent = new ObjectManagerSelector({
     width: Dimension.objectManagerSelectorWidth,
     height: Dimension.objectManagerSelectorHeight,
     right: Dimension.objectManagerSelectorRight,
     bottom: Dimension.objectManagerSelectorBottom,
   })  as BaseComponent

  private verticalScrollBar: BaseComponent = new VerticalScrollBar() as BaseComponent
  private horizontalScrollBar: BaseComponent = new HorizontalScrollBar() as BaseComponent

  private statusBar: BaseComponent = new StatusBar({
    width: Dimension.statusBarWidth,
    height: Dimension.statusBarHeight,
    bottom: Dimension.statusBarBottom,
  }) as BaseComponent

  private consolecanvas: BaseComponent = new ConsoleCanvas({
    width: '100%',
    height: '200px',
    bottom: 0,
    display: 'none',
  }) as BaseComponent

  private leftSideBar: BaseComponent = new LeftSideBar() as BaseComponent
  private parserContainer: IParserContainer = new ParserContainer()
  private tabPane: BaseComponent = new TabPane() as BaseComponent
  private mouseMovement: IMouseMovement = new MouseMovementManager()
  private notificationManager: BaseComponent = new NotificationManager()

  private designElementWrapper: IDesignElementSelectWrapper =
    new DesignElementSelectionWrapper() as IDesignElementSelectWrapper

  private contextMenu: BaseComponent = new ContextMenu()

  REI = {
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
    getContextMenu,
    getDrawingCanvas,
    getParserContainer,
    getREI,
    getExtensionPool,
    showContextContent,
  }
  lastClientX!: number
  lastClientY!: number

  constructor() {
    super()

       spreadTo(this.designElementWrapper.style, {
         display: 'flex',
         position: 'absolute',
         top: '0',
         left: '0',
         bottom: '0',
         right: '0',
         border: '1px solid blue',
       })

    SharedConfig.set(DESIGN_ELEMENT_WRAPPER, this.designElementWrapper)
    SharedConfig.set(CONTEXT_MENU, this.contextMenu)
    SharedConfig.set(DRAWING_CANVAS, this.drawingCanvas)

    this.appendChildren(
      this.menuBar,
      this.toolBar,
      this.actionBar,
      this.tabPane,
      this.horizontalRuler,
      this.drawingToolBar,
      this.verticalRuler,
      this.drawingCanvas,
      this.colorPalette,
      this.objectManagerSelector,
      this.verticalScrollBar,
      this.horizontalScrollBar,
      this.statusBar,
      this.consolecanvas,
      this.leftSideBar,
      this.parserContainer,
      this.mouseMovement as any,
      this.contextMenu,
      this.notificationManager,
    )
    this.menuBar.disabled = true

    this.setCursor('default')
    SharedConfig.set(HTML_PARSER, this.parserContainer)
    SharedConfig.set(MOUSE_MOVEMENT_ELEMENT, this.mouseMovement)
    SharedConfig.set(RUIG_EXTENSION_INTERFACE, this.REI)
    const extensionPool = new ExtensionPool(this as unknown as IAppContainer, true)
    SharedConfig.set(EXTENSION_POOL, extensionPool)

    window.addEventListener(
      'wheel',
      (event: WheelEvent) => {
        if (event.ctrlKey) {
          event.preventDefault()
          event.stopPropagation()

          const delta = event.deltaY
          const zoomFactor = 0.02 // Adjust for zoom sensitivity

          // Get current scale (assuming it's stored in this.style.transform)
          const currentScale =
            parseFloat(this.drawingCanvas.style.transform?.replace('scale(', '').replace(')', '')) || 1

          // Calculate new scale based on delta
          let newScale = currentScale + (delta > 0 ? -zoomFactor : zoomFactor)

          // Ensure minimum zoom (optional)
          newScale = Math.max(0.1, newScale) // Adjust minimum zoom as needed

          const x2 = event.clientX
          const y2 = event.clientY

          const canvasRect = this.drawingCanvas.getBoundingClientRect()
          const x1 = canvasRect.left
          const y1 = canvasRect.top

          const xb = x2 - x1
          const yb = y2 - y1

          const x = xb
          const y = yb

          this.drawingCanvas.origin = {
            x,
            y,
          }
          this.drawingCanvas.scale = newScale
        }
      },
      { passive: false },
    )
  }

  getMenuBar() {
    return this.menuBar
  }
  getToolBar() {
    return this.toolBar
  }
  getActionBar() {
    return this.actionBar
  }
  getHorizontalRuler() {
    return this.horizontalRuler
  }
  getVerticalRuler() {
    return this.verticalRuler
  }
  getDrawingToolBar() {
    return this.drawingToolBar
  }
  getDrawingCanvas() {
    return this.drawingCanvas
  }
  getColorPalette() {
    return this.colorPalette
  }
  getVerticalScrollBar() {
    return this.verticalScrollBar
  }
  getHorizontalScrollBar() {
    return this.horizontalScrollBar
  }
  getStatusBar() {
    return this.statusBar
  }
  getConsoleCanvas() {
    return this.consolecanvas
  }
  getLeftSideBar() {
    return this.leftSideBar
  }
  getParserContainer() {
    return this.parserContainer
  }
  getMouseMovement() {
    return this.mouseMovement
  }
  getTabPane() {
    return this.tabPane
  }
  getDesignElementSelectionWrapper() {
    return this.designElementWrapper
  }
  getContextMenu() {
    return this.contextMenu
  }
} */

const styles = {
  menuBar: {
    width: Dimension.fullWidth,
    minHeight: Dimension.menubarHeight,
    top: Dimension.top,
  },

  toolBar: {
    width: Dimension.fullWidth,
    height: Dimension.toolBarHeight,
    top: Dimension.menubarHeight,
  },

  actionBar: {
    width: Dimension.fullWidth,
    height: Dimension.actionBarHeight,
    top: Dimension.actionBarTop,
  },

  horizontalRuler: {
    width: Dimension.fullWidth,
    height: Dimension.horizontalRulerHeight,
    top: Dimension.horizontalRulerTop,
    left: Dimension.horizontalRulerLeft,
  },

  verticalRuler: {
    width: Dimension.verticalRulerWidth,
    top: Dimension.verticalRulerTop,
    height: Dimension.fullHeight,
    left: Dimension.verticalRulerLeft,
  },

  drawingToolBar: {
    width: Dimension.drawingToolBarWidth,
    top: Dimension.drawingToolBarTop,
    height: Dimension.fullHeight,
    left: Dimension.drawingToolBarLeft,
  },

  drawingCanvas: {
    width: Dimension.fullHeight,
    height: Dimension.fullWidth,
    overflow: 'auto',
  },

  colorPalette: {
    width: Dimension.colorPaletteWidth,
    height: Dimension.colorPaletteHeight,
    right: Dimension.colorPaletteRight,
    top: Dimension.colorPaletteTop,
  },

  objectManagerSelector: {
    width: Dimension.objectManagerSelectorWidth,
    height: Dimension.objectManagerSelectorHeight,
    right: Dimension.objectManagerSelectorRight,
    bottom: Dimension.objectManagerSelectorBottom,
  },

  verticalScrollBar: { width: '10px' },
  horizontalScrollBar: { height: '10px' },

  statusBar: {
    width: Dimension.statusBarWidth,
    height: Dimension.statusBarHeight,
    bottom: Dimension.statusBarBottom,
  },

  consolecanvas: {
    width: '100%',
    height: '200px',
    bottom: 0,
    display: 'none',
  },

  leftSideBar: {
    width: '20px',
  },
  parserContainer: {},
  tabPane: {
    minHeight: Dimension.menubarHeight,
    minWidth: Dimension.fullWidth,
  },
  mouseMovement: {},
  notificationManager: {},

  designElementWrapper: {},

  contextMenu: {},
}

import Reblend, { ReblendTyping } from 'reblendjs'
import { Color } from '../../common/Color'

async function AppContainer({ style }: { style: ReblendTyping.CSSProperties }) {
  return (
    <>
      
      <div
        style={{
          background: Color.lightAsh,
          border: `5px solid ${Color.ash}`,
          color: Color.black,
          //width: 'fit-content',
          flexDirection: 'column' as any,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          alignContent: 'center',
          height: '98vh',
          width: '98vw',
          margin: '5px',
          ...style,
        }}
      >
        <div style={` display: flex; flex-direction: column; height: 100%; width: 100%;`}>
          <div style={`display: flex; flex-direction: column; `}>
            <MenuBar style={styles.menuBar} />
            <ToolBar style={styles.toolBar} />
            <ActionBar style={styles.actionBar} />
            <TabPane style={styles.tabPane} />
            <HorizontalRuler style={styles.horizontalRuler} />
          </div>

          <div style={`display: flex; flex-direction: row; height: 100%; width: 100%;`}>
            <DrawingToolBar style={styles.drawingToolBar} />
            <VerticalRuler style={styles.verticalRuler} />
            <DrawingCanvas style={styles.drawingCanvas} />
            <VerticalScrollBar style={styles.verticalScrollBar} />
            <ColorPalette style={styles.colorPalette} />
            <ObjectManagerSelector style={styles.objectManagerSelector} />
            <LeftSideBar style={styles.leftSideBar} />
          </div>

          <div style={` display: flex; flex-direction: column; width: 100%;`}>
            <HorizontalScrollBar style={styles.horizontalScrollBar} />
            <ConsoleCanvas style={styles.consolecanvas} />
            <StatusBar style={styles.statusBar} />
          </div>
        </div>

        <MouseMovement style={styles.mouseMovement} />
        <ParserContainer style={styles.parserContainer} />
        <Notification style={styles.notificationManager} />
        <ContextMenu style={styles.contextMenu} />
      </div>
    </>
  )
}

export { /* AppContainerManager, */ AppContainer }

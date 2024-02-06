import { Console } from "console";
import ActionBar from "../actionbar/ActionBar";
import BaseComponent from "./BaseComponent";
import ColorPalette from "../colorpalette/ColorPalette";
import DrawingCanvas from "../drawingcanvas/DrawingCanvas";
import DrawingToolBar from "../sidebars/drawingtoolbar/DrawingToolBar";
import HorizontalRuler from "../rulers/horizontalruler/HorizontalRuler";
import HorizontalScrollBar from "../scrollbars/horizontalscrollbar/HorizontalScrollBar";
import MenuBar from "../menubar/MenuBar";
import ObjectManagerSelector from "../objectmanagerselector/ObjectManagerSelector";
import StatusBar from "../statusbar/StatusBar";
import ToolBar from "../toolbar/ToolBar";
import VerticalRuler from "../rulers/verticalruler/VerticalRuler";
import VerticalScrollBar from "../scrollbars/verticalscrollbar/VerticalScrollBar";
import ConsoleCanvas from "../consolecanvas/ConsoleCanvas";
import LeftSideBar from "../sidebars/leftsidebar/LeftSideBar";
import TabPane from "../tabpane/TabPane";
import ParserContainer from "../ParserContainer";
import { appendChildren, spreadTo } from "../../../../../common/utils";
import DesignElementSelectionWrapper from "../../../design/DesignElementSelectionWrapper";
import ContextMenu from "../contextmenu/ContextMenu";
import SharedConfig from "../../../../../common/SharedConfig";
import { DESIGN_ELEMENT_WRAPPER, CONTEXT_MENU, DRAWING_CANVAS } from "../../../../../common/constants";
import ShadowMode from "../../common/ShadowMode";

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

class AppContainer extends BaseComponent {

  private menuBar: BaseComponent = new MenuBar({
    width: Dimension.fullWidth,
    height: Dimension.menubarHeight,
    top: Dimension.top
  }, ShadowMode.OPEN) as BaseComponent

  private toolBar: BaseComponent = new ToolBar({
    width: Dimension.fullWidth,
    height: Dimension.toolBarHeight,
    top: Dimension.menubarHeight
  }) as BaseComponent

  private actionBar: BaseComponent = new ActionBar({
    width: Dimension.fullWidth,
    height: Dimension.actionBarHeight,
    top: Dimension.actionBarTop
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

  private drawingCanvas: BaseComponent = new DrawingCanvas({
    left: Dimension.drawingCanvasLeft,
    top: Dimension.drawingCanvasTop,
    bottom: Dimension.drawingCanvasBottom,
    right: Dimension.drawingCanvasRight,
    overflow: 'auto',
  }) as BaseComponent

  private colorPalette: BaseComponent = new ColorPalette({
    width: Dimension.colorPaletteWidth,
    height: Dimension.colorPaletteHeight,
    right: Dimension.colorPaletteRight,
    top: Dimension.colorPaletteTop,
  }) as BaseComponent

  /*  private objectManagerSelector: BaseComponent = new ObjectManagerSelector({
     width: Dimension.objectManagerSelectorWidth,
     height: Dimension.objectManagerSelectorHeight,
     right: Dimension.objectManagerSelectorRight,
     bottom: Dimension.objectManagerSelectorBottom,
   })  as BaseComponent*/

  private verticalScrollBar: BaseComponent = new VerticalScrollBar as BaseComponent
  private horizontalScrollBar: BaseComponent = new HorizontalScrollBar as BaseComponent

  private statusBar: BaseComponent = new StatusBar({
    width: Dimension.statusBarWidth,
    height: Dimension.statusBarHeight,
    bottom: Dimension.statusBarBottom,
  }) as BaseComponent

  private consolecanvas: BaseComponent = new ConsoleCanvas({
    width: '100%',
    height: '200px',
    bottom: 0,
    display: 'none'
  }) as BaseComponent

  private leftSideBar: BaseComponent = new LeftSideBar as BaseComponent
  private parserContainer: BaseComponent = new ParserContainer as BaseComponent
  private tabPane: BaseComponent = new TabPane as BaseComponent

  private designElementWrapper: BaseComponent = new DesignElementSelectionWrapper as BaseComponent

  contextMenu: BaseComponent = new ContextMenu({
    position: 'absolute',
    bottom: '0',
    display: 'flex',
    borderRadius: '10px',
    border: '0.5px solid gray',
  }) as BaseComponent

  constructor() {
    super({}, ShadowMode.OPEN);

    /*    spreadTo(this.designElementWrapper.style, {
         display: 'flex',
         position: 'absolute',
         top: '0',
         left: '0',
         bottom: '0',
         right: '0',
         border: '1px solid blue',
       }) */

    SharedConfig.set(DESIGN_ELEMENT_WRAPPER, this.designElementWrapper)
    SharedConfig.set(CONTEXT_MENU, this.contextMenu)
    SharedConfig.set(DRAWING_CANVAS, this.drawingCanvas)

    appendChildren(this,
      this.menuBar,
      this.toolBar,
      this.actionBar,
      this.tabPane,
      this.horizontalRuler,
      this.drawingToolBar,
      this.verticalRuler,
      this.drawingCanvas,
      this.colorPalette,
      //this.objectManagerSelector,
      this.verticalScrollBar,
      this.horizontalScrollBar,
      this.statusBar,
      this.consolecanvas,
      this.leftSideBar,
      this.parserContainer,
    );
    this.menuBar.disabled = true;
  }

  onwheel = (event: any) => {
    // Check if Ctrl key is pressed
    if (event.ctrlKey) {
      event.preventDefault();

      // Calculate the new scale factor based on the wheel delta

      const delta = event.deltaY;
      const zoomFactor = 0.02; // You can adjust this value based on your zoom sensitivity
      const currentScale = parseFloat(this.drawingCanvas.style.transform.replace('scale(', '').replace(')', '')) || 1;
      let scale;
      if (delta < 0) {
        scale = currentScale + zoomFactor
      } else {
        scale = currentScale - zoomFactor
      }

      // Set the new scale factor
      this.drawingCanvas.style.transform = `scale(${scale})`;
    };
  }
}

export default BaseComponent.register(AppContainer);
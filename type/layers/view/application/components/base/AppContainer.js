/* eslint-disable @typescript-eslint/no-duplicate-enum-values */
import ActionBar from '../actionbar/ActionBar';
import BaseComponent from './BaseComponent';
import ColorPalette from '../colorpalette/ColorPalette';
import DrawingCanvas from '../drawingcanvas/DrawingCanvas';
import DrawingToolBar from '../sidebars/drawingtoolbar/DrawingToolBar';
import HorizontalRuler from '../rulers/horizontalruler/HorizontalRuler';
import HorizontalScrollBar from '../scrollbars/horizontalscrollbar/HorizontalScrollBar';
import MenuBar from '../menubar/MenuBar';
//import ObjectManagerSelector from '../objectmanagerselector/ObjectManagerSelector'
import StatusBar from '../statusbar/StatusBar';
import ToolBar from '../toolbar/ToolBar';
import VerticalRuler from '../rulers/verticalruler/VerticalRuler';
import VerticalScrollBar from '../scrollbars/verticalscrollbar/VerticalScrollBar';
import ConsoleCanvas from '../consolecanvas/ConsoleCanvas';
import LeftSideBar from '../sidebars/leftsidebar/LeftSideBar';
import TabPane from '../tabpane/TabPane';
import ParserContainer from '../ParserContainer';
import ContextMenu from '../contextmenu/ContextMenu';
import SharedConfig from '../../../../../common/SharedConfig';
import { CONTEXT_MENU, DRAWING_CANVAS, ACTIVE_ELEMENT } from '../../../../../common/constants';
import ShadowMode from '../../common/ShadowMode';
var Dimension;
(function (Dimension) {
    Dimension["top"] = "0";
    Dimension["bottom"] = "0";
    Dimension["fullWidth"] = "100%";
    Dimension["fullHeight"] = "100%";
    Dimension["halfWidth"] = "50%";
    Dimension["halfHeight"] = "50%";
    Dimension["menubarHeight"] = "20px";
    Dimension["toolBarHeight"] = "30px";
    Dimension["actionBarHeight"] = "29px";
    Dimension["actionBarTop"] = "50px";
    Dimension["horizontalRulerHeight"] = "10px";
    Dimension["horizontalRulerTop"] = "80px";
    Dimension["horizontalRulerLeft"] = "30px";
    Dimension["drawingToolBarWidth"] = "20px";
    Dimension["drawingToolBarTop"] = "80px";
    Dimension["drawingToolBarLeft"] = "0";
    Dimension["verticalRulerWidth"] = "10px";
    Dimension["verticalRulerLeft"] = "20px";
    Dimension["verticalRulerTop"] = "90px";
    Dimension["drawingCanvasWidth"] = "100%";
    Dimension["drawingCanvasHeight"] = "100%";
    Dimension["drawingCanvasLeft"] = "30px";
    Dimension["drawingCanvasTop"] = "90px";
    Dimension["drawingCanvasBottom"] = "20px";
    Dimension["drawingCanvasRight"] = "20px";
    Dimension["colorPaletteWidth"] = "20px";
    Dimension["colorPaletteHeight"] = "100%";
    Dimension["colorPaletteRight"] = "0";
    Dimension["colorPaletteTop"] = "80px";
    Dimension["objectManagerSelectorWidth"] = "20px";
    Dimension["objectManagerSelectorHeight"] = "20px";
    Dimension["objectManagerSelectorRight"] = "0";
    Dimension["objectManagerSelectorBottom"] = "20px";
    Dimension["statusBarWidth"] = "100%";
    Dimension["statusBarHeight"] = "20px";
    Dimension["statusBarBottom"] = "0";
})(Dimension || (Dimension = {}));
class AppContainer extends BaseComponent {
    constructor() {
        super();
        this.menuBar = new MenuBar({
            width: Dimension.fullWidth,
            height: Dimension.menubarHeight,
            top: Dimension.top,
        }, ShadowMode.OPEN);
        this.toolBar = new ToolBar({
            width: Dimension.fullWidth,
            height: Dimension.toolBarHeight,
            top: Dimension.menubarHeight,
        });
        this.actionBar = new ActionBar({
            width: Dimension.fullWidth,
            height: Dimension.actionBarHeight,
            top: Dimension.actionBarTop,
        });
        this.horizontalRuler = new HorizontalRuler({
            width: Dimension.fullWidth,
            height: Dimension.horizontalRulerHeight,
            top: Dimension.horizontalRulerTop,
            left: Dimension.horizontalRulerLeft,
        });
        this.verticalRuler = new VerticalRuler({
            width: Dimension.verticalRulerWidth,
            top: Dimension.verticalRulerTop,
            height: Dimension.fullHeight,
            left: Dimension.verticalRulerLeft,
        });
        this.drawingToolBar = new DrawingToolBar({
            width: Dimension.drawingToolBarWidth,
            top: Dimension.drawingToolBarTop,
            height: Dimension.fullHeight,
            left: Dimension.drawingToolBarLeft,
        });
        this.drawingCanvas = new DrawingCanvas({
            left: Dimension.drawingCanvasLeft,
            top: Dimension.drawingCanvasTop,
            bottom: Dimension.drawingCanvasBottom,
            right: Dimension.drawingCanvasRight,
            overflow: 'auto',
        });
        this.colorPalette = new ColorPalette({
            width: Dimension.colorPaletteWidth,
            height: Dimension.colorPaletteHeight,
            right: Dimension.colorPaletteRight,
            top: Dimension.colorPaletteTop,
        });
        /*  private objectManagerSelector: BaseComponent = new ObjectManagerSelector({
           width: Dimension.objectManagerSelectorWidth,
           height: Dimension.objectManagerSelectorHeight,
           right: Dimension.objectManagerSelectorRight,
           bottom: Dimension.objectManagerSelectorBottom,
         })  as BaseComponent*/
        this.verticalScrollBar = new VerticalScrollBar();
        this.horizontalScrollBar = new HorizontalScrollBar();
        this.statusBar = new StatusBar({
            width: Dimension.statusBarWidth,
            height: Dimension.statusBarHeight,
            bottom: Dimension.statusBarBottom,
        });
        this.consolecanvas = new ConsoleCanvas({
            width: '100%',
            height: '200px',
            bottom: 0,
            display: 'none',
        });
        this.leftSideBar = new LeftSideBar();
        this.parserContainer = new ParserContainer();
        this.tabPane = new TabPane();
        /* private designElementWrapper: IDesignElementSelectWrapper =
          new DesignElementSelectionWrapper() as IDesignElementSelectWrapper
       */
        this.contextMenu = new ContextMenu({
            position: 'absolute',
            bottom: '0',
            display: 'flex',
            borderRadius: '10px',
            border: '0.5px solid gray',
        });
        /*    spreadTo(this.designElementWrapper.style, {
             display: 'flex',
             position: 'absolute',
             top: '0',
             left: '0',
             bottom: '0',
             right: '0',
             border: '1px solid blue',
           }) */
        //SharedConfig.set(DESIGN_ELEMENT_WRAPPER, this.designElementWrapper)
        SharedConfig.set(CONTEXT_MENU, this.contextMenu);
        SharedConfig.set(DRAWING_CANVAS, this.drawingCanvas);
        this.appendChildren(this.menuBar, this.toolBar, this.actionBar, this.tabPane, this.horizontalRuler, this.drawingToolBar, this.verticalRuler, this.drawingCanvas, this.colorPalette, 
        //this.objectManagerSelector,
        this.verticalScrollBar, this.horizontalScrollBar, this.statusBar, this.consolecanvas, this.leftSideBar, this.parserContainer);
        this.menuBar.disabled = true;
        window.onwheel = (event) => {
            // Check if Ctrl key is pressed
            if (event.ctrlKey) {
                //event.preventDefault();
                // Calculate the new scale factor based on the wheel delta
                const delta = event.deltaY;
                const zoomFactor = 0.02; // You can adjust this value based on your zoom sensitivity
                const currentScale = parseFloat(this.drawingCanvas.style.transform.replace('scale(', '').replace(')', '')) || 1;
                let scale;
                if (delta < 0) {
                    scale = currentScale + zoomFactor;
                }
                else {
                    scale = currentScale - zoomFactor;
                }
                // Set the new scale factor
                this.drawingCanvas.scale = scale;
            }
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        window.onkeydown = (e) => {
            e === null || e === void 0 ? void 0 : e.preventDefault();
            const element = SharedConfig.get(ACTIVE_ELEMENT);
            if (element && (e.key === 'Delete' || e.keyCode === 46) && element.isSelected) {
                element.deselect();
                element.remove();
            }
        };
        this.setCursor('default');
    }
    getMenuBar() {
        return this.menuBar;
    }
    getToolBar() {
        return this.toolBar;
    }
    getActionBar() {
        return this.actionBar;
    }
    getHorizontalRuler() {
        return this.horizontalRuler;
    }
    getVerticalRuler() {
        return this.verticalRuler;
    }
    getDrawingToolBar() {
        return this.drawingToolBar;
    }
    getDrawingCanvas() {
        return this.drawingCanvas;
    }
    getColorPalette() {
        return this.colorPalette;
    }
    getVerticalScrollBar() {
        return this.verticalScrollBar;
    }
    getHorizontalScrollBar() {
        return this.horizontalScrollBar;
    }
    getStatusBar() {
        return this.statusBar;
    }
    getConsoleCanvas() {
        return this.consolecanvas;
    }
    getLeftSideBar() {
        return this.leftSideBar;
    }
    getParserContainer() {
        return this.parserContainer;
    }
    getTabPane() {
        return this.tabPane;
    }
    /* getDesignElementSelectionWrapper() {
      return this.designElementWrapper
    } */
    getContextMenu() {
        return this.contextMenu;
    }
}
export default AppContainer;

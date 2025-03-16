/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-duplicate-enum-values */
import { ActionBar } from '../actionbar/ActionBar';
import { BaseComponent } from './BaseComponent';
import { ColorPalette } from '../colorpalette/ColorPalette';
import { DrawingCanvas } from '../drawingcanvas/DrawingCanvas';
import { DrawingToolBar } from '../sidebars/drawingtoolbar/DrawingToolBar';
import { HorizontalRuler } from '../rulers/horizontalruler/HorizontalRuler';
import { HorizontalScrollBar } from '../scrollbars/horizontalscrollbar/HorizontalScrollBar';
import { MenuBar } from '../menubar/MenuBar';
//import ObjectManagerSelector from '../objectmanagerselector/ObjectManagerSelector'
import { StatusBar } from '../statusbar/StatusBar';
import { ToolBar } from '../toolbar/ToolBar';
import { VerticalRuler } from '../rulers/verticalruler/VerticalRuler';
import { VerticalScrollBar } from '../scrollbars/verticalscrollbar/VerticalScrollBar';
import { ConsoleCanvas } from '../consolecanvas/ConsoleCanvas';
import { LeftSideBar } from '../sidebars/leftsidebar/LeftSideBar';
import { TabPane } from '../tabpane/TabPane';
import { ParserContainer } from '../ParserContainer';
import { ContextMenu } from '../contextmenu/ContextMenu';
import { SharedConfig } from '../../../../../common/SharedConfig';
import { CONTEXT_MENU, DRAWING_CANVAS, EXTENSION_POOL, HTML_PARSER, MOUSE_MOVEMENT_ELEMENT, RUIG_EXTENSION_INTERFACE, } from '../../../../../common/constants';
import { ShadowMode } from '../../common/ShadowMode';
import { ExtensionPool } from '../../../../../extension/ExtensionPool';
import { BaseExtension } from '../../../../../extension/BaseExtension';
import { ExtensionDevelopment } from '../../../../../extension/ExtensionDevelopment';
import { DrawingToolbarItem } from '../sidebars/drawingtoolbar/DrawingToolbarItem';
import { register, registerElement } from '../../../../../customElementRegistration';
import { ObjectManagerSelector } from '../objectmanagerselector/ObjectManagerSelector';
import { DesignElementTypes } from '../../../common/DesignElementTypes';
import { DesignElement } from '../../../design/base/DesignElement';
import { MouseMovement } from '../MouseMovement';
import { NotificationManager } from '../NotificationManager';
import { getContextMenu, getDrawingCanvas, getParserContainer, getREI, getExtensionPool, showContextContent, } from '../../../common/utils';
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
    menuBar = new MenuBar({
        width: Dimension.fullWidth,
        height: Dimension.menubarHeight,
        top: Dimension.top,
    }, ShadowMode.OPEN);
    toolBar = new ToolBar({
        width: Dimension.fullWidth,
        height: Dimension.toolBarHeight,
        top: Dimension.menubarHeight,
    });
    actionBar = new ActionBar({
        width: Dimension.fullWidth,
        height: Dimension.actionBarHeight,
        top: Dimension.actionBarTop,
    });
    horizontalRuler = new HorizontalRuler({
        width: Dimension.fullWidth,
        height: Dimension.horizontalRulerHeight,
        top: Dimension.horizontalRulerTop,
        left: Dimension.horizontalRulerLeft,
    });
    verticalRuler = new VerticalRuler({
        width: Dimension.verticalRulerWidth,
        top: Dimension.verticalRulerTop,
        height: Dimension.fullHeight,
        left: Dimension.verticalRulerLeft,
    });
    drawingToolBar = new DrawingToolBar({
        width: Dimension.drawingToolBarWidth,
        top: Dimension.drawingToolBarTop,
        height: Dimension.fullHeight,
        left: Dimension.drawingToolBarLeft,
    });
    drawingCanvas = new DrawingCanvas({
        left: Dimension.drawingCanvasLeft,
        top: Dimension.drawingCanvasTop,
        bottom: Dimension.drawingCanvasBottom,
        right: Dimension.drawingCanvasRight,
        overflow: 'auto',
    });
    colorPalette = new ColorPalette({
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
    verticalScrollBar = new VerticalScrollBar();
    horizontalScrollBar = new HorizontalScrollBar();
    statusBar = new StatusBar({
        width: Dimension.statusBarWidth,
        height: Dimension.statusBarHeight,
        bottom: Dimension.statusBarBottom,
    });
    consolecanvas = new ConsoleCanvas({
        width: '100%',
        height: '200px',
        bottom: 0,
        display: 'none',
    });
    leftSideBar = new LeftSideBar();
    parserContainer = new ParserContainer();
    tabPane = new TabPane();
    mouseMovement = new MouseMovement();
    notificationManager = new NotificationManager();
    /* private designElementWrapper: IDesignElementSelectWrapper =
      new DesignElementSelectionWrapper() as IDesignElementSelectWrapper
   */
    contextMenu = new ContextMenu();
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
    };
    lastClientX;
    lastClientY;
    constructor() {
        super();
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
        this.verticalScrollBar, this.horizontalScrollBar, this.statusBar, this.consolecanvas, this.leftSideBar, this.parserContainer, this.mouseMovement, this.contextMenu, this.notificationManager);
        this.menuBar.disabled = true;
        this.setCursor('default');
        SharedConfig.set(HTML_PARSER, this.parserContainer);
        SharedConfig.set(MOUSE_MOVEMENT_ELEMENT, this.mouseMovement);
        SharedConfig.set(RUIG_EXTENSION_INTERFACE, this.REI);
        const extensionPool = new ExtensionPool(this, true);
        SharedConfig.set(EXTENSION_POOL, extensionPool);
        window.addEventListener('wheel', (event) => {
            if (event.ctrlKey) {
                event.preventDefault();
                event.stopPropagation();
                const delta = event.deltaY;
                const zoomFactor = 0.02; // Adjust for zoom sensitivity
                // Get current scale (assuming it's stored in this.style.transform)
                const currentScale = parseFloat(this.drawingCanvas.style.transform?.replace('scale(', '').replace(')', '')) || 1;
                // Calculate new scale based on delta
                let newScale = currentScale + (delta > 0 ? -zoomFactor : zoomFactor);
                // Ensure minimum zoom (optional)
                newScale = Math.max(0.1, newScale); // Adjust minimum zoom as needed
                const x2 = event.clientX;
                const y2 = event.clientY;
                const canvasRect = this.drawingCanvas.getBoundingClientRect();
                const x1 = canvasRect.left;
                const y1 = canvasRect.top;
                const xb = x2 - x1;
                const yb = y2 - y1;
                const x = xb;
                const y = yb;
                this.drawingCanvas.origin = {
                    x,
                    y,
                };
                this.drawingCanvas.scale = newScale;
            }
        }, { passive: false });
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
    getMouseMovement() {
        return this.mouseMovement;
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
export { AppContainer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwQ29udGFpbmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQXBwQ29udGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHVEQUF1RDtBQUN2RCxnRUFBZ0U7QUFDaEUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHdCQUF3QixDQUFBO0FBQ2xELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQTtBQUMvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sOEJBQThCLENBQUE7QUFDM0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGdDQUFnQyxDQUFBO0FBQzlELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQTtBQUMxRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkNBQTJDLENBQUE7QUFDM0UsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sdURBQXVELENBQUE7QUFDM0YsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLG9CQUFvQixDQUFBO0FBQzVDLG9GQUFvRjtBQUNwRixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sd0JBQXdCLENBQUE7QUFDbEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLG9CQUFvQixDQUFBO0FBQzVDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQTtBQUNyRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxtREFBbUQsQ0FBQTtBQUNyRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sZ0NBQWdDLENBQUE7QUFDOUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHFDQUFxQyxDQUFBO0FBQ2pFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQTtBQUM1QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUE7QUFDcEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFBO0FBQ3hELE9BQU8sRUFBRSxZQUFZ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
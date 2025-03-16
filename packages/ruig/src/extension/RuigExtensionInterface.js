import { jsx as _jsx } from "react/jsx-runtime";
import { register, registerElement } from '../customElementRegistration';
import { BaseExtension } from './BaseExtension';
import { ExtensionDevelopment } from './ExtensionDevelopment';
import { DesignElementTypes } from '../layers/view/common/DesignElementTypes';
import { DesignElement } from '../layers/view/design/base/DesignElement';
import { ParserContainer } from '../layers/view/application/components/ParserContainer';
import { ActionBar } from '../layers/view/application/components/actionbar/ActionBar';
import { ColorPalette } from '../layers/view/application/components/colorpalette/ColorPalette';
import { ConsoleCanvas } from '../layers/view/application/components/consolecanvas/ConsoleCanvas';
import { ContextMenu } from '../layers/view/application/components/contextmenu/ContextMenu';
import { DrawingCanvas } from '../layers/view/application/components/drawingcanvas/DrawingCanvas';
import { MenuBar } from '../layers/view/application/components/menubar/MenuBar';
import { ObjectManagerSelector } from '../layers/view/application/components/objectmanagerselector/ObjectManagerSelector';
import { HorizontalRuler } from '../layers/view/application/components/rulers/horizontalruler/HorizontalRuler';
import { VerticalRuler } from '../layers/view/application/components/rulers/verticalruler/VerticalRuler';
import { HorizontalScrollBar } from '../layers/view/application/components/scrollbars/horizontalscrollbar/HorizontalScrollBar';
import { VerticalScrollBar } from '../layers/view/application/components/scrollbars/verticalscrollbar/VerticalScrollBar';
import { DrawingToolBar } from '../layers/view/application/components/sidebars/drawingtoolbar/DrawingToolBar';
import { DrawingToolbarItem } from '../layers/view/application/components/sidebars/drawingtoolbar/DrawingToolbarItem';
import { LeftSideBar } from '../layers/view/application/components/sidebars/leftsidebar/LeftSideBar';
import { StatusBar } from '../layers/view/application/components/statusbar/StatusBar';
import { TabPane } from '../layers/view/application/components/tabpane/TabPane';
import { ToolBar } from '../layers/view/application/components/toolbar/ToolBar';
import { AppContainer } from '../layers/view/application/components/base/AppContainer';
import { BaseComponent } from '../layers/view/application/components/base/BaseComponent';
import { App } from '../App';
import { initAppContainer } from '../init';
export { BaseComponent };
export * from '../layers/view/application/components/base/model';
export * as Endpoints from '../configs/RestEndpoints';
export * from '../common';
import ReactDOM from 'react-dom/client';
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
    start: ({ extensions }) => {
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(_jsx(App, { appContainer: initAppContainer(), extensions: extensions }));
    },
};
export { REI };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUnVpZ0V4dGVuc2lvbkludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlJ1aWdFeHRlbnNpb25JbnRlcmZhY2UudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBRSxNQUFNLDhCQUE4QixDQUFBO0FBQ3hFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQTtBQUMvQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQTtBQUM3RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQTtBQUM3RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMENBQTBDLENBQUE7QUFDeEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHVEQUF1RCxDQUFBO0FBQ3ZGLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwyREFBMkQsQ0FBQTtBQUNyRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUVBQWlFLENBQUE7QUFDOUYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1FQUFtRSxDQUFBO0FBQ2pHLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwrREFBK0QsQ0FBQTtBQUMzRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUVBQW1FLENBQUE7QUFDakcsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHVEQUF1RCxDQUFBO0FBQy9FLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG1GQUFtRixDQUFBO0FBQ3pILE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw4RUFBOEUsQ0FBQTtBQUM5RyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMEVBQTBFLENBQUE7QUFDeEcsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMEZBQTBGLENBQUE7QUFDOUgsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0ZBQXNGLENBQUE7QUFDeEgsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDhFQUE4RSxDQUFBO0FBQzdHLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtGQUFrRixDQUFBO0FBQ3JILE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3RUFBd0UsQ0FBQTtBQUNwRyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMkRBQTJELENBQUE7QUFDckYsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHVEQUF1RCxDQUFBO0FBQy9FLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSx1REFBdUQsQ0FBQTtBQUMvRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seURBQXlELENBQUE7QUFDdEYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDBEQUEwRCxDQUFBO0FBQ3hGLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxRQUFRLENBQUE7QUFDNUIsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sU0FBUyxDQUFBO0FBRzFDLE9BQU8sRUFBRSxhQUFhLEVBQUUsQ0FBQTtBQUV4QixjQUFjLGtEQUFrRCxDQUFBO0FBQ2hFLE9BQU8sS0FBSyxTQUFTLE1BQU0sMEJBQTBCLENBQUE7QUFDckQsY0FBYyxXQUFXLENBQUE7QUFHekIsT0FBTyxRQUFRLE1BQU0sa0JBQWtCLENBQUE7QUFFdkMsTUFBTSxHQUFHLEdBQUc7SUFDVixhQUFhO0lBQ2Isb0JBQW9CO0lBQ3BCLFNBQVM7SUFDVCxhQUFhO0lBQ2IsWUFBWTtJQUNaLGFBQWE7SUFDYixjQUFjO0lBQ2Qsa0JBQWtCO0lBQ2xCLGVBQWU7SUFDZixtQkFBbUI7SUFDbkIsT0FBTztJQUNQLHFCQUFxQjtJQUNyQixTQUFTO0lBQ1QsT0FBTztJQUNQLGFBQWE7SUFDYixpQkFBaUI7SUFDakIsYUFBYTtJQUNiLFdBQVc7SUFDWCxPQUFPO0lBQ1AsZUFBZTtJQUNmLFdBQVc7SUFDWCxRQUFRO0lBQ1IsZUFBZTtJQUNmLFlBQVk7SUFDWixhQUFhO0lBQ2Isa0JBQWtCO0lBQ2xCLEtBQUssRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFvQyxFQUFFLEVBQUU7UUFDMUQsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBZ0IsQ0FBQyxDQUFBO1FBQ2hGLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBQyxHQUFHLElBQUMsWUFBWSxFQUFFLGdCQUFnQixFQUFFLEVBQUUsVUFBVSxFQUFFLFVBQVUsR0FBSSxDQUFDLENBQUE7SUFDaEYsQ0FBQztDQUNGLENBQUE7QUFFRCxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUEifQ==
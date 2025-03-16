/* eslint-disable @typescript-eslint/no-explicit-any */
import { snakeCase } from './common/utils';
import { TextIcon } from './layers/view/application/common/TextIcon';
import { MouseMovement } from './layers/view/application/components/MouseMovement';
import { NotificationManager } from './layers/view/application/components/NotificationManager';
import { ParserContainer } from './layers/view/application/components/ParserContainer';
import { ActionBar } from './layers/view/application/components/actionbar/ActionBar';
import { AppContainer } from './layers/view/application/components/base/AppContainer';
import { BaseComponent } from './layers/view/application/components/base/BaseComponent';
import { ColorPalette } from './layers/view/application/components/colorpalette/ColorPalette';
import { ConsoleCanvas } from './layers/view/application/components/consolecanvas/ConsoleCanvas';
import { ContextContentContainer } from './layers/view/application/components/contextmenu/ContextContentContainer';
import { ContextItem } from './layers/view/application/components/contextmenu/ContextItem';
import { ContextItemGroup } from './layers/view/application/components/contextmenu/ContextItemGroup';
import { ContextMenu } from './layers/view/application/components/contextmenu/ContextMenu';
import { ContextSession } from './layers/view/application/components/contextmenu/ContextSession';
import { DrawingCanvas } from './layers/view/application/components/drawingcanvas/DrawingCanvas';
import { InvalidTagNameException } from './layers/view/application/components/exceptions/InvalidTagNameException';
import { MenuBar } from './layers/view/application/components/menubar/MenuBar';
import { MenuBarItem } from './layers/view/application/components/menubar/MenuBarItem';
import { ObjectManagerSelector } from './layers/view/application/components/objectmanagerselector/ObjectManagerSelector';
import { HorizontalRuler } from './layers/view/application/components/rulers/horizontalruler/HorizontalRuler';
import { VerticalRuler } from './layers/view/application/components/rulers/verticalruler/VerticalRuler';
import { HorizontalScrollBar } from './layers/view/application/components/scrollbars/horizontalscrollbar/HorizontalScrollBar';
import { VerticalScrollBar } from './layers/view/application/components/scrollbars/verticalscrollbar/VerticalScrollBar';
import { DrawingToolBar } from './layers/view/application/components/sidebars/drawingtoolbar/DrawingToolBar';
import { DrawingToolbarItem } from './layers/view/application/components/sidebars/drawingtoolbar/DrawingToolbarItem';
import { LeftSideBar } from './layers/view/application/components/sidebars/leftsidebar/LeftSideBar';
import { StatusBar } from './layers/view/application/components/statusbar/StatusBar';
import { TabPane } from './layers/view/application/components/tabpane/TabPane';
import { ToolBar } from './layers/view/application/components/toolbar/ToolBar';
import { DumpElement } from './layers/view/common/DumpElement';
import { DesignElement } from './layers/view/design/base/DesignElement';
export function register() {
    const CustomElements = {
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
        MouseMovement,
        ContextContentContainer,
        ContextSession,
        ContextItem,
        ContextItemGroup,
        NotificationManager,
        MenuBarItem,
    };
    for (const [name, customElement] of Object.entries(CustomElements)) {
        registerElement(name, customElement);
    }
}
export function registerElement(name, element) {
    if (!element) {
        throw new InvalidTagNameException();
    }
    const tagName = snakeCase(name);
    if (!customElements.get(tagName)) {
        try {
            customElements.define(tagName, element);
        }
        catch (error) {
            console.warn(error.message);
        }
    }
    return element;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tRWxlbWVudFJlZ2lzdHJhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImN1c3RvbUVsZW1lbnRSZWdpc3RyYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsdURBQXVEO0FBQ3ZELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQTtBQUMxQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sMkNBQTJDLENBQUE7QUFDcEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9EQUFvRCxDQUFBO0FBQ2xGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDBEQUEwRCxDQUFBO0FBQzlGLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzREFBc0QsQ0FBQTtBQUN0RixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMERBQTBELENBQUE7QUFDcEYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHdEQUF3RCxDQUFBO0FBQ3JGLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5REFBeUQsQ0FBQTtBQUN2RixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0VBQWdFLENBQUE7QUFDN0YsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtFQUFrRSxDQUFBO0FBQ2hHLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDBFQUEwRSxDQUFBO0FBQ2xILE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw4REFBOEQsQ0FBQTtBQUMxRixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtRUFBbUUsQ0FBQTtBQUNwRyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sOERBQThELENBQUE7QUFDMUYsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlFQUFpRSxDQUFBO0FBQ2hHLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrRUFBa0UsQ0FBQTtBQUNoRyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx5RUFBeUUsQ0FBQTtBQUNqSCxPQUFPLEVBQUUs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
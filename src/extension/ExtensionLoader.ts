import fetcher from '../common/SharedFetcher'
import IFetchData from '../common/models/IFetchData'
import { APPCONTAINER, EXTENSION_SCRIPT } from '../common/constants'
import { BUILTIN_EXTENSION, EXTENSION } from '../configs/RestEndpoints'
import IAppContainer from '../layers/view/application/components/base/model/IAppContainer'
import ExtensionId from './ExtensionId'
import BaseExtension from './BaseExtension'
import IExtension from './IExtension'
import { registerElement } from '../customElementRegistration'
import FileManagement from '../common/FileManagement'
import AppContainer from '../layers/view/application/components/base/AppContainer'
import BaseComponent from '../layers/view/application/components/base/BaseComponent'
import ParserContainer from '../layers/view/application/components/ParserContainer'
import ActionBar from '../layers/view/application/components/actionbar/ActionBar'
import ColorPalette from '../layers/view/application/components/colorpalette/ColorPalette'
import ConsoleCanvas from '../layers/view/application/components/consolecanvas/ConsoleCanvas'
import ContextMenu from '../layers/view/application/components/contextmenu/ContextMenu'
import DrawingCanvas from '../layers/view/application/components/drawingcanvas/DrawingCanvas'
import MenuBar from '../layers/view/application/components/menubar/MenuBar'
import ObjectManagerSelector from '../layers/view/application/components/objectmanagerselector/ObjectManagerSelector'
import HorizontalRuler from '../layers/view/application/components/rulers/horizontalruler/HorizontalRuler'
import VerticalRuler from '../layers/view/application/components/rulers/verticalruler/VerticalRuler'
import HorizontalScrollBar from '../layers/view/application/components/scrollbars/horizontalscrollbar/HorizontalScrollBar'
import VerticalScrollBar from '../layers/view/application/components/scrollbars/verticalscrollbar/VerticalScrollBar'
import DrawingToolBar from '../layers/view/application/components/sidebars/drawingtoolbar/DrawingToolBar'
import DrawingToolbarItem from '../layers/view/application/components/sidebars/drawingtoolbar/DrawingToolbarItem'
import LeftSideBar from '../layers/view/application/components/sidebars/leftsidebar/LeftSideBar'
import StatusBar from '../layers/view/application/components/statusbar/StatusBar'
import TabPane from '../layers/view/application/components/tabpane/TabPane'
import ToolBar from '../layers/view/application/components/toolbar/ToolBar'

class ExtensionLoader {
  private extensionFileManager = new FileManagement()

  async load(extension: IExtension, appContainer: IAppContainer): Promise<BaseExtension> {
    await this.extensionFileManager.open()
    const { fileContent: code } = (await this.extensionFileManager.getFile(
      `${extension.id}/extension.min.ruigem`,
      'metas',
    )) || {
      fileContent: null,
    }
    if (!code) {
      console.error(`Could not load extension: ${extension.id}`)
    }
    return this.executor(code, appContainer)
  }

  async getExtension(id: string, builtin = false): Promise<IExtension | null> {
    const extId = new ExtensionId(id)
    const res: IFetchData = (await fetcher.fetch(`${builtin ? BUILTIN_EXTENSION : EXTENSION}${extId.id}`)) as IFetchData

    if (!res || !res.data || !res.data.status) {
      return null
    }

    return res.data[EXTENSION_SCRIPT]
  }

  private executor(code: string, appContainer: IAppContainer): BaseExtension {
    const fn = new Function(
      APPCONTAINER,
      'BaseExtension',
      'AppContainer',
      'ActionBar',
      'BaseComponent',
      'ColorPalette',
      'DrawingCanvas',
      'DrawingToolBar',
      'DrawingToolbarItem',
      'HorizontalRuler',
      'HorizontalScrollBar',
      'MenuBar',
      'ObjectManagerSelector',
      'StatusBar',
      'ToolBar',
      'VerticalRuler',
      'VerticalScrollBar',
      'ConsoleCanvas',
      'LeftSideBar',
      'TabPane',
      'ParserContainer',
      'ContextMenu',
      'registerElement',
      code,
    )
    return fn(
      appContainer,
      BaseExtension,
      AppContainer,
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
      registerElement,
    )
  }
}

export default ExtensionLoader

import { fetcher } from '../common/SharedFetcher'
import { IFetchData } from '../common/models/IFetchData'
import { EXTENSION_SCRIPT, RUIGEM, RUIG_EXTENSION_INTERFACE } from '../common/constants'
import { BUILTIN_EXTENSION, EXTENSION } from '../configs/RestEndpoints'
import { IAppContainer } from '../layers/view/application/components/base/model/IAppContainer'
import { ExtensionId } from './ExtensionId'
import { BaseExtension } from './BaseExtension'
import { IExtension } from './IExtension'
import { FileManagement, Table } from '../common/FileManagement'
import { SharedConfig } from '../common/SharedConfig'
import { IAnyObject } from '../common/models/IAnyObject'

class ExtensionLoader {
  private extensionFileManager = new FileManagement()

  async load(extension: IExtension, appContainer: IAppContainer): Promise<BaseExtension> {
    await this.extensionFileManager.open()
    const { fileContent: code } = (await this.extensionFileManager.getFile(
      `${extension.id}/${RUIGEM}`,
      Table.METAS,
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
    const rei = SharedConfig.get(RUIG_EXTENSION_INTERFACE) as IAnyObject
    const expose = { ...rei, appContainer }
    const fn = new Function(RUIG_EXTENSION_INTERFACE, code)
    return fn(expose)
  }
}

export { ExtensionLoader }

import fetcher from '../common/SharedFetcher'
import IFetchData from '../common/models/IFetchData'
import { APPCONTAINER, EXTENSION_SCRIPT } from '../common/constants'
import { BUILTIN_EXTENSION, EXTENSION } from '../configs/RestEndpoints'
import IAppContainer from '../layers/view/application/components/base/model/IAppContainer'
import { getDefaultExportFromString } from '../common/utils'
import ExtensionId from './ExtensionId'
import BaseExtension from './BaseExtension'
import IExtension from './IExtension'

class ExtensionLoader {
  load(code: string, appContainer: IAppContainer): BaseExtension {
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
      `
        ${code}

        return new ${getDefaultExportFromString(code)}(${APPCONTAINER})
      `,
    )
    return fn(appContainer)
  }
}

export default ExtensionLoader

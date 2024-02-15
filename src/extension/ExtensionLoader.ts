import fetcher from '../common/SharedFetcher'
import IFetchData from '../common/models/IFetchData'
import { APPCONTAINER, EXTENSION_SCRIPT } from '../common/constants'
import { BUILTIN_EXTENSION, EXTENSION } from '../configs/RestEndpoints'
import IAppContainer from '../layers/view/application/components/base/model/IAppContainer'

class ExtensionLoader {
  private appContainer: IAppContainer

  constructor(appContainer: IAppContainer) {
    this.appContainer = appContainer
  }

  async load(id: string, builtin = false): Promise<boolean> {
    const res: IFetchData = (await fetcher.fetch(`${builtin ? BUILTIN_EXTENSION : EXTENSION}${id}`)) as IFetchData

    if (!res || !res.data || !res.data.status) {
      return false
    }

    const executor = new Function(
      APPCONTAINER,
      `
        ${res.data[EXTENSION_SCRIPT]}
        return new Extension(${APPCONTAINER})
      `,
    )

    return executor(this.appContainer)
  }
}

export default ExtensionLoader

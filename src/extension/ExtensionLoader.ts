import fetcher from "../common/SharedFetcher"
import IFetchData from "../common/models/IFetchData"
import { APPCONTAINER, EXTENSION_SCRIPT } from "../common/constants"
import SharedConfig from "../common/SharedConfig"
import { BUILTIN_EXTENSION, EXTENSION } from "../configs/RestEndpoints"
import IAppContainer from "../layers/view/application/components/base/model/IAppContainer"

class ExtensionLoader {
    private appContainer: IAppContainer

    constructor(appContainer: IAppContainer) {
        this.appContainer = appContainer
    }

    async load(id: string, builtin = false): Promise<boolean> {
        let res: IFetchData = await fetcher.fetch(`${builtin ? BUILTIN_EXTENSION : EXTENSION}${id}`) as IFetchData

        if (!res || !res.data || !res.data.status) {
            return false
        }

        let executor = new Function(APPCONTAINER, 'SharedConfig', `
        return new Extension(${APPCONTAINER}, ${res.data[EXTENSION_SCRIPT]})
        `)

        return executor(this.appContainer, SharedConfig)
    }
}

export default ExtensionLoader
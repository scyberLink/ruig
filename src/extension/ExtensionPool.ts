import ExtensionId from "./IExtensionId"

class ExtensionPool {
    installed: ExtensionId = [] as any
    enabled: ExtensionId = [] as any
    disable: ExtensionId = [] as any
}

export default ExtensionPool
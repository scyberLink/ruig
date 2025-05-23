

import { CacheType, createContext, ReblendTyping } from 'reblendjs'

const TRUSTED_EXTENSION_KEY = 'trustedExtensionKey'

const trustedExtensionContext = createContext<Map<string, boolean>>(new Map(), {
  key: TRUSTED_EXTENSION_KEY,
  type: CacheType.LOCAL,
})

const registeredExtension = new Map<string, symbol>()

const suspendedExtension: { [key: string]: boolean } = {}

/**
 * BaseManager is an abstract class that provides a secure registration and trust mechanism
 * for extensions. It ensures that only trusted and registered extensions can instantiate
 * manager instances. Trust is managed via a context, and registration is tracked using
 * a Map of extension IDs to symbols.
 */

abstract class BaseManager {
  protected constructor() {
    throw new Error('Direct Manager Initilization not allowed')
  }

  static readonly trust = (e: ReblendTyping.SyntheticEvent, extensionId: string) => {
    if (
      !e.isTrusted ||
      !(e.target instanceof HTMLInputElement) ||
      !e.target.isConnected ||
      document.activeElement !== e.target
    ) {
      throw new Error('Invalid event target')
    }
    const isTrusted = e.target.checked
    trustedExtensionContext.getValue().set(extensionId, isTrusted)
  }

  static readonly registerExtension = (extensionId: string, extensionSymbol: symbol): void => {
    if (!this.isSuspendedExtension(extensionId)) {
      throw new Error('Extension is suspended')
    }

    if (!extensionId || typeof extensionId !== 'string') {
      throw new Error('Invalid extension ID')
    }

    if (!extensionSymbol || typeof extensionSymbol !== 'symbol') {
      throw new Error('Invalid extension symbol')
    }

    if (!this.isTrustedExtension(extensionId)) {
      throw new Error('Extension is not trusted')
    }

    if (registeredExtension.has(extensionId)) {
      console.warn(`Extension with ID ${extensionId} is already registered. Not registering again.`)
      return
    }

    registeredExtension.set(extensionId, extensionSymbol)
  }

  static readonly isSuspendedExtension = (extensionId: string) => {
    return suspendedExtension[extensionId] || false
  }

  static readonly isTrustedExtension = (extensionId: string) => {
    return trustedExtensionContext.getValue().get(extensionId) || false
  }

  static readonly getInstance = <DerivedManager extends typeof BaseManager>(
    extensionId: string,
    extensionSymbol: symbol,
    derivedClass: DerivedManager,
  ): DerivedManager => {
    if (!derivedClass || !(derivedClass.prototype instanceof BaseManager)) {
      throw new Error('Manager must extend BaseManager')
    }

    if (!this.isSuspendedExtension(extensionId)) {
      throw new Error('Extension is suspended')
    }

    if (!this.isTrustedExtension(extensionId)) {
      throw new Error('Extension is not trusted')
    }

    if (!registeredExtension.has(extensionId)) {
      throw new Error(`Extension with ID ${extensionId} is not registered`)
    }

    if (registeredExtension.get(extensionId) !== extensionSymbol) {
      throw new Error(`Extension with ID ${extensionId} is not registered with the correct symbol`)
    }

    const instance = Object.create(derivedClass.prototype)
    instance.initialize()

    return instance
  }

  abstract initialize(): void
}

Object.seal(BaseManager)
Object.freeze(BaseManager)

export { BaseManager }

/* eslint-disable require-jsdoc */

import { SHAREDCONFIG_ADDTOOBJECT_INITIAL_INDEX } from './constants'
import { IAnyObject } from './models/IAnyObject'

export const enum StorageType {
  MEMORY_STORAGE,
  LOCAL_STORAGE,
  SESSION_STORAGE,
  DESTROY_ALL,
}

class GlobalConfig {
  protected static _instance: GlobalConfig

  private dynamicConfig!: IAnyObject
  private __get!: (key: string, where: StorageType) => IAnyObject | string | null
  private __set!: (key: string | IAnyObject, value: string | IAnyObject, where: StorageType) => void
  private __remove!: (key: string, where: StorageType) => IAnyObject | string | null
  private __destroy!: (where: StorageType) => void
  private __removeFrom!: (
    fromKey: string,
    valueToRemove?: IAnyObject | string,
    where?: StorageType,
  ) => IAnyObject | string | null
  private __has!: (key: string, where: StorageType) => boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private __removeFromObject!: (fromKey: string, keyToRemove: string, where?: StorageType) => any

  constructor() {
    if (!GlobalConfig._instance) {
      GlobalConfig._instance = this
      this.dynamicConfig = {}
      Object.freeze(GlobalConfig)
      Object.seal(GlobalConfig)

      this.__get = (key, where: StorageType) => {
        try {
          key = btoa(key)
        } catch (_err) {
          /* empty */
        }

        let value: string | null

        switch (where) {
          case StorageType.LOCAL_STORAGE:
            value = localStorage.getItem(key)
            value = GlobalConfig.parse(value)
            break

          case StorageType.SESSION_STORAGE:
            value = sessionStorage.getItem(key)
            value = GlobalConfig.parse(value)
            break

          default:
            value = this.dynamicConfig[key]
            break
        }

        return value
      }

      const switchSet = (key: string, value: string | IAnyObject, where: StorageType) => {
        try {
          key = btoa(key)
        } catch (_err) {
          /* empty */
        }

        switch (where) {
          case StorageType.LOCAL_STORAGE:
            value = GlobalConfig.stringify(value)
            localStorage.setItem(key, value as string)
            break

          case StorageType.SESSION_STORAGE:
            value = GlobalConfig.stringify(value)
            sessionStorage.setItem(key, value as string)
            break

          default:
            this.dynamicConfig[key] = value
            break
        }
      }

      this.__set = (key: string | IAnyObject, value: string | IAnyObject, where: StorageType) => {
        if (key instanceof Object) {
          let configKey
          let configObj
          if (key instanceof Array && value instanceof Array) {
            configKey = key
            configObj = value
          } else {
            configKey = Object.keys(key)
            configObj = Object.values(key)
          }
          for (let i = 0; i < configKey.length; i++) {
            const k = configKey[i]
            const v = configObj[i]
            if (k) {
              switchSet(k, v, where)
            }
          }
        } else {
          if (key) {
            switchSet(key, value, where)
          }
        }
      }

      this.__remove = (key: string, where: StorageType) => {
        let { key: copiedKey } = { key }

        try {
          copiedKey = btoa(copiedKey)
        } catch (_err) {
          /* empty */
        }

        let value

        switch (where) {
          case StorageType.LOCAL_STORAGE:
            value = this.__get(key, StorageType.LOCAL_STORAGE)
            if (value) localStorage.removeItem(copiedKey)
            break

          case StorageType.SESSION_STORAGE:
            value = this.__get(key, StorageType.SESSION_STORAGE)
            if (value) sessionStorage.removeItem(copiedKey)
            break

          default:
            value = this.__get(key, StorageType.MEMORY_STORAGE)
            if (value) delete this.dynamicConfig[copiedKey]
            break
        }

        return value
      }

      this.__destroy = (where: StorageType) => {
        switch (where) {
          case StorageType.LOCAL_STORAGE:
            localStorage.clear()
            break

          case StorageType.SESSION_STORAGE:
            sessionStorage.clear()
            break

          case StorageType.DESTROY_ALL:
            this.dynamicConfig = {}
            localStorage.clear()
            sessionStorage.clear()
            break

          default:
            this.dynamicConfig = {}
            break
        }
      }

      this.__removeFrom = (
        fromKey,
        valueToRemove?: IAnyObject | string,
        where: StorageType = StorageType.MEMORY_STORAGE,
      ) => {
        const exist = this.__get(fromKey, where)
        if (!exist) return false
        if (exist instanceof Array) {
          let deleted
          if (!valueToRemove) {
            deleted = exist.pop()
          } else {
            const [deleted_temp] = [...exist[exist.indexOf(valueToRemove)]]
            delete exist[exist.indexOf(valueToRemove)]
            deleted = deleted_temp
          }
          if (deleted) {
            this.__set(fromKey, exist, where)
          }
          return deleted
        }
        return false
      }

      this.__removeFromObject = (
        fromKey: string,
        keyToRemove: string,
        where: StorageType = StorageType.MEMORY_STORAGE,
      ) => {
        const exist: IAnyObject = this.__get(fromKey, where) as IAnyObject
        if (!exist) return false
        if (!(exist instanceof Array)) {
          const tempName = `${keyToRemove}_temp`
          const { [tempName]: temp } = { [tempName]: exist[keyToRemove] }
          delete exist[keyToRemove]
          const deleted = temp

          if (deleted) {
            this.__set(fromKey, exist, where)
          }
          return deleted
        }
        return false
      }

      this.__has = (key, where: StorageType) => {
        const exist = this.__get(key, where)
        return !!exist
      }
    }
    return GlobalConfig._instance
  }

  get(key: string) {
    return this.__get(key, StorageType.MEMORY_STORAGE)
  }

  set(key: string, value: string | IAnyObject) {
    this.__set(key, value, StorageType.MEMORY_STORAGE)
  }

  addTo(parentKey: string, valueToAdd: string | IAnyObject) {
    if (!Object.hasOwnProperty.call(this.dynamicConfig, parentKey)) {
      this.dynamicConfig[parentKey] = []
    }
    if (!(this.dynamicConfig[parentKey] instanceof Array)) {
      this.dynamicConfig[parentKey] = [this.dynamicConfig[parentKey]]
    }
    this.dynamicConfig[parentKey].push(valueToAdd)
    return this.dynamicConfig[parentKey]
  }

  addToFlashData(parentKey: string, valueToAdd: string | IAnyObject) {
    return this.addToLocalData(parentKey, valueToAdd)
  }

  addToLocalData(parentKey: string, valueToAdd: string | IAnyObject) {
    let exist = this.__get(parentKey, StorageType.LOCAL_STORAGE)
    if (!exist) exist = []
    if (!(exist instanceof Array)) {
      exist = [exist]
    }
    exist.push(valueToAdd)
    this.__set(parentKey, exist, StorageType.LOCAL_STORAGE)
    return exist
  }

  addToSessionData(parentKey: string, valueToAdd: string | IAnyObject) {
    let exist = this.__get(parentKey, StorageType.SESSION_STORAGE)
    if (!exist) exist = []
    if (!(exist instanceof Array)) {
      exist = [exist]
    }
    exist.push(valueToAdd)
    this.__set(parentKey, exist, StorageType.SESSION_STORAGE)
    return exist
  }

  removeFrom(parentKey: string, valueToRemove?: IAnyObject | string) {
    return this.__removeFrom(parentKey, valueToRemove, StorageType.MEMORY_STORAGE)
  }

  removeFromFlashData(parentKey: string, valueToRemove?: IAnyObject | string) {
    return this.removeFromLocalData(parentKey, valueToRemove)
  }

  removeFromLocalData(parentKey: string, valueToRemove?: IAnyObject | string) {
    return this.__removeFrom(parentKey, valueToRemove, StorageType.LOCAL_STORAGE)
  }

  removeFromSessionData(parentKey: string, valueToRemove?: IAnyObject | string) {
    return this.__removeFrom(parentKey, valueToRemove, StorageType.SESSION_STORAGE)
  }

  addToObject(parentKey: string, key: string, value: string | IAnyObject) {
    if (!Object.hasOwnProperty.call(this.dynamicConfig, parentKey)) {
      this.dynamicConfig[parentKey] = {}
    }
    if (
      typeof this.dynamicConfig[parentKey] == 'string' ||
      typeof this.dynamicConfig[parentKey] == 'number' ||
      typeof this.dynamicConfig[parentKey] == 'boolean'
    ) {
      this.dynamicConfig[parentKey] = { [SHAREDCONFIG_ADDTOOBJECT_INITIAL_INDEX]: this.dynamicConfig[parentKey] }
    }
    this.dynamicConfig[parentKey][key] = value
    return this.dynamicConfig[parentKey]
  }

  addToObjectFlashData(parentKey: string, key: string, value: string | IAnyObject) {
    return this.addToObjectLocalData(parentKey, key, value)
  }

  addToObjectLocalData(parentKey: string, key: string, value: string | IAnyObject) {
    let exist: IAnyObject = this.__get(parentKey, StorageType.LOCAL_STORAGE) as IAnyObject
    if (!exist) exist = {}
    if (typeof exist == 'string' || typeof exist == 'number' || typeof exist == 'boolean') {
      exist = { [SHAREDCONFIG_ADDTOOBJECT_INITIAL_INDEX]: exist }
    }
    exist[key] = value
    this.__set(parentKey, exist, StorageType.LOCAL_STORAGE)
    return exist
  }

  addToObjectSessionData(parentKey: string, key: string, value: string | IAnyObject) {
    let exist: IAnyObject = this.__get(parentKey, StorageType.SESSION_STORAGE) as IAnyObject
    if (!exist) exist = {}
    if (typeof exist == 'string' || typeof exist == 'number' || typeof exist == 'boolean') {
      exist = { [SHAREDCONFIG_ADDTOOBJECT_INITIAL_INDEX]: exist }
    }
    exist[key] = value
    this.__set(parentKey, exist, StorageType.SESSION_STORAGE)
    return exist
  }

  removeFromObject(parentKey: string, keyToRemove: string) {
    return this.__removeFromObject(parentKey, keyToRemove, StorageType.MEMORY_STORAGE)
  }

  removeFromObjectFlashData(parentKey: string, keyToRemove: string) {
    return this.removeFromObjectLocalData(parentKey, keyToRemove)
  }

  removeFromObjectLocalData(parentKey: string, keyToRemove: string) {
    return this.__removeFromObject(parentKey, keyToRemove, StorageType.LOCAL_STORAGE)
  }

  removeFromObjectSessionData(parentKey: string, keyToRemove: string) {
    return this.__removeFromObject(parentKey, keyToRemove, StorageType.SESSION_STORAGE)
  }

  getFlashData(key: string) {
    return this.__remove(key, StorageType.LOCAL_STORAGE)
  }

  setFlashData(key: string, value: string | IAnyObject) {
    this.setLocalData(key, value)
  }

  getLocalData(key: string) {
    return this.__get(key, StorageType.LOCAL_STORAGE)
  }

  setLocalData(key: string, value: string | IAnyObject) {
    this.__set(key, value, StorageType.LOCAL_STORAGE)
  }

  getSessionData(key: string) {
    return this.__get(key, StorageType.SESSION_STORAGE)
  }

  setSessionData(key: string, value: string | IAnyObject) {
    this.__set(key, value, StorageType.SESSION_STORAGE)
  }

  has(key: string) {
    return this.__has(key, StorageType.MEMORY_STORAGE)
  }

  isFlashData(key: string) {
    return this.isLocalData(key)
  }

  isLocalData(key: string) {
    return this.__has(key, StorageType.LOCAL_STORAGE)
  }

  isSessionData(key: string) {
    return this.__has(key, StorageType.SESSION_STORAGE)
  }

  remove(key: string) {
    return this.__remove(key, StorageType.MEMORY_STORAGE)
  }

  removeSessionData(key: string) {
    return this.__remove(key, StorageType.SESSION_STORAGE)
  }

  removeLocalData(key: string) {
    return this.__remove(key, StorageType.LOCAL_STORAGE)
  }

  removeFlashData(key: string) {
    return this.removeLocalData(key)
  }

  destroy() {
    this.__destroy(StorageType.MEMORY_STORAGE)
  }

  destroyLocalData() {
    this.__destroy(StorageType.LOCAL_STORAGE)
  }

  destroySessionData() {
    this.__destroy(StorageType.SESSION_STORAGE)
  }

  destroyAll() {
    this.__destroy(StorageType.DESTROY_ALL)
  }

  increment(key: string, throwIfNotfound = false) {
    if (Object.hasOwnProperty.call(this.dynamicConfig, key)) {
      if (typeof Number.parseInt(this.dynamicConfig[key]) === 'number') {
        ++this.dynamicConfig[key]
        return this.dynamicConfig[key]
      } else {
        throw new Error("Specified key is not a number can't increment")
      }
    } else {
      if (throwIfNotfound) throw new Error('Key not found')
    }
    return (this.dynamicConfig[key] = 1)
  }

  decrement(key: string, throwIfNotfound = false) {
    if (Object.hasOwnProperty.call(this.dynamicConfig, key)) {
      if (typeof Number.parseInt(this.dynamicConfig[key]) === 'number') {
        --this.dynamicConfig[key]
        return this.dynamicConfig[key]
      } else {
        throw new Error("Specified key is not a number can't decrement")
      }
    } else {
      if (throwIfNotfound) throw new Error('Key not found')
    }
    return (this.dynamicConfig[key] = -1)
  }

  static parse = (value: string | null) => {
    if (value) {
      try {
        value = atob(value)
      } catch (_err) {
        /* empty */
      }
      try {
        value = JSON.parse(value)
      } catch (error) {
        /* empty */
      }
    }
    return value
  }

  static stringify = (value: string | IAnyObject) => {
    try {
      if (value instanceof Object) {
        value = JSON.stringify(value)
      }
    } catch (_err) {
      /* empty */
    }

    try {
      value = btoa(value as string)
    } catch (_err) {
      /* empty */
    }

    return value
  }
}

const SharedConfig = new GlobalConfig()

export { SharedConfig }

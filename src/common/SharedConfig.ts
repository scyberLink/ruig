/* eslint-disable require-jsdoc */

import IAnyObject from "./models/IAnyObject"

export const enum StorageType {
  MEMORY_STORAGE,
  LOCAL_STORAGE,
  SESSION_STORAGE,
  DESTROY_ALL,
}


class GlobalConfig {
  protected static _instance: GlobalConfig

  private dynamicConfig!: IAnyObject
  private __get!: (key: any, where: any) => any
  private __set!: (key: any, value: any, where: any) => void
  private __remove!: (key: any, where: any) => any
  private __destroy!: (where: any) => void
  private __removeFrom!: (fromKey: any, valueToRemove: null | undefined, where: any) => any
  private __has!: (key: any, where: any) => boolean

  constructor() {
    if (!GlobalConfig._instance) {
      GlobalConfig._instance = this
      this.dynamicConfig = {}
      Object.freeze(GlobalConfig)
      Object.seal(GlobalConfig)

      this.__get = (key, where: StorageType) => {
        try {
          key = btoa(key)
        } catch (_err) { }

        let value

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

      const switchSet = (key: string, value: any, where: StorageType) => {
        try {
          key = btoa(key)
        } catch (_err) { }

        switch (where) {
          case StorageType.LOCAL_STORAGE:
            value = GlobalConfig.stringify(value)
            localStorage.setItem(key, value)
            break

          case StorageType.SESSION_STORAGE:
            value = GlobalConfig.stringify(value)
            sessionStorage.setItem(key, value)
            break

          default:
            this.dynamicConfig[key] = value
            break
        }
      }

      this.__set = (key: any, value: any, where: StorageType) => {
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
        } catch (_err) { }

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

      this.__removeFrom = (fromKey, valueToRemove = null, where: StorageType = StorageType.MEMORY_STORAGE) => {
        const exist = this.__get(fromKey, where)
        if (!exist) return false
        if (exist instanceof Array) {
          let deleted
          if (!valueToRemove) {
            deleted = exist.pop()
          } else {
            let [deleted_temp] = [...exist[exist.indexOf(valueToRemove)]]
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

  set(key: string, value: any) {
    this.__set(key, value, StorageType.MEMORY_STORAGE)
  }

  addTo(parentKey: string, valueToAdd: any) {
    if (!Object.hasOwnProperty.call(this.dynamicConfig, parentKey)) {
      this.dynamicConfig[parentKey] = []
    }
    if (!(this.dynamicConfig[parentKey] instanceof Array)) {
      this.dynamicConfig[parentKey] = [this.dynamicConfig[parentKey]]
    }
    this.dynamicConfig[parentKey].push(valueToAdd)
    return this.dynamicConfig[parentKey]
  }

  addToFlashData(parentKey: string, valueToAdd: any) {
    return this.addToLocalData(parentKey, valueToAdd)
  }

  addToLocalData(parentKey: string, valueToAdd: any) {
    let exist = this.__get(parentKey, StorageType.LOCAL_STORAGE)
    if (!exist) exist = []
    if (!(exist instanceof Array)) {
      exist = [exist]
    }
    exist.push(valueToAdd)
    this.__set(parentKey, exist, StorageType.LOCAL_STORAGE)
    return exist
  }

  addToSessionData(parentKey: string, valueToAdd: any) {
    let exist = this.__get(parentKey, StorageType.SESSION_STORAGE)
    if (!exist) exist = []
    if (!(exist instanceof Array)) {
      exist = [exist]
    }
    exist.push(valueToAdd)
    this.__set(parentKey, exist, StorageType.SESSION_STORAGE)
    return exist
  }

  removeFrom(parentKey: string, valueToRemove = null) {
    return this.__removeFrom(parentKey, valueToRemove, StorageType.MEMORY_STORAGE)
  }

  removeFromFlashData(parentKey: string, valueToRemove = null) {
    return this.removeFromLocalData(parentKey, valueToRemove)
  }

  removeFromLocalData(parentKey: string, valueToRemove = null) {
    return this.__removeFrom(parentKey, valueToRemove, StorageType.LOCAL_STORAGE)
  }

  removeFromSessionData(parentKey: string, valueToRemove = null) {
    return this.__removeFrom(parentKey, valueToRemove, StorageType.SESSION_STORAGE)
  }

  getFlashData(key: string) {
    return this.__remove(key, StorageType.LOCAL_STORAGE)
  }

  setFlashData(key: string, value: any) {
    this.setLocalData(key, value)
  }

  getLocalData(key: string) {
    return this.__get(key, StorageType.LOCAL_STORAGE)
  }

  setLocalData(key: string, value: any) {
    this.__set(key, value, StorageType.LOCAL_STORAGE)
  }

  getSessionData(key: string) {
    return this.__get(key, StorageType.SESSION_STORAGE)
  }

  setSessionData(key: string, value: any) {
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
    return (this.dynamicConfig[key] = -1);
  }


  static parse = (value: any) => {
    if (value) {
      try {
        value = atob(value)
      } catch (_err) { }
      try {
        value = JSON.parse(value)
      } catch (error) { }
    }
    return value
  }

  static stringify = (value: any) => {
    try {
      if (value instanceof Object) {
        value = JSON.stringify(value)
      }
    } catch (_err) { }

    try {
      value = btoa(value)
    } catch (_err) { }

    return value
  }

}

const SharedConfig = new GlobalConfig()

export default SharedConfig

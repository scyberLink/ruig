import { IDBPDatabase, openDB } from 'idb'

enum FileManagementMode {
  READONLY = 'readonly',
  READWRITE = 'readwrite',
}

class FileManagement {
  constructor() {
    this.upgrade = this.upgrade.bind(this)
  }

  async saveFile(fileName: string, fileContent: string | Blob, type = 'string') {
    try {
      const db = await openDB(this.DATABASE, this.DATABASE_VERSION, {
        upgrade: this.upgrade,
      })
      const tx = db.transaction(this.TABLE, FileManagementMode.READWRITE)
      const store = tx.objectStore(this.TABLE)
      store.put({ fileName, file: { type, fileContent } })
      await tx.done
    } catch (error) {
      console.error('Error saving file:', error)
    }
  }

  async getFile(fileName: string) {
    try {
      const db = await openDB(this.DATABASE, this.DATABASE_VERSION, {
        upgrade: this.upgrade,
      })
      const tx = db.transaction(this.TABLE, FileManagementMode.READONLY)
      const store = tx.objectStore(this.TABLE)
      const { file } = (await store.get(fileName)) || { file: null }
      await tx.done
      return file
    } catch (error) {
      console.error('Error retrieving:', error)
      return null
    }
  }

  upgrade(db: IDBPDatabase<unknown>) {
    if (!db.objectStoreNames.contains(this.TABLE)) {
      db.createObjectStore(this.TABLE, { keyPath: this.KEYPATH })
    }
  }

  KEYPATH = 'fileName'
  DATABASE = 'ExtensionStore'
  DATABASE_VERSION = 1
  TABLE = 'files'
}

export default FileManagement

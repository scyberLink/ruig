/* eslint-disable @typescript-eslint/no-explicit-any */
import { IDBPDatabase, openDB } from 'idb'

enum FileManagementMode {
  READONLY = 'readonly',
  READWRITE = 'readwrite',
}

export enum Table {
  METAS = 'metas',
  ASSETS = 'assets',
}

class FileManagement {
  db: IDBPDatabase<unknown> = null as any

  async open() {
    this.db = await openDB(this.DATABASE, this.DATABASE_VERSION, {
      upgrade: (db) => {
        db.createObjectStore(Table.ASSETS, { keyPath: this.KEYPATH })
        db.createObjectStore(Table.METAS, { keyPath: this.KEYPATH })
      },
    })
  }

  async saveFile(fileName: string, fileContent: string | Blob, type: string, table: Table = Table.ASSETS) {
    try {
      const tx = this.db.transaction(table, FileManagementMode.READWRITE)
      const store = tx.objectStore(table)
      const mime = this.getMime(type)
      store.put({ fileName, file: { mime, type, fileContent } })
      await tx.done
    } catch (error) {
      console.error('Error saving file:', error)
    }
  }

  getMime(extension: string): string {
    switch (extension) {
      case 'txt':
        return 'text/plain'
      case 'html':
        return 'text/html'
      case 'css':
        return 'text/css'
      case 'js':
        return 'text/javascript'
      case 'json':
        return 'application/json'
      case 'svg':
        return 'image/svg+xml'
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg'
      case 'png':
        return 'image/png'
      case 'gif':
        return 'image/gif'
      case 'pdf':
        return 'application/pdf'
      default:
        return 'application/octet-stream'
    }
  }

  async getFile(fileName: string, table: Table = Table.ASSETS) {
    try {
      const tx = this.db.transaction(table, FileManagementMode.READONLY)
      const store = tx.objectStore(table)
      const { file } = (await store.get(fileName)) || { file: null }
      await tx.done
      return file
    } catch (error) {
      console.error('Error retrieving:', error)
      return null
    }
  }

  close() {
    this.db?.close()
  }

  private KEYPATH = 'fileName'
  private DATABASE = 'ExtensionStore'
  private DATABASE_VERSION = 1
}

export default FileManagement

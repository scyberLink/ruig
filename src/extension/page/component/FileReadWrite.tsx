import React, { useState } from 'react'
import { openDB } from 'idb'
import JSZip from 'jszip'

type DataType = 'string' | 'blob'

const FileReadWrite: React.FC = () => {
  const [fileContent, setFileContent] = useState<string>('')

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]
    if (file) {
      const zip = new JSZip()
      await zip.loadAsync(file)
      zip.forEach(async (relativePath, zipEntry) => {
        if (!zipEntry.dir) {
          const dataType: DataType = getDataType(zipEntry.name)
          const content = await zip.file(zipEntry.name)?.async(dataType)
          if (content) {
            saveFileToIndexedDB(zipEntry.name, content)
            dataType == 'string' && setFileContent(content as string)
          }
        }
      })
    }
  }

  const getDataType = (name: string) => {
    const fileExtension = name.split('.').pop()?.toLowerCase()
    let dataType: string

    // Determine data type based on file extension
    switch (fileExtension) {
      case 'txt':
      case 'html':
      case 'css':
      case 'js':
      case 'json':
      case 'svg':
        dataType = 'string' // Text data
        break

      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'pdf':
        dataType = 'blob' // Image data
        break

      default:
        dataType = 'string'
        break
    }

    return dataType as DataType
  }

  const saveFileToIndexedDB = async (fileName: string, fileContent: string | Blob) => {
    try {
      const db = await openDB('ExtensionStore', 1, {
        upgrade(db) {
          if (!db.objectStoreNames.contains('files')) {
            db.createObjectStore('files', { keyPath: 'fileName' })
          }
        },
      })
      const tx = db.transaction('files', 'readwrite')
      const store = tx.objectStore('files')
      if (typeof fileContent === 'string') {
        await store.put({ fileName, fileContent })
      } else if (fileContent instanceof Blob) {
        // Convert blob to ArrayBuffer
        const arrayBuffer = await fileContent.arrayBuffer()
        // Store ArrayBuffer in IndexedDB
        await store.put({ fileName, fileContent: arrayBuffer })
      } else {
        throw new Error('Unsupported file content type')
      }
      await tx.done
      console.log('File saved to IndexedDB')
    } catch (error) {
      console.error('Error saving file to IndexedDB:', error)
    }
  }

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <div>
        <h2>File Content</h2>
        <pre>{fileContent}</pre>
      </div>
    </div>
  )
}

export default FileReadWrite

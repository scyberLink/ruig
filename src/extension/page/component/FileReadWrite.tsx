import React, { useState } from 'react'
import JSZip from 'jszip'
import FileManagement from '../../../common/FileManagement'

type DataType = 'string' | 'blob'

const FileReadWrite: React.FC = () => {
  const [fileContent, setFileContent] = useState<string>('')
  const fileManager = new FileManagement()

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
            const name = prepareName(zipEntry.name)
            fileManager.saveFile(name, content, getExtension(zipEntry.name))
          }
        }
      })
      setFileContent('Installed')
    }
  }

  const getExtension = (name: string) => {
    return name.split('.').pop()?.toLowerCase() || ''
  }

  const getDataType = (name: string) => {
    const fileExtension = getExtension(name)
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

  const prepareName = (name: string) => {
    const extension = getExtension(name)
    if (!extension || extension !== 'js') {
      return name
    }
    const splitted = name.split(`.${extension}`)
    splitted?.pop()
    return splitted?.pop() || name
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

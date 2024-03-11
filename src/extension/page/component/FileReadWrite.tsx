/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react'
import JSZip, { JSZipObject } from 'jszip'
import FileManagement from '../../../common/FileManagement'
import remarkGfm from 'remark-gfm'
import ReactMarkdown from 'react-markdown'
import ExtensionPool from '../../ExtensionPool'

type DataType = 'string' | 'blob'

interface IManifest {
  name: string
  version: string
  description: string
  publisher: string
  classname: string
  doc: string
}

interface IFile {
  name: string
  content: any
  extension: string
}

const FileReadWrite: React.FC = () => {
  const [readyToInstall, setReadyToInstall] = useState(false)
  const [installed, setInstalled] = useState(false)
  const [manifest, setManifest] = useState<IManifest>(null as any)
  const [doc, setDoc] = useState('')
  const extensionPool = new ExtensionPool()
  const assets = useRef<IFile[]>([])
  const metas = useRef<IFile[]>([])
  const extensionId = useRef('')
  const fileManager = new FileManagement()
  fileManager.open()
  const zip = new JSZip()

  useEffect(() => {
    return fileManager.close()
  }, [])

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]
    if (file) {
      reset()
      await zip.loadAsync(file)
      zip.forEach(async (relativePath, zipEntry) => {
        if (!zipEntry.dir) {
          const name = zipEntry.name
          const content = await readContent(zipEntry)
          const extension = getExtension(name)

          if (name == 'manifest.json') {
            const manifest = JSON.parse(content as string)
            setManifest(manifest)
            extensionId.current = `${manifest.publisher}.${manifest.name}`
          }

          if (name == 'README.md') {
            setDoc(content as string)
          }

          if (name.includes('extension-store')) {
            assets.current.push({ name, content, extension })
          } else {
            metas.current.push({ name, content, extension })
          }
        }
      })
      setReadyToInstall(true)
    }
  }

  const saveFiles = () => {
    for (const file of assets.current) {
      if (file.content) {
        fileManager.saveFile(file.name, file.content, file.extension)
      }
    }

    for (const file of metas.current) {
      if (file.content) {
        fileManager.saveFile(`${extensionId.current}/${file.name}`, file.content, file.extension, 'metas')
      }
    }

    extensionPool.manualInstall({
      id: extensionId.current,
      rating: 0,
      downloads: 0,
      builtin: false,
    })

    setInstalled(true)
  }

  async function readContent(zipEntry: JSZipObject) {
    const dataType: DataType = getDataType(zipEntry.name)
    return await zip.file(zipEntry.name)?.async(dataType)
  }

  function reset() {
    setInstalled(false)
    setReadyToInstall(false)
    setManifest(null as any)
    setDoc('')
    assets.current = []
    metas.current = []
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

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <div>
        <h2>Information</h2>
        {readyToInstall && !manifest ? (
          <h2 style={{ color: 'red' }}>Invalid extension package</h2>
        ) : (
          <>
            {readyToInstall && (
              <button onClick={saveFiles} disabled={installed}>
                {installed ? 'Installed' : 'Install'}
              </button>
            )}
            {readyToInstall && (
              <div>
                <h1>{manifest.name}</h1>
                <div>
                  Version: <span style={{ color: 'blue' }}>{manifest.version}</span>
                </div>
                <div>
                  Publisher: <span style={{ color: 'blue' }}>{manifest.publisher}</span>
                </div>
                <h3>{manifest.description}</h3>
                <div>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{doc}</ReactMarkdown>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default FileReadWrite

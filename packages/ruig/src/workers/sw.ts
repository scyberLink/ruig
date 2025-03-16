/* eslint-disable @typescript-eslint/no-explicit-any */
import { FileManagement } from '../common/FileManagement'
import { notfound } from '../common/notfound'

const extensionStore = 'extension-store'

self.addEventListener('fetch', (event: any) => {
  event.respondWith(
    (async () => {
      if (event.request.url.includes(extensionStore)) {
        const path = extensionStore + event.request.url.split(extensionStore).pop()
        const filemanager = new FileManagement()
        await filemanager.open()
        const file = await filemanager.getFile(path)
        const mime = file?.mime || 'text/html'
        const content = file?.fileContent || notfound
        const status = file?.fileContent ? 200 : 404
        const statusText = file?.fileContent ? 'Success' : 'Not Found'
        const blob = new Blob([content], { type: mime })

        const res = new Response(blob, { status, statusText })

        return res
      }

      return fetch(event.request).catch((error) => {
        console.log('Fetch failed:', error)
      })
    })(),
  )
})

export {}

/* eslint-disable @typescript-eslint/no-explicit-any */

import FileManagement from '../common/FileManagement'
import notfound from '../common/notfound'

/* eslint-disable no-undef */
const EXTENSION_PROVIDER_CACHE_NAME = 'extension-provider-cache-v1'

const urlsToCache = ['/extension-store']

self.addEventListener('install', (event: any) => {
  event.waitUntil(caches.open(EXTENSION_PROVIDER_CACHE_NAME).then((cache) => cache.addAll(urlsToCache)))
})

self.addEventListener('fetch', (event: any) => {
  event.respondWith(
    caches.match(event.request).then(async (response) => {
      if (response) {
        return response
      }

      const path = urlsToCache[0] + event.request.url.split(urlsToCache[0]).pop()
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
    }),
  )
})

export {}

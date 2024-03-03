/* eslint-disable @typescript-eslint/no-explicit-any */
const CACHER_CACHE_NAME = 'cacher-cache-v1'

const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  // Add other assets to cache here
]

self.addEventListener('install', (event: any) => {
  event.waitUntil(
    caches
      .open(CACHER_CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .catch((error) => console.error('Cache installation failed:', error)),
  )
})

self.addEventListener('fetch', (event: any) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response
      }

      return fetch(event.request)
        .then((fetchResponse) => {
          if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
            return fetchResponse
          }

          const clonedResponse = fetchResponse.clone()

          caches
            .open(CACHER_CACHE_NAME)
            .then((cache) => cache.put(event.request, clonedResponse))
            .catch((error) => console.error('Error caching response:', error))

          return fetchResponse
        })
        .catch((error) => {
          console.error('Fetch failed:', error)
          // Optionally, return a fallback response here
        })
    }),
  )
})

self.addEventListener('activate', (event: any) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            return cacheName.startsWith('cacher-cache-') && cacheName !== CACHER_CACHE_NAME
          })
          .map((cacheName) => {
            return caches.delete(cacheName)
          }),
      )
    }),
  )
})

export {}

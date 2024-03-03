/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
const CACHER_CACHE_NAME = 'cacher-cache-v1'

const urlsToCache = [
  '/', // Cache the root URL
  '/index.html', // Cache the index.html file
  '/manifest.json', // Cache the manifest file
  '/favicon.ico', // Cache the favicon file
  // Add other assets to cache here
]

self.addEventListener('install', (event: any) => {
  event.waitUntil(caches.open(CACHER_CACHE_NAME).then((cache) => cache.addAll(urlsToCache)))
})

self.addEventListener('fetch', (event: any) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Check if the request is already cached
      if (response) {
        return response // Return the cached response
      }

      // If not cached, fetch the request from the network
      return fetch(event.request)
        .then((response) => {
          // Clone the response as it can only be consumed once
          const clonedResponse = response.clone()

          // Dynamically add the URL to cache
          caches.open(CACHER_CACHE_NAME).then((cache) => {
            cache.put(event.request, clonedResponse)
          })

          return response // Return the fetched response
        })
        .catch((error) => {
          console.error('Error fetching and caching:', error)
        })
    }),
  )
})

export {}

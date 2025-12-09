/* eslint-env serviceworker */

/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.config.js > pwa > workboxMode is set to "injectManifest"
 */

import { clientsClaim } from 'workbox-core'
import { precacheAndRoute, cleanupOutdatedCaches, createHandlerBoundToURL } from 'workbox-precaching'
import { registerRoute, NavigationRoute } from 'workbox-routing'

self.skipWaiting()

clientsClaim()

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // Usuń wszystkie cache, które nie są aktualne
          if (!['pages-cache', 'assets-cache'].includes(cacheName)) {
            return caches.delete(cacheName)
          }
          // Zwróć resolved promise jeśli cache ma zostać
          return Promise.resolve()
        })
      )
    })
  )
})

// Use with precache injection
precacheAndRoute(self.__WB_MANIFEST)

cleanupOutdatedCaches()

// Non-SSR fallback to index.html
// Production SSR fallback to offline.html (except for dev)
if (process.env.MODE !== 'ssr' || process.env.PROD) {
  registerRoute(
    new NavigationRoute(
      createHandlerBoundToURL(process.env.PWA_FALLBACK_HTML),
      { denylist: [/sw\.js$/, /workbox-(.)*\.js$/] }
    )
  )
}

// Cache all tools and pages for offline use
import { StaleWhileRevalidate, CacheFirst } from 'workbox-strategies'
import { ExpirationPlugin } from 'workbox-expiration'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'

// Cache all HTML pages (SPA routes)
registerRoute(
  ({ request }) => request.mode === 'navigate',
  new StaleWhileRevalidate({
    cacheName: 'pages-cache',
    plugins: [
      new ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 7 * 24 * 60 * 60 })
    ]
  })
)

// Cache all static assets (js, css, images, icons)
registerRoute(
  ({ request }) => ['style', 'script', 'image', 'font'].includes(request.destination),
  new CacheFirst({
    cacheName: 'assets-cache',
    plugins: [
      new ExpirationPlugin({ maxEntries: 100, maxAgeSeconds: 30 * 24 * 60 * 60 }),
      new CacheableResponsePlugin({ statuses: [0, 200] })
    ]
  })
)

// Obsługa powiadomień push
self.addEventListener('push', function (event) {
  let data = {}
  console.log('[SW] push event', event)
  if (event.data) {
    try {
      data = event.data.json()
      console.log('[SW] push data json', data)
    } catch (e) {
      data = { title: 'Nowe powiadomienie', body: event.data.text() }
      console.log('[SW] push data text', data)
    }
  } else {
    console.log('[SW] push event with no data')
  }
  const title = data.title || 'Nowe powiadomienie'
  const options = {
    body: data.body || '',
    icon: '/icons/icon-192x192.png',
    data: { url: data.url || '/' }
  }
  event.waitUntil(
    self.registration.showNotification(title, options)
  )
})

self.addEventListener('notificationclick', function (event) {
  event.notification.close()
  const url = event.notification.data && event.notification.data.url ? event.notification.data.url : '/'
  event.waitUntil(
    clients.openWindow(url)
  )
})

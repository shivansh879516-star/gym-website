const CACHE_NAME = 'vyra-fitness-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './css/style.css',
  './js/main.js',
  './img/icon-any-192.png',
  './img/icon-any-512.png',
  './img/icon-maskable-192.png',
  './img/icon-maskable-512.png',
  './img/screenshot-mobile.jpg',
  './img/screenshot-desktop.jpg',
  './img/vyra-icon.jpg',
  './img/trainer-shivansh.jpg',
  './img/transformation-before.jpg',
  './img/transformation-after.jpg'
];

// 1. Install Event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[VYRA Service Worker] Caching app shell');
      return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
        console.warn('[VYRA SW] Pre-cache warning:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// 2. Activate Event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[VYRA SW] Purging old cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Fetch Event
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, networkResponse.clone());
              });
            }
          })
          .catch(() => {});
        return cachedResponse;
      }

      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200) {
          return networkResponse;
        }
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return networkResponse;
      }).catch(() => {
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});

// 4. Background Sync Handler
self.addEventListener('sync', (event) => {
  console.log('[VYRA SW] Background Sync:', event.tag);
});

// 5. Periodic Sync Handler
self.addEventListener('periodicsync', (event) => {
  console.log('[VYRA SW] Periodic Sync:', event.tag);
});

// 6. Push Notifications Handler
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.text() : 'Time for your daily workout on VYRA!';
  const options = {
    body: data,
    icon: 'img/icon-any-192.png',
    badge: 'img/icon-any-192.png',
    vibrate: [200, 100, 200],
    data: { url: './index.html' }
  };
  event.waitUntil(self.registration.showNotification('VYRA Fitness', options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === '/' && 'focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow('./index.html');
    })
  );
});

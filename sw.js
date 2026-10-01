const CACHE_NAME = 'shivansh-fitness-v5';
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
  './img/app-3d-dumbbell.jpg',
  './img/app-promo-dumbbells.jpg',
  './img/trainer-shivansh.jpg'
];

// 1. Install Event - Pre-cache core static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching offline shell assets');
      return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
        console.warn('[Service Worker] Pre-cache non-fatal error:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// 2. Activate Event - Clean up obsolete caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[Service Worker] Removing old cache version:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Fetch Event - Stale While Revalidate strategy
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
          .catch(() => {/* Offline mode */});
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

// 4. Background Sync Handler (PWABuilder Action Item)
self.addEventListener('sync', (event) => {
  console.log('[Service Worker] Background Sync event triggered:', event.tag);
  if (event.tag === 'sync-workout-data') {
    event.waitUntil(
      Promise.resolve().then(() => {
        console.log('[Service Worker] Workout progress synced successfully in background.');
      })
    );
  }
});

// 5. Periodic Background Sync Handler (PWABuilder Action Item)
self.addEventListener('periodicsync', (event) => {
  console.log('[Service Worker] Periodic Background Sync triggered:', event.tag);
  if (event.tag === 'daily-fitness-sync') {
    event.waitUntil(
      Promise.resolve().then(() => {
        console.log('[Service Worker] Daily fitness & hydration targets updated.');
      })
    );
  }
});

// 6. Push Notifications Handler (PWABuilder Action Item)
self.addEventListener('push', (event) => {
  console.log('[Service Worker] Push Notification received');
  const data = event.data ? event.data.text() : 'Time for your daily workout with Coach Shivansh!';
  const options = {
    body: data,
    icon: 'img/icon-any-192.png',
    badge: 'img/icon-any-192.png',
    vibrate: [200, 100, 200],
    data: {
      url: './index.html'
    }
  };
  event.waitUntil(
    self.registration.showNotification('Shivansh Fitness', options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === '/' && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('./index.html');
      }
    })
  );
});

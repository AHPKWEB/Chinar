const CACHE_NAME = 'MAWAHOTEL-cache-v1';
const urlsToCache = [
  '/',
  '/p/invoice.html',
  '/p/mawahotelinvoice.html',
  '/images/logo.png'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    clients.claim()
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request).then(response => response || caches.match('/p/mawahotelinvoice.html'));
    })
  );
});

// Service Worker for DSA Practical Workbench
// Enables 100% offline access for raambad-ilaaj.vercel.app

const CACHE_NAME = 'dsa-workbench-cache-v1';

// Static assets to precache immediately on install
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/favicon.svg',
  '/icons.svg',
  '/manifest.json',
  '/programs/exp1_linear_binary_search.c',
  '/programs/exp2_bubble_selection_sort.c',
  '/programs/exp3_hash_table_directory.c',
  '/programs/exp4_club_singly_linked_list.c',
  '/programs/exp5_cinemax_doubly_linked_list.c',
  '/programs/exp6_infix_postfix_stack.c',
  '/programs/exp7_pizza_parlor_queue.c',
  '/programs/exp8_binary_search_tree.c',
  '/programs/exp9_flight_paths_graph.c',
];

// Install Event: precache core assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event: cleanup older caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event: Stale-While-Revalidate with Cache-First Fallback
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Only handle GET requests
  if (req.method !== 'GET') return;

  // Handle SPA navigation requests
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).catch(() => {
        return caches.match('/index.html') || caches.match('/');
      })
    );
    return;
  }

  // Handle same-origin assets & fonts
  event.respondWith(
    caches.match(req).then((cachedResponse) => {
      const fetchPromise = fetch(req)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              // Cache Vite bundled assets, fonts, and programs
              if (
                url.origin === self.location.origin ||
                url.hostname.includes('fonts.googleapis.com') ||
                url.hostname.includes('fonts.gstatic.com')
              ) {
                cache.put(req, responseClone);
              }
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // If offline and not in cache, fallback to index.html for page loads
          if (req.mode === 'navigate') {
            return caches.match('/index.html');
          }
          return null;
        });

      // Return cached response immediately if found, otherwise wait for network
      return cachedResponse || fetchPromise;
    })
  );
});

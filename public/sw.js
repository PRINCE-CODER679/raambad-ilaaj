// Robust Offline Service Worker for DSA Practical Workbench
// Version 2: Complete Precache & Cache-First Architecture for 100% Offline Support

const CACHE_NAME = 'dsa-workbench-cache-v2';

const STATIC_PRECACHE = [
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

// Install: precache static files AND parse index.html to precache JS/CSS bundles
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      // Precache known static URLs
      await cache.addAll(STATIC_PRECACHE);

      // Fetch index.html and extract bundled JS and CSS to ensure they are precached
      try {
        const response = await fetch('/index.html', { cache: 'no-cache' });
        if (response && response.status === 200) {
          const html = await response.text();
          // Extract scripts and CSS link hrefs
          const scriptMatches = Array.from(html.matchAll(/src="([^"]+\.js)"/g), (m) => m[1]);
          const styleMatches = Array.from(html.matchAll(/href="([^"]+\.css)"/g), (m) => m[1]);
          const bundleUrls = Array.from(new Set([...scriptMatches, ...styleMatches]));
          if (bundleUrls.length > 0) {
            await cache.addAll(bundleUrls);
          }
        }
      } catch (err) {
        console.warn('ServiceWorker: Precache bundle extraction error:', err);
      }
    })()
  );
});

// Activate: clean up older caches and take immediate control
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
      await self.clients.claim();
    })()
  );
});

// Fetch: Instant Cache-First strategy with Stale-While-Revalidate background update
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // 1. Navigation requests (loading the web page or refreshing)
  if (req.mode === 'navigate') {
    event.respondWith(
      (async () => {
        // Check cache first for instant offline load
        const cached = await caches.match(req) || 
                       await caches.match('/index.html') || 
                       await caches.match('/');

        // If online, attempt background fetch to refresh the cache
        const networkFetch = fetch(req)
          .then(async (networkRes) => {
            if (networkRes && networkRes.status === 200) {
              const cache = await caches.open(CACHE_NAME);
              cache.put(req, networkRes.clone());
            }
            return networkRes;
          })
          .catch(() => null);

        // If cached response exists, return it immediately!
        if (cached) {
          return cached;
        }

        // Otherwise wait for network response
        const res = await networkFetch;
        if (res) return res;

        // Ultimate fallback
        return (await caches.match('/index.html')) || new Response('Offline', { status: 503 });
      })()
    );
    return;
  }

  // 2. Static assets: JS, CSS, fonts, SVG icons, and C program files
  event.respondWith(
    (async () => {
      // Look in cache first
      const cached = await caches.match(req, { ignoreSearch: true });
      if (cached) {
        // Asynchronously update in background if online
        fetch(req)
          .then(async (netRes) => {
            if (netRes && netRes.status === 200) {
              const cache = await caches.open(CACHE_NAME);
              cache.put(req, netRes);
            }
          })
          .catch(() => {});
        return cached;
      }

      // If not in cache, fetch from network and store in cache
      try {
        const netRes = await fetch(req);
        if (netRes && netRes.status === 200) {
          const cache = await caches.open(CACHE_NAME);
          cache.put(req, netRes.clone());
        }
        return netRes;
      } catch (err) {
        // If offline and asset is missing, return empty response instead of fatal crash
        return new Response('', { status: 408 });
      }
    })()
  );
});

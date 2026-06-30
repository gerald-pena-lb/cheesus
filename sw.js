/* Anima Christi service worker — network-first so updates always show.
   Strategy: when online, always fetch the latest file and refresh the cache.
   When offline, fall back to the cached copy (so the app still works).
   Bump CACHE whenever you want to force-clear old caches. */
const CACHE = "anima-christi-v3";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon.svg",
  "./css/styles.css",
  "./js/data.js",
  "./js/buddies.js",
  "./js/sound.js",
  "./js/config.js",
  "./js/sync.js",
  "./js/app.js",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", (e) => { if (e.data === "skipWaiting") self.skipWaiting(); });

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;        // Supabase / YouTube Kids → network
  if (url.pathname.startsWith("/api/")) return;       // runtime config → always network

  // Network-first: get the freshest file, update the cache, fall back offline.
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(e.request).then((hit) => hit || caches.match("./index.html")))
  );
});

const CACHE_NAME="market-intel-pwa-v1";
const FILES=["./","./index.html","./manifest.webmanifest","./icon.svg"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(FILES)).catch(()=>{}));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;const u=new URL(e.request.url);if(u.origin!==self.location.origin)return;e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request).then(r=>{if(r&&r.ok){const clone=r.clone();caches.open(CACHE_NAME).then(k=>k.put(e.request,clone))}return r})))});

// Optional offline worker retained for compatibility; intentionally NOT registered.
// Safe network-first strategy; no cache of third-party sites or error responses.
const CACHE = "astral-drinks-v20260927b";
const ASSETS = ["./","./index.html","./style.css","./app.js","./app-config.js","./manifest.webmanifest","./capa-mobile.png","./capa-desktop.png","./capa-tablet-vertical.png","./capa-tablet-horizontal.png","./favicon-32.png","./apple-touch-icon.png","./icon-192.png","./icon-512.png","./icon-maskable-512.png","./offline.html"];
self.addEventListener("install", event => event.waitUntil(self.skipWaiting()));
self.addEventListener("activate", event => event.waitUntil((async()=>{for(const key of await caches.keys())if(key.startsWith("astral-drinks-")&&key!==CACHE)await caches.delete(key);await self.clients.claim();})()));
self.addEventListener("fetch", event => {const req=event.request;if(req.method!=="GET"||new URL(req.url).origin!==self.location.origin)return;event.respondWith((async()=>{try{const response=await fetch(req);if(response.ok){const cache=await caches.open(CACHE);await cache.put(req,response.clone());}return response;}catch{const saved=await caches.match(req);if(saved)return saved;if(req.mode==="navigate")return await caches.match("./offline.html")||Response.error();return Response.error();}})());});

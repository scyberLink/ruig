(()=>{"use strict";const e="cacher-cache-v1",t=["/","/index.html","/manifest.json","/favicon.ico"];self.addEventListener("install",(c=>{c.waitUntil(caches.open(e).then((e=>e.addAll(t))).catch((e=>console.error("Cache installation failed:",e))))})),self.addEventListener("fetch",(t=>{t.respondWith(caches.match(t.request).then((c=>c||fetch(t.request).then((c=>{if(!c||200!==c.status||"basic"!==c.type)return c;const a=c.clone();return caches.open(e).then((e=>e.put(t.request,a))).catch((e=>console.error("Error caching response:",e))),c})).catch((e=>{console.error("Fetch failed:",e)})))))})),self.addEventListener("activate",(t=>{t.waitUntil(caches.keys().then((t=>Promise.all(t.filter((t=>t.startsWith("cacher-cache-")&&t!==e)).map((e=>caches.delete(e)))))))}))})();
//# sourceMappingURL=cacher.js.map
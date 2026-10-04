const C='keuangan-v8';
const A=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
const X='https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(async c=>{await c.addAll(A);try{await c.add(X)}catch(_){}}));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==C).map(n=>caches.delete(n)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(n=>{
    const cp=n.clone();caches.open(C).then(c=>c.put(e.request,cp));return n
  }).catch(()=>caches.match('./index.html'))));
});

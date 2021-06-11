var cacheName = 'petstore v-1'
var cacheFiles= [
     'work.html',
     'lessons.js',
     'lessons.webmanifest',
     'images/1.webp',
     'images/a.jpg',
     'images/b.jpg',
     'images/c.webp',
     'images/cc.jpg',
     'images/d.webp',
     'images/e.jpg',
     'images/f.jpg',
     'images/g.jpg',
     'images/h.jpg',
     'images/i.jpg',
     'images/j.jpg',
     'images/imagespwa.png'
]

self.addEventListener('install',(e)=>{
    console.log('[Service Worker] Install');
    e.waitUntill(
        caches.open(cacheName).then((cache)=>{
            console.log('[Service Worker] caching all the files');
            return cache.addAll(cacheFiles)
        })
    )
})

self.addEventListener('fetch', function(e){
    e.respondWith(
        caches.match(e.request).then(function(r){
            console.log('[Service Worker] Fetching result'+e.request.url);
            return r || fetch(e.request).then(function(response){
                return caches.open(cacheName).then(function(cache){
                    cache.put(e.request, response.clone());
                    return response;
                })
            })
        })
    )
})


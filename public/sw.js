var cacheName = 'Absense-page';
var filesToCache = [
  '/',
  'index.html',
  'login.html',
  'asset/front/vendor/bootstrap/css/bootstrap.min.css',
  'asset/front/vendor/fontawesome-free/css/all.min.css',
  'asset/front/vendor/magnific-popup/magnific-popup.css',
  '/asset/front/css/freelancer.css',
  '/asset/front/vendor/jquery/jquery.min.js',
  '/asset/front/vendor/bootstrap/js/bootstrap.bundle.min.js',
  '/asset/front/vendor/jquery-easing/jquery.easing.min.js',
  '/asset/front/vendor/magnific-popup/jquery.magnific-popup.min.js',
  '/asset/front/js/freelancer.js',
  '/asset/front/js/jqBootstrapValidation.js',
  '/asset/front/js/jqBootstrapValidation.js',
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});
self.addEventListener('activate',  event => {
  event.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, {ignoreSearch:true}).then(response => {
      return response || fetch(event.request);
    })
  );
});
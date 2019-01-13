import '@babel/polyfill';

console.log('Hello worker');


const PRECACHE = 'mycache-1';

const PRECACHE_URLS = [
  '/assets/manifest.json',
  '/assets/icon_192x192.714a1246445a6a0da1e3aadf1451234a.png',
  // application assets
  '/',
  '/assets/index.js',
];


async function precache(urls) {
  const cache = await caches.open(PRECACHE);
  return cache.addAll(urls);
}


self.addEventListener('install', (event) => { // eslint-disable-line no-restricted-globals
  console.log('inside install');
  event.waitUntil(precache(PRECACHE_URLS));
});

self.addEventListener('fetch', (event) => {


  const requestUrl = new URL(event.request.url);
  if (requestUrl.pathname === '/') {
    event.respondWith(staleWhileRevalidate(event.request));
  } else if (
    PRECACHE_URLS.includes(requestUrl.href) || PRECACHE_URLS.includes(requestUrl.pathname)
  ) {
    event.respondWith(cacheThenNetwork(event.request));
  } else {
    event.respondWith(fetch(event.request));
  }



});

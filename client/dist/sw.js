self.addEventListener('install', function(e) {
  console.log('installing')
  e.waitUntil(
   caches.open('brown-gateway-pwa').then(function(cache) {
     return cache.addAll([
       '/',
       '/index.html',
       '/index.css',
       '/brownlogo.png',
       '/bundle.js',
       '/index.js',
     ]);
   })
 );
});





self.addEventListener('fetch', function(e) {
    e.respondWith(
      caches.match(e.request).then(function(response) {
        if (response) {
          return response
        }
        if (!response) {
         return fetch(e.request).catch((err) => {
          }).then((response) => {
            return caches.open('brown-other-pwa').then(function(cache) {
             cache.put(e.request.url, response.clone())
            })
          }).catch((err) => {
            console.log(err)
          })
        }
      })
    );
});





/// Notes:
  // 1- Add sw and index.js file in each service (search/crud..)
  // 2- Run Chrome in ingore self-signed
  // 3- Offline mode cant submit crud actions, to do that use 'Bypass network' option




//// Resources:
// 1- https://google-developer-training.gitbooks.io/progressive-web-apps-ilt-concepts/content/docs/caching-files-with-service-worker.html (on a network response - changed the cache.put(event.request, response.clone()); to cache.put(event.request.url, response.clone());)
// 2- https://www.safaribooksonline.com/library/view/building-progressive-web/9781491961643/ch02.html#ch_02_your_first_service_worker
// 2b - https://www.safaribooksonline.com/library/view/building-progressive-web/9781491961643/app03.html#app_cors

// #### Running Chrome with ignore cert
// Due to self signed cert the pwa would not fetch. This is why we run Chrome in as

// $ /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --user-data-dir=/Users/<username>/Downloads/deleteme --ignore-certificate-errors --unsafely-treat-insecure-origin-as-secure=https://localhost:7777/


// ## Running Google lighthouse
//  $ npm install lighthouse --dev
//  $ ./node_modules/lighthouse/lighthouse-cli/index.js  <url> --view



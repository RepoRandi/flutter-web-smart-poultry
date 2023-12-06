'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"version.json": "f9d7bd2059b62bedf7c0fab14bde5822",
"index.html": "369998517546bd09c995fac8f62792ad",
"/": "369998517546bd09c995fac8f62792ad",
"main.dart.js": "3a88cc1578b458b81af1f459b28d6ce3",
"flutter.js": "6fef97aeca90b426343ba6c5c9dc5d4a",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "0fb8b1fa9cee5f46e08fcdd3ba901256",
"assets/AssetManifest.json": "febb54fdbff259b277fb6c5ca536a864",
"assets/NOTICES": "adaa7eef5ceb80153c615947d8912c45",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"assets/AssetManifest.bin": "64427ab57ba33cc8d7ec2e302d852e48",
"assets/fonts/MaterialIcons-Regular.otf": "48e5475b08b639d1403997c898b505db",
"assets/assets/images/vector_top.png": "c61969b5dcf6849c1a272ed84bec78fb",
"assets/assets/images/bg_how_it_work2.png": "daa8c20cc8914282e6ea1b873861289e",
"assets/assets/images/bg_product.png": "4c15488700bb86ff3dfc9ec1b5c6dd42",
"assets/assets/images/bg_how_it_work1.png": "f67675e327790ec04f81194ebecfc414",
"assets/assets/images/banner.png": "0f64f7752ddaf67606bb3b7b6e37855a",
"assets/assets/images/vector_bottom.png": "aa6bb8d92d29f03ce1c92bb959b472bd",
"assets/assets/images/no_orders.png": "3bdd934904b2d462592b562f4631c682",
"assets/assets/images/bg_home2.png": "9cf36cf1e7cdd63d7db5fd98997d1741",
"assets/assets/images/bg_home1.png": "f425bd53fdb96543d17d4be8614edc41",
"assets/assets/images/cctv.png": "ebf4f01f7390f4bb422ac5fda4a92ab3",
"assets/assets/images/background.jpg": "6d9378462ba9edde6fdb7a676fde46f2",
"assets/assets/images/background.png": "d50e13a3dd3eecdbbb73e50bc109f2f8",
"assets/assets/images/indicator1.png": "10ca73cb8065a113cb0c95a75cd5fbef",
"assets/assets/images/indicator2.png": "2202950d0da029d67f12e4ea00fce509",
"assets/assets/images/google_play.png": "a8f9ea4c067b906930d9c634b75f8e0e",
"assets/assets/images/app_store.png": "bde825d413a342ee0cdda43a9f8a48a6",
"assets/assets/images/content_product.png": "1cb4b4fe889780e9f5db509cacbb20ee",
"assets/assets/icons/icon_voucher.png": "e91148e4eccca91af5fd99d35a05c03e",
"assets/assets/icons/icon.png": "7269d5507274f58b4608701de03b4d58",
"assets/assets/icons/icon_wa.png": "89730ea7fc7002787dabf893f980bc19",
"assets/assets/icons/icon_evomo.png": "f2709e5d5ccd07fde7bebecba2dd8873",
"assets/assets/icons/icon_bni.png": "3029eb36ef7a24fbfa421076b15b194d",
"assets/assets/icons/icon_ig.png": "882e704613cf0a09944e2a493997e8ea",
"assets/assets/icons/icon_youtube.png": "da68d566f7864ba8752370a6854ac274",
"assets/assets/icons/icon_user.png": "2a2f9602fd6d12dbaa4e5778b8d3932a",
"assets/assets/icons/order_information.png": "39894113c597e936437646554debe169",
"assets/assets/icons/icon_order_success.png": "103c1279f5c10f4c4b669575521f29be",
"assets/assets/icons/delivery_information.png": "5c8632d2b39ee2d70997a87933fb2020",
"canvaskit/skwasm.js": "95f16c6690f955a45b2317496983dbe9",
"canvaskit/skwasm.wasm": "1a074e8452fe5e0d02b112e22cdcf455",
"canvaskit/chromium/canvaskit.js": "96ae916cd2d1b7320fff853ee22aebb0",
"canvaskit/chromium/canvaskit.wasm": "be0e3b33510f5b7b0cc76cc4d3e50048",
"canvaskit/canvaskit.js": "bbf39143dfd758d8d847453b120c8ebb",
"canvaskit/canvaskit.wasm": "42df12e09ecc0d5a4a34a69d7ee44314",
"canvaskit/skwasm.worker.js": "51253d3321b11ddb8d73fa8aa87d3b15"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}

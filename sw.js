/* ===== GMPos Service Worker v12 ===== */
const CACHE = 'gmpos-v12-static';
const STATIC_ASSETS = [
  '.',
  './index.html',
  './manifest.json',
  './style.css',
  './app.js',
  './v2.js',
  './icon-192.png',
  './icon-512.png'
];

// ============================================================
// 安装：预缓存静态资源
// ============================================================
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => {
      // 逐一缓存，避免单个失败导致全部失败
      return Promise.allSettled(
        STATIC_ASSETS.map(url =>
          cache.add(url).catch(() => console.warn('SW: 缓存失败', url))
        )
      );
    })
  );
  self.skipWaiting();
});

// ============================================================
// 激活：清理旧缓存
// ============================================================
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// ============================================================
// 请求：网络优先，避免 GitHub Pages 部署后继续跑旧 app.js/index.html
// ============================================================
self.addEventListener('fetch', e => {
  const url = e.request.url;

  // API 请求：只走网络，不缓存库存、用户、订单等业务数据
  if (url.includes('supabase.co')) {
    e.respondWith(fetch(e.request));
    return;
  }

  // 静态资源：优先取网络最新版，网络失败才回退缓存
  e.respondWith(fetchAndCache(e.request).catch(() =>
    caches.match(e.request).then(cached => cached || caches.match('./index.html'))
  ));
});

// ============================================================
// 请求并缓存（适用于静态资源）
// ============================================================
async function fetchAndCache(request) {
  const response = await fetch(request);
  if (response.ok) {
    const cache = await caches.open(CACHE);
    cache.put(request, response.clone());
  }
  return response;
}

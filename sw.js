/* GOMTI Ficha — service worker v202610271201 (funciona sem rede) */
var C = "gomti-ficha-202610271201";
var F = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png"];
self.addEventListener("install", function (e) { e.waitUntil(caches.open(C).then(function (c) { return c.addAll(F); }).then(function () { return self.skipWaiting(); })); });
self.addEventListener("activate", function (e) { e.waitUntil(caches.keys().then(function (ks) { return Promise.all(ks.filter(function (k) { return k !== C; }).map(function (k) { return caches.delete(k); })); }).then(function () { return self.clients.claim(); })); });
self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  if (e.request.mode === "navigate") { e.respondWith(fetch(e.request).then(function (r) { var c2 = r.clone(); caches.open(C).then(function (c) { c.put("./index.html", c2); }); return r; }).catch(function () { return caches.match("./index.html"); })); return; }
  e.respondWith(caches.match(e.request).then(function (r) { return r || fetch(e.request); }));
});

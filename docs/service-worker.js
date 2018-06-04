/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js");

importScripts(
  "./precache-manifest.a0931b0f72cf3d984fb3abec42ee3023.js"
);

workbox.core.setCacheNameDetails({prefix: "easy-wallet"});

workbox.skipWaiting();
workbox.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "index.html",
    "revision": "165ff70f1e644dc34358655becf246fe"
  },
  {
    "url": "precache-manifest.332ff3a178a2a0ff6765ce26d5af4fac.js",
    "revision": "332ff3a178a2a0ff6765ce26d5af4fac"
  },
  {
    "url": "precache-manifest.4dd33dc0b31794ec505ad6f7228038c9.js",
    "revision": "4dd33dc0b31794ec505ad6f7228038c9"
  },
  {
    "url": "precache-manifest.502f5f3b0ae638e63df14cb03934e9df.js",
    "revision": "502f5f3b0ae638e63df14cb03934e9df"
  },
  {
    "url": "precache-manifest.5e3fb63e5c7393530c0c7fb14d92ecd3.js",
    "revision": "5e3fb63e5c7393530c0c7fb14d92ecd3"
  },
  {
    "url": "precache-manifest.d98d17c279c21cd9c7f44924b982e804.js",
    "revision": "d98d17c279c21cd9c7f44924b982e804"
  },
  {
    "url": "precache-manifest.e2cafc1f20bff4920bd29bbf287c01fe.js",
    "revision": "e2cafc1f20bff4920bd29bbf287c01fe"
  },
  {
    "url": "precache-manifest.e3e5614cb2171092e57e554f3ae509a3.js",
    "revision": "e3e5614cb2171092e57e554f3ae509a3"
  },
  {
    "url": "service-worker.js",
    "revision": "36683e30be6f391c0bd4bc85db1209f4"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

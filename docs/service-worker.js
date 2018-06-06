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
  "./precache-manifest.9f47903d2a720878e2c0e7c3c51ee957.js"
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
    "revision": "a0f4be571a424efc47bc3672fe879323"
  },
  {
    "url": "precache-manifest.1c08f6fdbf7b2171a40998c056343dd9.js",
    "revision": "1c08f6fdbf7b2171a40998c056343dd9"
  },
  {
    "url": "precache-manifest.1d2a2b43df694489b30289d8d399dccc.js",
    "revision": "1d2a2b43df694489b30289d8d399dccc"
  },
  {
    "url": "precache-manifest.332ff3a178a2a0ff6765ce26d5af4fac.js",
    "revision": "332ff3a178a2a0ff6765ce26d5af4fac"
  },
  {
    "url": "precache-manifest.4708e73bead9746b8facdf7e5b7b6139.js",
    "revision": "4708e73bead9746b8facdf7e5b7b6139"
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
    "url": "precache-manifest.6deb1a39cf078605d0e36c9864bb2ba3.js",
    "revision": "6deb1a39cf078605d0e36c9864bb2ba3"
  },
  {
    "url": "precache-manifest.7dd6eeb1cf524c8d382e6bfccaddf210.js",
    "revision": "7dd6eeb1cf524c8d382e6bfccaddf210"
  },
  {
    "url": "precache-manifest.852c4a61eb039e3dab84eb0a6e4b3378.js",
    "revision": "852c4a61eb039e3dab84eb0a6e4b3378"
  },
  {
    "url": "precache-manifest.93a24fdb222a81cbda3531acbee3bea7.js",
    "revision": "93a24fdb222a81cbda3531acbee3bea7"
  },
  {
    "url": "precache-manifest.a0931b0f72cf3d984fb3abec42ee3023.js",
    "revision": "a0931b0f72cf3d984fb3abec42ee3023"
  },
  {
    "url": "precache-manifest.d204e14434acec921db1e1549a3d2add.js",
    "revision": "d204e14434acec921db1e1549a3d2add"
  },
  {
    "url": "precache-manifest.d7c90ead1d4942e006d18519ff5482ea.js",
    "revision": "d7c90ead1d4942e006d18519ff5482ea"
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
    "revision": "48eaea292fbf6f86700d1f517c9e3381"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

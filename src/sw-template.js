/* eslint-disable no-restricted-globals */
// @ts-nocheck
/* eslint-disable no-undef */
importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js"
);

workbox.loadModule("workbox-background-sync");
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

const { registerRoute } = workbox.routing;
const { CacheFirst, NetworkFirst, NetworkOnly } = workbox.strategies;
const { BackgroundSyncPlugin } = workbox.backgroundSync;

const baseUrl = process.env.REACT_APP_API_URL;

const cacheNetworkFirst = ["/api/auth/renew", "/api/events"];

registerRoute(({ request, url }) => {
  // console.log( request, url ) // checkear pathname..
  if (cacheNetworkFirst.includes(url.pathname)) return true;

  return false;
}, new NetworkFirst());

const cacheFirstNetwork = [
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css",
  "https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css",
];

registerRoute(({ request, url }) => {
  // console.log( request, url ) // checkear pathname..
  if (cacheFirstNetwork.includes(url.href)) return true;

  return false;
}, new CacheFirst());

// posteos offline

const bgSyncPlugin = new BackgroundSyncPlugin("posteos-offline-queue", {
  maxRetentionTime: 24 * 60, // Retry for max of 24 Hours (specified in minutes)
});

registerRoute(
  new RegExp(baseUrl),
  new NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
  "POST"
);

// ejemplo documentacion
// registerRoute(
//     /\/api\/.*\/*.json/,
//     new NetworkOnly({
//     plugins: [bgSyncPlugin],
//     }),
//     'POST'
// );

// Posteos Offline -- PUT - DELETE
registerRoute(
  new RegExp(baseUrl),
  new NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
  "PUT"
);

registerRoute(
  new RegExp(baseUrl),
  new NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
  "DELETE"
);

/* eslint-disable no-restricted-globals */
import { registerRoute } from 'workbox-routing';
import { CacheFirst } from 'workbox-strategies';
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';

// Precache files
precacheAndRoute(self.__WB_MANIFEST);

// Register a route for handling caching of images
registerRoute(
    ({ request }) => request.destination === 'image',
    new CacheFirst({
        cacheName: 'image-cache',
    })
);

// Clean up outdated caches
cleanupOutdatedCaches();

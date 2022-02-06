import { clientsClaim, skipWaiting } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute } from 'workbox-precaching';
import {
  registerRoute,
  setCatchHandler,
  setDefaultHandler,
} from 'workbox-routing';
import {
  CacheFirst,
  NetworkFirst,
  NetworkOnly,
  StaleWhileRevalidate,
} from 'workbox-strategies';

const YEAR = 31536000;

try {
  skipWaiting();
  clientsClaim();
  //@ts-ignore
  precacheAndRoute(self.__WB_MANIFEST);

  registerRoute(
    '/',
    new NetworkFirst({
      cacheName: 'start-url',
      plugins: [
        new ExpirationPlugin({
          maxEntries: 1,
          maxAgeSeconds: YEAR,
          purgeOnQuotaError: true,
        }),
      ],
    }),
    'GET'
  );

  registerRoute(
    /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
    new CacheFirst({
      cacheName: 'google-fonts',
      plugins: [
        new ExpirationPlugin({
          maxEntries: 4,
          maxAgeSeconds: YEAR,
          purgeOnQuotaError: true,
        }),
      ],
    }),
    'GET'
  );

  registerRoute(
    /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
    new StaleWhileRevalidate({
      cacheName: 'static-font-assets',
      plugins: [
        new ExpirationPlugin({
          maxEntries: 4,
          maxAgeSeconds: YEAR,
          purgeOnQuotaError: true,
        }),
      ],
    }),
    'GET'
  );

  registerRoute(
    /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
    new NetworkOnly(),
    'GET'
  );

  registerRoute(
    /\.(?:js)$/i,
    new StaleWhileRevalidate({
      cacheName: 'static-js-assets',
      plugins: [
        new ExpirationPlugin({
          maxEntries: 32,
          maxAgeSeconds: YEAR,
          purgeOnQuotaError: true,
        }),
      ],
    }),
    'GET'
  );

  registerRoute(
    /\.(?:css|less)$/i,
    new StaleWhileRevalidate({
      cacheName: 'static-style-assets',
      plugins: [
        new ExpirationPlugin({
          maxEntries: 32,
          maxAgeSeconds: YEAR,
          purgeOnQuotaError: true,
        }),
      ],
    }),
    'GET'
  );

  registerRoute(
    /\.(?:json|xml|csv)$/i,
    new NetworkFirst({
      cacheName: 'static-data-assets',
      plugins: [
        new ExpirationPlugin({
          maxEntries: 32,
          maxAgeSeconds: YEAR,
          purgeOnQuotaError: true,
        }),
      ],
    }),
    'GET'
  );

  registerRoute(
    /.*/i,
    new NetworkFirst({
      cacheName: 'others',
      networkTimeoutSeconds: 10,
      plugins: [
        new ExpirationPlugin({
          maxEntries: 32,
          maxAgeSeconds: YEAR,
          purgeOnQuotaError: true,
        }),
      ],
    }),
    'GET'
  );

  setDefaultHandler(new StaleWhileRevalidate());

  setCatchHandler(() => {
    return Promise.resolve(Response.error());
  });
} catch (err) {
  console.info('if you are in development mode this error is expected: ', err);
}

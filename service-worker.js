/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["bower_components/app-behaviors/app-i18n.html","82f0899e6e23a9c464f9e2532b7b8f6d"],["bower_components/app-behaviors/app-locale-behavior.html","8e35fad289a6cb31821a22f0d3ec8ac2"],["bower_components/app-behaviors/app-meta.html","4d02e9f83916a709168436e68e1a378e"],["bower_components/app-behaviors/app-receiver-behavior.html","37169b7b8d0e832b4d89daf50490d404"],["bower_components/app-behaviors/app-route.html","d18a543d271d77b53fb9b8a02c36927c"],["bower_components/app-behaviors/app-router.html","92ec7f2fe5e25af9375b131786f5a80e"],["bower_components/app-behaviors/app-shell-behavior.html","25f037cf76b7c5187053a3310630d63e"],["bower_components/app-behaviors/app-store-behavior.html","c541940af071918719caaa982cf17e36"],["bower_components/app-behaviors/app-view.html","c95c4ac8340d4c4b79ef83bbf7f2f581"],["bower_components/expandjs/dist/expand.js","925ac144dcf7e3453a6f65fbe4630971"],["bower_components/expandjs/expandjs.html","4673f1e5a3fac7a3356b3d1b24864716"],["bower_components/font-roboto/roboto.html","3dd603efe9524a774943ee9bf2f51532"],["bower_components/iron-flex-layout/iron-flex-layout.html","3d7e29133f3f5152fbea996a9747c2dd"],["bower_components/mat-elements/mat-button.html","bc6ce0be5cf691768914fda38fbe8173"],["bower_components/mat-elements/mat-dialog.html","526c527fbf77da2ef7c87e5e1225d98f"],["bower_components/mat-elements/mat-divider.html","1ed299a8af6ed62d9ee3c024f1bdfbf5"],["bower_components/mat-elements/mat-drawer-panel.html","06bafbb1ae9722ee276aefc23e9d65fd"],["bower_components/mat-elements/mat-drawer.html","adddfa980c39879783365f2d72ac7743"],["bower_components/mat-elements/mat-dropdown.html","b389f471c542346c9fdde5f65fe2320d"],["bower_components/mat-elements/mat-fab.html","b0b6eb9d01578f55dcc020a7de70a022"],["bower_components/mat-elements/mat-header-panel.html","c7f6afe5cb828e8ee1074da6797199ce"],["bower_components/mat-elements/mat-header.html","ef3b3e5d33329341800135d19a37ec34"],["bower_components/mat-elements/mat-icon-button.html","9b7af8a40cf7337ff1f84a6990153f7e"],["bower_components/mat-elements/mat-icon.html","dc968f3a1b10e0e7ee883fb46fa6aa58"],["bower_components/mat-elements/mat-icons.html","5050a7ec8b23b44bb583367119242e10"],["bower_components/mat-elements/mat-ink-behavior.html","6ae5909000117aa819f9fa6f3986db10"],["bower_components/mat-elements/mat-ink-styles.html","0f74b162efefd528912db9e846508eb4"],["bower_components/mat-elements/mat-ink.html","5730bf3838f062ea4b8cbb14608fc779"],["bower_components/mat-elements/mat-input-checked-behavior.html","f9fec9d0bb065bf2c1719b7cb399af20"],["bower_components/mat-elements/mat-input-styles.html","c52621d6d754fbc69112166f913de821"],["bower_components/mat-elements/mat-input-value-behavior.html","1b0a640ea3afc38b9c4564eb1071a18a"],["bower_components/mat-elements/mat-item.html","5e9c4b8f88572557a74b8f76e8a859a0"],["bower_components/mat-elements/mat-label.html","65f86425641cab8a8660caf3c41b043b"],["bower_components/mat-elements/mat-list.html","f6c24e2fc168ffb20799336354582139"],["bower_components/mat-elements/mat-menu.html","9098bae69198155133331a39c2b6cc65"],["bower_components/mat-elements/mat-motion.html","206e86dff434034c4f30d35014fa8e67"],["bower_components/mat-elements/mat-option.html","139ea1341f846fcdc557253f6ce515d8"],["bower_components/mat-elements/mat-page.html","5dab8ee9828f0a9f402420c19e673886"],["bower_components/mat-elements/mat-pages.html","3035182d37b472bb7a255c943a0d21da"],["bower_components/mat-elements/mat-palette.html","134803e1e1ea19edef20fbcec7e136f5"],["bower_components/mat-elements/mat-paper-behavior.html","763b6c153a5f7d84cf99ee281e9f368a"],["bower_components/mat-elements/mat-paper-styles.html","287c62133239b1a37dc1e55aacb1aa07"],["bower_components/mat-elements/mat-paper.html","0eaf3605943549dc463b17226cd489b5"],["bower_components/mat-elements/mat-pressed-behavior.html","953de6312677f407212fb39e79d8c0be"],["bower_components/mat-elements/mat-pressed-ink-behavior.html","4cb48c9629cd3c9376e302a1f364d95e"],["bower_components/mat-elements/mat-pressed-ink-styles.html","ab98b630ad54ad5204f527a66e0392e1"],["bower_components/mat-elements/mat-pressed-paper-behavior.html","cf61f52ad37f7c1ae4d763e56d76091d"],["bower_components/mat-elements/mat-pressed-paper-styles.html","0aedae0d349b3bf28a2368d874a85896"],["bower_components/mat-elements/mat-pressed-styles.html","b7ad689066f9dd1fd48266668add13a9"],["bower_components/mat-elements/mat-radio.html","0450093eee5f35d47789888607d51262"],["bower_components/mat-elements/mat-shadow.html","b96c78723f928917a6bc392f8914c7a1"],["bower_components/mat-elements/mat-shell-behavior.html","04d5713244bf5a72adcfaa2bef900816"],["bower_components/mat-elements/mat-shell-styles.html","5b21ebf50a8d8bfaf8d64fa0637fc837"],["bower_components/mat-elements/mat-spacing.html","d6d45a6f7bfe5a6bee9f8a73bcdf3245"],["bower_components/mat-elements/mat-tab.html","4a902b7cd9c4f4360b21690d22ca572d"],["bower_components/mat-elements/mat-tabs.html","118d85a3c213d0e7f97ac91deaab460a"],["bower_components/mat-elements/mat-typography.html","333c305f1eacf409d1386761a8a2fa28"],["bower_components/polymer/polymer-micro.html","12be446d335715e563d762dd609d92a0"],["bower_components/polymer/polymer-mini.html","6afe49b462ac45a9c2ce76da0d130e37"],["bower_components/polymer/polymer.html","28392f83d91b5785336c2c167a902c99"],["bower_components/webcomponentsjs/webcomponents.js","076008b4fea83604a4436b28e915e892"],["bower_components/xp-elements/xp-anchor-behavior.html","7310400d0690440da5a76eb11a6eb1b9"],["bower_components/xp-elements/xp-anchor-styles.html","7fa499e832832cf664890ef8911c486e"],["bower_components/xp-elements/xp-base-behavior.html","bc197fafa3004ed9ea08bc25f2b92553"],["bower_components/xp-elements/xp-dialog-behavior.html","078b3fd4ee11a0584162e11b002e911f"],["bower_components/xp-elements/xp-dialog-styles.html","387c473dd47f6a4a67b7ddafaa49cece"],["bower_components/xp-elements/xp-dialog-wrapper.html","7d02b14818e620e9a9bd869f485feb2f"],["bower_components/xp-elements/xp-finder-behavior.html","a95eeabee67076c38d495c92fbfdc626"],["bower_components/xp-elements/xp-focused-behavior.html","fc261ffd821b70a91cb5f2ffd5507f79"],["bower_components/xp-elements/xp-focused-styles.html","f85a12fc7c22c8200af25d4ddebbac96"],["bower_components/xp-elements/xp-icon-behavior.html","50d5275aa3bc4a3eec5a7f69721ad864"],["bower_components/xp-elements/xp-icon-styles.html","56403d5e5c814b339baa46ad06c3276a"],["bower_components/xp-elements/xp-iconset-finder.html","fb3315a4d1aad98141e77507b9d3a2fc"],["bower_components/xp-elements/xp-iconset.html","2e425c122de6c0117889d5169f1c5047"],["bower_components/xp-elements/xp-input-behavior.html","97dd7d28808142d462c22e354aa2f51c"],["bower_components/xp-elements/xp-input-checked-behavior.html","68ab1a2c8b19fbe054dee103088ffaac"],["bower_components/xp-elements/xp-input-styles.html","26beaf16b18f80ba5035aad2974a692b"],["bower_components/xp-elements/xp-input-value-behavior.html","299cf72450020360f9573a3a81c34ac8"],["bower_components/xp-elements/xp-label-behavior.html","d0ef7be2d9f0ddf0a00505aa82cc79c9"],["bower_components/xp-elements/xp-label-styles.html","6f713a69c8efda8d3ae99b49ce6e435f"],["bower_components/xp-elements/xp-list-behavior.html","71c74867fefa9c9300a3492be102d29a"],["bower_components/xp-elements/xp-list-styles.html","a2975df8f2a921a138e40bab24e4e1dd"],["bower_components/xp-elements/xp-master-slave-behavior.html","0e7c1faa54f3e2fa92c04f28a39acf91"],["bower_components/xp-elements/xp-media-query.html","e20ab0676cbd120bc32872a8d41937c7"],["bower_components/xp-elements/xp-menu-behavior.html","d12434e2c22f539d049ac61e233a5048"],["bower_components/xp-elements/xp-menu-styles.html","8797ffc6a9058324f10ffa58cbc99045"],["bower_components/xp-elements/xp-menu-wrapper.html","f266c0a352725b071d7405816965bddf"],["bower_components/xp-elements/xp-meta-behavior.html","add59f90a5d75c594562125a681ecac8"],["bower_components/xp-elements/xp-overlay-behavior.html","d286c463215907b84247619f4ea4b8f8"],["bower_components/xp-elements/xp-overlay-injector.html","d64332e2f4cb5065de1273e09222b01d"],["bower_components/xp-elements/xp-overlay-styles.html","2081fa0deaf5b0093e9b6d772e696fbb"],["bower_components/xp-elements/xp-overlay-wrapper.html","42c9b6c55c29b95d33146ac2d4285114"],["bower_components/xp-elements/xp-page-behavior.html","cab17495738f79527a95f505bea7669f"],["bower_components/xp-elements/xp-page-styles.html","7ece1791f37d4541e9e49cb18a72ebd2"],["bower_components/xp-elements/xp-pages-behavior.html","ebce4d4956349c0ad607afd135d36516"],["bower_components/xp-elements/xp-pages-styles.html","9dcb9cf44618e6955176a396b7b7dbb3"],["bower_components/xp-elements/xp-pressed-behavior.html","dcc7072cd34f7f8053d9aec477c2cf19"],["bower_components/xp-elements/xp-pressed-styles.html","61a9fea7d48edebd9c39cd3dfa67f81b"],["bower_components/xp-elements/xp-selector-behavior.html","3528846a3deda89221a73b47ebcac2c8"],["bower_components/xp-elements/xp-selector-multi-behavior.html","612e2a74506260e156aa5ffd8af94a6e"],["bower_components/xp-elements/xp-selector.html","a57e83032065b23b01faa02cfce0cc32"],["bower_components/xp-elements/xp-tab-behavior.html","18993f02bcabb3f327d17822f4acea3b"],["bower_components/xp-elements/xp-tab-styles.html","86a8cf0f1aabe7d4e7c44121247fcaf1"],["bower_components/xp-elements/xp-tabs-behavior.html","ca977e784c7818f8af947c0cd818d8a3"],["bower_components/xp-elements/xp-tabs-styles.html","9bb759a848227fd5c8ad79a197ad8db8"],["bower_components/xp-elements/xp-targeter-behavior.html","695827ba869204a9b4046e949528aa56"],["bower_components/xp-elements/xp-wrapper-behavior.html","1dd46f0c96137fbd88cf6d3f1b61f8a6"],["src/kit-behaviors/kit-base-behavior.html","e8ba1511d1603f8f64f5cebef50f6e8a"],["src/kit-behaviors/kit-dialog-behavior.html","c369d647613b65e141bee76a1e790ead"],["src/kit-behaviors/kit-menu-behavior.html","991c08982d57b87a698f32a234eba163"],["src/kit-behaviors/kit-view-behavior.html","cd853fb863b7ed1feb79676e1a772a39"],["src/kit-dialogs/kit-dialog-settings.html","68cdfae5561b3e403e2d8fae20306a26"],["src/kit-i18n/kit-i18n-de_DE.html","feb9bd471111ff20740d3c0fc71d292c"],["src/kit-i18n/kit-i18n-en_US.html","85671463b8f6068acd3ff04053e0a0f6"],["src/kit-i18n/kit-i18n-it_IT.html","9e7ee0c4324d7e9ff672668a8c5fcb7f"],["src/kit-icons.html","e7cfed6437b399b7aca9fb5bcd954a9a"],["src/kit-menus/kit-menu-more.html","ec0f0363a505ba57024c49a4dd4cd34f"],["src/kit-meta.html","4c3c0af089539920433ad79f1d878229"],["src/kit-meta/kit-meta-locales.html","9af3cd99ff45f8d8488426681215cf29"],["src/kit-meta/kit-meta-topics.html","1886ba0c73c50d08ffdc2b62179327a3"],["src/kit-shell.html","f9f92d8712ef3aafdeb3644b4422408f"],["src/kit-store.html","0452dcda7809a7371099315ae114dab6"],["src/kit-styles/kit-base-styles.html","f5c8b9595c37072dba0b0aec8e230eb2"],["src/kit-styles/kit-view-styles.html","e2320b68d0f089734e67a09dda6baa08"],["src/kit-views/kit-view-home.html","7a0ecb8c4d006200d96bace33eaf028d"],["src/kit-views/kit-view-page.html","07eba684d2e0a15009e192748807aba2"],["index.html","018c0031afeb701101dbcbe795fecc82"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {

      // Force the SW to transition from installing -> active state
      return self.skipWaiting();

    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {

      return self.clients.claim();

    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = '';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = 'index.html';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted(["\\/[^\\/\\.]*(\\?|$)"], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});


// *** Start of auto-included sw-toolbox code. ***
/*
 Copyright 2016 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.toolbox=e()}}(function(){return function e(t,n,r){function o(c,s){if(!n[c]){if(!t[c]){var a="function"==typeof require&&require;if(!s&&a)return a(c,!0);if(i)return i(c,!0);var u=new Error("Cannot find module '"+c+"'");throw u.code="MODULE_NOT_FOUND",u}var f=n[c]={exports:{}};t[c][0].call(f.exports,function(e){var n=t[c][1][e];return o(n?n:e)},f,f.exports,e,t,n,r)}return n[c].exports}for(var i="function"==typeof require&&require,c=0;c<r.length;c++)o(r[c]);return o}({1:[function(e,t,n){"use strict";function r(e,t){t=t||{};var n=t.debug||m.debug;n&&console.log("[sw-toolbox] "+e)}function o(e){var t;return e&&e.cache&&(t=e.cache.name),t=t||m.cache.name,caches.open(t)}function i(e,t){t=t||{};var n=t.successResponses||m.successResponses;return fetch(e.clone()).then(function(r){return"GET"===e.method&&n.test(r.status)&&o(t).then(function(n){n.put(e,r).then(function(){var r=t.cache||m.cache;(r.maxEntries||r.maxAgeSeconds)&&r.name&&c(e,n,r)})}),r.clone()})}function c(e,t,n){var r=s.bind(null,e,t,n);d=d?d.then(r):r()}function s(e,t,n){var o=e.url,i=n.maxAgeSeconds,c=n.maxEntries,s=n.name,a=Date.now();return r("Updating LRU order for "+o+". Max entries is "+c+", max age is "+i),g.getDb(s).then(function(e){return g.setTimestampForUrl(e,o,a)}).then(function(e){return g.expireEntries(e,c,i,a)}).then(function(e){r("Successfully updated IDB.");var n=e.map(function(e){return t.delete(e)});return Promise.all(n).then(function(){r("Done with cache cleanup.")})}).catch(function(e){r(e)})}function a(e,t,n){return r("Renaming cache: ["+e+"] to ["+t+"]",n),caches.delete(t).then(function(){return Promise.all([caches.open(e),caches.open(t)]).then(function(t){var n=t[0],r=t[1];return n.keys().then(function(e){return Promise.all(e.map(function(e){return n.match(e).then(function(t){return r.put(e,t)})}))}).then(function(){return caches.delete(e)})})})}function u(e,t){return o(t).then(function(t){return t.add(e)})}function f(e,t){return o(t).then(function(t){return t.delete(e)})}function h(e){e instanceof Promise||p(e),m.preCacheItems=m.preCacheItems.concat(e)}function p(e){var t=Array.isArray(e);if(t&&e.forEach(function(e){"string"==typeof e||e instanceof Request||(t=!1)}),!t)throw new TypeError("The precache method expects either an array of strings and/or Requests or a Promise that resolves to an array of strings and/or Requests.");return e}function l(e,t,n){if(!e)return!1;if(t){var r=e.headers.get("date");if(r){var o=new Date(r);if(o.getTime()+1e3*t<n)return!1}}return!0}var d,m=e("./options"),g=e("./idb-cache-expiration");t.exports={debug:r,fetchAndCache:i,openCache:o,renameCache:a,cache:u,uncache:f,precache:h,validatePrecacheInput:p,isResponseFresh:l}},{"./idb-cache-expiration":2,"./options":4}],2:[function(e,t,n){"use strict";function r(e){return new Promise(function(t,n){var r=indexedDB.open(u+e,f);r.onupgradeneeded=function(){var e=r.result.createObjectStore(h,{keyPath:p});e.createIndex(l,l,{unique:!1})},r.onsuccess=function(){t(r.result)},r.onerror=function(){n(r.error)}})}function o(e){return e in d||(d[e]=r(e)),d[e]}function i(e,t,n){return new Promise(function(r,o){var i=e.transaction(h,"readwrite"),c=i.objectStore(h);c.put({url:t,timestamp:n}),i.oncomplete=function(){r(e)},i.onabort=function(){o(i.error)}})}function c(e,t,n){return t?new Promise(function(r,o){var i=1e3*t,c=[],s=e.transaction(h,"readwrite"),a=s.objectStore(h),u=a.index(l);u.openCursor().onsuccess=function(e){var t=e.target.result;if(t&&n-i>t.value[l]){var r=t.value[p];c.push(r),a.delete(r),t.continue()}},s.oncomplete=function(){r(c)},s.onabort=o}):Promise.resolve([])}function s(e,t){return t?new Promise(function(n,r){var o=[],i=e.transaction(h,"readwrite"),c=i.objectStore(h),s=c.index(l),a=s.count();s.count().onsuccess=function(){var e=a.result;e>t&&(s.openCursor().onsuccess=function(n){var r=n.target.result;if(r){var i=r.value[p];o.push(i),c.delete(i),e-o.length>t&&r.continue()}})},i.oncomplete=function(){n(o)},i.onabort=r}):Promise.resolve([])}function a(e,t,n,r){return c(e,n,r).then(function(n){return s(e,t).then(function(e){return n.concat(e)})})}var u="sw-toolbox-",f=1,h="store",p="url",l="timestamp",d={};t.exports={getDb:o,setTimestampForUrl:i,expireEntries:a}},{}],3:[function(e,t,n){"use strict";function r(e){var t=a.match(e.request);t?e.respondWith(t(e.request)):a.default&&"GET"===e.request.method&&0===e.request.url.indexOf("http")&&e.respondWith(a.default(e.request))}function o(e){s.debug("activate event fired");var t=u.cache.name+"$$$inactive$$$";e.waitUntil(s.renameCache(t,u.cache.name))}function i(e){return e.reduce(function(e,t){return e.concat(t)},[])}function c(e){var t=u.cache.name+"$$$inactive$$$";s.debug("install event fired"),s.debug("creating cache ["+t+"]"),e.waitUntil(s.openCache({cache:{name:t}}).then(function(e){return Promise.all(u.preCacheItems).then(i).then(s.validatePrecacheInput).then(function(t){return s.debug("preCache list: "+(t.join(", ")||"(none)")),e.addAll(t)})}))}e("serviceworker-cache-polyfill");var s=e("./helpers"),a=e("./router"),u=e("./options");t.exports={fetchListener:r,activateListener:o,installListener:c}},{"./helpers":1,"./options":4,"./router":6,"serviceworker-cache-polyfill":16}],4:[function(e,t,n){"use strict";var r;r=self.registration?self.registration.scope:self.scope||new URL("./",self.location).href,t.exports={cache:{name:"$$$toolbox-cache$$$"+r+"$$$",maxAgeSeconds:null,maxEntries:null},debug:!1,networkTimeoutSeconds:null,preCacheItems:[],successResponses:/^0|([123]\d\d)|(40[14567])|410$/}},{}],5:[function(e,t,n){"use strict";var r=new URL("./",self.location),o=r.pathname,i=e("path-to-regexp"),c=function(e,t,n,r){t instanceof RegExp?this.fullUrlRegExp=t:(0!==t.indexOf("/")&&(t=o+t),this.keys=[],this.regexp=i(t,this.keys)),this.method=e,this.options=r,this.handler=n};c.prototype.makeHandler=function(e){var t;if(this.regexp){var n=this.regexp.exec(e);t={},this.keys.forEach(function(e,r){t[e.name]=n[r+1]})}return function(e){return this.handler(e,t,this.options)}.bind(this)},t.exports=c},{"path-to-regexp":15}],6:[function(e,t,n){"use strict";function r(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}var o=e("./route"),i=e("./helpers"),c=function(e,t){for(var n=e.entries(),r=n.next(),o=[];!r.done;){var i=new RegExp(r.value[0]);i.test(t)&&o.push(r.value[1]),r=n.next()}return o},s=function(){this.routes=new Map,this.routes.set(RegExp,new Map),this.default=null};["get","post","put","delete","head","any"].forEach(function(e){s.prototype[e]=function(t,n,r){return this.add(e,t,n,r)}}),s.prototype.add=function(e,t,n,c){c=c||{};var s;t instanceof RegExp?s=RegExp:(s=c.origin||self.location.origin,s=s instanceof RegExp?s.source:r(s)),e=e.toLowerCase();var a=new o(e,t,n,c);this.routes.has(s)||this.routes.set(s,new Map);var u=this.routes.get(s);u.has(e)||u.set(e,new Map);var f=u.get(e),h=a.regexp||a.fullUrlRegExp;f.has(h.source)&&i.debug('"'+t+'" resolves to same regex as existing route.'),f.set(h.source,a)},s.prototype.matchMethod=function(e,t){var n=new URL(t),r=n.origin,o=n.pathname;return this._match(e,c(this.routes,r),o)||this._match(e,[this.routes.get(RegExp)],t)},s.prototype._match=function(e,t,n){if(0===t.length)return null;for(var r=0;r<t.length;r++){var o=t[r],i=o&&o.get(e.toLowerCase());if(i){var s=c(i,n);if(s.length>0)return s[0].makeHandler(n)}}return null},s.prototype.match=function(e){return this.matchMethod(e.method,e.url)||this.matchMethod("any",e.url)},t.exports=new s},{"./helpers":1,"./route":5}],7:[function(e,t,n){"use strict";function r(e,t,n){return n=n||{},i.debug("Strategy: cache first ["+e.url+"]",n),i.openCache(n).then(function(t){return t.match(e).then(function(t){var r=n.cache||o.cache,c=Date.now();return i.isResponseFresh(t,r.maxAgeSeconds,c)?t:i.fetchAndCache(e,n)})})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],8:[function(e,t,n){"use strict";function r(e,t,n){return n=n||{},i.debug("Strategy: cache only ["+e.url+"]",n),i.openCache(n).then(function(t){return t.match(e).then(function(e){var t=n.cache||o.cache,r=Date.now();if(i.isResponseFresh(e,t.maxAgeSeconds,r))return e})})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],9:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: fastest ["+e.url+"]",n),new Promise(function(r,c){var s=!1,a=[],u=function(e){a.push(e.toString()),s?c(new Error('Both cache and network failed: "'+a.join('", "')+'"')):s=!0},f=function(e){e instanceof Response?r(e):u("No result returned")};o.fetchAndCache(e.clone(),n).then(f,u),i(e,t,n).then(f,u)})}var o=e("../helpers"),i=e("./cacheOnly");t.exports=r},{"../helpers":1,"./cacheOnly":8}],10:[function(e,t,n){t.exports={networkOnly:e("./networkOnly"),networkFirst:e("./networkFirst"),cacheOnly:e("./cacheOnly"),cacheFirst:e("./cacheFirst"),fastest:e("./fastest")}},{"./cacheFirst":7,"./cacheOnly":8,"./fastest":9,"./networkFirst":11,"./networkOnly":12}],11:[function(e,t,n){"use strict";function r(e,t,n){n=n||{};var r=n.successResponses||o.successResponses,c=n.networkTimeoutSeconds||o.networkTimeoutSeconds;return i.debug("Strategy: network first ["+e.url+"]",n),i.openCache(n).then(function(t){var s,a,u=[];if(c){var f=new Promise(function(r){s=setTimeout(function(){t.match(e).then(function(e){var t=n.cache||o.cache,c=Date.now(),s=t.maxAgeSeconds;i.isResponseFresh(e,s,c)&&r(e)})},1e3*c)});u.push(f)}var h=i.fetchAndCache(e,n).then(function(e){if(s&&clearTimeout(s),r.test(e.status))return e;throw i.debug("Response was an HTTP error: "+e.statusText,n),a=e,new Error("Bad response")}).catch(function(r){return i.debug("Network or response error, fallback to cache ["+e.url+"]",n),t.match(e).then(function(e){if(e)return e;if(a)return a;throw r})});return u.push(h),Promise.race(u)})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],12:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: network only ["+e.url+"]",n),fetch(e)}var o=e("../helpers");t.exports=r},{"../helpers":1}],13:[function(e,t,n){"use strict";var r=e("./options"),o=e("./router"),i=e("./helpers"),c=e("./strategies"),s=e("./listeners");i.debug("Service Worker Toolbox is loading"),self.addEventListener("install",s.installListener),self.addEventListener("activate",s.activateListener),self.addEventListener("fetch",s.fetchListener),t.exports={networkOnly:c.networkOnly,networkFirst:c.networkFirst,cacheOnly:c.cacheOnly,cacheFirst:c.cacheFirst,fastest:c.fastest,router:o,options:r,cache:i.cache,uncache:i.uncache,precache:i.precache}},{"./helpers":1,"./listeners":3,"./options":4,"./router":6,"./strategies":10}],14:[function(e,t,n){t.exports=Array.isArray||function(e){return"[object Array]"==Object.prototype.toString.call(e)}},{}],15:[function(e,t,n){function r(e,t){for(var n,r=[],o=0,i=0,c="",s=t&&t.delimiter||"/";null!=(n=x.exec(e));){var f=n[0],h=n[1],p=n.index;if(c+=e.slice(i,p),i=p+f.length,h)c+=h[1];else{var l=e[i],d=n[2],m=n[3],g=n[4],v=n[5],w=n[6],y=n[7];c&&(r.push(c),c="");var b=null!=d&&null!=l&&l!==d,E="+"===w||"*"===w,R="?"===w||"*"===w,k=n[2]||s,$=g||v;r.push({name:m||o++,prefix:d||"",delimiter:k,optional:R,repeat:E,partial:b,asterisk:!!y,pattern:$?u($):y?".*":"[^"+a(k)+"]+?"})}}return i<e.length&&(c+=e.substr(i)),c&&r.push(c),r}function o(e,t){return s(r(e,t))}function i(e){return encodeURI(e).replace(/[\/?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function c(e){return encodeURI(e).replace(/[?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function s(e){for(var t=new Array(e.length),n=0;n<e.length;n++)"object"==typeof e[n]&&(t[n]=new RegExp("^(?:"+e[n].pattern+")$"));return function(n,r){for(var o="",s=n||{},a=r||{},u=a.pretty?i:encodeURIComponent,f=0;f<e.length;f++){var h=e[f];if("string"!=typeof h){var p,l=s[h.name];if(null==l){if(h.optional){h.partial&&(o+=h.prefix);continue}throw new TypeError('Expected "'+h.name+'" to be defined')}if(v(l)){if(!h.repeat)throw new TypeError('Expected "'+h.name+'" to not repeat, but received `'+JSON.stringify(l)+"`");if(0===l.length){if(h.optional)continue;throw new TypeError('Expected "'+h.name+'" to not be empty')}for(var d=0;d<l.length;d++){if(p=u(l[d]),!t[f].test(p))throw new TypeError('Expected all "'+h.name+'" to match "'+h.pattern+'", but received `'+JSON.stringify(p)+"`");o+=(0===d?h.prefix:h.delimiter)+p}}else{if(p=h.asterisk?c(l):u(l),!t[f].test(p))throw new TypeError('Expected "'+h.name+'" to match "'+h.pattern+'", but received "'+p+'"');o+=h.prefix+p}}else o+=h}return o}}function a(e){return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function u(e){return e.replace(/([=!:$\/()])/g,"\\$1")}function f(e,t){return e.keys=t,e}function h(e){return e.sensitive?"":"i"}function p(e,t){var n=e.source.match(/\((?!\?)/g);if(n)for(var r=0;r<n.length;r++)t.push({name:r,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return f(e,t)}function l(e,t,n){for(var r=[],o=0;o<e.length;o++)r.push(g(e[o],t,n).source);var i=new RegExp("(?:"+r.join("|")+")",h(n));return f(i,t)}function d(e,t,n){return m(r(e,n),t,n)}function m(e,t,n){v(t)||(n=t||n,t=[]),n=n||{};for(var r=n.strict,o=n.end!==!1,i="",c=0;c<e.length;c++){var s=e[c];if("string"==typeof s)i+=a(s);else{var u=a(s.prefix),p="(?:"+s.pattern+")";t.push(s),s.repeat&&(p+="(?:"+u+p+")*"),p=s.optional?s.partial?u+"("+p+")?":"(?:"+u+"("+p+"))?":u+"("+p+")",i+=p}}var l=a(n.delimiter||"/"),d=i.slice(-l.length)===l;return r||(i=(d?i.slice(0,-l.length):i)+"(?:"+l+"(?=$))?"),i+=o?"$":r&&d?"":"(?="+l+"|$)",f(new RegExp("^"+i,h(n)),t)}function g(e,t,n){return v(t)||(n=t||n,t=[]),n=n||{},e instanceof RegExp?p(e,t):v(e)?l(e,t,n):d(e,t,n)}var v=e("isarray");t.exports=g,t.exports.parse=r,t.exports.compile=o,t.exports.tokensToFunction=s,t.exports.tokensToRegExp=m;var x=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g")},{isarray:14}],16:[function(e,t,n){!function(){var e=Cache.prototype.addAll,t=navigator.userAgent.match(/(Firefox|Chrome)\/(\d+\.)/);if(t)var n=t[1],r=parseInt(t[2]);e&&(!t||"Firefox"===n&&r>=46||"Chrome"===n&&r>=50)||(Cache.prototype.addAll=function(e){function t(e){this.name="NetworkError",this.code=19,this.message=e}var n=this;return t.prototype=Object.create(Error.prototype),Promise.resolve().then(function(){if(arguments.length<1)throw new TypeError;return e=e.map(function(e){return e instanceof Request?e:String(e)}),Promise.all(e.map(function(e){"string"==typeof e&&(e=new Request(e));var n=new URL(e.url).protocol;if("http:"!==n&&"https:"!==n)throw new t("Invalid scheme");return fetch(e.clone())}))}).then(function(r){if(r.some(function(e){return!e.ok}))throw new t("Incorrect response status");return Promise.all(r.map(function(t,r){return n.put(e[r],t)}))}).then(function(){})},Cache.prototype.add=function(e){return this.addAll([e])})}()},{}]},{},[13])(13)});


// *** End of auto-included sw-toolbox code. ***



// Runtime cache configuration, using the sw-toolbox library.

toolbox.router.get(/.*/, toolbox.networkFirst, {"cache":{"maxEntries":300,"name":"cache"}});





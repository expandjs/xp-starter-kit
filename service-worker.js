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

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren */
'use strict';


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
*/!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.toolbox=e()}}(function(){return function e(t,n,r){function o(c,s){if(!n[c]){if(!t[c]){var a="function"==typeof require&&require;if(!s&&a)return a(c,!0);if(i)return i(c,!0);var u=new Error("Cannot find module '"+c+"'");throw u.code="MODULE_NOT_FOUND",u}var f=n[c]={exports:{}};t[c][0].call(f.exports,function(e){var n=t[c][1][e];return o(n?n:e)},f,f.exports,e,t,n,r)}return n[c].exports}for(var i="function"==typeof require&&require,c=0;c<r.length;c++)o(r[c]);return o}({1:[function(e,t,n){"use strict";function r(e,t){t=t||{};var n=t.debug||d.debug;n&&console.log("[sw-toolbox] "+e)}function o(e){var t;return e&&e.cache&&(t=e.cache.name),t=t||d.cache.name,caches.open(t)}function i(e,t){t=t||{};var n=t.successResponses||d.successResponses;return fetch(e.clone()).then(function(r){return"GET"===e.method&&n.test(r.status)&&o(t).then(function(n){n.put(e,r).then(function(){var r=t.cache||d.cache;(r.maxEntries||r.maxAgeSeconds)&&r.name&&c(e,n,r)})}),r.clone()})}function c(e,t,n){var r=s.bind(null,e,t,n);l=l?l.then(r):r()}function s(e,t,n){var o=e.url,i=n.maxAgeSeconds,c=n.maxEntries,s=n.name,a=Date.now();return r("Updating LRU order for "+o+". Max entries is "+c+", max age is "+i),g.getDb(s).then(function(e){return g.setTimestampForUrl(e,o,a)}).then(function(e){return g.expireEntries(e,c,i,a)}).then(function(e){r("Successfully updated IDB.");var n=e.map(function(e){return t.delete(e)});return Promise.all(n).then(function(){r("Done with cache cleanup.")})}).catch(function(e){r(e)})}function a(e,t,n){return r("Renaming cache: ["+e+"] to ["+t+"]",n),caches.delete(t).then(function(){return Promise.all([caches.open(e),caches.open(t)]).then(function(t){var n=t[0],r=t[1];return n.keys().then(function(e){return Promise.all(e.map(function(e){return n.match(e).then(function(t){return r.put(e,t)})}))}).then(function(){return caches.delete(e)})})})}function u(e,t){return o(t).then(function(t){return t.add(e)})}function f(e,t){return o(t).then(function(t){return t.delete(e)})}function h(e){e instanceof Promise||p(e),d.preCacheItems=d.preCacheItems.concat(e)}function p(e){var t=Array.isArray(e);if(t&&e.forEach(function(e){"string"==typeof e||e instanceof Request||(t=!1)}),!t)throw new TypeError("The precache method expects either an array of strings and/or Requests or a Promise that resolves to an array of strings and/or Requests.");return e}var l,d=e("./options"),g=e("./idb-cache-expiration");t.exports={debug:r,fetchAndCache:i,openCache:o,renameCache:a,cache:u,uncache:f,precache:h,validatePrecacheInput:p}},{"./idb-cache-expiration":2,"./options":4}],2:[function(e,t,n){"use strict";function r(e){return new Promise(function(t,n){var r=indexedDB.open(u+e,f);r.onupgradeneeded=function(){var e=r.result.createObjectStore(h,{keyPath:p});e.createIndex(l,l,{unique:!1})},r.onsuccess=function(){t(r.result)},r.onerror=function(){n(r.error)}})}function o(e){return e in d||(d[e]=r(e)),d[e]}function i(e,t,n){return new Promise(function(r,o){var i=e.transaction(h,"readwrite"),c=i.objectStore(h);c.put({url:t,timestamp:n}),i.oncomplete=function(){r(e)},i.onabort=function(){o(i.error)}})}function c(e,t,n){return t?new Promise(function(r,o){var i=1e3*t,c=[],s=e.transaction(h,"readwrite"),a=s.objectStore(h),u=a.index(l);u.openCursor().onsuccess=function(e){var t=e.target.result;if(t&&n-i>t.value[l]){var r=t.value[p];c.push(r),a.delete(r),t.continue()}},s.oncomplete=function(){r(c)},s.onabort=o}):Promise.resolve([])}function s(e,t){return t?new Promise(function(n,r){var o=[],i=e.transaction(h,"readwrite"),c=i.objectStore(h),s=c.index(l),a=s.count();s.count().onsuccess=function(){var e=a.result;e>t&&(s.openCursor().onsuccess=function(n){var r=n.target.result;if(r){var i=r.value[p];o.push(i),c.delete(i),e-o.length>t&&r.continue()}})},i.oncomplete=function(){n(o)},i.onabort=r}):Promise.resolve([])}function a(e,t,n,r){return c(e,n,r).then(function(n){return s(e,t).then(function(e){return n.concat(e)})})}var u="sw-toolbox-",f=1,h="store",p="url",l="timestamp",d={};t.exports={getDb:o,setTimestampForUrl:i,expireEntries:a}},{}],3:[function(e,t,n){"use strict";function r(e){var t=a.match(e.request);t?e.respondWith(t(e.request)):a.default&&"GET"===e.request.method&&0===e.request.url.indexOf("http")&&e.respondWith(a.default(e.request))}function o(e){s.debug("activate event fired");var t=u.cache.name+"$$$inactive$$$";e.waitUntil(s.renameCache(t,u.cache.name))}function i(e){return e.reduce(function(e,t){return e.concat(t)},[])}function c(e){var t=u.cache.name+"$$$inactive$$$";s.debug("install event fired"),s.debug("creating cache ["+t+"]"),e.waitUntil(s.openCache({cache:{name:t}}).then(function(e){return Promise.all(u.preCacheItems).then(i).then(s.validatePrecacheInput).then(function(t){return s.debug("preCache list: "+(t.join(", ")||"(none)")),e.addAll(t)})}))}e("serviceworker-cache-polyfill");var s=e("./helpers"),a=e("./router"),u=e("./options");t.exports={fetchListener:r,activateListener:o,installListener:c}},{"./helpers":1,"./options":4,"./router":6,"serviceworker-cache-polyfill":16}],4:[function(e,t,n){"use strict";var r;r=self.registration?self.registration.scope:self.scope||new URL("./",self.location).href,t.exports={cache:{name:"$$$toolbox-cache$$$"+r+"$$$",maxAgeSeconds:null,maxEntries:null},debug:!1,networkTimeoutSeconds:null,preCacheItems:[],successResponses:/^0|([123]\d\d)|(40[14567])|410$/}},{}],5:[function(e,t,n){"use strict";var r=new URL("./",self.location),o=r.pathname,i=e("path-to-regexp"),c=function(e,t,n,r){t instanceof RegExp?this.fullUrlRegExp=t:(0!==t.indexOf("/")&&(t=o+t),this.keys=[],this.regexp=i(t,this.keys)),this.method=e,this.options=r,this.handler=n};c.prototype.makeHandler=function(e){var t;if(this.regexp){var n=this.regexp.exec(e);t={},this.keys.forEach(function(e,r){t[e.name]=n[r+1]})}return function(e){return this.handler(e,t,this.options)}.bind(this)},t.exports=c},{"path-to-regexp":15}],6:[function(e,t,n){"use strict";function r(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}var o=e("./route"),i=e("./helpers"),c=function(e,t){for(var n=e.entries(),r=n.next(),o=[];!r.done;){var i=new RegExp(r.value[0]);i.test(t)&&o.push(r.value[1]),r=n.next()}return o},s=function(){this.routes=new Map,this.routes.set(RegExp,new Map),this.default=null};["get","post","put","delete","head","any"].forEach(function(e){s.prototype[e]=function(t,n,r){return this.add(e,t,n,r)}}),s.prototype.add=function(e,t,n,c){c=c||{};var s;t instanceof RegExp?s=RegExp:(s=c.origin||self.location.origin,s=s instanceof RegExp?s.source:r(s)),e=e.toLowerCase();var a=new o(e,t,n,c);this.routes.has(s)||this.routes.set(s,new Map);var u=this.routes.get(s);u.has(e)||u.set(e,new Map);var f=u.get(e),h=a.regexp||a.fullUrlRegExp;f.has(h.source)&&i.debug('"'+t+'" resolves to same regex as existing route.'),f.set(h.source,a)},s.prototype.matchMethod=function(e,t){var n=new URL(t),r=n.origin,o=n.pathname;return this._match(e,c(this.routes,r),o)||this._match(e,[this.routes.get(RegExp)],t)},s.prototype._match=function(e,t,n){if(0===t.length)return null;for(var r=0;r<t.length;r++){var o=t[r],i=o&&o.get(e.toLowerCase());if(i){var s=c(i,n);if(s.length>0)return s[0].makeHandler(n)}}return null},s.prototype.match=function(e){return this.matchMethod(e.method,e.url)||this.matchMethod("any",e.url)},t.exports=new s},{"./helpers":1,"./route":5}],7:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: cache first ["+e.url+"]",n),o.openCache(n).then(function(t){return t.match(e).then(function(t){return t?t:o.fetchAndCache(e,n)})})}var o=e("../helpers");t.exports=r},{"../helpers":1}],8:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: cache only ["+e.url+"]",n),o.openCache(n).then(function(t){return t.match(e)})}var o=e("../helpers");t.exports=r},{"../helpers":1}],9:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: fastest ["+e.url+"]",n),new Promise(function(r,c){var s=!1,a=[],u=function(e){a.push(e.toString()),s?c(new Error('Both cache and network failed: "'+a.join('", "')+'"')):s=!0},f=function(e){e instanceof Response?r(e):u("No result returned")};o.fetchAndCache(e.clone(),n).then(f,u),i(e,t,n).then(f,u)})}var o=e("../helpers"),i=e("./cacheOnly");t.exports=r},{"../helpers":1,"./cacheOnly":8}],10:[function(e,t,n){t.exports={networkOnly:e("./networkOnly"),networkFirst:e("./networkFirst"),cacheOnly:e("./cacheOnly"),cacheFirst:e("./cacheFirst"),fastest:e("./fastest")}},{"./cacheFirst":7,"./cacheOnly":8,"./fastest":9,"./networkFirst":11,"./networkOnly":12}],11:[function(e,t,n){"use strict";function r(e,t,n){n=n||{};var r=n.successResponses||o.successResponses,c=n.networkTimeoutSeconds||o.networkTimeoutSeconds;return i.debug("Strategy: network first ["+e.url+"]",n),i.openCache(n).then(function(t){var o,s,a=[];if(c){var u=new Promise(function(n){o=setTimeout(function(){t.match(e).then(function(e){e&&n(e)})},1e3*c)});a.push(u)}var f=i.fetchAndCache(e,n).then(function(e){if(o&&clearTimeout(o),r.test(e.status))return e;throw i.debug("Response was an HTTP error: "+e.statusText,n),s=e,new Error("Bad response")}).catch(function(r){return i.debug("Network or response error, fallback to cache ["+e.url+"]",n),t.match(e).then(function(e){if(e)return e;if(s)return s;throw r})});return a.push(f),Promise.race(a)})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],12:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: network only ["+e.url+"]",n),fetch(e)}var o=e("../helpers");t.exports=r},{"../helpers":1}],13:[function(e,t,n){"use strict";var r=e("./options"),o=e("./router"),i=e("./helpers"),c=e("./strategies"),s=e("./listeners");i.debug("Service Worker Toolbox is loading"),self.addEventListener("install",s.installListener),self.addEventListener("activate",s.activateListener),self.addEventListener("fetch",s.fetchListener),t.exports={networkOnly:c.networkOnly,networkFirst:c.networkFirst,cacheOnly:c.cacheOnly,cacheFirst:c.cacheFirst,fastest:c.fastest,router:o,options:r,cache:i.cache,uncache:i.uncache,precache:i.precache}},{"./helpers":1,"./listeners":3,"./options":4,"./router":6,"./strategies":10}],14:[function(e,t,n){t.exports=Array.isArray||function(e){return"[object Array]"==Object.prototype.toString.call(e)}},{}],15:[function(e,t,n){function r(e){for(var t,n=[],r=0,o=0,i="";null!=(t=x.exec(e));){var c=t[0],s=t[1],a=t.index;if(i+=e.slice(o,a),o=a+c.length,s)i+=s[1];else{var f=e[o],h=t[2],p=t[3],l=t[4],d=t[5],g=t[6],m=t[7];i&&(n.push(i),i="");var v=null!=h&&null!=f&&f!==h,w="+"===g||"*"===g,y="?"===g||"*"===g,b=t[2]||"/",E=l||d||(m?".*":"[^"+b+"]+?");n.push({name:p||r++,prefix:h||"",delimiter:b,optional:y,repeat:w,partial:v,asterisk:!!m,pattern:u(E)})}}return o<e.length&&(i+=e.substr(o)),i&&n.push(i),n}function o(e){return s(r(e))}function i(e){return encodeURI(e).replace(/[\/?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function c(e){return encodeURI(e).replace(/[?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function s(e){for(var t=new Array(e.length),n=0;n<e.length;n++)"object"==typeof e[n]&&(t[n]=new RegExp("^(?:"+e[n].pattern+")$"));return function(n,r){for(var o="",s=n||{},a=r||{},u=a.pretty?i:encodeURIComponent,f=0;f<e.length;f++){var h=e[f];if("string"!=typeof h){var p,l=s[h.name];if(null==l){if(h.optional){h.partial&&(o+=h.prefix);continue}throw new TypeError('Expected "'+h.name+'" to be defined')}if(v(l)){if(!h.repeat)throw new TypeError('Expected "'+h.name+'" to not repeat, but received `'+JSON.stringify(l)+"`");if(0===l.length){if(h.optional)continue;throw new TypeError('Expected "'+h.name+'" to not be empty')}for(var d=0;d<l.length;d++){if(p=u(l[d]),!t[f].test(p))throw new TypeError('Expected all "'+h.name+'" to match "'+h.pattern+'", but received `'+JSON.stringify(p)+"`");o+=(0===d?h.prefix:h.delimiter)+p}}else{if(p=h.asterisk?c(l):u(l),!t[f].test(p))throw new TypeError('Expected "'+h.name+'" to match "'+h.pattern+'", but received "'+p+'"');o+=h.prefix+p}}else o+=h}return o}}function a(e){return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function u(e){return e.replace(/([=!:$\/()])/g,"\\$1")}function f(e,t){return e.keys=t,e}function h(e){return e.sensitive?"":"i"}function p(e,t){var n=e.source.match(/\((?!\?)/g);if(n)for(var r=0;r<n.length;r++)t.push({name:r,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return f(e,t)}function l(e,t,n){for(var r=[],o=0;o<e.length;o++)r.push(m(e[o],t,n).source);var i=new RegExp("(?:"+r.join("|")+")",h(n));return f(i,t)}function d(e,t,n){for(var o=r(e),i=g(o,n),c=0;c<o.length;c++)"string"!=typeof o[c]&&t.push(o[c]);return f(i,t)}function g(e,t){t=t||{};for(var n=t.strict,r=t.end!==!1,o="",i=e[e.length-1],c="string"==typeof i&&/\/$/.test(i),s=0;s<e.length;s++){var u=e[s];if("string"==typeof u)o+=a(u);else{var f=a(u.prefix),p="(?:"+u.pattern+")";u.repeat&&(p+="(?:"+f+p+")*"),p=u.optional?u.partial?f+"("+p+")?":"(?:"+f+"("+p+"))?":f+"("+p+")",o+=p}}return n||(o=(c?o.slice(0,-2):o)+"(?:\\/(?=$))?"),o+=r?"$":n&&c?"":"(?=\\/|$)",new RegExp("^"+o,h(t))}function m(e,t,n){return t=t||[],v(t)?n||(n={}):(n=t,t=[]),e instanceof RegExp?p(e,t):v(e)?l(e,t,n):d(e,t,n)}var v=e("isarray");t.exports=m,t.exports.parse=r,t.exports.compile=o,t.exports.tokensToFunction=s,t.exports.tokensToRegExp=g;var x=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g")},{isarray:14}],16:[function(e,t,n){!function(){var e=Cache.prototype.addAll,t=navigator.userAgent.match(/(Firefox|Chrome)\/(\d+\.)/);if(t)var n=t[1],r=parseInt(t[2]);e&&(!t||"Firefox"===n&&r>=46||"Chrome"===n&&r>=50)||(Cache.prototype.addAll=function(e){function t(e){this.name="NetworkError",this.code=19,this.message=e}var n=this;return t.prototype=Object.create(Error.prototype),Promise.resolve().then(function(){if(arguments.length<1)throw new TypeError;return e=e.map(function(e){return e instanceof Request?e:String(e)}),Promise.all(e.map(function(e){"string"==typeof e&&(e=new Request(e));var n=new URL(e.url).protocol;if("http:"!==n&&"https:"!==n)throw new t("Invalid scheme");return fetch(e.clone())}))}).then(function(r){if(r.some(function(e){return!e.ok}))throw new t("Incorrect response status");return Promise.all(r.map(function(t,r){return n.put(e[r],t)}))}).then(function(){})},Cache.prototype.add=function(e){return this.addAll([e])})}()},{}]},{},[13])(13)});
//# sourceMappingURL=sw-toolbox.js.map

// *** End of auto-included sw-toolbox code. ***




/* eslint-disable quotes, comma-spacing */
var PrecacheConfig = [["/bower_components/app-behaviors/app-i18n.html","94508b37d8c13695d8991897fb9371a8"],["/bower_components/app-behaviors/app-locale-behavior.html","f8b147e2bf54e47e269bccc67ba4ff2c"],["/bower_components/app-behaviors/app-meta.html","08f0f3cab6f3500a0eab23b1129d8f9c"],["/bower_components/app-behaviors/app-receiver-behavior.html","2c5d6a84fe38aa95c8a417077a78da73"],["/bower_components/app-behaviors/app-route.html","465fbd54ff1d06f2779c651eabe56ca2"],["/bower_components/app-behaviors/app-router.html","71651c5fe4aa67d041e27d62c10066db"],["/bower_components/app-behaviors/app-shell-behavior.html","547ac55da5735de2bace4f5bcc731b93"],["/bower_components/app-behaviors/app-store-behavior.html","2082a9de57ce3c56b8be65d12d76d5ca"],["/bower_components/app-behaviors/app-view.html","69ba58ab7f46ee3f158fd4b0ffe74fcd"],["/bower_components/expandjs/dist/expand.js","dd53c4884a8fc56f80bfa4cfa67dd70d"],["/bower_components/expandjs/expandjs.html","3b5bb40cfe4e192a79449a52818ee556"],["/bower_components/font-roboto/roboto.html","09500fd5adfad056ff5aa05e2aae0ec5"],["/bower_components/iron-flex-layout/iron-flex-layout.html","3987521c615734e4fe403f9acecfea54"],["/bower_components/mat-elements/mat-button.html","641d4192f5c9c2505df8e49692866202"],["/bower_components/mat-elements/mat-dialog.html","c794ce07e0c202848ca8b0393f7b5790"],["/bower_components/mat-elements/mat-divider.html","b7ae8b07a3e566d15d3e0a857dcd471a"],["/bower_components/mat-elements/mat-drawer-panel.html","ee2773163ac91188c7f5278d84213129"],["/bower_components/mat-elements/mat-drawer.html","347a8e9dcf7a0b715fad8a96d75e6359"],["/bower_components/mat-elements/mat-dropdown.html","9bee47d85358a7b6c7c0d4b1ecfdc187"],["/bower_components/mat-elements/mat-fab.html","a712a9fe3097878c294a1b112dcaf74f"],["/bower_components/mat-elements/mat-header-panel.html","cafbadb54a3798d881e2d0868c4581eb"],["/bower_components/mat-elements/mat-header.html","2f05086c21c5f2dfbcee86603a558bf6"],["/bower_components/mat-elements/mat-icon-button.html","98664e25860c8f76adadc50eba0bf2e4"],["/bower_components/mat-elements/mat-icon.html","9339ed7df128937458d953217d0e86c5"],["/bower_components/mat-elements/mat-icons.html","dea7fa6fc3d909fc52e6b394fc8c181a"],["/bower_components/mat-elements/mat-ink-behavior.html","1b2e7a8a1766fa1cbe3d2f3608e6b250"],["/bower_components/mat-elements/mat-ink-styles.html","316ad7189cb4c4d53456a8fb1ff90d47"],["/bower_components/mat-elements/mat-ink.html","2d7302828c1d5b85650d0b0ed9276abd"],["/bower_components/mat-elements/mat-input-behavior.html","06a553b11ecb35545af8e8dd9db9aa75"],["/bower_components/mat-elements/mat-input-checked-behavior.html","e43e95196e334f438c3dba6dfe1cb28f"],["/bower_components/mat-elements/mat-input-styles.html","24280d7725c1202a8bfcc4aec48c9330"],["/bower_components/mat-elements/mat-input-value-behavior.html","d63296f7f58c3de67d72d691d3b8d0f0"],["/bower_components/mat-elements/mat-item.html","282227aee821492c8cf7720679022800"],["/bower_components/mat-elements/mat-label.html","7e2d71fd77123e0bf7bccba61cee715b"],["/bower_components/mat-elements/mat-list.html","74b9729e74c002d1de79f5af9111c15b"],["/bower_components/mat-elements/mat-menu.html","96e81d7e5434c234816cf647966af1d2"],["/bower_components/mat-elements/mat-motion.html","1626fe65cb3eca0f2b7a12e00ca7ceb6"],["/bower_components/mat-elements/mat-option.html","edeb0f89b84b8380a56e065a0f55c28d"],["/bower_components/mat-elements/mat-page.html","34dcf0d599221e00275c2fd8b2d883c3"],["/bower_components/mat-elements/mat-pages.html","804ae80a06c785c31235641af1509975"],["/bower_components/mat-elements/mat-palette.html","5f6181da8beefceb58af3c5f3297501c"],["/bower_components/mat-elements/mat-paper-behavior.html","97e9b39673d695bcf5c96b0189fe1809"],["/bower_components/mat-elements/mat-paper-styles.html","0a3885b344e0209d98d60295b3e176a0"],["/bower_components/mat-elements/mat-paper.html","6e33834dfb39c6a136beb62e3925aeee"],["/bower_components/mat-elements/mat-pressed-behavior.html","a12f61aba33bc263909d49d0d119981f"],["/bower_components/mat-elements/mat-pressed-ink-behavior.html","7f01f3bb5a40af636a7ea977b67ff056"],["/bower_components/mat-elements/mat-pressed-ink-styles.html","0653a33b6ddbf0c8e0cf4b04ad3a6a0e"],["/bower_components/mat-elements/mat-pressed-paper-behavior.html","6f6bc868009a529ee56a231a11dd0859"],["/bower_components/mat-elements/mat-pressed-paper-styles.html","ef2baeb329b8d8cd2d4d88b1dd6ea214"],["/bower_components/mat-elements/mat-pressed-styles.html","cc09cd47f0470792ee548e521e841743"],["/bower_components/mat-elements/mat-radio.html","5017b95131e077fc5dca18c81d91275e"],["/bower_components/mat-elements/mat-shadow.html","da3031313998803ff891e07b1b5622d4"],["/bower_components/mat-elements/mat-shell-behavior.html","3702182bac5494af583539a78e73fc3c"],["/bower_components/mat-elements/mat-shell-styles.html","b8903295d724bfd04b30af501246c4b5"],["/bower_components/mat-elements/mat-spacing.html","b5079e174d45038811f654643664f3a0"],["/bower_components/mat-elements/mat-tab.html","59f1628b152e69b7f65579407184a5bb"],["/bower_components/mat-elements/mat-tabs.html","1c0e5fedc948a6cf81276f4f1d337725"],["/bower_components/mat-elements/mat-typography.html","c595a381fd699e03c7945126df81242a"],["/bower_components/polymer/polymer-micro.html","a56af7465d1962ddad3e552367e75faf"],["/bower_components/polymer/polymer-mini.html","9e9dfb157eae29a59c98343288d4d120"],["/bower_components/polymer/polymer.html","3f035bd142ad63df499ddb2f4a9b8ae1"],["/bower_components/webcomponentsjs/webcomponents.js","8f0d4c288bc86dd8f86b4e1d22a19779"],["/bower_components/xp-elements/xp-anchor-behavior.html","13eafd9e06aa6ef9f3b887048fa04373"],["/bower_components/xp-elements/xp-anchor-styles.html","c8d658fac6f80f4a3bc4a0de80bfed1c"],["/bower_components/xp-elements/xp-base-behavior.html","95cf40bea7f282b60b39df390e257734"],["/bower_components/xp-elements/xp-dialog-behavior.html","45bb1a4a4870ad9788070db0f9fd0485"],["/bower_components/xp-elements/xp-dialog-styles.html","94124f2ed2aae6c16b1c00e2adb74910"],["/bower_components/xp-elements/xp-dialog-wrapper.html","6b52515011e896aba94545e00e25b309"],["/bower_components/xp-elements/xp-finder-behavior.html","7ec0527ab122f7dbf933c629603c257f"],["/bower_components/xp-elements/xp-focused-behavior.html","aec4040d9c5e4d0901a5b44342d345b2"],["/bower_components/xp-elements/xp-focused-styles.html","12542f94d29c87ac0d223e0b77fd06bb"],["/bower_components/xp-elements/xp-icon-behavior.html","8a7a32ace7b1a89e3686152361fff225"],["/bower_components/xp-elements/xp-icon-styles.html","f1ce0615d6899f5da6b884b270ed8fa6"],["/bower_components/xp-elements/xp-iconset-finder.html","6ecc238a92b5d3088fda01836887ecf7"],["/bower_components/xp-elements/xp-iconset.html","20eb6d8e6ad86186aaa542125dc75c98"],["/bower_components/xp-elements/xp-input-behavior.html","00197b4f976128d807af324a86322b1f"],["/bower_components/xp-elements/xp-input-checked-behavior.html","e6a3e2ea305f9ba981c40f18ddb59fef"],["/bower_components/xp-elements/xp-input-styles.html","b4b9f629651fe2711822df53fd4b47e0"],["/bower_components/xp-elements/xp-input-value-behavior.html","bedabfd80d0947c737d9f818f99d04c7"],["/bower_components/xp-elements/xp-label-behavior.html","fdf8244d9abb4702b1405a6d3da1871a"],["/bower_components/xp-elements/xp-label-styles.html","9916c452f2be2dcaa95b58568bdac357"],["/bower_components/xp-elements/xp-list-behavior.html","a1a6043b9e88e80d99d073559a40559f"],["/bower_components/xp-elements/xp-list-styles.html","0f08a5ab656d0bcf997ee84fdde9d2a7"],["/bower_components/xp-elements/xp-master-slave-behavior.html","edbcdbfd5cf77b243f1b2cb0dd56fe94"],["/bower_components/xp-elements/xp-media-query.html","350749d2571a966246af35ee5a34ddcb"],["/bower_components/xp-elements/xp-menu-behavior.html","4a0e338b1b7ccfd5686691f05ce753b1"],["/bower_components/xp-elements/xp-menu-styles.html","21e72fd71f952ace97d94021e9d3e00c"],["/bower_components/xp-elements/xp-menu-wrapper.html","f0e8ca5a161c0342cf370357dd81aa6c"],["/bower_components/xp-elements/xp-meta-behavior.html","f658aaa96ec835ce573bbf7b0187c3ee"],["/bower_components/xp-elements/xp-overlay-behavior.html","2a9e5628d0ec62e15d4d1c3e4a1b4920"],["/bower_components/xp-elements/xp-overlay-injector.html","e1fe50faa636f4df653e458ac9a4b7fa"],["/bower_components/xp-elements/xp-overlay-styles.html","64237c000371d5fd2bb4a512e7fb4548"],["/bower_components/xp-elements/xp-overlay-wrapper.html","fd5fb63b746dcf3053954f4887405a81"],["/bower_components/xp-elements/xp-page-behavior.html","a9aabc49d76999235cbcd5c3de1e3949"],["/bower_components/xp-elements/xp-page-styles.html","2b67b72e53978446ab3658bb35349e3a"],["/bower_components/xp-elements/xp-pages-behavior.html","cf213db3ecf76774b03b1865775411a9"],["/bower_components/xp-elements/xp-pages-styles.html","1373b28de9361f037cac1ac518abc81f"],["/bower_components/xp-elements/xp-pressed-behavior.html","7f7f746b071395b176e400fce82dc1d6"],["/bower_components/xp-elements/xp-pressed-styles.html","0be2abd11e12a5e69d2910e0790fb145"],["/bower_components/xp-elements/xp-selector-behavior.html","b2241e60026ba60e99dde746ff629fad"],["/bower_components/xp-elements/xp-selector-multi-behavior.html","ee6ba4062bc43c3f52c889a6ff337ad1"],["/bower_components/xp-elements/xp-selector.html","656017d4df2334c6ee29de3062118abb"],["/bower_components/xp-elements/xp-tab-behavior.html","ca67cb18ca2abbc443124b857835b176"],["/bower_components/xp-elements/xp-tab-styles.html","9f34744141559426d6b93cc5431233df"],["/bower_components/xp-elements/xp-tabs-behavior.html","9071b794ad08a8673208ecdedf913790"],["/bower_components/xp-elements/xp-tabs-styles.html","e106a2b838619475a839fd2ebbe28b42"],["/bower_components/xp-elements/xp-targeter-behavior.html","bc3bf95382574fb47da34b89b5bcd48d"],["/bower_components/xp-elements/xp-wrapper-behavior.html","c0e96a1bd1da4d4af8025df155e49931"],["/index.html","9b41c13baa6e7c4b0b43323887648a87"],["/src/kit-behaviors/kit-base-behavior.html","f494da43922e9f995d5d3b87bb474992"],["/src/kit-behaviors/kit-dialog-behavior.html","150c520d50e13ab317d90e9698dd7790"],["/src/kit-behaviors/kit-menu-behavior.html","e3208e26fc0bf51d79ec9f0ff1c5ab36"],["/src/kit-behaviors/kit-view-behavior.html","4dc72f6ceb2d55c79107b670b2094c3a"],["/src/kit-dialogs/kit-dialog-settings.html","3c97b65762df22453f2865a511f2f262"],["/src/kit-elements/kit-navigation.html","230eb1146ab03d910ad3a7284775a731"],["/src/kit-i18n/kit-i18n-de_DE.html","b9c009174d1e10f381054d7ddb6e9167"],["/src/kit-i18n/kit-i18n-en_US.html","4755bccf23e1bfa95c77666f0bc47853"],["/src/kit-i18n/kit-i18n-it_IT.html","e684bcf1c0c20e3ac38edb777a826f78"],["/src/kit-icons.html","60ae5b0cf60e3651587a59571e73f8c9"],["/src/kit-menus/kit-menu-more.html","fb38a0552e49e922511fd205ff0d2bde"],["/src/kit-meta.html","df1a5f8471a212d67f1c11bf22cd1d7a"],["/src/kit-meta/kit-meta-locales.html","3155c1167343bd7417764ce6ae157023"],["/src/kit-meta/kit-meta-routes.html","93bc6a21e45388280bf15e8e7b22cb6a"],["/src/kit-shell.html","7a5b5e1e2ebb599735b9b1ee78c7d665"],["/src/kit-store.html","6391c1098a595e27dcb897d085187398"],["/src/kit-styles/kit-base-styles.html","3ad438297f0a591755ed7a69fe76080d"],["/src/kit-styles/kit-view-styles.html","6d05a169b4bd0e5cd41156560106ac6a"],["/src/kit-views/kit-view-home.html","41397776d186a670c33c5513d983e40d"],["/src/kit-views/kit-view-page.html","8540fd062c804e22d134986bf51aa0cc"],["/src/manifest.json","89e8a63e61efe95474458571559b5a29"]];
/* eslint-enable quotes, comma-spacing */
var CacheNamePrefix = 'sw-precache-v1--' + (self.registration ? self.registration.scope : '') + '-';


var IgnoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var getCacheBustedUrl = function (url, param) {
    param = param || Date.now();

    var urlWithCacheBusting = new URL(url);
    urlWithCacheBusting.search += (urlWithCacheBusting.search ? '&' : '') +
      'sw-precache=' + param;

    return urlWithCacheBusting.toString();
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

var populateCurrentCacheNames = function (precacheConfig,
    cacheNamePrefix, baseUrl) {
    var absoluteUrlToCacheName = {};
    var currentCacheNamesToAbsoluteUrl = {};

    precacheConfig.forEach(function(cacheOption) {
      var absoluteUrl = new URL(cacheOption[0], baseUrl).toString();
      var cacheName = cacheNamePrefix + absoluteUrl + '-' + cacheOption[1];
      currentCacheNamesToAbsoluteUrl[cacheName] = absoluteUrl;
      absoluteUrlToCacheName[absoluteUrl] = cacheName;
    });

    return {
      absoluteUrlToCacheName: absoluteUrlToCacheName,
      currentCacheNamesToAbsoluteUrl: currentCacheNamesToAbsoluteUrl
    };
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

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


var mappings = populateCurrentCacheNames(PrecacheConfig, CacheNamePrefix, self.location);
var AbsoluteUrlToCacheName = mappings.absoluteUrlToCacheName;
var CurrentCacheNamesToAbsoluteUrl = mappings.currentCacheNamesToAbsoluteUrl;

function deleteAllCaches() {
  return caches.keys().then(function(cacheNames) {
    return Promise.all(
      cacheNames.map(function(cacheName) {
        return caches.delete(cacheName);
      })
    );
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    // Take a look at each of the cache names we expect for this version.
    Promise.all(Object.keys(CurrentCacheNamesToAbsoluteUrl).map(function(cacheName) {
      return caches.open(cacheName).then(function(cache) {
        // Get a list of all the entries in the specific named cache.
        // For caches that are already populated for a given version of a
        // resource, there should be 1 entry.
        return cache.keys().then(function(keys) {
          // If there are 0 entries, either because this is a brand new version
          // of a resource or because the install step was interrupted the
          // last time it ran, then we need to populate the cache.
          if (keys.length === 0) {
            // Use the last bit of the cache name, which contains the hash,
            // as the cache-busting parameter.
            // See https://github.com/GoogleChrome/sw-precache/issues/100
            var cacheBustParam = cacheName.split('-').pop();
            var urlWithCacheBusting = getCacheBustedUrl(
              CurrentCacheNamesToAbsoluteUrl[cacheName], cacheBustParam);

            var request = new Request(urlWithCacheBusting,
              {credentials: 'same-origin'});
            return fetch(request).then(function(response) {
              if (response.ok) {
                return cache.put(CurrentCacheNamesToAbsoluteUrl[cacheName],
                  response);
              }

              console.error('Request for %s returned a response status %d, ' +
                'so not attempting to cache it.',
                urlWithCacheBusting, response.status);
              // Get rid of the empty cache if we can't add a successful response to it.
              return caches.delete(cacheName);
            });
          }
        });
      });
    })).then(function() {
      return caches.keys().then(function(allCacheNames) {
        return Promise.all(allCacheNames.filter(function(cacheName) {
          return cacheName.indexOf(CacheNamePrefix) === 0 &&
            !(cacheName in CurrentCacheNamesToAbsoluteUrl);
          }).map(function(cacheName) {
            return caches.delete(cacheName);
          })
        );
      });
    }).then(function() {
      if (typeof self.skipWaiting === 'function') {
        // Force the SW to transition from installing -> active state
        self.skipWaiting();
      }
    })
  );
});

if (self.clients && (typeof self.clients.claim === 'function')) {
  self.addEventListener('activate', function(event) {
    event.waitUntil(self.clients.claim());
  });
}

self.addEventListener('message', function(event) {
  if (event.data.command === 'delete_all') {
    console.log('About to delete all caches...');
    deleteAllCaches().then(function() {
      console.log('Caches deleted.');
      event.ports[0].postMessage({
        error: null
      });
    }).catch(function(error) {
      console.log('Caches not deleted:', error);
      event.ports[0].postMessage({
        error: error
      });
    });
  }
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    var urlWithoutIgnoredParameters = stripIgnoredUrlParameters(event.request.url,
      IgnoreUrlParametersMatching);

    var cacheName = AbsoluteUrlToCacheName[urlWithoutIgnoredParameters];
    var directoryIndex = 'index.html';
    if (!cacheName && directoryIndex) {
      urlWithoutIgnoredParameters = addDirectoryIndex(urlWithoutIgnoredParameters, directoryIndex);
      cacheName = AbsoluteUrlToCacheName[urlWithoutIgnoredParameters];
    }

    var navigateFallback = '';
    // Ideally, this would check for event.request.mode === 'navigate', but that is not widely
    // supported yet:
    // https://code.google.com/p/chromium/issues/detail?id=540967
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1209081
    if (!cacheName && navigateFallback && event.request.headers.has('accept') &&
        event.request.headers.get('accept').includes('text/html') &&
        /* eslint-disable quotes, comma-spacing */
        isPathWhitelisted([], event.request.url)) {
        /* eslint-enable quotes, comma-spacing */
      var navigateFallbackUrl = new URL(navigateFallback, self.location);
      cacheName = AbsoluteUrlToCacheName[navigateFallbackUrl.toString()];
    }

    if (cacheName) {
      event.respondWith(
        // Rely on the fact that each cache we manage should only have one entry, and return that.
        caches.open(cacheName).then(function(cache) {
          return cache.keys().then(function(keys) {
            return cache.match(keys[0]).then(function(response) {
              if (response) {
                return response;
              }
              // If for some reason the response was deleted from the cache,
              // raise and exception and fall back to the fetch() triggered in the catch().
              throw Error('The cache ' + cacheName + ' is empty.');
            });
          });
        }).catch(function(e) {
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});


// Runtime cache configuration, using the sw-toolbox library.

toolbox.router.get(/.*/, toolbox.networkFirst, {"cache":{"maxEntries":300,"name":"cache"}});




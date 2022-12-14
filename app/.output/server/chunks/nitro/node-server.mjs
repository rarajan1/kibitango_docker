globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import 'node-fetch-native/polyfill';
import { Server as Server$1 } from 'http';
import { Server } from 'https';
import destr from 'destr';
import { defineEventHandler, handleCacheHeaders, createEvent, eventHandler, createError, createApp, createRouter, lazyEventHandler } from 'h3';
import { createFetch as createFetch$1, Headers } from 'ohmyfetch';
import { createRouter as createRouter$1 } from 'radix3';
import { createCall, createFetch } from 'unenv/runtime/fetch/index';
import { createHooks } from 'hookable';
import { snakeCase } from 'scule';
import { hash } from 'ohash';
import { parseURL, withQuery, withLeadingSlash, withoutTrailingSlash } from 'ufo';
import { createStorage } from 'unstorage';
import { promises } from 'fs';
import { dirname, resolve } from 'pathe';
import { fileURLToPath } from 'url';

const _runtimeConfig = {"app":{"baseURL":"/","buildAssetsDir":"/_nuxt/","cdnURL":""},"nitro":{"routes":{},"envPrefix":"NUXT_"},"public":{},"databaseHost":"","databaseUser":"","databasePassword":"","databaseName":"","jwtSecret":""};
const ENV_PREFIX = "NITRO_";
const ENV_PREFIX_ALT = _runtimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_";
const getEnv = (key) => {
  const envKey = snakeCase(key).toUpperCase();
  return destr(process.env[ENV_PREFIX + envKey] ?? process.env[ENV_PREFIX_ALT + envKey]);
};
function isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function overrideConfig(obj, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey);
    if (isObject(obj[key])) {
      if (isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
      }
      overrideConfig(obj[key], subKey);
    } else {
      obj[key] = envValue ?? obj[key];
    }
  }
}
overrideConfig(_runtimeConfig);
const config = deepFreeze(_runtimeConfig);
const useRuntimeConfig = () => config;
function deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }
  return Object.freeze(object);
}

const globalTiming = globalThis.__timing__ || {
  start: () => 0,
  end: () => 0,
  metrics: []
};
function timingMiddleware(_req, res, next) {
  const start = globalTiming.start();
  const _end = res.end;
  res.end = (data, encoding, callback) => {
    const metrics = [["Generate", globalTiming.end(start)], ...globalTiming.metrics];
    const serverTiming = metrics.map((m) => `-;dur=${m[1]};desc="${encodeURIComponent(m[0])}"`).join(", ");
    if (!res.headersSent) {
      res.setHeader("Server-Timing", serverTiming);
    }
    _end.call(res, data, encoding, callback);
  };
  next();
}

const _assets = {

};

function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
}

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

const storage = createStorage({});

const useStorage = () => storage;

storage.mount('/assets', assets$1);

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro";
  const name = opts.name || fn.name || "_";
  const integrity = hash([opts.integrity, fn, opts]);
  async function get(key, resolver) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    const entry = await useStorage().getItem(cacheKey) || {};
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl;
    const _resolve = async () => {
      if (!pending[key]) {
        entry.value = void 0;
        entry.integrity = void 0;
        entry.mtime = void 0;
        entry.expires = void 0;
        pending[key] = Promise.resolve(resolver());
      }
      entry.value = await pending[key];
      entry.mtime = Date.now();
      entry.integrity = integrity;
      delete pending[key];
      useStorage().setItem(cacheKey, entry).catch((error) => console.error("[nitro] [cache]", error));
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (opts.swr && entry.value) {
      _resolvePromise.catch(console.error);
      return Promise.resolve(entry);
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const key = (opts.getKey || getKey)(...args);
    const entry = await get(key, () => fn(...args));
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length ? hash(args, {}) : "";
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const _opts = {
    ...opts,
    getKey: (event) => {
      const url = event.req.originalUrl || event.req.url;
      const friendlyName = decodeURI(parseURL(url).pathname).replace(/[^a-zA-Z0-9]/g, "").substring(0, 16);
      const urlHash = hash(url);
      return `${friendlyName}.${urlHash}`;
    },
    group: opts.group || "nitro/handlers",
    integrity: [
      opts.integrity,
      handler
    ]
  };
  const _cachedHandler = cachedFunction(async (incomingEvent) => {
    const reqProxy = cloneWithProxy(incomingEvent.req, { headers: {} });
    const resHeaders = {};
    const resProxy = cloneWithProxy(incomingEvent.res, {
      statusCode: 200,
      getHeader(name) {
        return resHeaders[name];
      },
      setHeader(name, value) {
        resHeaders[name] = value;
        return this;
      },
      getHeaderNames() {
        return Object.keys(resHeaders);
      },
      hasHeader(name) {
        return name in resHeaders;
      },
      removeHeader(name) {
        delete resHeaders[name];
      },
      getHeaders() {
        return resHeaders;
      }
    });
    const event = createEvent(reqProxy, resProxy);
    event.context = incomingEvent.context;
    const body = await handler(event);
    const headers = event.res.getHeaders();
    headers.Etag = `W/"${hash(body)}"`;
    headers["Last-Modified"] = new Date().toUTCString();
    const cacheControl = [];
    if (opts.swr) {
      if (opts.maxAge) {
        cacheControl.push(`s-maxage=${opts.maxAge}`);
      }
      if (opts.staleMaxAge) {
        cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
      } else {
        cacheControl.push("stale-while-revalidate");
      }
    } else if (opts.maxAge) {
      cacheControl.push(`max-age=${opts.maxAge}`);
    }
    if (cacheControl.length) {
      headers["Cache-Control"] = cacheControl.join(", ");
    }
    const cacheEntry = {
      code: event.res.statusCode,
      headers,
      body
    };
    return cacheEntry;
  }, _opts);
  return defineEventHandler(async (event) => {
    const response = await _cachedHandler(event);
    if (event.res.headersSent || event.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["Last-Modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.res.statusCode = response.code;
    for (const name in response.headers) {
      event.res.setHeader(name, response.headers[name]);
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const plugins = [
  
];

function hasReqHeader(req, header, includes) {
  const value = req.headers[header];
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  return hasReqHeader(event.req, "accept", "application/json") || hasReqHeader(event.req, "user-agent", "curl/") || hasReqHeader(event.req, "user-agent", "httpie/") || event.req.url?.endsWith(".json") || event.req.url?.includes("/api/");
}
function normalizeError(error) {
  const cwd = process.cwd();
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Route Not Found" : "Internal Server Error");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.req.url,
    statusCode,
    statusMessage,
    message,
    description: "",
    data: error.data
  };
  event.res.statusCode = errorObject.statusCode;
  event.res.statusMessage = errorObject.statusMessage;
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, errorObject.message + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (isJsonRequest(event)) {
    event.res.setHeader("Content-Type", "application/json");
    event.res.end(JSON.stringify(errorObject));
    return;
  }
  const url = withQuery("/__nuxt_error", errorObject);
  const html = await $fetch(url).catch((error2) => {
    console.error("[nitro] Error while generating error response", error2);
    return errorObject.statusMessage;
  });
  event.res.setHeader("Content-Type", "text/html;charset=UTF-8");
  event.res.end(html);
});

const assets = {
  "/manifest.json": {
    "type": "application/json",
    "etag": "\"1769-QZxWms5ycnHitVXTpc7crCuZ4GA\"",
    "mtime": "2022-11-20T04:26:54.242Z",
    "path": "../public/manifest.json"
  },
  "/_nuxt/_phase_._startDate_._startTime_._endDate_._endTime_.031042f2.mjs": {
    "type": "application/javascript",
    "etag": "\"444-MDkcLdxDmhVA6/jS4GSE0DZc5iY\"",
    "mtime": "2022-11-20T04:26:54.720Z",
    "path": "../public/_nuxt/_phase_._startDate_._startTime_._endDate_._endTime_.031042f2.mjs"
  },
  "/_nuxt/default.e601f631.mjs": {
    "type": "application/javascript",
    "etag": "\"3ad-uOlxNltevAAvmLcOSK8z4P3ywOE\"",
    "mtime": "2022-11-20T04:26:54.701Z",
    "path": "../public/_nuxt/default.e601f631.mjs"
  },
  "/_nuxt/entry.1765734b.mjs": {
    "type": "application/javascript",
    "etag": "\"1f3ee-YX3RkA5iS5LcFyTcGGuShAIe+I4\"",
    "mtime": "2022-11-20T04:26:54.680Z",
    "path": "../public/_nuxt/entry.1765734b.mjs"
  },
  "/_nuxt/entry.d0568239.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1dde2-eji5FvFX/+OKNRDUhM4axLax3do\"",
    "mtime": "2022-11-20T04:26:54.660Z",
    "path": "../public/_nuxt/entry.d0568239.css"
  },
  "/_nuxt/error-404.0ff128b2.mjs": {
    "type": "application/javascript",
    "etag": "\"8a4-YAhkDF6WbvpRhBvpBpukabdtwKY\"",
    "mtime": "2022-11-20T04:26:54.640Z",
    "path": "../public/_nuxt/error-404.0ff128b2.mjs"
  },
  "/_nuxt/error-404.7729cee9.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e34-qomFKLEnDzFbIPwCfuxqIb18mQU\"",
    "mtime": "2022-11-20T04:26:54.620Z",
    "path": "../public/_nuxt/error-404.7729cee9.css"
  },
  "/_nuxt/error-500.08851880.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7a4-PsPGHWWrltFH34P9Q5DnkUTUhRE\"",
    "mtime": "2022-11-20T04:26:54.601Z",
    "path": "../public/_nuxt/error-500.08851880.css"
  },
  "/_nuxt/error-500.f0387797.mjs": {
    "type": "application/javascript",
    "etag": "\"752-dsPvxZgtvVHgOHETbBLqrmy8B04\"",
    "mtime": "2022-11-20T04:26:54.582Z",
    "path": "../public/_nuxt/error-500.f0387797.mjs"
  },
  "/_nuxt/error-component.56ccd0dd.mjs": {
    "type": "application/javascript",
    "etag": "\"44f-JPG2Scrom+994UDwiAyz2CpdEas\"",
    "mtime": "2022-11-20T04:26:54.562Z",
    "path": "../public/_nuxt/error-component.56ccd0dd.mjs"
  },
  "/_nuxt/grade.d6487743.mjs": {
    "type": "application/javascript",
    "etag": "\"565-k1dPeu6vi0TGaPkImcIg1j3pLG4\"",
    "mtime": "2022-11-20T04:26:54.540Z",
    "path": "../public/_nuxt/grade.d6487743.mjs"
  },
  "/_nuxt/gradesTable.vue_vue_type_script_setup_true_lang.4df76560.mjs": {
    "type": "application/javascript",
    "etag": "\"2e6-amEGES6WmWOkYxg7O3ZEVEw6PPk\"",
    "mtime": "2022-11-20T04:26:54.522Z",
    "path": "../public/_nuxt/gradesTable.vue_vue_type_script_setup_true_lang.4df76560.mjs"
  },
  "/_nuxt/index.1ee0559b.mjs": {
    "type": "application/javascript",
    "etag": "\"82d-BuCxRzJQlb4lrM3XUrx9v9w2nvQ\"",
    "mtime": "2022-11-20T04:26:54.501Z",
    "path": "../public/_nuxt/index.1ee0559b.mjs"
  },
  "/_nuxt/index.1f515377.mjs": {
    "type": "application/javascript",
    "etag": "\"458-pgGScXhrF/ulM6uKGHYuUYfm8yc\"",
    "mtime": "2022-11-20T04:26:54.480Z",
    "path": "../public/_nuxt/index.1f515377.mjs"
  },
  "/_nuxt/index.7d8a9ba4.mjs": {
    "type": "application/javascript",
    "etag": "\"82-PwdzQ1+ILjnQkQ+v9e9glgzhTAU\"",
    "mtime": "2022-11-20T04:26:54.458Z",
    "path": "../public/_nuxt/index.7d8a9ba4.mjs"
  },
  "/_nuxt/index.c0818613.mjs": {
    "type": "application/javascript",
    "etag": "\"5d8-OY9KmApQezz6cbAB0s7wgr39SGc\"",
    "mtime": "2022-11-20T04:26:54.438Z",
    "path": "../public/_nuxt/index.c0818613.mjs"
  },
  "/_nuxt/loadingDisplay.763fb565.mjs": {
    "type": "application/javascript",
    "etag": "\"15d-8ba+ehZozeV0mQagzghwUQw3+1A\"",
    "mtime": "2022-11-20T04:26:54.418Z",
    "path": "../public/_nuxt/loadingDisplay.763fb565.mjs"
  },
  "/_nuxt/login.fc60a48d.mjs": {
    "type": "application/javascript",
    "etag": "\"7fc-M9WznMRlz8UOnoNNIIGg5goXDe0\"",
    "mtime": "2022-11-20T04:26:54.398Z",
    "path": "../public/_nuxt/login.fc60a48d.mjs"
  },
  "/_nuxt/phaseButton.edd73473.mjs": {
    "type": "application/javascript",
    "etag": "\"2e2-CJJcNigYlwMz6RBNtK39fkrRAQ0\"",
    "mtime": "2022-11-20T04:26:54.375Z",
    "path": "../public/_nuxt/phaseButton.edd73473.mjs"
  },
  "/_nuxt/register.f942b86e.mjs": {
    "type": "application/javascript",
    "etag": "\"1a4e-PSYxSOhqCN7EEAb+obCMaMU76Gs\"",
    "mtime": "2022-11-20T04:26:54.353Z",
    "path": "../public/_nuxt/register.f942b86e.mjs"
  },
  "/_nuxt/reregister.d3d5d0b6.mjs": {
    "type": "application/javascript",
    "etag": "\"2046-urrpejMlchdP9amzO9eY+knRFNk\"",
    "mtime": "2022-11-20T04:26:54.326Z",
    "path": "../public/_nuxt/reregister.d3d5d0b6.mjs"
  },
  "/_nuxt/test.68230054.mjs": {
    "type": "application/javascript",
    "etag": "\"1301-N0S+PVoorN6BWgT1gaV5hqISuHw\"",
    "mtime": "2022-11-20T04:26:54.302Z",
    "path": "../public/_nuxt/test.68230054.mjs"
  },
  "/_nuxt/words.ec4f2c6d.mjs": {
    "type": "application/javascript",
    "etag": "\"b97-FJtKJ/r9xVyVlVGo0PhKCfnNJz0\"",
    "mtime": "2022-11-20T04:26:54.280Z",
    "path": "../public/_nuxt/words.ec4f2c6d.mjs"
  }
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = [];

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base of publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = ["HEAD", "GET"];
const _f4b49z = eventHandler(async (event) => {
  if (event.req.method && !METHODS.includes(event.req.method)) {
    return;
  }
  let id = decodeURIComponent(withLeadingSlash(withoutTrailingSlash(parseURL(event.req.url).pathname)));
  let asset;
  for (const _id of [id, id + "/index.html"]) {
    const _asset = getAsset(_id);
    if (_asset) {
      asset = _asset;
      id = _id;
      break;
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      throw createError({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = event.req.headers["if-none-match"] === asset.etag;
  if (ifNotMatch) {
    event.res.statusCode = 304;
    event.res.end("Not Modified (etag)");
    return;
  }
  const ifModifiedSinceH = event.req.headers["if-modified-since"];
  if (ifModifiedSinceH && asset.mtime) {
    if (new Date(ifModifiedSinceH) >= new Date(asset.mtime)) {
      event.res.statusCode = 304;
      event.res.end("Not Modified (mtime)");
      return;
    }
  }
  if (asset.type) {
    event.res.setHeader("Content-Type", asset.type);
  }
  if (asset.etag) {
    event.res.setHeader("ETag", asset.etag);
  }
  if (asset.mtime) {
    event.res.setHeader("Last-Modified", asset.mtime);
  }
  const contents = await readAsset(id);
  event.res.end(contents);
});

const _lazy_8BbNJV = () => import('../upload.mjs');
const _lazy_U7RtoS = () => import('../loadWards.mjs');
const _lazy_FQldFW = () => import('../fetchPhase.mjs');
const _lazy_hopxw5 = () => import('../download.mjs');
const _lazy_WWX46J = () => import('../add.mjs');
const _lazy_Z8iFGi = () => import('../saveGrades.mjs');
const _lazy_ufWucI = () => import('../loadGradesTeacher.mjs');
const _lazy_tQTmlS = () => import('../loadGrades.mjs');
const _lazy_HQSh9T = () => import('../reregister.mjs');
const _lazy_IxZN5N = () => import('../register.mjs');
const _lazy_0l7Ybm = () => import('../logout.mjs');
const _lazy_LeZ65J = () => import('../login.mjs');
const _lazy_6wL7lg = () => import('../getUserDeta.mjs');
const _lazy_QWjq6w = () => import('../CheckId.mjs');
const _lazy_hf5I7j = () => import('../handlers/renderer.mjs').then(function (n) { return n.a; });

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
  { route: '/api/word/upload', handler: _lazy_8BbNJV, lazy: true, middleware: false, method: undefined },
  { route: '/api/word/loadWards', handler: _lazy_U7RtoS, lazy: true, middleware: false, method: undefined },
  { route: '/api/word/fetchPhase', handler: _lazy_FQldFW, lazy: true, middleware: false, method: undefined },
  { route: '/api/word/download', handler: _lazy_hopxw5, lazy: true, middleware: false, method: undefined },
  { route: '/api/word/add', handler: _lazy_WWX46J, lazy: true, middleware: false, method: undefined },
  { route: '/api/grade/saveGrades', handler: _lazy_Z8iFGi, lazy: true, middleware: false, method: undefined },
  { route: '/api/grade/loadGradesTeacher', handler: _lazy_ufWucI, lazy: true, middleware: false, method: undefined },
  { route: '/api/grade/loadGrades', handler: _lazy_tQTmlS, lazy: true, middleware: false, method: undefined },
  { route: '/api/auth/reregister', handler: _lazy_HQSh9T, lazy: true, middleware: false, method: undefined },
  { route: '/api/auth/register', handler: _lazy_IxZN5N, lazy: true, middleware: false, method: undefined },
  { route: '/api/auth/logout', handler: _lazy_0l7Ybm, lazy: true, middleware: false, method: undefined },
  { route: '/api/auth/login', handler: _lazy_LeZ65J, lazy: true, middleware: false, method: undefined },
  { route: '/api/auth/getUserDeta', handler: _lazy_6wL7lg, lazy: true, middleware: false, method: undefined },
  { route: '/api/auth/CheckId', handler: _lazy_QWjq6w, lazy: true, middleware: false, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_hf5I7j, lazy: true, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_hf5I7j, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const h3App = createApp({
    debug: destr(false),
    onError: errorHandler
  });
  h3App.use(config.app.baseURL, timingMiddleware);
  const router = createRouter();
  const routerOptions = createRouter$1({ routes: config.nitro.routes });
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    const referenceRoute = h.route.replace(/:\w+|\*\*/g, "_");
    const routeOptions = routerOptions.lookup(referenceRoute) || {};
    if (routeOptions.swr) {
      handler = cachedEventHandler(handler, {
        group: "nitro/routes"
      });
    }
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(/\/+/g, "/");
      h3App.use(middlewareBase, handler);
    } else {
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router);
  const localCall = createCall(h3App.nodeHandler);
  const localFetch = createFetch(localCall, globalThis.fetch);
  const $fetch = createFetch$1({ fetch: localFetch, Headers, defaults: { baseURL: config.app.baseURL } });
  globalThis.$fetch = $fetch;
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch
  };
  for (const plugin of plugins) {
    plugin(app);
  }
  return app;
}
const nitroApp = createNitroApp();
const useNitroApp = () => nitroApp;

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const server = cert && key ? new Server({ key, cert }, nitroApp.h3App.nodeHandler) : new Server$1(nitroApp.h3App.nodeHandler);
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const hostname = process.env.NITRO_HOST || process.env.HOST || "0.0.0.0";
server.listen(port, hostname, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  console.log(`Listening on ${protocol}://${hostname}:${port}${useRuntimeConfig().app.baseURL}`);
});
{
  process.on("unhandledRejection", (err) => console.error("[nitro] [dev] [unhandledRejection] " + err));
  process.on("uncaughtException", (err) => console.error("[nitro] [dev] [uncaughtException] " + err));
}
const nodeServer = {};

export { useNitroApp as a, nodeServer as n, useRuntimeConfig as u };
//# sourceMappingURL=node-server.mjs.map

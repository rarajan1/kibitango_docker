import { u as useAuthStore, v as vue_cjs_prod } from '../server.mjs';
import { s as serverRenderer } from '../../handlers/renderer.mjs';
import 'unenv/runtime/mock/proxy';
import 'ohmyfetch';
import 'ufo';
import 'hookable';
import 'unctx';
import 'h3';
import 'defu';
import 'jsonwebtoken';
import '../../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'http';
import 'https';
import 'destr';
import 'radix3';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'ohash';
import 'unstorage';
import 'fs';
import 'pathe';
import 'url';
import 'stream';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useAuthStore();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "container d-flex flex-column justify-content-center align-items-center" }, _attrs))}><div class="w-100 row py-5"><div class="col-lg-5 offset-lg-2"><p class="fs-4">\u767B\u9332\u3057\u3066\u3044\u308B\u5358\u8A9E\u3092\u5909\u66F4\u3059\u308B\u3053\u3068\u304C\u3067\u304D\u307E\u3059</p></div><div class="col-lg-3"><button type="button" class="w-100 p-4 btn btn-primary btn-lg">\u5358\u8A9E\u3092\u767B\u9332\u3059\u308B</button></div></div><div class="w-100 row py-5"><div class="col-lg-5 offset-lg-2"><p class="fs-4">\u5B66\u751F\u304C\u53D7\u3051\u305F\u30C6\u30B9\u30C8\u306E\u6210\u7E3E\u3092\u898B\u308B\u3053\u3068\u304C\u3067\u304D\u307E\u3059</p></div><div class="col-lg-3"><button type="button" class="w-100 p-4 btn btn-primary btn-lg">\u6210\u7E3E\u3092\u898B\u308B</button></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/teacher/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index.899b14cc.mjs.map

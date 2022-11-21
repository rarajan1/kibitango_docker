import { b as _export_sfc, v as vue_cjs_prod, u as useAuthStore } from '../server.mjs';
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

const _sfc_main$1 = {
  __name: "header",
  __ssrInlineRender: true,
  setup(__props) {
    const auth = useAuthStore();
    const { state } = auth;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(_attrs)}><nav class="navbar navbar-light bg-primary"><div class="container-fluid"><div class="navbar-brand mb-0"><span class="h1 fs-2">Kibitango</span></div>`);
      if (vue_cjs_prod.unref(state).authed) {
        _push(`<div class="navbar-text"><span class="h5 mb-0">${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(state).id)}</span>\u3067\u30ED\u30B0\u30A4\u30F3\u4E2D</div>`);
      } else {
        _push(`<!---->`);
      }
      if (vue_cjs_prod.unref(state).authed) {
        _push(`<div class="ms-auto justify-content-start"><button class="btn btn-primary btn-lg">\u30ED\u30B0\u30A2\u30A6\u30C8</button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></nav></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/header.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_Header = _sfc_main$1;
  _push(`<div${serverRenderer.exports.ssrRenderAttrs(_attrs)}>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_Header, null, null, _parent));
  serverRenderer.exports.ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { _default as default };
//# sourceMappingURL=default.7651e2ab.mjs.map

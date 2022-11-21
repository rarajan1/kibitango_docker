import { v as vue_cjs_prod, u as useAuthStore, a as useLazyAsyncData, _ as __nuxt_component_0$2 } from '../server.mjs';
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
  __name: "login",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const id = vue_cjs_prod.ref("");
    const password = vue_cjs_prod.ref("");
    const successLogin = vue_cjs_prod.ref(false);
    useAuthStore();
    const { data: LoginData, pending: pendingLogin, error } = ([__temp, __restore] = vue_cjs_prod.withAsyncContext(() => useLazyAsyncData(
      "login",
      () => $fetch("/api/auth/login", { method: "POST", body: { id: id.value, password: password.value } }, { initialCache: false }),
      "$lzuF23kIAs"
    )), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "container mt-5 mb-5" }, _attrs))}><div class="row"><div class="offset-lg-3 col-lg-6"><h1 class="mt-3 mb-3">\u30ED\u30B0\u30A4\u30F3</h1><form class="border border-2 rounded p-3"><div style="${serverRenderer.exports.ssrRenderStyle(successLogin.value ? null : { display: "none" })}" class="form-text text-danger fs-5">\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u304B\u30D1\u30B9\u30EF\u30FC\u30C9\u304C\u6B63\u3057\u304F\u3042\u308A\u307E\u305B\u3093</div><div class="mb-3"><label class="form-label" for="id">ID</label><input class="form-control"${serverRenderer.exports.ssrRenderAttr("value", id.value)}></div><div class="mb-3"><label class="form-label" for="password">\u30D1\u30B9\u30EF\u30FC\u30C9</label><input class="form-control" type="password"${serverRenderer.exports.ssrRenderAttr("value", password.value)}></div><button class="btn btn-primary" type="submit"><span style="${serverRenderer.exports.ssrRenderStyle(vue_cjs_prod.unref(pendingLogin) ? null : { display: "none" })}" class="spinner-border spinner-border-sm"></span><span style="${serverRenderer.exports.ssrRenderStyle(vue_cjs_prod.unref(pendingLogin) ? null : { display: "none" })}"> Loading...</span><span style="${serverRenderer.exports.ssrRenderStyle(!vue_cjs_prod.unref(pendingLogin) ? null : { display: "none" })}">\u30ED\u30B0\u30A4\u30F3</span></button></form>`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/auth/register" }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u767B\u9332\u3057\u3066\u3044\u306A\u3044\u65B9\u306F\u3053\u3061\u3089`);
          } else {
            return [
              vue_cjs_prod.createTextVNode("\u767B\u9332\u3057\u3066\u3044\u306A\u3044\u65B9\u306F\u3053\u3061\u3089")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login.35ead984.mjs.map

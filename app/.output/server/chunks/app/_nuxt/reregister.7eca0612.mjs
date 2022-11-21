import { v as vue_cjs_prod, u as useAuthStore, f as useAsyncData, a as useLazyAsyncData } from '../server.mjs';
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
  __name: "reregister",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const id = vue_cjs_prod.ref("");
    const emailAddress = vue_cjs_prod.ref("");
    const password = vue_cjs_prod.ref("");
    const copyPassword = vue_cjs_prod.ref("");
    const family_name = vue_cjs_prod.ref("");
    const first_name = vue_cjs_prod.ref("");
    const isIdDisabled = vue_cjs_prod.ref(true);
    const isEmailAddressDisabled = vue_cjs_prod.ref(true);
    const isFamily_nameDisabled = vue_cjs_prod.ref(true);
    const isFirst_nameDisabled = vue_cjs_prod.ref(true);
    const isPasswordDisabled = vue_cjs_prod.ref(true);
    const hasId = vue_cjs_prod.ref(true);
    const hasEmailAddress = vue_cjs_prod.ref(true);
    const hasPassword = vue_cjs_prod.ref(true);
    const hasFamily_name = vue_cjs_prod.ref(true);
    const hasFirst_name = vue_cjs_prod.ref(true);
    const isCreartedUser = vue_cjs_prod.ref(false);
    const auth = useAuthStore();
    const { state } = auth;
    [__temp, __restore] = vue_cjs_prod.withAsyncContext(() => useAsyncData(
      "getUserData",
      () => $fetch("/api/auth/getUserDeta", { method: "POST", body: { user_id: state.value.id } }),
      { initialCache: false },
      "$9NEB7bQ1Zd"
    ).then(({ data }) => {
      id.value = data.value.user_id;
      emailAddress.value = data.value.email;
      family_name.value = data.value.family_name;
      first_name.value = data.value.first_name;
    })), await __temp, __restore();
    const { data: checkIdData, pending: pendingCheckId } = useLazyAsyncData(
      "CheckId",
      () => $fetch("/api/auth/CheckId", { method: "POST", body: { id: id.value } }),
      { initialCache: false },
      "$F8WMYfBHT2"
    );
    const start = vue_cjs_prod.ref(true);
    const pendingTestRegister = vue_cjs_prod.ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "container mt-5 mb-5" }, _attrs))}>`);
      if (isCreartedUser.value) {
        _push(`<div class="row"><div class="offset-lg-3 col-lg-6 d-flex flex-column align-items-center"><h1 class="mt-3 mb-3">\u767B\u9332\u60C5\u5831\u306E\u5909\u66F4\u3092\u5B8C\u4E86\u3057\u307E\u3057\u305F\u3002</h1><button class="btn btn-primary btn-lg">\u30DB\u30FC\u30E0\u753B\u9762\u306B\u884C\u304F</button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!isCreartedUser.value) {
        _push(`<div class="row"><div class="offset-lg-3 col-lg-6"><h1 class="mt-3 mb-3">\u767B\u9332\u60C5\u5831\u5909\u66F4</h1><form class="border border-2 rounded p-3"><div class="mb-3"><label class="form-label" for="id">ID</label><input class="form-control" id="id"${serverRenderer.exports.ssrRenderAttr("value", id.value)}${serverRenderer.exports.ssrIncludeBooleanAttr(isIdDisabled.value) ? " disabled" : ""}><div style="${serverRenderer.exports.ssrRenderStyle(!isIdDisabled.value ? null : { display: "none" })}" class="form-text">\u534A\u89D2\u82F1\u6570\u5B57\u3068\u8A18\u53F7(&gt;&lt;-_.@)\u3067ID\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002\u4ED6\u306E\u30E6\u30FC\u30B6\u30FC\u304C\u4F7F\u7528\u3057\u3066\u3044\u308BID\u306F\u4F7F\u7528\u3067\u304D\u307E\u305B\u3093</div><div style="${serverRenderer.exports.ssrRenderStyle(id.value.length >= 100 ? null : { display: "none" })}" class="form-text text-danger">100\u6587\u5B57\u4EE5\u4E0A\u306F\u4F7F\u3048\u307E\u305B\u3093</div><div style="${serverRenderer.exports.ssrRenderStyle(!hasId.value && !vue_cjs_prod.unref(pendingCheckId) ? null : { display: "none" })}" class="form-text text-danger">\u3053\u306EID\u306F\u4F7F\u7528\u3067\u304D\u307E\u305B\u3093\u3002</div><div style="${serverRenderer.exports.ssrRenderStyle(!start.value && hasId.value && !vue_cjs_prod.unref(pendingCheckId) && !(id.value.length >= 100) ? null : { display: "none" })}" class="form-text text-success">\u3053\u306EID\u306F\u4F7F\u7528\u3067\u304D\u307E\u3059\u3002</div><div style="${serverRenderer.exports.ssrRenderStyle(vue_cjs_prod.unref(pendingCheckId) ? null : { display: "none" })}" class="form-text">\u691C\u8A3C\u4E2D</div><button type="button" style="${serverRenderer.exports.ssrRenderStyle(isIdDisabled.value ? null : { display: "none" })}" class="btn btn-primary btn-sm">\u5909\u66F4\u3059\u308B\u5834\u5408\u62BC\u3057\u3066\u304F\u3060\u3055\u3044</button></div><div class="mb-3"><label class="form-label" for="emailAddress">\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9</label><input class="form-control" type="text" id="emailAddress"${serverRenderer.exports.ssrRenderAttr("value", emailAddress.value)}${serverRenderer.exports.ssrIncludeBooleanAttr(isEmailAddressDisabled.value) ? " disabled" : ""}><div style="${serverRenderer.exports.ssrRenderStyle(!isEmailAddressDisabled.value ? null : { display: "none" })}" class="form-text">\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002</div><div style="${serverRenderer.exports.ssrRenderStyle(!hasEmailAddress.value ? null : { display: "none" })}" class="form-text text-danger">\u6B63\u3057\u3044\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u3092\u3044\u308C\u3066\u304F\u3060\u3055\u3044\u3002</div><button type="button" style="${serverRenderer.exports.ssrRenderStyle(isEmailAddressDisabled.value ? null : { display: "none" })}" class="btn btn-primary btn-sm">\u5909\u66F4\u3059\u308B\u5834\u5408\u62BC\u3057\u3066\u304F\u3060\u3055\u3044</button></div><div class="mb-3"><label class="form-label" for="family_name">\u82D7\u5B57</label><input class="form-control" id="family_name"${serverRenderer.exports.ssrRenderAttr("value", family_name.value)}${serverRenderer.exports.ssrIncludeBooleanAttr(isFamily_nameDisabled.value) ? " disabled" : ""}><div style="${serverRenderer.exports.ssrRenderStyle(!isFamily_nameDisabled.value ? null : { display: "none" })}" class="form-text">\u82D7\u5B57\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002</div><div style="${serverRenderer.exports.ssrRenderStyle(!hasFamily_name.value ? null : { display: "none" })}" class="form-text text-danger">\u82D7\u5B57\u304C\u7A7A\u6B04\u3067\u3059\u3002</div><button type="button" style="${serverRenderer.exports.ssrRenderStyle(isFamily_nameDisabled.value ? null : { display: "none" })}" class="btn btn-primary btn-sm">\u5909\u66F4\u3059\u308B\u5834\u5408\u62BC\u3057\u3066\u304F\u3060\u3055\u3044</button></div><div class="mb-3"><label class="form-label" for="first_name">\u540D\u524D</label><input class="form-control" id="first_name"${serverRenderer.exports.ssrRenderAttr("value", first_name.value)}${serverRenderer.exports.ssrIncludeBooleanAttr(isFirst_nameDisabled.value) ? " disabled" : ""}><div style="${serverRenderer.exports.ssrRenderStyle(!isFirst_nameDisabled.value ? null : { display: "none" })}" class="form-text">\u540D\u524D\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002</div><div style="${serverRenderer.exports.ssrRenderStyle(!hasFirst_name.value ? null : { display: "none" })}" class="form-text text-danger">\u540D\u524D\u304C\u7A7A\u6B04\u3067\u3059\u3002</div><button type="button" style="${serverRenderer.exports.ssrRenderStyle(isFirst_nameDisabled.value ? null : { display: "none" })}" class="btn btn-primary btn-sm">\u5909\u66F4\u3059\u308B\u5834\u5408\u62BC\u3057\u3066\u304F\u3060\u3055\u3044</button></div><div class="mb-3"><label class="form-label" for="password">\u30D1\u30B9\u30EF\u30FC\u30C9</label><input class="form-control" id="password" type="password"${serverRenderer.exports.ssrRenderAttr("value", password.value)}${serverRenderer.exports.ssrIncludeBooleanAttr(isPasswordDisabled.value) ? " disabled" : ""}><div style="${serverRenderer.exports.ssrRenderStyle(!isPasswordDisabled.value ? null : { display: "none" })}" class="form-text">\u534A\u89D2\u82F1\u6570\u5B57\u3068\u8A18\u53F7(&gt;&lt;-_.@)\u304B\u30648\u6587\u5B57\u4EE5\u4E0A\u3067\u8A2D\u5B9A\u3057\u3066\u304F\u3060\u3055\u3044\u3002</div><div style="${serverRenderer.exports.ssrRenderStyle(!hasPassword.value ? null : { display: "none" })}" class="form-text text-danger">\u30D1\u30B9\u30EF\u30FC\u30C9\u304C\uFF18\u6587\u5B57\u4EE5\u4E0A\u3067\u306F\u306A\u3044\u304B\u3001\u5229\u7528\u3067\u304D\u306A\u3044\u6587\u5B57\u304C\u542B\u307E\u308C\u307E\u3059\u3002</div><button type="button" style="${serverRenderer.exports.ssrRenderStyle(isPasswordDisabled.value ? null : { display: "none" })}" class="btn btn-primary btn-sm">\u5909\u66F4\u3059\u308B\u5834\u5408\u62BC\u3057\u3066\u304F\u3060\u3055\u3044</button></div><div class="mb-3"><label class="form-label" for="copyPassword">\u78BA\u8A8D\u7528\u30D1\u30B9\u30EF\u30FC\u30C9</label><input class="form-control" id="copyPassword" type="password"${serverRenderer.exports.ssrRenderAttr("value", copyPassword.value)}${serverRenderer.exports.ssrIncludeBooleanAttr(isPasswordDisabled.value) ? " disabled" : ""}><div style="${serverRenderer.exports.ssrRenderStyle(!isPasswordDisabled.value ? null : { display: "none" })}" class="form-text">\u5148\u307B\u3069\u5165\u529B\u3057\u305F\u30D1\u30B9\u30EF\u30FC\u30C9\u3092\u540C\u3058\u3082\u306E\u3092\u5165\u308C\u3066\u304F\u3060\u3055\u3044\u3002</div><div style="${serverRenderer.exports.ssrRenderStyle(password.value != copyPassword.value ? null : { display: "none" })}" class="form-text text-danger">\u540C\u4E00\u306A\u30D1\u30B9\u30EF\u30FC\u30C9\u3067\u306F\u3042\u308A\u307E\u305B\u3093\u3002</div></div><button class="btn btn-primary" type="submit"${serverRenderer.exports.ssrIncludeBooleanAttr(isIdDisabled.value && isEmailAddressDisabled.value && isFamily_nameDisabled.value && isFirst_nameDisabled.value && isPasswordDisabled.value) ? " disabled" : ""}><span style="${serverRenderer.exports.ssrRenderStyle(pendingTestRegister.value ? null : { display: "none" })}" class="spinner-border spinner-border-sm"></span><span style="${serverRenderer.exports.ssrRenderStyle(pendingTestRegister.value ? null : { display: "none" })}"> Loading...</span><span style="${serverRenderer.exports.ssrRenderStyle(!pendingTestRegister.value ? null : { display: "none" })}">\u5909\u66F4\u3092\u78BA\u5B9A</span></button></form></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/student/reregister.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=reregister.7eca0612.mjs.map

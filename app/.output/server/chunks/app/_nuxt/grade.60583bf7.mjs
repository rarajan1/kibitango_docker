import { v as vue_cjs_prod, a as useLazyAsyncData, c as _sfc_main$6, d as _sfc_main$5, e as __nuxt_component_0$1 } from '../server.mjs';
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
  __name: "grade",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const selectPhase = vue_cjs_prod.ref("");
    const { data: gradesData, pending: pendingGrades } = ([__temp, __restore] = vue_cjs_prod.withAsyncContext(() => useLazyAsyncData(
      "loadGrades",
      () => $fetch("/api/grade/loadGrades", { method: "POST", body: { phase: selectPhase.value } }),
      {
        server: false,
        initialCache: false,
        watch: [selectPhase]
      },
      "$CjDBdsysyR"
    )), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PhaseButton = _sfc_main$6;
      const _component_GradesTable = _sfc_main$5;
      const _component_LoadingDisplay = __nuxt_component_0$1;
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "container" }, _attrs))}><div class="row my-5 justify-content-center"><p class="fs-4 col-auto">\u898B\u305F\u3044\u554F\u984C\u306E\u30D5\u30A7\u30A4\u30BA\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044</p></div><div class="row g-2 justify-content-center">`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_PhaseButton, {
        onOnChangePhase: ($event) => selectPhase.value = $event.target.value,
        disabled: vue_cjs_prod.unref(pendingGrades)
      }, null, _parent));
      _push(`</div><div class="my-5">`);
      if (!vue_cjs_prod.unref(pendingGrades)) {
        _push(serverRenderer.exports.ssrRenderComponent(_component_GradesTable, { data: vue_cjs_prod.unref(gradesData) }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (vue_cjs_prod.unref(pendingGrades)) {
        _push(serverRenderer.exports.ssrRenderComponent(_component_LoadingDisplay, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="row"><div class="offset-lg-3 col-lg-6 d-flex flex-column align-items-center"><button class="btn btn-primary btn-lg">\u30DB\u30FC\u30E0\u753B\u9762\u306B\u884C\u304F</button></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/student/grade.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=grade.60583bf7.mjs.map

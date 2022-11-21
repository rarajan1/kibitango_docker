import { v as vue_cjs_prod, c as _sfc_main$6 } from '../server.mjs';
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
    const selectPhase = vue_cjs_prod.ref();
    const startDate = vue_cjs_prod.ref();
    const startTime = vue_cjs_prod.ref("00:00");
    const endDate = vue_cjs_prod.ref();
    const endTime = vue_cjs_prod.ref("00:00");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PhaseButton = _sfc_main$6;
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(_attrs)}><div class="container"><div class="row py-5"><p class="${serverRenderer.exports.ssrRenderClass([selectPhase.value == void 0 ? "text-danger" : "", "fs-4 col-12 d-flex justify-content-center"])}">\u8868\u793A\u3059\u308B\u6210\u7E3E\u306E\u30D5\u30A7\u30A4\u30BA\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044</p></div><div class="row g-2 justify-content-center">`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_PhaseButton, {
        onOnChangePhase: ($event) => selectPhase.value = $event.target.value
      }, null, _parent));
      _push(`</div><div class="row py-5"><p class="${serverRenderer.exports.ssrRenderClass([startDate.value == void 0 || endDate.value == void 0 ? "text-danger" : "", "fs-4 col-12 d-flex justify-content-center"])}">\u6210\u7E3E\u3092\u8A18\u9332\u3057\u305F\u671F\u9593\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044</p></div><div class="row justify-content-center"><div class="col-auto"><input type="date"${serverRenderer.exports.ssrRenderAttr("value", startDate.value)}><input type="time"${serverRenderer.exports.ssrRenderAttr("value", startTime.value)}></div><div class="col-auto">\uFF5E</div><div class="col-auto"><input type="date"${serverRenderer.exports.ssrRenderAttr("value", endDate.value)}><input type="time"${serverRenderer.exports.ssrRenderAttr("value", endTime.value)}></div></div><div class="row p-5 justify-content-center"><button class="col-5 p-3 btn btn-primary btn-lg">\u6210\u7E3E\u3092\u8868\u793A</button></div><div class="row"><div class="offset-lg-3 col-lg-6 d-flex flex-column align-items-center"><button class="btn btn-primary btn-lg">\u30DB\u30FC\u30E0\u753B\u9762\u306B\u884C\u304F</button></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/teacher/grades/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index.a64ec460.mjs.map

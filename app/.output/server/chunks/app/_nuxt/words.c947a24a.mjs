import { v as vue_cjs_prod, e as __nuxt_component_0$1 } from '../server.mjs';
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
  __name: "words",
  __ssrInlineRender: true,
  setup(__props) {
    vue_cjs_prod.ref();
    const pendingUploadFile = vue_cjs_prod.ref(false);
    const isDuplication = vue_cjs_prod.ref(false);
    const isNotFindFile = vue_cjs_prod.ref(false);
    const SuccessFileUpdate = vue_cjs_prod.ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LoadingDisplay = __nuxt_component_0$1;
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "container" }, _attrs))}>`);
      if (pendingUploadFile.value) {
        _push(serverRenderer.exports.ssrRenderComponent(_component_LoadingDisplay, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="row p-5 justify-content-center"><p class="fs-4 col-10 d-flex justify-content-center">\u767B\u9332\u3059\u308B\u5358\u8A9E\u30D5\u30A1\u30A4\u30EB\u3092\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9\u3059\u308B</p><div class="col-8 px-0 py-4"><input class="form-control" type="file" id="formFile" accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"><label class="form-label" for="formFile"></label>`);
      if (isDuplication.value) {
        _push(`<label class="form-text text-danger fs-4">\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9\u3057\u305F\u30D5\u30A1\u30A4\u30EB\u306Eword\u306E\u5217\u306B\u88AB\u308A\u304C\u3042\u308B\u305F\u3081\u767B\u9332\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F</label>`);
      } else {
        _push(`<!---->`);
      }
      if (isNotFindFile.value) {
        _push(`<label class="form-text text-danger fs-4">\u30D5\u30A1\u30A4\u30EB\u304C\u6307\u5B9A\u3055\u308C\u3066\u3044\u307E\u305B\u3093</label>`);
      } else {
        _push(`<!---->`);
      }
      if (SuccessFileUpdate.value) {
        _push(`<label class="form-text text-success fs-4">\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9\u304C\u6210\u529F\u3057\u307E\u3057\u305F</label>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button class="col-5 p-3 btn btn-primary btn-lg">\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9</button></div><div class="row p-5 justify-content-center"><p class="fs-4 col-10 d-flex justify-content-center">\u767B\u9332\u3059\u308B\u5358\u8A9E\u3092\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9\u3059\u308B</p><button class="col-5 p-3 btn btn-primary btn-lg">\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9</button></div><div class="row"><div class="offset-lg-3 col-lg-6 d-flex flex-column align-items-center"><button class="btn btn-primary btn-lg">\u30DB\u30FC\u30E0\u753B\u9762\u306B\u884C\u304F</button></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/teacher/words.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=words.c947a24a.mjs.map

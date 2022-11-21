import { i as useRoute, f as useAsyncData, v as vue_cjs_prod, e as __nuxt_component_0$1, d as _sfc_main$5 } from '../server.mjs';
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
  __name: "[phase].[startDate].[startTime].[endDate].[endTime]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const phase = route.params.phase;
    const startDate = route.params.startDate;
    const startTime = route.params.startTime;
    const endDate = route.params.endDate;
    const endTime = route.params.endTime;
    const { data, pending } = useAsyncData(
      "loadGrades",
      () => $fetch(
        "/api/grade/loadGradesTeacher",
        {
          method: "POST",
          body: {
            phase,
            startDate,
            startTime,
            endDate,
            endTime
          }
        }
      ),
      {
        initialCache: false,
        lazy: true
      },
      "$jQWklmFNOS"
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LoadingDisplay = __nuxt_component_0$1;
      const _component_GradesTable = _sfc_main$5;
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(_attrs)}>`);
      if (vue_cjs_prod.unref(pending)) {
        _push(serverRenderer.exports.ssrRenderComponent(_component_LoadingDisplay, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (!vue_cjs_prod.unref(pending)) {
        _push(`<div class="container p-5">`);
        _push(serverRenderer.exports.ssrRenderComponent(_component_GradesTable, { data: vue_cjs_prod.unref(data) }, null, _parent));
        _push(`<div class="row"><div class="offset-lg-3 col-lg-6 d-flex flex-column align-items-center"><button class="btn btn-primary btn-lg">\u30DB\u30FC\u30E0\u753B\u9762\u306B\u884C\u304F</button></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/teacher/grades/[phase].[startDate].[startTime].[endDate].[endTime].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_phase_._startDate_._startTime_._endDate_._endTime_.1500947d.mjs.map

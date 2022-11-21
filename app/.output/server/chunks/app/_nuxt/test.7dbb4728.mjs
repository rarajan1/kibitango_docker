import { v as vue_cjs_prod, a as useLazyAsyncData, c as _sfc_main$6, e as __nuxt_component_0$1, g as _sfc_main$3, h as _sfc_main$2 } from '../server.mjs';
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
  __name: "test",
  __ssrInlineRender: true,
  setup(__props) {
    const selectPhase = vue_cjs_prod.ref("");
    const StateChoicePhase = vue_cjs_prod.ref(true);
    const StateTest = vue_cjs_prod.ref(false);
    const StateAnswer = vue_cjs_prod.ref(false);
    const userAnswers = vue_cjs_prod.ref([]);
    const isAllAnswered = vue_cjs_prod.ref(true);
    let wordIds = [];
    let results = [];
    const { data: questions, pending: pendingQuestion } = useLazyAsyncData(
      "lordWards",
      () => $fetch("/api/word/loadWards", { method: "POST", body: { phase: selectPhase.value } }),
      {
        server: false,
        initialCache: false,
        watch: [selectPhase]
      },
      "$aCTFAs6lAz"
    );
    const { pending: pendingSaveGrades } = useLazyAsyncData(
      "saveGrades",
      () => $fetch("/api/grade/saveGrades", { method: "POST", body: { wordIds, results } }),
      {
        initialCache: false
      },
      "$rqlgsx8qMq"
    );
    const OnChoicePhase = (e) => {
      selectPhase.value = e.target.value;
      StateTest.value = true;
      StateChoicePhase.value = false;
    };
    const ChangeUserAnsewer = (value, id) => {
      userAnswers.value[id] = value.target.value;
      if (!isAllAnswered.value)
        isAllAnswered.value = CheckAllAnswered();
    };
    const CheckAllAnswered = () => {
      if (userAnswers.value.length != questions.value.length)
        return false;
      for (let i = 0; i < userAnswers.value.length; i++)
        if (userAnswers.value[i] == void 0)
          return false;
      return true;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PhaseButton = _sfc_main$6;
      const _component_LoadingDisplay = __nuxt_component_0$1;
      const _component_StudentTestQuestion = _sfc_main$3;
      const _component_StudentTestAnswer = _sfc_main$2;
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "container" }, _attrs))}>`);
      if (StateChoicePhase.value) {
        _push(`<div><div class="row py-5 justify-content-center"><p class="fs-4 col-auto">\u53D7\u3051\u305F\u3044\u554F\u984C\u306E\u30D5\u30A7\u30A4\u30BA\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044</p></div><div class="row g-2 justify-content-center">`);
        _push(serverRenderer.exports.ssrRenderComponent(_component_PhaseButton, { onOnChangePhase: OnChoicePhase }, null, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (vue_cjs_prod.unref(pendingSaveGrades) || vue_cjs_prod.unref(pendingQuestion)) {
        _push(serverRenderer.exports.ssrRenderComponent(_component_LoadingDisplay, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (StateTest.value && !vue_cjs_prod.unref(pendingQuestion)) {
        _push(`<div><div class="row p-5 gy-5 justify-content-center"><div class="col-12"><!--[-->`);
        serverRenderer.exports.ssrRenderList(vue_cjs_prod.unref(questions), (question, i) => {
          _push(serverRenderer.exports.ssrRenderComponent(_component_StudentTestQuestion, {
            questionNum: i,
            question: question.word,
            choices: question.choices,
            "onUpdate:answer": ChangeUserAnsewer
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
        if (!isAllAnswered.value) {
          _push(`<p class="fs-4 text-danger">\u56DE\u7B54\u3057\u3066\u3044\u306A\u3044\u554F\u984C\u304C\u3042\u308A\u307E\u3059</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button class="col-10 p-3 btn btn-primary btn-lg">\u7B54\u3048\u5408\u308F\u305B\u3092\u3059\u308B</button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (StateAnswer.value && !vue_cjs_prod.unref(pendingSaveGrades)) {
        _push(`<div><div class="col-12">`);
        if (!vue_cjs_prod.unref(pendingSaveGrades)) {
          _push(`<!--[-->`);
          serverRenderer.exports.ssrRenderList(vue_cjs_prod.unref(questions), (question, i) => {
            _push(serverRenderer.exports.ssrRenderComponent(_component_StudentTestAnswer, {
              questionNum: i,
              question: question.word,
              answer: question.answer,
              remark: question.remark,
              userAnswer: userAnswers.value[i]
            }, null, _parent));
          });
          _push(`<!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="offset-lg-3 col-lg-6 my-5 d-flex flex-column align-items-center"><button class="btn btn-primary btn-lg">\u30DB\u30FC\u30E0\u753B\u9762\u306B\u884C\u304F</button></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/student/test.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=test.7dbb4728.mjs.map

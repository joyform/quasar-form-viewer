/*!
 * quasar-ui-tyformviewer v0.1.58
 * (c) 2022 dan@typefully.io
 * Released under the MIT License.
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue'), require('quasar')) :
  typeof define === 'function' && define.amd ? define(['vue', 'quasar'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.TyFormViewer = factory(global.Vue, global.Quasar));
}(this, (function (vue, quasar) { 'use strict';

  var script$a = {
    name: 'Block',
    components: {
      // TyWizard: defineAsyncComponent(() => import('./blocks/Wizard.vue')),
      // TySection: defineAsyncComponent(() => import('./blocks/Section.vue')),
      TyText: vue.defineAsyncComponent(() => Promise.resolve().then(function () { return TyInput; })),
      TyPassword: vue.defineAsyncComponent(() => Promise.resolve().then(function () { return TyInput; })),
      TyTextarea: vue.defineAsyncComponent(() => Promise.resolve().then(function () { return TyInput; })),
      TyEmail: vue.defineAsyncComponent(() => Promise.resolve().then(function () { return TyInput; })),
      TySearch: vue.defineAsyncComponent(() => Promise.resolve().then(function () { return TyInput; })),
      TyTel: vue.defineAsyncComponent(() => Promise.resolve().then(function () { return TyInput; })),
      TyNumber: vue.defineAsyncComponent(() => Promise.resolve().then(function () { return TyInput; })),
      TyUrl: vue.defineAsyncComponent(() => Promise.resolve().then(function () { return TyInput; })),
      TySelect: vue.defineAsyncComponent(() => Promise.resolve().then(function () { return TySelect; })),
      TySlider: vue.defineAsyncComponent(() => Promise.resolve().then(function () { return TySlider; })),
      TyRating: vue.defineAsyncComponent(() => Promise.resolve().then(function () { return TyRating; })),
      TyCheckbox: vue.defineAsyncComponent(() => Promise.resolve().then(function () { return TyOptionGroup; })),
      TyRadio: vue.defineAsyncComponent(() => Promise.resolve().then(function () { return TyOptionGroup; })),
      TyToggle: vue.defineAsyncComponent(() => Promise.resolve().then(function () { return TyOptionGroup; })),
      TyHtml: vue.defineAsyncComponent(() => Promise.resolve().then(function () { return TyHtml; })),
      TyDate: vue.defineAsyncComponent(() => Promise.resolve().then(function () { return TyDate; })),
      TySignature: vue.defineAsyncComponent(() => Promise.resolve().then(function () { return TySignature; })),
    },
    props: {
      blockSchema: Object,
      modelValue: [String, Boolean, Number, Array, Object]
    },
    emits: ['update:modelValue'],
    setup(props, {emit}) {
      const el = vue.ref(null);
      const hover = vue.ref(false);
      const schema = vue.reactive(props.blockSchema);
      const modelValueRef = vue.ref(props.modelValue);
      const behavior = vue.computed(() => {
        return {
          readOnly: schema.behavior.readOnly === 'on',
          required: schema.behavior.required === 'on',
          clearable: schema.behavior.clearable === 'on', //TODO - or inherit from theme?
          disabled: schema.behavior.disabled === 'on',
          displayed: schema.behavior.displayed === 'on',
          counter: schema.behavior.counter === 'on',
          multiple: !!schema.behavior.multiple
        }
      });
      const onUpdate = (evt) => {
        emit('update:modelValue', evt);
      };
      return {
        el,
        hover,
        behavior,
        schema,
        modelValueRef,
        onUpdate
      }
    }
  };

  function render$9(_ctx, _cache, $props, $setup, $data, $options) {
    return ($setup.behavior.displayed)
      ? (vue.openBlock(), vue.createElementBlock("div", {
          key: 0,
          class: "ty-block",
          style: {"position":"relative"},
          ref: "el",
          onMouseover: _cache[1] || (_cache[1] = $event => ($setup.hover = true)),
          onMouseleave: _cache[2] || (_cache[2] = $event => ($setup.hover = false))
        }, [
          vue.renderSlot(_ctx.$slots, "beforeblock", {
            blockSchema: $setup.schema,
            el: $setup.el,
            hover: $setup.hover
          }),
          (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent('ty-' + $setup.schema.type), vue.mergeProps($setup.schema, {
            behavior: $setup.behavior,
            class: "q-my-md",
            modelValue: $setup.modelValueRef,
            "onUpdate:modelValue": [
              _cache[0] || (_cache[0] = $event => (($setup.modelValueRef) = $event)),
              $setup.onUpdate
            ]
          }), null, 16, ["behavior", "modelValue", "onUpdate:modelValue"]))
        ], 544))
      : vue.createCommentVNode("", true)
  }

  script$a.render = render$9;

  // import { useQuasar } from 'quasar'

  var script$9 = vue.defineComponent({
    name: 'TyFormViewer',
    components: {
      Block: script$a, QForm: quasar.QForm, QCard: quasar.QCard, QImg: quasar.QImg, QCardSection: quasar.QCardSection
    },
    props: {
      formSchema: {
        type: Object,
        default: () => ({})
      },
      formData: {
        type: Object,
        default: () => ({})
      },
      embedded: Boolean
    },
    setup (props) {
      const reactiveFormData = vue.reactive(props.formData);
      const formComp = vue.ref(null);
      const currentPage = vue.ref(0);
      const mainPage = vue.ref(null);
      const reactiveFormSchema = vue.computed(() => props.formSchema);
      vue.watch(
          // maintain formData fields to match the schema
          () => reactiveFormSchema,
          () => {
            reactiveFormSchema.value.pages.forEach(p => {
              p.blocks.forEach(b => {
                //todo: filter out non-input fields
                if (reactiveFormData[b.name] === undefined) {
                  reactiveFormData[b.name] = null;
                }
              });
            });
          },
          {immediate:true}
      );
      // const page = computed(() => reactiveFormSchema.pages[currentPage.value])
      vue.provide('formSchema', reactiveFormSchema);
      // provide('formData', reactiveFormData);
      // const wrapperStyle = computed(() => ({
      //   maxWidth: reactiveFormSchema.theme.card.maxWidth + 'px',
      //   width: '100vw',
      //   maxHeight: reactiveFormSchema.theme.card.maxHeight ? reactiveFormSchema.theme.card.maxHeight + 'px' : undefined,
      //   height: reactiveFormSchema.theme.card.maxHeight ? 'calc(100vh - 80px)' : undefined
      // }));
      const pageStyle = vue.computed(() => {
        if (reactiveFormSchema.value.theme.page.backgroundType === 'gradient') {
          const grad = reactiveFormSchema.value.theme.page.backgroundGradient;
          if (grad.type==='linear') {
            return {background: `linear-gradient(${grad.direction}deg, ${grad.color1} ${grad.position1}%, ${grad.color2} ${grad.position2}%)`}
          }
          return {background: `radial-gradient(circle at center, ${grad.color1} ${grad.position1}%, ${grad.color2} ${grad.position2}%)`}
        }
        const style = {
          backgroundColor: reactiveFormSchema.value.theme.page.backgroundColor || "#fff",
        };
        if(reactiveFormSchema.value.theme.page.backgroundType === 'image') {
          Object.assign(style, {
            backgroundImage: reactiveFormSchema.value.theme.page.backgroundImage ? `url("${reactiveFormSchema.value.theme.page.backgroundImage}")` : null,
            backgroundSize: "cover",
          });
        }
        return style
      });
      const horizontal = vue.computed(() =>
          (reactiveFormSchema.value.theme.card.cover.position === ('left') || reactiveFormSchema.value.theme.card.cover.position === ('right')) &&
          mainPage.value && mainPage.value.clientWidth >= (reactiveFormSchema.value.theme.card.revertToVerticalIfWidthBelow || 600 )
      );
      const showCover = vue.computed(() =>
          reactiveFormSchema.value.theme.card.cover.position && reactiveFormSchema.value.theme.card.cover.position !== 'none'
      );
      const cardStyle = vue.computed(() =>({
        backgroundColor: reactiveFormSchema.value.theme.card.backgroundColor || "#fff",
        backdropFilter: reactiveFormSchema.value.theme.card.backdrop,
        width: "100%",
        maxWidth: reactiveFormSchema.value.theme.card.maxWidth + 'px',
        // height:  mainPage.value ? mainPage.value.clientHeight + 'px' : undefined,
        maxHeight: reactiveFormSchema.value.theme.card.maxHeight ? reactiveFormSchema.value.theme.card.maxHeight + 'px' : undefined,
        borderRadius: reactiveFormSchema.value.theme.card.cornersRadius + 'px',
        border: reactiveFormSchema.value.theme.card.border ? `${reactiveFormSchema.value.theme.card.border.width}px solid ${reactiveFormSchema.value.theme.card.border.color}` : 0,
        overflow: 'hidden'
      }));
      const cardClasses = vue.computed(() => {
        const classes = [];
        if (reactiveFormSchema.value.theme.card.shadow === 0) {
          classes.push('no-shadow');
        } else {
          classes.push('shadow-' + reactiveFormSchema.value.theme.card.shadow);
        }
        return classes
      });

      const coverClasses = vue.computed(() => {
        const classes = [];
        if (horizontal.value && reactiveFormSchema.value.theme.card.cover.widthCols) {
          classes.push('col-' + reactiveFormSchema.value.theme.card.cover.widthCols);
        }
        return classes
      });
      const coverWrapperClasses = vue.computed(() => {
        const classes = [];
        if (horizontal.value) {
          classes.push('row');
          if (reactiveFormSchema.value.theme.card.cover.position === 'right') {
            classes.push('reverse');
          }
        }
        return classes
      });
      const formClasses = vue.computed(() => {
        //in horizontal view, if the cover has col-* class, the form section also has to have one (12 - cover)
        const classes = [];
        if (reactiveFormSchema.value.theme.card.cover.widthCols) {
          classes.push('col-' + (12 - reactiveFormSchema.value.theme.card.cover.widthCols));
        }
        return classes
      });
      const coverHeight = vue.computed(() => {
        const borderWidth = reactiveFormSchema.value.theme.card.border ? reactiveFormSchema.value.theme.card.border.width : 0;
        const cardHeight = horizontal.value && reactiveFormSchema.value.theme.card.maxHeight ? reactiveFormSchema.value.theme.card.maxHeight : 9999;
        const pageHeight = mainPage.value ? mainPage.value.clientHeight : 9999;
        const coverHeight = horizontal.value ? 9999 : (reactiveFormSchema.value.theme.card.cover.maxHeight ? reactiveFormSchema.value.theme.card.cover.maxHeight : 180);
        console.log('computed coverHeight [cardHeight, pageHeight, coverHeight]', cardHeight, pageHeight, coverHeight);
        const maxHeight = Math.min(
            cardHeight,
            pageHeight,
            coverHeight) - (borderWidth * (horizontal.value ? 2 : 1));
        const minHeight = horizontal.value && reactiveFormSchema.value.theme.card.minHeight ? reactiveFormSchema.value.theme.card.minHeight : 0;
        return Math.max(minHeight, maxHeight) + 'px'
      });
      const coverStyle = vue.computed(() => {
        const style = {};
        const rd = reactiveFormSchema.value.theme.card.cornersRadius;
        if (horizontal.value) {
          if (!reactiveFormSchema.value.theme.card.cover.widthCols && reactiveFormSchema.value.theme.card.width) {
            style.width = reactiveFormSchema.value.theme.card.cover.width + 'px';
          }
        }
        if (rd > 0) {
          style.borderRadius = `0`;
        }
        return style
      });
      const buttonStyle = vue.computed(() => {
        return {
          borderRadius: reactiveFormSchema.value.theme.buttons.cornersRadius + 'px',
          backgroundColor: reactiveFormSchema.value.theme.buttons.backgroundColor,
          border: reactiveFormSchema.value.theme.buttons.border ? `${reactiveFormSchema.value.theme.buttons.border.width}px solid ${reactiveFormSchema.value.theme.buttons.border.color}` : undefined
        }
      });
      const buttonClicked = () => {
        if (reactiveFormSchema.value.pages.length - 1 > currentPage.value) {
          //next
          //todo: validate()
          currentPage.value += 1;
        } else {
          //last page
          //todo: validate()
          fetch(reactiveFormSchema.value.form.actionUrl,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(reactiveFormData),
            mode: 'cors'
          }).then(res => {
            return res.json()
          }).then(json => {
            console.log('response', json);
          });

          //todo: move to thankyou page, show validation errors
        }
      };
      const openTypefully = () => quasar.openURL('https://typefully.io');
      const onUpdate = (blockName, evt) => {
        console.log(`${blockName} = ${evt} [${typeof evt}] | ${JSON.stringify(evt)}`);
      };
      return {
        // wrapperStyle,
        pageStyle,
        cardStyle,
        cardClasses,
        openTypefully,
        currentPage,
        // page,
        reactiveFormSchema,
        mainPage,
        horizontal,
        showCover,
        coverClasses,
        formClasses,
        coverStyle,
        coverHeight,
        coverWrapperClasses,
        buttonStyle,
        buttonClicked,
        formComp,
        reactiveFormData,
        onUpdate
      }
    }
  });

  const _hoisted_1$8 = {
    class: "ty-main-page fit relative-position absolute",
    ref: "mainPage",
    style: {"z-index":"5","bottom":"0","top":"0","right":"0","left":"0"}
  };
  const _hoisted_2$2 = {
    key: 0,
    class: "absolute-bottom q-pa-sm text-white",
    style: {"background-color":"#00000088"}
  };
  const _hoisted_3$1 = {
    key: 0,
    class: "text-h6"
  };
  const _hoisted_4$1 = {
    key: 1,
    class: "text-subtitle2"
  };
  const _hoisted_5$1 = {
    key: 1,
    class: "q-pa-md"
  };
  const _hoisted_6 = {
    key: 0,
    class: "text-h6"
  };
  const _hoisted_7 = {
    key: 1,
    class: "text-subtitle2"
  };

  function render$8(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_q_img = vue.resolveComponent("q-img");
    const _component_block = vue.resolveComponent("block");
    const _component_q_btn = vue.resolveComponent("q-btn");
    const _component_q_card_section = vue.resolveComponent("q-card-section");
    const _component_q_card = vue.resolveComponent("q-card");
    const _component_q_tab_panel = vue.resolveComponent("q-tab-panel");
    const _component_q_tab_panels = vue.resolveComponent("q-tab-panels");
    const _component_q_form = vue.resolveComponent("q-form");

    return (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
      (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent("style"), null, {
        default: vue.withCtx(() => [
          vue.createTextVNode(" .q-field--outlined .q-field__control { border-radius: " + vue.toDisplayString(_ctx.reactiveFormSchema.theme.inputs.cornersRadius) + "px; } .q-field--outlined .q-field__control { background-color: rgba(" + vue.toDisplayString(_ctx.reactiveFormSchema.theme.inputs.fill < 0 ? '0,0,0' : '255,255,255') + "," + vue.toDisplayString(_ctx.reactiveFormSchema.theme.inputs.fill/100*(_ctx.reactiveFormSchema.theme.inputs.fill<0?-1:1)) + "); } .ty-signature canvas { border-radius: " + vue.toDisplayString(_ctx.reactiveFormSchema.theme.inputs.cornersRadius) + "px; border: 1px solid #c2c2c2; background-color: #fff; } .min-height-100p { min-height: 100%; } .full-height-100vh { min-height:100vh; } .ty-submit-btn { color: " + vue.toDisplayString(_ctx.reactiveFormSchema.theme.buttons.textColor || '#000000') + " } .ty-back-btn { color: " + vue.toDisplayString(_ctx.reactiveFormSchema.theme.buttons.backTextColor || '#000000') + " } .ty-rating .q-rating .q-rating__icon-container { margin-right: 10px } ", 1)
        ]),
        _: 1
      })),
      vue.createElementVNode("div", {
        class: vue.normalizeClass({fullscreen: !_ctx.embedded, 'fit':_ctx.embedded}),
        style: vue.normalizeStyle([_ctx.pageStyle, {"z-index":"1"}])
      }, null, 6),
      vue.createElementVNode("div", _hoisted_1$8, [
        vue.createVNode(_component_q_form, {
          action: _ctx.reactiveFormSchema.form.actionUrl,
          method: "post",
          ref: "formComp",
          class: "fit"
        }, {
          default: vue.withCtx(() => [
            vue.createVNode(_component_q_tab_panels, {
              modelValue: _ctx.currentPage,
              "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((_ctx.currentPage) = $event)),
              animated: "",
              swipeable: "",
              class: "bg-transparent fit"
            }, {
              default: vue.withCtx(() => [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.reactiveFormSchema.pages, (page, pageIdx) => {
                  return (vue.openBlock(), vue.createBlock(_component_q_tab_panel, {
                    key: pageIdx,
                    name: pageIdx,
                    style: {},
                    class: vue.normalizeClass(["q-pa-none bg-transparent fit flex flex-center", {'min-height-100p': _ctx.embedded, 'full-height-100vh':!_ctx.embedded}])
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_q_card, {
                        style: vue.normalizeStyle(_ctx.cardStyle),
                        class: vue.normalizeClass(_ctx.cardClasses)
                      }, {
                        default: vue.withCtx(() => [
                          (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.horizontal ? 'q-card-section' : 'div'), {
                            horizontal: _ctx.horizontal,
                            class: vue.normalizeClass(_ctx.coverWrapperClasses)
                          }, {
                            default: vue.withCtx(() => [
                              (_ctx.showCover && page.cover && page.cover.backgroundImage)
                                ? (vue.openBlock(), vue.createBlock(_component_q_img, {
                                    key: 0,
                                    height: _ctx.coverHeight,
                                    src: page.cover.backgroundImage,
                                    class: vue.normalizeClass(_ctx.coverClasses),
                                    style: vue.normalizeStyle(_ctx.coverStyle),
                                    fit: "cover"
                                  }, {
                                    default: vue.withCtx(() => [
                                      (page.header || page.subHeader)
                                        ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2$2, [
                                            (page.header)
                                              ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_3$1, vue.toDisplayString(page.header), 1))
                                              : vue.createCommentVNode("", true),
                                            (page.subHeader)
                                              ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_4$1, vue.toDisplayString(page.subHeader), 1))
                                              : vue.createCommentVNode("", true)
                                          ]))
                                        : vue.createCommentVNode("", true)
                                    ]),
                                    _: 2
                                  }, 1032, ["height", "src", "class", "style"]))
                                : vue.createCommentVNode("", true),
                              (!_ctx.showCover && (page.header || page.subHeader))
                                ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_5$1, [
                                    (page.header)
                                      ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_6, vue.toDisplayString(page.header), 1))
                                      : vue.createCommentVNode("", true),
                                    (page.subHeader)
                                      ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_7, vue.toDisplayString(page.subHeader), 1))
                                      : vue.createCommentVNode("", true)
                                  ]))
                                : vue.createCommentVNode("", true),
                              vue.createVNode(_component_q_card_section, {
                                class: vue.normalizeClass([_ctx.formClasses, "q-py-sm"])
                              }, {
                                default: vue.withCtx(() => [
                                  (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.horizontal?'q-scroll-area':'div'), {
                                    class: vue.normalizeClass({'q-pr-md':_ctx.horizontal}),
                                    style: {"height":"100%"}
                                  }, {
                                    default: vue.withCtx(() => [
                                      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(page.blocks, (block, idx) => {
                                        return (vue.openBlock(), vue.createBlock(_component_block, {
                                          key: block.name || block.type + idx,
                                          "block-schema": block,
                                          modelValue: _ctx.reactiveFormData[block.name],
                                          "onUpdate:modelValue": [$event => ((_ctx.reactiveFormData[block.name]) = $event), $event => (_ctx.onUpdate(block.name, $event))]
                                        }, {
                                          beforeblock: vue.withCtx(({blockSchema, el, hover}) => [
                                            vue.renderSlot(_ctx.$slots, "beforeblock", {
                                              blockSchema: blockSchema,
                                              el: el,
                                              hover: hover
                                            })
                                          ]),
                                          _: 2
                                        }, 1032, ["block-schema", "modelValue", "onUpdate:modelValue"]))
                                      }), 128)),
                                      vue.createVNode(_component_q_btn, {
                                        label: page.buttonLabel,
                                        unelevated: "",
                                        class: vue.normalizeClass([`shadow-${_ctx.reactiveFormSchema.theme.buttons.shadow} q-px-${['xs', 'sm', 'md', 'lg', 'xl'][_ctx.reactiveFormSchema.theme.buttons.padding - 1]}`, "ty-submit-btn"]),
                                        "no-caps": "",
                                        size: ['sm', 'md', 'lg', 'xl'][_ctx.reactiveFormSchema.theme.buttons.size - 1],
                                        icon: page.buttonIcon,
                                        style: vue.normalizeStyle(_ctx.buttonStyle),
                                        onClick: _ctx.buttonClicked
                                      }, null, 8, ["label", "class", "size", "icon", "style", "onClick"]),
                                      (_ctx.currentPage > 0)
                                        ? (vue.openBlock(), vue.createBlock(_component_q_btn, {
                                            key: 0,
                                            label: "Back",
                                            flat: "",
                                            "no-caps": "",
                                            class: "q-ml-xl ty-back-btn",
                                            size: ['sm', 'md', 'lg', 'xl'][_ctx.reactiveFormSchema.theme.buttons.size - 1],
                                            onClick: _cache[0] || (_cache[0] = $event => (_ctx.currentPage -= 1))
                                          }, null, 8, ["size"]))
                                        : vue.createCommentVNode("", true)
                                    ]),
                                    _: 2
                                  }, 1032, ["class"]))
                                ]),
                                _: 2
                              }, 1032, ["class"])
                            ]),
                            _: 2
                          }, 1032, ["horizontal", "class"]))
                        ]),
                        _: 2
                      }, 1032, ["style", "class"])
                    ]),
                    _: 2
                  }, 1032, ["name", "class"]))
                }), 128))
              ]),
              _: 3
            }, 8, ["modelValue"])
          ]),
          _: 3
        }, 8, ["action"]),
        vue.renderSlot(_ctx.$slots, "afterform")
      ], 512)
    ], 64))
  }

  script$9.render = render$8;

  var name = "quasar-ui-tyformviewer";
  var version$1 = "0.1.58";
  var author = "dan@typefully.io";
  var description = "Form Viewer generator based on JSON config for typefully.io";
  var license = "MIT";
  var module = "dist/index.esm.js";
  var main = "dist/index.common.js";
  var scripts = {
  	deploy: "npm run build && npm version patch && npm publish && cd ../app-extension && npm version patch && npm publish",
  	dev: "cd dev && yarn dev && cd ..",
  	"dev:umd": "yarn build && node build/script.open-umd.js",
  	"dev:ssr": "cd dev && yarn 'dev:ssr' && cd ..",
  	"dev:ios": "cd dev && yarn 'dev:ios' && cd ..",
  	"dev:android": "cd dev && yarn 'dev:android' && cd ..",
  	"dev:electron": "cd dev && yarn 'dev:electron' && cd ..",
  	build: "node build/index.js",
  	"build:js": "node build/script.javascript.js"
  };
  var repository = {
  	type: "git",
  	url: ""
  };
  var dependencies = {
  	"@vue/compiler-sfc": "^3.2.26",
  	"merge-images": "^2.0.0",
  	"rollup-plugin-vue": "^6.0.0",
  	signature_pad: "^4.0.0",
  	sortablejs: "^1.10.2"
  };
  var bugs = "";
  var homepage = "";
  var devDependencies = {
  	"@rollup/plugin-buble": "^0.21.3",
  	"@rollup/plugin-json": "^4.0.0",
  	"@rollup/plugin-node-resolve": "^11.2.1",
  	"@rollup/plugin-replace": "^2.4.2",
  	chalk: "^4.1.0",
  	"fs-extra": "^8.1.0",
  	open: "^7.3.0",
  	quasar: "^2.4.2",
  	rimraf: "^3.0.0",
  	rollup: "^2.45.0",
  	"uglify-js": "^3.13.3",
  	zlib: "^1.0.5"
  };
  var browserslist = [
  	"last 4 Chrome versions",
  	"last 4 Firefox versions",
  	"last 2 Edge versions",
  	"last 4 Safari versions",
  	"last 4 Android versions",
  	"last 4 ChromeAndroid versions",
  	"last 4 FirefoxAndroid versions",
  	"last 4 iOS versions"
  ];
  var pkg = {
  	name: name,
  	version: version$1,
  	author: author,
  	description: description,
  	license: license,
  	module: module,
  	main: main,
  	scripts: scripts,
  	repository: repository,
  	dependencies: dependencies,
  	bugs: bugs,
  	homepage: homepage,
  	devDependencies: devDependencies,
  	browserslist: browserslist
  };

  const { version } = pkg;

  function install (app) {
    app.component(script$9.name, script$9);
  }

  var VuePlugin = /*#__PURE__*/Object.freeze({
    __proto__: null,
    version: version,
    TyFormViewer: script$9,
    install: install
  });

  var script$8 = {
    name: 'TyInput',
    components: {
    },
    props: {
      type: {
        type: String,
        required: true,
        validator(value) {
          // The value must match one of these strings
          return ['text', 'password', 'textarea', 'email', 'search', 'tel', 'number', 'url', 'time', 'date'].includes(value)
        }
      },
      name: {
        type: String,
        required: true
      },
      fillMask: Boolean,
      label: String,
      hint: String,
      placeholder: String,
      behavior: {
        type: Object, /* readOnly, clearable, disabled, displayed, counter */
        default: () => ({})
      },
      modelValue: String,
      mask: String
    },
    emits: ['update:modelValue'],
    setup (props, {emit}) {
      const formSchema = vue.inject('formSchema');
      // const formData = inject('formData');
      const modelValueRef = vue.computed({
        get: () => props.modelValue,
        set: (val) => {emit('update:modelValue', val);}
      });
      // const value = ref(formData[props.name]);
      const labelStyle = vue.computed(() => {
        return {fontSize: `${(100 + formSchema.value.theme.inputs.labelSize)/100}em`}
      });
      // const valueUpdated = (val) => {
      //   formData[props.name] = val
      // }
      const id = vue.computed(() => {
        return props.type + '_' + props.name
      });
      // const onUpdate = (evt) => {
      //   emit('update:modelValue', evt)
      // }
      return {
        formSchema,
        labelStyle,
        id,
        // value,
        modelValueRef,
        // valueUpdated,
        // onUpdate
      }
    }
  };

  const _hoisted_1$7 = ["for"];

  function render$7(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_q_input = vue.resolveComponent("q-input");

    return (vue.openBlock(), vue.createElementBlock("div", null, [
      ($setup.formSchema.theme.inputs.labelStyle==='top')
        ? (vue.openBlock(), vue.createElementBlock("label", {
            key: 0,
            for: $setup.id,
            style: vue.normalizeStyle($setup.labelStyle),
            class: "ty-label ty-label-top"
          }, vue.toDisplayString($props.label), 13, _hoisted_1$7))
        : vue.createCommentVNode("", true),
      vue.createVNode(_component_q_input, {
        label: $setup.formSchema.theme.inputs.labelStyle !=='top' ? $props.label : undefined,
        outlined: $setup.formSchema.theme.inputs.style==='full',
        borderless: $setup.formSchema.theme.inputs.borderless,
        "stack-label": $setup.formSchema.theme.inputs.labelStyle==='stacked',
        dense: $setup.formSchema.theme.inputs.dense,
        clearable: $props.behavior.clearable,
        hint: $props.hint,
        counter: $props.behavior.counter,
        placeholder: $props.placeholder,
        for: $setup.id,
        name: $props.name,
        readonly: $props.behavior.readOnly,
        disable: $props.behavior.disabled,
        type: $props.type,
        mask: $props.mask,
        "fill-mask": $props.fillMask,
        modelValue: $setup.modelValueRef,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => (($setup.modelValueRef) = $event)),
        class: "ty-input"
      }, {
        append: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "append")
        ]),
        _: 3
      }, 8, ["label", "outlined", "borderless", "stack-label", "dense", "clearable", "hint", "counter", "placeholder", "for", "name", "readonly", "disable", "type", "mask", "fill-mask", "modelValue"])
    ]))
  }

  script$8.render = render$7;

  var TyInput = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': script$8
  });

  var script$7 = {
    name: 'TySelect',
    components: {
    },
    props: {
      type: {
        type: String /* select */
      },
      name: {
        type: String,
        required: true
      },
      label: String,
      hint: String,
      placeholder: String,
      behavior: {
        type: Object, /* readOnly, clearable, disabled, displayed, counter */
        default: () => ({})
      },
      options: {
        type: Array,
        default: () => []
      },
      modelValue: [Array, Object]
    },
    emits: ['update:modelValue'],
    setup (props, {emit}) {
      const formSchema = vue.inject('formSchema');
      const modelValueRef = vue.ref(props.modelValue);
      const id = vue.computed(() => {
        return props.type + '_' + props.name
      });
      const labelStyle = vue.computed(() => {
        return {fontSize: `${(100 + formSchema.value.theme.inputs.labelSize)/100}em`}
      });
      const onUpdate = (evt) => {
        console.log('selected select item', JSON.stringify(evt));
        emit('update:modelValue', evt);
      };
      return {
        formSchema,
        labelStyle,
        id,
        modelValueRef,
        onUpdate
      }
    }
  };

  const _hoisted_1$6 = ["for"];

  function render$6(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_q_select = vue.resolveComponent("q-select");

    return (vue.openBlock(), vue.createElementBlock("div", null, [
      ($setup.formSchema.theme.inputs.labelStyle==='top')
        ? (vue.openBlock(), vue.createElementBlock("label", {
            key: 0,
            for: $setup.id,
            style: vue.normalizeStyle($setup.labelStyle),
            class: "ty-label ty-label-top"
          }, vue.toDisplayString($props.label), 13, _hoisted_1$6))
        : vue.createCommentVNode("", true),
      vue.createVNode(_component_q_select, {
        label: $setup.formSchema.theme.inputs.labelStyle !=='top' ? $props.label : undefined,
        outlined: $setup.formSchema.theme.inputs.style==='full',
        borderless: $setup.formSchema.theme.inputs.borderless,
        "stack-label": $setup.formSchema.theme.inputs.labelStyle==='stacked',
        dense: $setup.formSchema.theme.inputs.dense,
        clearable: $props.behavior.clearable,
        hint: $props.hint,
        counter: $props.behavior.counter,
        placeholder: $props.placeholder,
        for: $setup.id,
        readonly: $props.behavior.readOnly,
        disable: $props.behavior.disabled,
        modelValue: $setup.modelValueRef,
        "onUpdate:modelValue": [
          _cache[0] || (_cache[0] = $event => (($setup.modelValueRef) = $event)),
          $setup.onUpdate
        ],
        options: $props.options,
        multiple: $props.behavior.multiple,
        "use-chips": $props.behavior.multiple,
        name: $props.name,
        class: "ty-select"
      }, null, 8, ["label", "outlined", "borderless", "stack-label", "dense", "clearable", "hint", "counter", "placeholder", "for", "readonly", "disable", "modelValue", "onUpdate:modelValue", "options", "multiple", "use-chips", "name"])
    ]))
  }

  script$7.render = render$6;

  var TySelect = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': script$7
  });

  var script$6 = {
    name: 'TySlider',
    components: {
    },
    props: {
      type: {
        type: String, /* slider */
        required: true
      },
      name: {
        type: String,
        required: true
      },
      label: String,
      hint: String,
      behavior: {
        type: Object, /* readOnly, clearable, disabled, displayed, counter */
        default: () => ({})
      },
      min: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: 100
      },
      step: {
        type: Number,
        default: 1
      },
      defaultValue: {
        type: [Number, Object]
      },
      reverse: Boolean,
      showThumbLabel: {
        type: String,
        default: "always",
        validator(value) {
          // The value must match one of these strings
          return ['always', 'off', 'onSlide'].includes(value)
        }
      },
      thumbLabelPrefix: {
        type: String,
        default: ""
      },
      thumbLabelSuffix: {
        type: String,
        default: ""
      },
      snap: Boolean,
      markers: Boolean,
      range: Boolean,
      modelValue: {
        type: [Number, Object]
      }
    },
    setup (props, {emit}) {
      const formSchema = vue.inject('formSchema');
      const modelValueRef = vue.computed({
        get: () => {
          if (props.modelValue === null || props.modelValue === undefined) {
            return props.defaultValue !== undefined && props.defaultValue !== null ?
                props.defaultValue :
                (props.range ? {min:props.min || 0, max:props.max || 100} : 50)
          }
          return props.modelValue
        },
        set: val => {
          emit('update:modelValue', val);
        }
      });
      const labelStyle = vue.computed(() => {

        return {fontSize: `${(100 + formSchema.value.theme.inputs.labelSize)/100}em`}
      });
      const id = vue.computed(() => {
        return props.type + '_' + props.name
      });

      const componentType = vue.computed(() => {
        if (props.range) {
          return quasar.QRange // 'q-range' //() => import('quasar').QRange
        }
        return quasar.QSlider // 'q-slider' //() => import('quasar').QSlider

      });
      return {
        componentType,
        formSchema,
        labelStyle,
        id,
        modelValueRef,
      }
    }
  };

  const _hoisted_1$5 = {
    key: 0,
    class: "text-caption q-ml-sm text-grey-8"
  };

  function render$5(_ctx, _cache, $props, $setup, $data, $options) {
    return (vue.openBlock(), vue.createElementBlock("div", null, [
      vue.createElementVNode("label", {
        style: vue.normalizeStyle($setup.labelStyle),
        class: "ty-label ty-label-top"
      }, vue.toDisplayString($props.label), 5),
      (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($setup.componentType), {
        name: $props.name,
        readonly: $props.behavior.readOnly,
        disable: $props.behavior.disabled,
        min: $props.min,
        max: $props.max,
        step: $props.step,
        reverse: $props.reverse,
        label: $props.showThumbLabel !== 'off',
        "label-always": $props.showThumbLabel === 'always' ,
        "label-value": $props.thumbLabelPrefix + $setup.modelValueRef + $props.thumbLabelSuffix,
        "left-label-value": $props.range ? $props.thumbLabelPrefix + $setup.modelValueRef.min + $props.thumbLabelSuffix : '',
        "right-label-value": $props.range ? $props.thumbLabelPrefix + $setup.modelValueRef.max + $props.thumbLabelSuffix : '',
        snap: $props.snap,
        markers: $props.markers,
        class: "q-mt-lg",
        modelValue: $setup.modelValueRef,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => (($setup.modelValueRef) = $event))
      }, null, 8, ["name", "readonly", "disable", "min", "max", "step", "reverse", "label", "label-always", "label-value", "left-label-value", "right-label-value", "snap", "markers", "modelValue"])),
      (!!$props.hint)
        ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$5, vue.toDisplayString($props.hint), 1))
        : vue.createCommentVNode("", true)
    ]))
  }

  script$6.render = render$5;

  var TySlider = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': script$6
  });

  var script$5 = {
    name: 'TyRating',
    components: {
    },
    props: {
      type: {
        type: String, /* slider */
        required: true
      },
      name: {
        type: String,
        required: true
      },
      label: String,
      hint: String,
      size: {
        String
      },
      behavior: {
        type: Object, /* readOnly, clearable, disabled, displayed, counter */
        default: () => ({})
      },
      defaultValue: Number,
      shape: {
        type: String,
        validator(value) {
          return ['heart', 'star', 'thumb', 'battery', 'dice', 'emoji', 'gem', 'bulb', 'lemon', 'moon', 'sun', 'hand-spock', 'numeric'].includes(value)
        }
      },
      max: {
        type: Number,
        validator(value) {
          return value >= 2 & value <= 14
        }
      },
      modelValue: {
        type: Number
      }
    },
    setup (props, {emit}) {
      const formSchema = vue.inject('formSchema');
      const modelValueComputed = vue.computed({
        get: () => {
          if (props.modelValue === null || props.modelValue === undefined) {
            return props.defaultValue !== undefined && props.defaultValue !== null ?
                props.defaultValue :
                0
          }
          return props.modelValue
        },
        set: val => {
          emit('update:modelValue', val);
        }
      });
      const labelStyle = vue.computed(() => {
        return {fontSize: `${(100 + formSchema.value.theme.inputs.labelSize)/100}em`}
      });
      const id = vue.computed(() => {
        return props.type + '_' + props.name
      });
      const sizeComputed = vue.computed(() => {
        return props.size || '2em'
      });
      const maxComputed = vue.computed(() => {
        return props.max || 5
      });
      const iconProps = vue.computed(() => {
        return {
          heart: {
            icon: 'far fa-heart',
            iconSelected: 'fas fa-heart',
            noDimming: true
          },
          star: {
            icon: 'far fa-star',
            iconSelected: 'fas fa-star',
            noDimming: true
          },
          thumb: {
            icon: 'far fa-thumbs-up',
            iconSelected: 'fas fa-thumbs-up',
            noDimming: true
          },
          battery: {
            icon: ['fas fa-battery-empty', 'fas fa-battery-quarter', 'fas fa-battery-half', 'fas fa-battery-three-quarters', 'fas fa-battery-full'],
            noDimming: false
          },
          dice: {
            icon: ['fas fa-dice-one','fas fa-dice-two','fas fa-dice-three','fas fa-dice-four','fas fa-dice-five','fas fa-dice-six'],
            noDimming: false
          },
          emoji: {
            icon: ['far fa-sad-tear', 'far fa-frown-open', 'far fa-meh', 'far fa-grin-alt', 'far fa-grin-stars'],
            iconSelected: ['fas fa-sad-tear', 'fas fa-frown-open', 'fas fa-meh', 'fas fa-grin-alt', 'fas fa-grin-stars'],
            noDimming: true
          },
          gem: {
            icon: 'far fa-gem',
            iconSelected: 'fas fa-gem',
            noDimming: false
          },
          bulb: {
            icon: 'far fa-lightbulb',
            iconSelected: 'fas fa-lightbulb',
            noDimming: true
          },
          lemon: {
            icon: 'far fa-lemon',
            iconSelected: 'fas fa-lemon',
            noDimming: true
          },
          moon: {
            icon: 'far fa-moon',
            iconSelected: 'fas fa-moon',
            noDimming: true
          },
          sun: {
            icon: 'far fa-sun',
            iconSelected: 'fas fa-sun',
            noDimming: true
          },
          'hand-spock': {
            icon: 'far fa-hand-spock',
            iconSelected: 'fas fa-hand-spock',
            noDimming: true
          },
          numeric: {
            icon: ['mdi-number-1-box-outline'],
            iconSelected: ['mdi-number-1-box'],
            noDimming: true
          },
        }[props.shape || 'star']
      });
      return {
        labelStyle,
        id,
        modelValueComputed,
        sizeComputed,
        maxComputed,
        iconProps
      }
    }
  };

  const _hoisted_1$4 = { class: "col ty-rating" };
  const _hoisted_2$1 = {
    key: 0,
    class: "text-caption q-ml-sm text-grey-8"
  };

  function render$4(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_q_rating = vue.resolveComponent("q-rating");

    return (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$4, [
      vue.createElementVNode("label", {
        style: vue.normalizeStyle([$setup.labelStyle, {"display":"block"}]),
        class: "ty-label ty-label-top"
      }, vue.toDisplayString($props.label), 5),
      vue.createVNode(_component_q_rating, {
        name: $props.name,
        readonly: $props.behavior.readOnly,
        disable: $props.behavior.disabled,
        class: "q-mt-md full-width",
        modelValue: $setup.modelValueComputed,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => (($setup.modelValueComputed) = $event)),
        size: $setup.sizeComputed,
        icon: $setup.iconProps.icon,
        "icon-selected": $setup.iconProps.iconSelected,
        "no-dimming": $setup.iconProps.noDimming,
        max: $setup.maxComputed
      }, null, 8, ["name", "readonly", "disable", "modelValue", "size", "icon", "icon-selected", "no-dimming", "max"]),
      (!!$props.hint)
        ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2$1, vue.toDisplayString($props.hint), 1))
        : vue.createCommentVNode("", true)
    ]))
  }

  script$5.render = render$4;

  var TyRating = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': script$5
  });

  var script$4 = {
    name: 'TyOptionGroup',
    components: {
    },
    props: {
      type: {
        type: String,
        required: true,
        validator(value) {
          return ['radio', 'checkbox', 'toggle'].includes(value)
        }
      },
      name: {
        type: String,
        required: true
      },
      label: String,
      labelSide: {
        type: String,
        default: "right",
        validator(value) {
          return ['left', 'right'].includes(value)
        }
      },
      inline: Boolean,
      options: {
        type: Array,
        default: () => []
      },
      hint: String,
      behavior: {
        type: Object, /* readOnly, clearable, disabled, displayed, counter */
        default: () => ({})
      },
      modelValue: [String, Array]
    },
    emits: ['update:modelValue'],
    setup (props, {emit}) {
      const formSchema = vue.inject('formSchema');
      const modelValueRef = vue.ref(props.modelValue);
      if (modelValueRef.value === null && props.type!=='radio') {
        modelValueRef.value = [];
      }
      const labelStyle = vue.computed(() => {
        return {fontSize: `${(100 + formSchema.value.theme.inputs.labelSize)/100}em`}
      });
      const onUpdate = (evt) => {
        emit('update:modelValue', evt);
      };
      return {
        labelStyle,
        modelValueRef,
        onUpdate
      }
    }
  };

  const _hoisted_1$3 = {
    key: 0,
    class: "text-caption q-ml-sm text-grey-8"
  };

  function render$3(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_q_option_group = vue.resolveComponent("q-option-group");

    return (vue.openBlock(), vue.createElementBlock("div", null, [
      vue.createElementVNode("label", {
        style: vue.normalizeStyle($setup.labelStyle),
        class: "ty-label ty-label-top"
      }, vue.toDisplayString($props.label), 5),
      vue.createVNode(_component_q_option_group, {
        name: $props.name,
        type: $props.type,
        readonly: $props.behavior.readOnly,
        disable: $props.behavior.disabled,
        "left-label": $props.labelSide === 'left',
        inline: $props.inline,
        modelValue: $setup.modelValueRef,
        "onUpdate:modelValue": [
          _cache[0] || (_cache[0] = $event => (($setup.modelValueRef) = $event)),
          $setup.onUpdate
        ],
        options: $props.options
      }, null, 8, ["name", "type", "readonly", "disable", "left-label", "inline", "modelValue", "onUpdate:modelValue", "options"]),
      (!!$props.hint)
        ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$3, vue.toDisplayString($props.hint), 1))
        : vue.createCommentVNode("", true)
    ]))
  }

  script$4.render = render$3;

  var TyOptionGroup = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': script$4
  });

  var script$3 = {
    name: 'TyHtml',
    components: {
    },
    props: {
      type: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      html: String,
      behavior: {
        type: Object, /* readOnly, clearable, disabled, displayed, counter */
        default: () => ({})
      },
    },
    setup (props) {
      const refHtml = vue.ref(props.html);
      const id = vue.computed(() => {
        return props.type + '_' + props.name
      });
      return {
        id,
        refHtml
      }
    }
  };

  const _hoisted_1$2 = ["innerHTML"];

  function render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return (vue.openBlock(), vue.createElementBlock("div", { innerHTML: $setup.refHtml }, null, 8, _hoisted_1$2))
  }

  script$3.render = render$2;

  var TyHtml = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': script$3
  });

  var script$2 = {
    name: 'TyDate',
    components: {
      TyInput: script$8
    },
    props: {
      type: {
        type: String,
        required: true,
        validator(value) {
          // The value must match one of these strings
          return value === 'date'
        }
      },
      name: {
        type: String,
        required: true
      },
      label: String,
      hint: String,
      placeholder: String,
      behavior: {
        type: Object, /* readOnly, clearable, disabled, displayed, counter */
        default: () => ({})
      },
      modelValue: [String, Object],
      range: Boolean
    },
    emits: ['update:modelValue'],
    setup (props, {emit}) {
      const inputModel = vue.computed(() => ({
        type: 'text',
        mask: props.range ? '##/##/#### - ##/##/####' : '##/##/####',
        label: props.label,
        name: props.name,
        hint: props.hint,
        placeholder: props.placeholder,
        behavior: props.behavior,
        fillMask: true
      }));
      const pickerModelValue = vue.computed({
        get: () => {
          return props.modelValue
        },
        set: (val) => {emit('update:modelValue', val);}
      });
      const inputModelValue = vue.computed({
        get: () => {
          if (typeof props.modelValue === 'string') {
            return props.modelValue
          }
          const mask = '__/__/____';
          return ((props.modelValue && props.modelValue.from) || mask) + ' - ' + ((props.modelValue && props.modelValue.to) || mask)
        },
        set: (val) => {
          const [from, to] = val.split('-').map(v => v.trim());
          emit('update:modelValue', {from, to});
        }
      });
      return {
        inputModel,
        inputModelValue,
        pickerModelValue
      }
    }
  };

  const _hoisted_1$1 = { class: "row items-center justify-end" };

  function render$1(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_q_btn = vue.resolveComponent("q-btn");
    const _component_q_date = vue.resolveComponent("q-date");
    const _component_q_popup_proxy = vue.resolveComponent("q-popup-proxy");
    const _component_q_icon = vue.resolveComponent("q-icon");
    const _component_TyInput = vue.resolveComponent("TyInput");
    const _directive_close_popup = vue.resolveDirective("close-popup");

    return (vue.openBlock(), vue.createBlock(_component_TyInput, vue.mergeProps($setup.inputModel, {
      modelValue: $setup.inputModelValue,
      "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => (($setup.inputModelValue) = $event))
    }), {
      append: vue.withCtx(() => [
        vue.createVNode(_component_q_icon, {
          name: "event",
          class: "cursor-pointer"
        }, {
          default: vue.withCtx(() => [
            vue.createVNode(_component_q_popup_proxy, {
              ref: "qDateProxy",
              cover: "",
              "transition-show": "scale",
              "transition-hide": "scale"
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_q_date, {
                  modelValue: $setup.pickerModelValue,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => (($setup.pickerModelValue) = $event)),
                  mask: "DD/MM/YYYY",
                  range: $props.range
                }, {
                  default: vue.withCtx(() => [
                    vue.createElementVNode("div", _hoisted_1$1, [
                      vue.withDirectives(vue.createVNode(_component_q_btn, {
                        label: "Close",
                        color: "primary",
                        flat: ""
                      }, null, 512), [
                        [_directive_close_popup]
                      ])
                    ])
                  ]),
                  _: 1
                }, 8, ["modelValue", "range"])
              ]),
              _: 1
            }, 512)
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 16, ["modelValue"]))
  }

  script$2.render = render$1;

  var TyDate = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': script$2
  });

  /*!
   * Signature Pad v4.0.0 | https://github.com/szimek/signature_pad
   * (c) 2021 Szymon Nowak | Released under the MIT license
   */

  class Point {
      constructor(x, y, pressure, time) {
          if (isNaN(x) || isNaN(y)) {
              throw new Error(`Point is invalid: (${x}, ${y})`);
          }
          this.x = +x;
          this.y = +y;
          this.pressure = pressure || 0;
          this.time = time || Date.now();
      }
      distanceTo(start) {
          return Math.sqrt(Math.pow(this.x - start.x, 2) + Math.pow(this.y - start.y, 2));
      }
      equals(other) {
          return (this.x === other.x &&
              this.y === other.y &&
              this.pressure === other.pressure &&
              this.time === other.time);
      }
      velocityFrom(start) {
          return this.time !== start.time
              ? this.distanceTo(start) / (this.time - start.time)
              : 0;
      }
  }

  class Bezier {
      constructor(startPoint, control2, control1, endPoint, startWidth, endWidth) {
          this.startPoint = startPoint;
          this.control2 = control2;
          this.control1 = control1;
          this.endPoint = endPoint;
          this.startWidth = startWidth;
          this.endWidth = endWidth;
      }
      static fromPoints(points, widths) {
          const c2 = this.calculateControlPoints(points[0], points[1], points[2]).c2;
          const c3 = this.calculateControlPoints(points[1], points[2], points[3]).c1;
          return new Bezier(points[1], c2, c3, points[2], widths.start, widths.end);
      }
      static calculateControlPoints(s1, s2, s3) {
          const dx1 = s1.x - s2.x;
          const dy1 = s1.y - s2.y;
          const dx2 = s2.x - s3.x;
          const dy2 = s2.y - s3.y;
          const m1 = { x: (s1.x + s2.x) / 2.0, y: (s1.y + s2.y) / 2.0 };
          const m2 = { x: (s2.x + s3.x) / 2.0, y: (s2.y + s3.y) / 2.0 };
          const l1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
          const l2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          const dxm = m1.x - m2.x;
          const dym = m1.y - m2.y;
          const k = l2 / (l1 + l2);
          const cm = { x: m2.x + dxm * k, y: m2.y + dym * k };
          const tx = s2.x - cm.x;
          const ty = s2.y - cm.y;
          return {
              c1: new Point(m1.x + tx, m1.y + ty),
              c2: new Point(m2.x + tx, m2.y + ty),
          };
      }
      length() {
          const steps = 10;
          let length = 0;
          let px;
          let py;
          for (let i = 0; i <= steps; i += 1) {
              const t = i / steps;
              const cx = this.point(t, this.startPoint.x, this.control1.x, this.control2.x, this.endPoint.x);
              const cy = this.point(t, this.startPoint.y, this.control1.y, this.control2.y, this.endPoint.y);
              if (i > 0) {
                  const xdiff = cx - px;
                  const ydiff = cy - py;
                  length += Math.sqrt(xdiff * xdiff + ydiff * ydiff);
              }
              px = cx;
              py = cy;
          }
          return length;
      }
      point(t, start, c1, c2, end) {
          return (start * (1.0 - t) * (1.0 - t) * (1.0 - t))
              + (3.0 * c1 * (1.0 - t) * (1.0 - t) * t)
              + (3.0 * c2 * (1.0 - t) * t * t)
              + (end * t * t * t);
      }
  }

  function throttle(fn, wait = 250) {
      let previous = 0;
      let timeout = null;
      let result;
      let storedContext;
      let storedArgs;
      const later = () => {
          previous = Date.now();
          timeout = null;
          result = fn.apply(storedContext, storedArgs);
          if (!timeout) {
              storedContext = null;
              storedArgs = [];
          }
      };
      return function wrapper(...args) {
          const now = Date.now();
          const remaining = wait - (now - previous);
          storedContext = this;
          storedArgs = args;
          if (remaining <= 0 || remaining > wait) {
              if (timeout) {
                  clearTimeout(timeout);
                  timeout = null;
              }
              previous = now;
              result = fn.apply(storedContext, storedArgs);
              if (!timeout) {
                  storedContext = null;
                  storedArgs = [];
              }
          }
          else if (!timeout) {
              timeout = window.setTimeout(later, remaining);
          }
          return result;
      };
  }

  class SignaturePad extends EventTarget {
      constructor(canvas, options = {}) {
          super();
          this.canvas = canvas;
          this.options = options;
          this._handleMouseDown = (event) => {
              if (event.buttons === 1) {
                  this._drawningStroke = true;
                  this._strokeBegin(event);
              }
          };
          this._handleMouseMove = (event) => {
              if (this._drawningStroke) {
                  this._strokeMoveUpdate(event);
              }
          };
          this._handleMouseUp = (event) => {
              if (event.buttons === 1 && this._drawningStroke) {
                  this._drawningStroke = false;
                  this._strokeEnd(event);
              }
          };
          this._handleTouchStart = (event) => {
              event.preventDefault();
              if (event.targetTouches.length === 1) {
                  const touch = event.changedTouches[0];
                  this._strokeBegin(touch);
              }
          };
          this._handleTouchMove = (event) => {
              event.preventDefault();
              const touch = event.targetTouches[0];
              this._strokeMoveUpdate(touch);
          };
          this._handleTouchEnd = (event) => {
              const wasCanvasTouched = event.target === this.canvas;
              if (wasCanvasTouched) {
                  event.preventDefault();
                  const touch = event.changedTouches[0];
                  this._strokeEnd(touch);
              }
          };
          this._handlePointerStart = (event) => {
              this._drawningStroke = true;
              event.preventDefault();
              this._strokeBegin(event);
          };
          this._handlePointerMove = (event) => {
              if (this._drawningStroke) {
                  event.preventDefault();
                  this._strokeMoveUpdate(event);
              }
          };
          this._handlePointerEnd = (event) => {
              this._drawningStroke = false;
              const wasCanvasTouched = event.target === this.canvas;
              if (wasCanvasTouched) {
                  event.preventDefault();
                  this._strokeEnd(event);
              }
          };
          this.velocityFilterWeight = options.velocityFilterWeight || 0.7;
          this.minWidth = options.minWidth || 0.5;
          this.maxWidth = options.maxWidth || 2.5;
          this.throttle = ('throttle' in options ? options.throttle : 16);
          this.minDistance = ('minDistance' in options ? options.minDistance : 5);
          this.dotSize = options.dotSize || 0;
          this.penColor = options.penColor || 'black';
          this.backgroundColor = options.backgroundColor || 'rgba(0,0,0,0)';
          this._strokeMoveUpdate = this.throttle
              ? throttle(SignaturePad.prototype._strokeUpdate, this.throttle)
              : SignaturePad.prototype._strokeUpdate;
          this._ctx = canvas.getContext('2d');
          this.clear();
          this.on();
      }
      clear() {
          const { _ctx: ctx, canvas } = this;
          ctx.fillStyle = this.backgroundColor;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          this._data = [];
          this._reset();
          this._isEmpty = true;
      }
      fromDataURL(dataUrl, options = {}) {
          return new Promise((resolve, reject) => {
              const image = new Image();
              const ratio = options.ratio || window.devicePixelRatio || 1;
              const width = options.width || this.canvas.width / ratio;
              const height = options.height || this.canvas.height / ratio;
              const xOffset = options.xOffset || 0;
              const yOffset = options.yOffset || 0;
              this._reset();
              image.onload = () => {
                  this._ctx.drawImage(image, xOffset, yOffset, width, height);
                  resolve();
              };
              image.onerror = (error) => {
                  reject(error);
              };
              image.crossOrigin = 'anonymous';
              image.src = dataUrl;
              this._isEmpty = false;
          });
      }
      toDataURL(type = 'image/png', encoderOptions) {
          switch (type) {
              case 'image/svg+xml':
                  return this._toSVG();
              default:
                  return this.canvas.toDataURL(type, encoderOptions);
          }
      }
      on() {
          this.canvas.style.touchAction = 'none';
          this.canvas.style.msTouchAction = 'none';
          if (window.PointerEvent) {
              this._handlePointerEvents();
          }
          else {
              this._handleMouseEvents();
              if ('ontouchstart' in window) {
                  this._handleTouchEvents();
              }
          }
      }
      off() {
          this.canvas.style.touchAction = 'auto';
          this.canvas.style.msTouchAction = 'auto';
          this.canvas.removeEventListener('pointerdown', this._handlePointerStart);
          this.canvas.removeEventListener('pointermove', this._handlePointerMove);
          document.removeEventListener('pointerup', this._handlePointerEnd);
          this.canvas.removeEventListener('mousedown', this._handleMouseDown);
          this.canvas.removeEventListener('mousemove', this._handleMouseMove);
          document.removeEventListener('mouseup', this._handleMouseUp);
          this.canvas.removeEventListener('touchstart', this._handleTouchStart);
          this.canvas.removeEventListener('touchmove', this._handleTouchMove);
          this.canvas.removeEventListener('touchend', this._handleTouchEnd);
      }
      isEmpty() {
          return this._isEmpty;
      }
      fromData(pointGroups, { clear = true } = {}) {
          if (clear) {
              this.clear();
          }
          this._fromData(pointGroups, this._drawCurve.bind(this), this._drawDot.bind(this));
          this._data = clear ? pointGroups : this._data.concat(pointGroups);
      }
      toData() {
          return this._data;
      }
      _strokeBegin(event) {
          this.dispatchEvent(new CustomEvent('beginStroke', { detail: event }));
          const newPointGroup = {
              dotSize: this.dotSize,
              minWidth: this.minWidth,
              maxWidth: this.maxWidth,
              penColor: this.penColor,
              points: [],
          };
          this._data.push(newPointGroup);
          this._reset();
          this._strokeUpdate(event);
      }
      _strokeUpdate(event) {
          if (this._data.length === 0) {
              this._strokeBegin(event);
              return;
          }
          this.dispatchEvent(new CustomEvent('beforeUpdateStroke', { detail: event }));
          const x = event.clientX;
          const y = event.clientY;
          const pressure = event.pressure !== undefined
              ? event.pressure
              : event.force !== undefined
                  ? event.force
                  : 0;
          const point = this._createPoint(x, y, pressure);
          const lastPointGroup = this._data[this._data.length - 1];
          const lastPoints = lastPointGroup.points;
          const lastPoint = lastPoints.length > 0 && lastPoints[lastPoints.length - 1];
          const isLastPointTooClose = lastPoint
              ? point.distanceTo(lastPoint) <= this.minDistance
              : false;
          const { penColor, dotSize, minWidth, maxWidth } = lastPointGroup;
          if (!lastPoint || !(lastPoint && isLastPointTooClose)) {
              const curve = this._addPoint(point);
              if (!lastPoint) {
                  this._drawDot(point, {
                      penColor,
                      dotSize,
                      minWidth,
                      maxWidth,
                  });
              }
              else if (curve) {
                  this._drawCurve(curve, {
                      penColor,
                      dotSize,
                      minWidth,
                      maxWidth,
                  });
              }
              lastPoints.push({
                  time: point.time,
                  x: point.x,
                  y: point.y,
                  pressure: point.pressure,
              });
          }
          this.dispatchEvent(new CustomEvent('afterUpdateStroke', { detail: event }));
      }
      _strokeEnd(event) {
          this._strokeUpdate(event);
          this.dispatchEvent(new CustomEvent('endStroke', { detail: event }));
      }
      _handlePointerEvents() {
          this._drawningStroke = false;
          this.canvas.addEventListener('pointerdown', this._handlePointerStart);
          this.canvas.addEventListener('pointermove', this._handlePointerMove);
          document.addEventListener('pointerup', this._handlePointerEnd);
      }
      _handleMouseEvents() {
          this._drawningStroke = false;
          this.canvas.addEventListener('mousedown', this._handleMouseDown);
          this.canvas.addEventListener('mousemove', this._handleMouseMove);
          document.addEventListener('mouseup', this._handleMouseUp);
      }
      _handleTouchEvents() {
          this.canvas.addEventListener('touchstart', this._handleTouchStart);
          this.canvas.addEventListener('touchmove', this._handleTouchMove);
          this.canvas.addEventListener('touchend', this._handleTouchEnd);
      }
      _reset() {
          this._lastPoints = [];
          this._lastVelocity = 0;
          this._lastWidth = (this.minWidth + this.maxWidth) / 2;
          this._ctx.fillStyle = this.penColor;
      }
      _createPoint(x, y, pressure) {
          const rect = this.canvas.getBoundingClientRect();
          return new Point(x - rect.left, y - rect.top, pressure, new Date().getTime());
      }
      _addPoint(point) {
          const { _lastPoints } = this;
          _lastPoints.push(point);
          if (_lastPoints.length > 2) {
              if (_lastPoints.length === 3) {
                  _lastPoints.unshift(_lastPoints[0]);
              }
              const widths = this._calculateCurveWidths(_lastPoints[1], _lastPoints[2]);
              const curve = Bezier.fromPoints(_lastPoints, widths);
              _lastPoints.shift();
              return curve;
          }
          return null;
      }
      _calculateCurveWidths(startPoint, endPoint) {
          const velocity = this.velocityFilterWeight * endPoint.velocityFrom(startPoint) +
              (1 - this.velocityFilterWeight) * this._lastVelocity;
          const newWidth = this._strokeWidth(velocity);
          const widths = {
              end: newWidth,
              start: this._lastWidth,
          };
          this._lastVelocity = velocity;
          this._lastWidth = newWidth;
          return widths;
      }
      _strokeWidth(velocity) {
          return Math.max(this.maxWidth / (velocity + 1), this.minWidth);
      }
      _drawCurveSegment(x, y, width) {
          const ctx = this._ctx;
          ctx.moveTo(x, y);
          ctx.arc(x, y, width, 0, 2 * Math.PI, false);
          this._isEmpty = false;
      }
      _drawCurve(curve, options) {
          const ctx = this._ctx;
          const widthDelta = curve.endWidth - curve.startWidth;
          const drawSteps = Math.ceil(curve.length()) * 2;
          ctx.beginPath();
          ctx.fillStyle = options.penColor;
          for (let i = 0; i < drawSteps; i += 1) {
              const t = i / drawSteps;
              const tt = t * t;
              const ttt = tt * t;
              const u = 1 - t;
              const uu = u * u;
              const uuu = uu * u;
              let x = uuu * curve.startPoint.x;
              x += 3 * uu * t * curve.control1.x;
              x += 3 * u * tt * curve.control2.x;
              x += ttt * curve.endPoint.x;
              let y = uuu * curve.startPoint.y;
              y += 3 * uu * t * curve.control1.y;
              y += 3 * u * tt * curve.control2.y;
              y += ttt * curve.endPoint.y;
              const width = Math.min(curve.startWidth + ttt * widthDelta, options.maxWidth);
              this._drawCurveSegment(x, y, width);
          }
          ctx.closePath();
          ctx.fill();
      }
      _drawDot(point, options) {
          const ctx = this._ctx;
          const width = options.dotSize > 0
              ? options.dotSize
              : (options.minWidth + options.maxWidth) / 2;
          ctx.beginPath();
          this._drawCurveSegment(point.x, point.y, width);
          ctx.closePath();
          ctx.fillStyle = options.penColor;
          ctx.fill();
      }
      _fromData(pointGroups, drawCurve, drawDot) {
          for (const group of pointGroups) {
              const { penColor, dotSize, minWidth, maxWidth, points } = group;
              if (points.length > 1) {
                  for (let j = 0; j < points.length; j += 1) {
                      const basicPoint = points[j];
                      const point = new Point(basicPoint.x, basicPoint.y, basicPoint.pressure, basicPoint.time);
                      this.penColor = penColor;
                      if (j === 0) {
                          this._reset();
                      }
                      const curve = this._addPoint(point);
                      if (curve) {
                          drawCurve(curve, {
                              penColor,
                              dotSize,
                              minWidth,
                              maxWidth,
                          });
                      }
                  }
              }
              else {
                  this._reset();
                  drawDot(points[0], {
                      penColor,
                      dotSize,
                      minWidth,
                      maxWidth,
                  });
              }
          }
      }
      _toSVG() {
          const pointGroups = this._data;
          const ratio = Math.max(window.devicePixelRatio || 1, 1);
          const minX = 0;
          const minY = 0;
          const maxX = this.canvas.width / ratio;
          const maxY = this.canvas.height / ratio;
          const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          svg.setAttribute('width', this.canvas.width.toString());
          svg.setAttribute('height', this.canvas.height.toString());
          this._fromData(pointGroups, (curve, { penColor }) => {
              const path = document.createElement('path');
              if (!isNaN(curve.control1.x) &&
                  !isNaN(curve.control1.y) &&
                  !isNaN(curve.control2.x) &&
                  !isNaN(curve.control2.y)) {
                  const attr = `M ${curve.startPoint.x.toFixed(3)},${curve.startPoint.y.toFixed(3)} ` +
                      `C ${curve.control1.x.toFixed(3)},${curve.control1.y.toFixed(3)} ` +
                      `${curve.control2.x.toFixed(3)},${curve.control2.y.toFixed(3)} ` +
                      `${curve.endPoint.x.toFixed(3)},${curve.endPoint.y.toFixed(3)}`;
                  path.setAttribute('d', attr);
                  path.setAttribute('stroke-width', (curve.endWidth * 2.25).toFixed(3));
                  path.setAttribute('stroke', penColor);
                  path.setAttribute('fill', 'none');
                  path.setAttribute('stroke-linecap', 'round');
                  svg.appendChild(path);
              }
          }, (point, { penColor, dotSize, minWidth, maxWidth }) => {
              const circle = document.createElement('circle');
              const size = dotSize > 0 ? dotSize : (minWidth + maxWidth) / 2;
              circle.setAttribute('r', size.toString());
              circle.setAttribute('cx', point.x.toString());
              circle.setAttribute('cy', point.y.toString());
              circle.setAttribute('fill', penColor);
              svg.appendChild(circle);
          });
          const prefix = 'data:image/svg+xml;base64,';
          const header = '<svg' +
              ' xmlns="http://www.w3.org/2000/svg"' +
              ' xmlns:xlink="http://www.w3.org/1999/xlink"' +
              ` viewBox="${minX} ${minY} ${this.canvas.width} ${this.canvas.height}"` +
              ` width="${maxX}"` +
              ` height="${maxY}"` +
              '>';
          let body = svg.innerHTML;
          if (body === undefined) {
              const dummy = document.createElement('dummy');
              const nodes = svg.childNodes;
              dummy.innerHTML = '';
              for (let i = 0; i < nodes.length; i += 1) {
                  dummy.appendChild(nodes[i].cloneNode(true));
              }
              body = dummy.innerHTML;
          }
          const footer = '</svg>';
          const data = header + body + footer;
          return prefix + btoa(data);
      }
  }

  // Defaults
  var defaultOptions = {
  	format: 'image/png',
  	quality: 0.92,
  	width: undefined,
  	height: undefined,
  	Canvas: undefined,
  	crossOrigin: undefined
  };

  // Return Promise
  var mergeImages = function (sources, options) {
  	if ( sources === void 0 ) sources = [];
  	if ( options === void 0 ) options = {};

  	return new Promise(function (resolve) {
  	options = Object.assign({}, defaultOptions, options);

  	// Setup browser/Node.js specific variables
  	var canvas = options.Canvas ? new options.Canvas() : window.document.createElement('canvas');
  	var Image = options.Image || window.Image;

  	// Load sources
  	var images = sources.map(function (source) { return new Promise(function (resolve, reject) {
  		// Convert sources to objects
  		if (source.constructor.name !== 'Object') {
  			source = { src: source };
  		}

  		// Resolve source and img when loaded
  		var img = new Image();
  		img.crossOrigin = options.crossOrigin;
  		img.onerror = function () { return reject(new Error('Couldn\'t load image')); };
  		img.onload = function () { return resolve(Object.assign({}, source, { img: img })); };
  		img.src = source.src;
  	}); });

  	// Get canvas context
  	var ctx = canvas.getContext('2d');

  	// When sources have loaded
  	resolve(Promise.all(images)
  		.then(function (images) {
  			// Set canvas dimensions
  			var getSize = function (dim) { return options[dim] || Math.max.apply(Math, images.map(function (image) { return image.img[dim]; })); };
  			canvas.width = getSize('width');
  			canvas.height = getSize('height');

  			// Draw images to canvas
  			images.forEach(function (image) {
  				ctx.globalAlpha = image.opacity ? image.opacity : 1;
  				return ctx.drawImage(image.img, image.x || 0, image.y || 0);
  			});

  			if (options.Canvas && options.format === 'image/jpeg') {
  				// Resolve data URI for node-canvas jpeg async
  				return new Promise(function (resolve, reject) {
  					canvas.toDataURL(options.format, {
  						quality: options.quality,
  						progressive: false
  					}, function (err, jpeg) {
  						if (err) {
  							reject(err);
  							return;
  						}
  						resolve(jpeg);
  					});
  				});
  			}

  			// Resolve all other data URIs sync
  			return canvas.toDataURL(options.format, options.quality);
  		}));
  });
  };

  // import {
  //   DEFAULT_OPTIONS,
  //   TRANSPARENT_PNG,
  //   IMAGE_TYPES,
  //   checkSaveType,
  //   convert2NonReactive
  // } from '../utils/index';

  var script$1 = vue.defineComponent({
    name: 'VueSignaturePad',
    props: {
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '100%'
      },
      customStyle: {
        type: Object,
        default: () => ({})
      },
      options: {
        type: Object,
        default: () => ({})
      },
      images: {
        type: Array,
        default: () => []
      }
    },

    data: () => ({
      signaturePad: {},
      cacheImages: [],
      signatureData: TRANSPARENT_PNG,
      onResizeHandler: null
    }),

    computed: {
      propsImagesAndCustomImages() {
        const nonReactiveProrpImages = convert2NonReactive(this.images);
        const nonReactiveCachImages = convert2NonReactive(this.cacheImages);

        return [...nonReactiveProrpImages, ...nonReactiveCachImages];
      }
    },

    watch: {
      options: function (nextOptions) {
        Object.keys(nextOptions).forEach(option => {
          if (this.signaturePad[option]) {
            this.signaturePad[option] = nextOptions[option];
          }
        });
      }
    },

    mounted() {
      const { options } = this;
      const canvas = this.$refs.signaturePadCanvas;
      const signaturePad = new SignaturePad(canvas, {
        ...DEFAULT_OPTIONS,
        ...options
      });
      this.signaturePad = signaturePad;

      if (options.resizeHandler) {
        this.resizeCanvas = options.resizeHandler.bind(this);
      }

      this.onResizeHandler = this.resizeCanvas.bind(this);

      window.addEventListener('resize', this.onResizeHandler, false);

      this.resizeCanvas();

      if (options.onUpdate) {
        signaturePad.addEventListener("endStroke", () => {
          options.onUpdate();
        });
      }
    },

    beforeUnmount() {
      if (this.onResizeHandler) {
        window.removeEventListener('resize', this.onResizeHandler, false);
      }
    },

    methods: {
      resizeCanvas() {
        const canvas = this.$refs.signaturePadCanvas;
        const data = this.signaturePad.toData();
        const ratio = Math.max(window.devicePixelRatio || 1, 1);

        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        canvas.getContext('2d').scale(ratio, ratio);

        this.signaturePad.clear();
        this.signatureData = TRANSPARENT_PNG;
        this.signaturePad.fromData(data);
      },

      saveSignature(type = IMAGE_TYPES[0], encoderOptions) {
        const { signaturePad } = this;
        const status = { isEmpty: false, data: undefined };

        if (!checkSaveType(type)) {
          const imageTypesString = IMAGE_TYPES.join(', ');
          throw new Error(
              `The Image type is incorrect! We are support ${imageTypesString} types.`
          );
        }

        if (signaturePad.isEmpty()) {
          return {
            ...status,
            isEmpty: true
          };
        } else {
          this.signatureData = signaturePad.toDataURL(type, encoderOptions);

          return {
            ...status,
            data: this.signatureData
          };
        }
      },

      undoSignature() {
        const { signaturePad, options } = this;
        const record = signaturePad.toData();

        if (record) {
          signaturePad.fromData(record.slice(0, -1));
          if (options.onUpdate) {
            options.onUpdate();
          }
        }
      },

      mergeImageAndSignature(customSignature) {
        this.signatureData = customSignature;

        return mergeImages([
          ...this.images,
          ...this.cacheImages,
          this.signatureData
        ]);
      },

      addImages(images = []) {
        this.cacheImages = [...this.cacheImages, ...images];

        return mergeImages([
          ...this.images,
          ...this.cacheImages,
          this.signatureData
        ]);
      },

      fromDataURL(data, options = {}, callback) {
        return this.signaturePad.fromDataURL(data, options, callback);
      },

      fromData(data) {
        return this.signaturePad.fromData(data);
      },

      toData() {
        return this.signaturePad.toData();
      },

      lockSignaturePad() {
        return this.signaturePad.off();
      },

      openSignaturePad() {
        return this.signaturePad.on();
      },

      isEmpty() {
        return this.signaturePad.isEmpty();
      },

      getPropImagesAndCacheImages() {
        return this.propsImagesAndCustomImages;
      },

      clearCacheImages() {
        this.cacheImages = [];

        return this.cacheImages;
      },

      clearSignature() {
        this.signaturePad.clear();
        if (this.options.onUpdate) {
          this.options.onUpdate();
        }
      }
    },

    render() {
      const { width, height, customStyle } = this;

      return vue.h(
          'div',
          {
            style: {
              width,
              height,
              ...customStyle
            }
          },
          [
            vue.h('canvas', {
              style: {
                width: width,
                height: height
              },
              ref: 'signaturePadCanvas'
            })
          ]
      );
    }
  });

  const IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/svg+xml'];

  const checkSaveType = type => IMAGE_TYPES.includes(type);

  const DEFAULT_OPTIONS = {
    dotSize: (0.5 + 2.5) / 2,
    minWidth: 0.2,
    maxWidth: 2.5,
    throttle: 20,
    minDistance: 7,
    backgroundColor: 'rgba(0,0,0,0)',
    penColor: 'black',
    velocityFilterWeight: 0.7,
  };

  const convert2NonReactive = observerValue =>
      JSON.parse(JSON.stringify(observerValue));

  const TRANSPARENT_PNG = {
    src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
    x: 0,
    y: 0
  };

  var script = {
    name: 'TySignature',
    components: {
      VueSignature: script$1
    },
    props: {
      type: {
        type: String, /* slider */
        required: true
      },
      name: {
        type: String,
        required: true
      },
      label: String,
      hint: String,
      behavior: {
        type: Object, /* readOnly, clearable, disabled, displayed, counter */
        default: () => ({})
      },
      min: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: 100
      },
      step: {
        type: Number,
        default: 1
      },
      defaultValue: {
        type: [Number, Object]
      },
      modelValue: {
        type: String
      }
    },
    setup (props, {emit}) {
      const formSchema = vue.inject('formSchema');
      const labelStyle = vue.computed(() => {
        return {fontSize: `${(100 + formSchema.value.theme.inputs.labelSize)/100}em`}
      });
      const id = vue.computed(() => {
        return props.type + '_' + props.name
      });
      const signaturePad = vue.ref(null);
      const undo = () => {
        signaturePad.value.undoSignature();
      };
      // const save = () => {
      //   const { isEmpty, data } = signaturePad.value.saveSignature();
      //   console.log('isEmpty', isEmpty);
      //   console.log('data', data);
      //   emit("input",data)
      // }
      const clear = () => {
        signaturePad.value.clearSignature();
      };
      const onUpdate = () => {
        const { data } = signaturePad.value.saveSignature('image/svg+xml');
        emit('update:modelValue', data);
      };
      return {
        undo,
        // save,
        clear,
        onUpdate,
        signaturePad,
        labelStyle,
        id,
      }
    }
  };

  const _hoisted_1 = { class: "ty-signature" };
  const _hoisted_2 = {
    key: 0,
    class: "text-caption q-ml-sm text-grey-8"
  };
  const _hoisted_3 = { class: "buttons-wrapper q-mt-sm" };
  const _hoisted_4 = /*#__PURE__*/vue.createTextVNode("Undo");
  const _hoisted_5 = /*#__PURE__*/vue.createTextVNode("Clear");

  function render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_vue_signature = vue.resolveComponent("vue-signature");
    const _component_q_btn = vue.resolveComponent("q-btn");

    return (vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
      vue.createElementVNode("label", {
        style: vue.normalizeStyle($setup.labelStyle),
        class: "ty-label ty-label-top"
      }, vue.toDisplayString($props.label), 5),
      (!!$props.hint)
        ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2, vue.toDisplayString($props.hint), 1))
        : vue.createCommentVNode("", true),
      vue.createVNode(_component_vue_signature, {
        ref: "signaturePad",
        options: { onUpdate: $setup.onUpdate },
        height: "250px"
      }, null, 8, ["options"]),
      vue.createElementVNode("div", _hoisted_3, [
        vue.createVNode(_component_q_btn, {
          unelevated: "",
          color: "grey-4",
          "text-color": "grey-9",
          class: "q-mr-md",
          onClick: $setup.undo
        }, {
          default: vue.withCtx(() => [
            _hoisted_4
          ]),
          _: 1
        }, 8, ["onClick"]),
        vue.createVNode(_component_q_btn, {
          unelevated: "",
          color: "grey-4",
          "text-color": "grey-9",
          class: "q-mr-md",
          onClick: $setup.clear
        }, {
          default: vue.withCtx(() => [
            _hoisted_5
          ]),
          _: 1
        }, 8, ["onClick"])
      ])
    ]))
  }

  script.render = render;

  var TySignature = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': script
  });

  return VuePlugin;

})));

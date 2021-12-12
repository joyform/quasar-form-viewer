/*!
 * quasar-ui-tyformviewer v0.1.46
 * (c) 2021 dan@typefully.io
 * Released under the MIT License.
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue'), require('quasar')) :
  typeof define === 'function' && define.amd ? define(['vue', 'quasar'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.TyFormViewer = factory(global.Vue, global.Quasar));
}(this, (function (vue, quasar) { 'use strict';

  var script$6 = {
    name: 'Block',
    components: {
      // TyWizard: defineAsyncComponent(() => import('./blocks/Wizard.vue')),
      // TySection: defineAsyncComponent(() => import('./blocks/Section.vue')),
      TyText: vue.defineAsyncComponent(function () { return Promise.resolve().then(function () { return TyInput; }); }),
      TyPassword: vue.defineAsyncComponent(function () { return Promise.resolve().then(function () { return TyInput; }); }),
      TyTextarea: vue.defineAsyncComponent(function () { return Promise.resolve().then(function () { return TyInput; }); }),
      TyEmail: vue.defineAsyncComponent(function () { return Promise.resolve().then(function () { return TyInput; }); }),
      TySearch: vue.defineAsyncComponent(function () { return Promise.resolve().then(function () { return TyInput; }); }),
      TyTel: vue.defineAsyncComponent(function () { return Promise.resolve().then(function () { return TyInput; }); }),
      TyNumber: vue.defineAsyncComponent(function () { return Promise.resolve().then(function () { return TyInput; }); }),
      TyUrl: vue.defineAsyncComponent(function () { return Promise.resolve().then(function () { return TyInput; }); }),
      TySelect: vue.defineAsyncComponent(function () { return Promise.resolve().then(function () { return TySelect; }); }),
      TySlider: vue.defineAsyncComponent(function () { return Promise.resolve().then(function () { return TySlider; }); }),
      TyCheckbox: vue.defineAsyncComponent(function () { return Promise.resolve().then(function () { return TyOptionGroup; }); }),
      TyRadio: vue.defineAsyncComponent(function () { return Promise.resolve().then(function () { return TyOptionGroup; }); }),
      TyToggle: vue.defineAsyncComponent(function () { return Promise.resolve().then(function () { return TyOptionGroup; }); }),
      TyHtml: vue.defineAsyncComponent(function () { return Promise.resolve().then(function () { return TyHtml; }); }),
    },
    props: {
      blockSchema: Object,
      modelValue: [String, Boolean, Number, Array, Object]
    },
    emits: ['update:modelValue'],
    setup: function setup(props, ref$1) {
      var emit = ref$1.emit;

      var el = vue.ref(null);
      var hover = vue.ref(false);
      var schema = vue.reactive(props.blockSchema);
      var modelValueRef = vue.ref(props.modelValue);
      var behavior = vue.computed(function () {
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
      var onUpdate = function (evt) {
        emit('update:modelValue', evt);
      };
      return {
        el: el,
        hover: hover,
        behavior: behavior,
        schema: schema,
        modelValueRef: modelValueRef,
        onUpdate: onUpdate
      }
    }
  };

  function render$6(_ctx, _cache, $props, $setup, $data, $options) {
    return ($setup.behavior.displayed)
      ? (vue.openBlock(), vue.createBlock("div", {
          key: 0,
          class: "ty-block",
          style: {"position":"relative"},
          ref: "el",
          onMouseover: _cache[2] || (_cache[2] = function ($event) { return ($setup.hover = true); }),
          onMouseleave: _cache[3] || (_cache[3] = function ($event) { return ($setup.hover = false); })
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
              _cache[1] || (_cache[1] = function ($event) { return ($setup.modelValueRef = $event); }),
              $setup.onUpdate
            ]
          }), null, 16, ["behavior", "modelValue", "onUpdate:modelValue"]))
        ], 544))
      : vue.createCommentVNode("", true)
  }

  script$6.render = render$6;

  var script$5 = vue.defineComponent({
    name: 'TyFormViewer',
    components: {
      Block: script$6, QForm: quasar.QForm, QCard: quasar.QCard, QParallax: quasar.QParallax,QImg: quasar.QImg, QCardSection: quasar.QCardSection
    },
    props: {
      formSchema: {
        type: Object,
        default: function () { return ({}); }
      },
      formData: {
        type: Object,
        default: function () { return ({}); }
      },
      embedded: Boolean
    },
    setup: function setup (props) {
      var reactiveFormData = vue.reactive(props.formData);
      var formComp = vue.ref(null);
      var currentPage = vue.ref(0);
      var mainPage = vue.ref(null);
      var reactiveFormSchema = vue.reactive(props.formSchema);
      vue.watch(
          // maintain formData fields to match the schema
          function () { return reactiveFormSchema; },
          function () {
            reactiveFormSchema.pages.forEach(function (p) {
              p.blocks.forEach(function (b) {
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
      var pageStyle = vue.computed(function () {
        if (reactiveFormSchema.theme.page.backgroundType === 'gradient') {
          var grad = reactiveFormSchema.theme.page.backgroundGradient;
          if (grad.type==='linear') {
            return {background: ("linear-gradient(" + (grad.direction) + "deg, " + (grad.color1) + " " + (grad.position1) + "%, " + (grad.color2) + " " + (grad.position2) + "%)")}
          }
          return {background: ("radial-gradient(circle at center, " + (grad.color1) + " " + (grad.position1) + "%, " + (grad.color2) + " " + (grad.position2) + "%)")}
        }
        var style = {
          backgroundColor: reactiveFormSchema.theme.page.backgroundColor || "#fff",
        };
        if(reactiveFormSchema.theme.page.backgroundType === 'image') {
          Object.assign(style, {
            backgroundImage: reactiveFormSchema.theme.page.backgroundImage ? ("url(\"" + (reactiveFormSchema.theme.page.backgroundImage) + "\")") : null,
            backgroundSize: "cover",
          });
        }
        return style
      });
      var horizontal = vue.computed(function () { return (reactiveFormSchema.theme.card.cover.position === ('left') || reactiveFormSchema.theme.card.cover.position === ('right')) &&
          mainPage.value && mainPage.value.clientWidth >= (reactiveFormSchema.theme.card.revertToVerticalIfWidthBelow || 600 ); }
      );
      var showCover = vue.computed(function () { return reactiveFormSchema.theme.card.cover.position !== 'none'; }
      );
      var cardStyle = vue.computed(function () { return ({
        backgroundColor: reactiveFormSchema.theme.card.backgroundColor || "#fff",
        backdropFilter: reactiveFormSchema.theme.card.backdrop,
        width: "100%",
        maxWidth: reactiveFormSchema.theme.card.maxWidth + 'px',
        // height:  mainPage.value ? mainPage.value.clientHeight + 'px' : undefined,
        maxHeight: reactiveFormSchema.theme.card.maxHeight ? reactiveFormSchema.theme.card.maxHeight + 'px' : undefined,
        borderRadius: reactiveFormSchema.theme.card.cornersRadius + 'px',
        border: reactiveFormSchema.theme.card.border ? ((reactiveFormSchema.theme.card.border.width) + "px solid " + (reactiveFormSchema.theme.card.border.color)) : 0,
        overflow: 'hidden'
      }); });
      var cardClasses = vue.computed(function () {
        var classes = [];
        if (reactiveFormSchema.theme.card.shadow === 0) {
          classes.push('no-shadow');
        } else {
          classes.push('shadow-' + reactiveFormSchema.theme.card.shadow);
        }
        return classes
      });

      var coverClasses = vue.computed(function () {
        var classes = [];
        if (reactiveFormSchema.theme.card.cover.widthCols) {
          classes.push('col-' + reactiveFormSchema.theme.card.cover.widthCols);
        }
        return classes
      });
      var coverWrapperClasses = vue.computed(function () {
        var classes = [];
        if (horizontal.value) {
          classes.push('row');
          if (reactiveFormSchema.theme.card.cover.position === 'right') {
            classes.push('reverse');
          }
        }
        return classes
      });
      var formClasses = vue.computed(function () {
        //in horizontal view, if the cover has col-* class, the form section also has to have one (12 - cover)
        var classes = [];
        if (reactiveFormSchema.theme.card.cover.widthCols) {
          classes.push('col-' + (12 - reactiveFormSchema.theme.card.cover.widthCols));
        }
        return classes
      });
      var coverHeight = vue.computed(function () {
        var borderWidth = reactiveFormSchema.theme.card.border ? reactiveFormSchema.theme.card.border.width : 0;
        var cardHeight = reactiveFormSchema.theme.card.maxHeight ? reactiveFormSchema.theme.card.maxHeight : 9999;
        var pageHeight = mainPage.value ? mainPage.value.clientHeight : 9999;
        var coverHeight = horizontal.value ? 9999 : (reactiveFormSchema.theme.card.cover.height ? reactiveFormSchema.theme.card.cover.height : 180);
        return Math.min(
            cardHeight,
            pageHeight,
            coverHeight) - (borderWidth * (horizontal.value ? 2 : 1))
      });
      var coverStyle = vue.computed(function () {
        var style = {};
        var rd = reactiveFormSchema.theme.card.cornersRadius;
        if (horizontal.value) {
          if (!reactiveFormSchema.theme.card.cover.widthCols && reactiveFormSchema.theme.card.width) {
            style.width = reactiveFormSchema.theme.card.cover.width + 'px';
          }
        }
        if (rd > 0) {
          style.borderRadius = "0";
        }
        return style
      });
      var buttonStyle = vue.computed(function () {
        return {
          borderRadius: reactiveFormSchema.theme.buttons.cornersRadius + 'px',
          backgroundColor: reactiveFormSchema.theme.buttons.backgroundColor,
          border: reactiveFormSchema.theme.buttons.border ? ((reactiveFormSchema.theme.buttons.border.width) + "px solid " + (reactiveFormSchema.theme.buttons.border.color)) : undefined
        }
      });
      var buttonClicked = function () {
        if (reactiveFormSchema.pages.length - 1 > currentPage.value) {
          //next
          //todo: validate()
          currentPage.value += 1;
        } else {
          //last page
          //todo: validate()
          fetch(reactiveFormSchema.form.actionUrl,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(reactiveFormData),
            mode: 'cors'
          }).then(function (res) {
            return res.json()
          }).then(function (json) {
            console.log('response', json);
          });

          //todo: move to thankyou page, show validation errors
        }
      };
      var openTypefully = function () { return quasar.openURL('https://typefully.io'); };
      var onUpdate = function (blockName, evt) {
        console.log((blockName + " = " + evt + " [" + (typeof evt) + "] | " + (JSON.stringify(evt))));
      };
      return {
        // wrapperStyle,
        pageStyle: pageStyle,
        cardStyle: cardStyle,
        cardClasses: cardClasses,
        openTypefully: openTypefully,
        currentPage: currentPage,
        // page,
        reactiveFormSchema: reactiveFormSchema,
        mainPage: mainPage,
        horizontal: horizontal,
        showCover: showCover,
        coverClasses: coverClasses,
        formClasses: formClasses,
        coverStyle: coverStyle,
        coverHeight: coverHeight,
        coverWrapperClasses: coverWrapperClasses,
        buttonStyle: buttonStyle,
        buttonClicked: buttonClicked,
        formComp: formComp,
        reactiveFormData: reactiveFormData,
        onUpdate: onUpdate
      }
    }
  });

  var _hoisted_1$2 = {
    class: "ty-main-page fit relative-position absolute",
    ref: "mainPage",
    style: {"z-index":"5","bottom":"0","top":"0","right":"0","left":"0"}
  };
  var _hoisted_2 = {
    key: 0,
    class: "absolute-bottom q-pa-sm text-white",
    style: {"background-color":"#00000088"}
  };
  var _hoisted_3 = {
    key: 0,
    class: "text-h6"
  };
  var _hoisted_4 = {
    key: 1,
    class: "text-subtitle2"
  };
  var _hoisted_5 = {
    key: 0,
    class: "absolute-bottom"
  };
  var _hoisted_6 = { class: "text-h6" };
  var _hoisted_7 = { class: "text-subtitle2" };
  var _hoisted_8 = {
    key: 2,
    class: "q-pa-md"
  };
  var _hoisted_9 = {
    key: 0,
    class: "text-h6"
  };
  var _hoisted_10 = {
    key: 1,
    class: "text-subtitle2"
  };

  function render$5(_ctx, _cache, $props, $setup, $data, $options) {
    var _component_q_parallax = vue.resolveComponent("q-parallax");
    var _component_q_img = vue.resolveComponent("q-img");
    var _component_block = vue.resolveComponent("block");
    var _component_q_btn = vue.resolveComponent("q-btn");
    var _component_q_card_section = vue.resolveComponent("q-card-section");
    var _component_q_card = vue.resolveComponent("q-card");
    var _component_q_tab_panel = vue.resolveComponent("q-tab-panel");
    var _component_q_tab_panels = vue.resolveComponent("q-tab-panels");
    var _component_q_form = vue.resolveComponent("q-form");

    return (vue.openBlock(), vue.createBlock(vue.Fragment, null, [
      (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent("style"), null, {
        default: vue.withCtx(function () { return [
          vue.createTextVNode(" .q-field--outlined .q-field__control { border-radius: " + vue.toDisplayString(_ctx.reactiveFormSchema.theme.inputs.cornersRadius) + "px; } .q-field--outlined .q-field__control { background-color: rgba(" + vue.toDisplayString(_ctx.reactiveFormSchema.theme.inputs.fill < 0 ? '0,0,0' : '255,255,255') + "," + vue.toDisplayString(_ctx.reactiveFormSchema.theme.inputs.fill/100*(_ctx.reactiveFormSchema.theme.inputs.fill<0?-1:1)) + "); } .min-height-100p { min-height: 100%; } .full-height-100vh { min-height:100vh; } .ty-submit-btn { color: " + vue.toDisplayString(_ctx.reactiveFormSchema.theme.buttons.textColor || '#000000') + " } .ty-back-btn { color: " + vue.toDisplayString(_ctx.reactiveFormSchema.theme.buttons.backTextColor || '#000000') + " } ", 1)
        ]; }),
        _: 1
      })),
      vue.createVNode("div", {
        class: {fullscreen: !_ctx.embedded, 'fit':_ctx.embedded},
        style: [_ctx.pageStyle, {"z-index":"1"}]
      }, null, 6),
      vue.createVNode("div", _hoisted_1$2, [
        vue.createVNode(_component_q_form, {
          action: _ctx.reactiveFormSchema.form.actionUrl,
          method: "post",
          ref: "formComp",
          class: "fit"
        }, {
          default: vue.withCtx(function () { return [
            vue.createVNode(_component_q_tab_panels, {
              modelValue: _ctx.currentPage,
              "onUpdate:modelValue": _cache[2] || (_cache[2] = function ($event) { return (_ctx.currentPage = $event); }),
              animated: "",
              swipeable: "",
              class: "bg-transparent fit"
            }, {
              default: vue.withCtx(function () { return [
                (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList(_ctx.reactiveFormSchema.pages, function (page, pageIdx) {
                  return (vue.openBlock(), vue.createBlock(_component_q_tab_panel, {
                    key: pageIdx,
                    name: pageIdx,
                    style: {},
                    class: ["q-pa-none bg-transparent fit flex flex-center", {'min-height-100p': _ctx.embedded, 'full-height-100vh':!_ctx.embedded}]
                  }, {
                    default: vue.withCtx(function () { return [
                      vue.createVNode(_component_q_card, {
                        style: _ctx.cardStyle,
                        class: _ctx.cardClasses
                      }, {
                        default: vue.withCtx(function () { return [
                          (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.horizontal ? 'q-card-section' : 'div'), {
                            horizontal: _ctx.horizontal,
                            class: _ctx.coverWrapperClasses
                          }, {
                            default: vue.withCtx(function () { return [
                              (_ctx.showCover && page.cover && page.cover.parallax)
                                ? (vue.openBlock(), vue.createBlock(_component_q_parallax, {
                                    key: 0,
                                    src: page.cover.backgroundImage,
                                    height: _ctx.coverHeight,
                                    class: _ctx.coverClasses,
                                    style: _ctx.coverStyle
                                  }, {
                                    default: vue.withCtx(function () { return [
                                      (page.header || page.subHeader)
                                        ? (vue.openBlock(), vue.createBlock("div", _hoisted_2, [
                                            (page.header)
                                              ? (vue.openBlock(), vue.createBlock("div", _hoisted_3, vue.toDisplayString(page.header), 1))
                                              : vue.createCommentVNode("", true),
                                            (page.subHeader)
                                              ? (vue.openBlock(), vue.createBlock("div", _hoisted_4, vue.toDisplayString(page.subHeader), 1))
                                              : vue.createCommentVNode("", true)
                                          ]))
                                        : vue.createCommentVNode("", true)
                                    ]; }),
                                    _: 2
                                  }, 1032, ["src", "height", "class", "style"]))
                                : vue.createCommentVNode("", true),
                              (_ctx.showCover && page.cover && !page.cover.parallax && page.cover.backgroundImage)
                                ? (vue.openBlock(), vue.createBlock(_component_q_img, {
                                    key: 1,
                                    height: _ctx.coverHeight,
                                    src: page.cover.backgroundImage,
                                    class: _ctx.coverClasses,
                                    style: _ctx.coverStyle,
                                    fit: "cover"
                                  }, {
                                    default: vue.withCtx(function () { return [
                                      (page.header || page.subHeader)
                                        ? (vue.openBlock(), vue.createBlock("div", _hoisted_5, [
                                            vue.createVNode("div", _hoisted_6, vue.toDisplayString(page.header), 1),
                                            vue.createVNode("div", _hoisted_7, vue.toDisplayString(page.subHeader), 1)
                                          ]))
                                        : vue.createCommentVNode("", true)
                                    ]; }),
                                    _: 2
                                  }, 1032, ["height", "src", "class", "style"]))
                                : vue.createCommentVNode("", true),
                              (!_ctx.showCover && (page.header || page.subHeader))
                                ? (vue.openBlock(), vue.createBlock("div", _hoisted_8, [
                                    (page.header)
                                      ? (vue.openBlock(), vue.createBlock("div", _hoisted_9, vue.toDisplayString(page.header), 1))
                                      : vue.createCommentVNode("", true),
                                    (page.subHeader)
                                      ? (vue.openBlock(), vue.createBlock("div", _hoisted_10, vue.toDisplayString(page.subHeader), 1))
                                      : vue.createCommentVNode("", true)
                                  ]))
                                : vue.createCommentVNode("", true),
                              vue.createVNode(_component_q_card_section, {
                                class: [_ctx.formClasses, "q-py-sm"]
                              }, {
                                default: vue.withCtx(function () { return [
                                  (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.horizontal?'q-scroll-area':'div'), {
                                    class: {'q-pr-md':_ctx.horizontal},
                                    style: {"height":"100%"}
                                  }, {
                                    default: vue.withCtx(function () { return [
                                      (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList(page.blocks, function (block, idx) {
                                        return (vue.openBlock(), vue.createBlock(_component_block, {
                                          key: block.name || block.type + idx,
                                          "block-schema": block,
                                          modelValue: _ctx.reactiveFormData[block.name],
                                          "onUpdate:modelValue": [function ($event) { return (_ctx.reactiveFormData[block.name] = $event); }, function ($event) { return (_ctx.onUpdate(block.name, $event)); }]
                                        }, {
                                          beforeblock: vue.withCtx(function (ref) {
                                            var blockSchema = ref.blockSchema;
                                            var el = ref.el;
                                            var hover = ref.hover;

                                            return [
                                            vue.renderSlot(_ctx.$slots, "beforeblock", {
                                              blockSchema: blockSchema,
                                              el: el,
                                              hover: hover
                                            })
                                          ];
                                        }),
                                          _: 2
                                        }, 1032, ["block-schema", "modelValue", "onUpdate:modelValue"]))
                                      }), 128)),
                                      vue.createVNode(_component_q_btn, {
                                        label: page.buttonLabel,
                                        unelevated: "",
                                        class: [("shadow-" + (_ctx.reactiveFormSchema.theme.buttons.shadow) + " q-px-" + (['xs', 'sm', 'md', 'lg', 'xl'][_ctx.reactiveFormSchema.theme.buttons.padding - 1])), "ty-submit-btn"],
                                        "no-caps": "",
                                        size: ['sm', 'md', 'lg', 'xl'][_ctx.reactiveFormSchema.theme.buttons.size - 1],
                                        icon: page.buttonIcon,
                                        style: _ctx.buttonStyle,
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
                                            onClick: _cache[1] || (_cache[1] = function ($event) { return (_ctx.currentPage -= 1); })
                                          }, null, 8, ["size"]))
                                        : vue.createCommentVNode("", true)
                                    ]; }),
                                    _: 2
                                  }, 1032, ["class"]))
                                ]; }),
                                _: 2
                              }, 1032, ["class"])
                            ]; }),
                            _: 2
                          }, 1032, ["horizontal", "class"]))
                        ]; }),
                        _: 2
                      }, 1032, ["style", "class"])
                    ]; }),
                    _: 2
                  }, 1032, ["name", "class"]))
                }), 128))
              ]; }),
              _: 1
            }, 8, ["modelValue"])
          ]; }),
          _: 1
        }, 8, ["action"]),
        vue.renderSlot(_ctx.$slots, "afterform")
      ], 512)
    ], 64))
  }

  script$5.render = render$5;

  var name = "quasar-ui-tyformviewer";
  var version$1 = "0.1.46";
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
  	"@vue/compiler-sfc": "^3.1.4",
  	"rollup-plugin-vue": "^6.0.0",
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
  	quasar: "^2.0.0-beta.12",
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

  var version = pkg.version;

  function install (app) {
    app.component(script$5.name, script$5);
  }

  var VuePlugin = /*#__PURE__*/Object.freeze({
    __proto__: null,
    version: version,
    TyFormViewer: script$5,
    install: install
  });

  var script$4 = {
    name: 'TyInput',
    components: {
    },
    props: {
      type: {
        type: String,
        required: true,
        validator: function validator(value) {
          // The value must match one of these strings
          return ['text', 'password', 'textarea', 'email', 'search', 'tel', 'number', 'url', 'time', 'date'].includes(value)
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
        default: function () { return ({}); }
      },
      modelValue: String
    },
    emits: ['update:modelValue'],
    setup: function setup (props, ref$1) {
      var emit = ref$1.emit;

      var formSchema = vue.inject('formSchema');
      // const formData = inject('formData');
      var modelValueRef = vue.ref(props.modelValue);
      // const value = ref(formData[props.name]);
      var labelStyle = vue.computed(function () {
        return {fontSize: (((100 + formSchema.theme.inputs.labelSize)/100) + "em")}
      });
      // const valueUpdated = (val) => {
      //   formData[props.name] = val
      // }
      var id = vue.computed(function () {
        return props.type + '_' + props.name
      });
      var onUpdate = function (evt) {
        emit('update:modelValue', evt);
      };
      return {
        formSchema: formSchema,
        labelStyle: labelStyle,
        id: id,
        // value,
        modelValueRef: modelValueRef,
        // valueUpdated,
        onUpdate: onUpdate
      }
    }
  };

  function render$4(_ctx, _cache, $props, $setup, $data, $options) {
    var _component_q_input = vue.resolveComponent("q-input");

    return (vue.openBlock(), vue.createBlock("div", null, [
      ($setup.formSchema.theme.inputs.labelStyle==='top')
        ? (vue.openBlock(), vue.createBlock("label", {
            key: 0,
            for: $setup.id,
            style: $setup.labelStyle,
            class: "ty-label ty-label-top"
          }, vue.toDisplayString($props.label), 13, ["for"]))
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
        modelValue: $setup.modelValueRef,
        "onUpdate:modelValue": [
          _cache[1] || (_cache[1] = function ($event) { return ($setup.modelValueRef = $event); }),
          $setup.onUpdate
        ],
        class: "ty-input"
      }, null, 8, ["label", "outlined", "borderless", "stack-label", "dense", "clearable", "hint", "counter", "placeholder", "for", "name", "readonly", "disable", "type", "modelValue", "onUpdate:modelValue"])
    ]))
  }

  script$4.render = render$4;

  var TyInput = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': script$4
  });

  var script$3 = {
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
        default: function () { return ({}); }
      },
      options: {
        type: Array,
        default: function () { return []; }
      },
      modelValue: [Array, String]
    },
    emits: ['update:modelValue'],
    setup: function setup (props, ref$1) {
      var emit = ref$1.emit;

      var formSchema = vue.inject('formSchema');
      var modelValueRef = vue.ref(props.modelValue);
      var id = vue.computed(function () {
        return props.type + '_' + props.name
      });
      var labelStyle = vue.computed(function () {
        return {fontSize: (((100 + formSchema.theme.inputs.labelSize)/100) + "em")}
      });
      var onUpdate = function (evt) {
        emit('update:modelValue', evt);
      };
      return {
        formSchema: formSchema,
        labelStyle: labelStyle,
        id: id,
        modelValueRef: modelValueRef,
        onUpdate: onUpdate
      }
    }
  };

  function render$3(_ctx, _cache, $props, $setup, $data, $options) {
    var _component_q_select = vue.resolveComponent("q-select");

    return (vue.openBlock(), vue.createBlock("div", null, [
      ($setup.formSchema.theme.inputs.labelStyle==='top')
        ? (vue.openBlock(), vue.createBlock("label", {
            key: 0,
            for: $setup.id,
            style: $setup.labelStyle,
            class: "ty-label ty-label-top"
          }, vue.toDisplayString($props.label), 13, ["for"]))
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
          _cache[1] || (_cache[1] = function ($event) { return ($setup.modelValueRef = $event); }),
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

  script$3.render = render$3;

  var TySelect = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': script$3
  });

  var script$2 = {
    name: 'TySlider',
    components: {
      // QSlider: defineAsyncComponent(() => import('quasar').QSlider),
      // QRange: defineAsyncComponent(() => import('quasar').QRange)
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
        default: function () { return ({}); }
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
        validator: function validator(value) {
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
      modelValue: [Number, Object]
    },
    setup: function setup (props, ref$1) {
      var emit = ref$1.emit;

      var formSchema = vue.inject('formSchema');
      var modelValueRef = vue.ref(props.modelValue);
      if (modelValueRef.value === null) {
        modelValueRef.value = props.defaultValue !== undefined ? props.defaultValue : (props.range ? {min:props.min, max:props.max} : 50);
      }
      var labelStyle = vue.computed(function () {
        return {fontSize: (((100 + formSchema.theme.inputs.labelSize)/100) + "em")}
      });
      var id = vue.computed(function () {
        return props.type + '_' + props.name
      });
      var onUpdate = function (evt) {
        emit('update:modelValue', evt);
      };
      return {
        formSchema: formSchema,
        labelStyle: labelStyle,
        id: id,
        modelValueRef: modelValueRef,
        onUpdate: onUpdate
      }
    }
  };

  var _hoisted_1$1 = {
    key: 0,
    class: "text-caption q-ml-sm text-grey-8"
  };

  function render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return (vue.openBlock(), vue.createBlock("div", null, [
      vue.createVNode("label", {
        style: $setup.labelStyle,
        class: "ty-label ty-label-top"
      }, vue.toDisplayString($props.label), 5),
      (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.range ? 'q-range' : 'q-slider' ), {
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
        "left-label-value": $props.thumbLabelPrefix + $setup.modelValueRef.min + $props.thumbLabelSuffix,
        "right-label-value": $props.thumbLabelPrefix + $setup.modelValueRef.max + $props.thumbLabelSuffix,
        snap: $props.snap,
        markers: $props.markers,
        class: "q-mt-lg",
        modelValue: $setup.modelValueRef,
        "onUpdate:modelValue": [
          _cache[1] || (_cache[1] = function ($event) { return ($setup.modelValueRef = $event); }),
          $setup.onUpdate
        ]
      }, null, 8, ["name", "readonly", "disable", "min", "max", "step", "reverse", "label", "label-always", "label-value", "left-label-value", "right-label-value", "snap", "markers", "modelValue", "onUpdate:modelValue"])),
      (!!$props.hint)
        ? (vue.openBlock(), vue.createBlock("div", _hoisted_1$1, vue.toDisplayString($props.hint), 1))
        : vue.createCommentVNode("", true)
    ]))
  }

  script$2.render = render$2;

  var TySlider = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': script$2
  });

  var script$1 = {
    name: 'TyOptionGroup',
    components: {
    },
    props: {
      type: {
        type: String,
        required: true,
        validator: function validator(value) {
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
        validator: function validator(value) {
          return ['left', 'right'].includes(value)
        }
      },
      inline: Boolean,
      options: {
        type: Array,
        default: function () { return []; }
      },
      hint: String,
      behavior: {
        type: Object, /* readOnly, clearable, disabled, displayed, counter */
        default: function () { return ({}); }
      },
      modelValue: [String, Array]
    },
    emits: ['update:modelValue'],
    setup: function setup (props, ref$1) {
      var emit = ref$1.emit;

      var formSchema = vue.inject('formSchema');
      var modelValueRef = vue.ref(props.modelValue);
      if (modelValueRef.value === null && props.type!=='radio') {
        modelValueRef.value = [];
      }
      var labelStyle = vue.computed(function () {
        return {fontSize: (((100 + formSchema.theme.inputs.labelSize)/100) + "em")}
      });
      var onUpdate = function (evt) {
        emit('update:modelValue', evt);
      };
      return {
        formSchema: formSchema,
        labelStyle: labelStyle,
        modelValueRef: modelValueRef,
        onUpdate: onUpdate
      }
    }
  };

  var _hoisted_1 = {
    key: 0,
    class: "text-caption q-ml-sm text-grey-8"
  };

  function render$1(_ctx, _cache, $props, $setup, $data, $options) {
    var _component_q_option_group = vue.resolveComponent("q-option-group");

    return (vue.openBlock(), vue.createBlock("div", null, [
      vue.createVNode("label", {
        style: $setup.labelStyle,
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
          _cache[1] || (_cache[1] = function ($event) { return ($setup.modelValueRef = $event); }),
          $setup.onUpdate
        ],
        options: $props.options
      }, null, 8, ["name", "type", "readonly", "disable", "left-label", "inline", "modelValue", "onUpdate:modelValue", "options"]),
      (!!$props.hint)
        ? (vue.openBlock(), vue.createBlock("div", _hoisted_1, vue.toDisplayString($props.hint), 1))
        : vue.createCommentVNode("", true)
    ]))
  }

  script$1.render = render$1;

  var TyOptionGroup = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': script$1
  });

  var script = {
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
        default: function () { return ({}); }
      },
    },
    setup: function setup (props) {
      var formSchema = vue.inject('formSchema');
      var refHtml = vue.ref(props.html);
      var id = vue.computed(function () {
        return props.type + '_' + props.name
      });
      return {
        formSchema: formSchema,
        id: id,
        refHtml: refHtml
      }
    }
  };

  function render(_ctx, _cache, $props, $setup, $data, $options) {
    return (vue.openBlock(), vue.createBlock("div", { innerHTML: $setup.refHtml }, null, 8, ["innerHTML"]))
  }

  script.render = render;

  var TyHtml = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': script
  });

  return VuePlugin;

})));

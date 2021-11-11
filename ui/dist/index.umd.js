/*!
 * quasar-ui-tyformviewer v0.1.11
 * (c) 2021 dan@typefully.io
 * Released under the MIT License.
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue'), require('quasar')) :
  typeof define === 'function' && define.amd ? define(['vue', 'quasar'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.TyFormViewer = factory(global.Vue, global.Quasar));
}(this, (function (vue, quasar) { 'use strict';

  var script$7 = {
    name: 'Block',
    components: {
      TyWizard: vue.defineAsyncComponent(function () { return Promise.resolve().then(function () { return Wizard; }); }),
      TySection: vue.defineAsyncComponent(function () { return Promise.resolve().then(function () { return Section; }); }),
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
    },
    props: {
      blockSchema: Object
    },

    setup: function setup() {
      var el = vue.ref(null);
      var hover = vue.ref(false);
      return {
        el: el,
        hover: hover
      }
    }
  };

  function render$7(_ctx, _cache, $props, $setup, $data, $options) {
    return (vue.openBlock(), vue.createBlock("div", {
      class: "ty-block",
      style: {"position":"relative"},
      ref: "el",
      onMouseover: _cache[1] || (_cache[1] = function ($event) { return ($setup.hover = true); }),
      onMouseleave: _cache[2] || (_cache[2] = function ($event) { return ($setup.hover = false); })
    }, [
      vue.renderSlot(_ctx.$slots, "beforeblock", {
        blockSchema: $props.blockSchema,
        el: $setup.el,
        hover: $setup.hover
      }),
      (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent('ty-' + $props.blockSchema.type), vue.mergeProps($props.blockSchema, { class: "q-my-md" }), null, 16))
    ], 544))
  }

  script$7.render = render$7;

  var script$6 = vue.defineComponent({
    name: 'TyFormViewer',
    components: {
      Block: script$7, QForm: quasar.QForm, QCard: quasar.QCard, QParallax: quasar.QParallax,QImg: quasar.QImg, QCardSection: quasar.QCardSection
    },
    props: {
      formSchema: {
        type: Object,
        default: function () { return ({}); }
      }
    },
    setup: function setup (props) {
      // const formSchema = reactive(schema);
      var currentPage = vue.ref(0);
      var reactiveFormSchema = vue.reactive(props.formSchema);
      var page = vue.computed(function () { return reactiveFormSchema.pages[currentPage.value]; });
      vue.provide('formSchema', reactiveFormSchema);
      var wrapperStyle = vue.computed(function () { return ({
        maxWidth: reactiveFormSchema.theme.card.maxWidth + 'px',
        width: '100vw'
      }); });
      var pageStyle = vue.computed(function () { return ({
        backgroundColor: reactiveFormSchema.theme.page.backgroundColor || "#fff",
        backgroundImage: reactiveFormSchema.theme.page.backgroundImage ? ("url(\"" + (reactiveFormSchema.theme.page.backgroundImage) + "\")") : null,
        backgroundSize: "cover",
        backgroundAttachment: "fixed"
      }); });
      var cardStyle = vue.computed(function () { return ({
        backgroundColor: reactiveFormSchema.theme.card.backgroundColor || "#fff",
        backdropFilter: reactiveFormSchema.theme.card.backdrop
      }); });
      var openTypefully = function () { return quasar.openURL('https://typefully.io'); };
      return {
        wrapperStyle: wrapperStyle,
        pageStyle: pageStyle,
        cardStyle: cardStyle,
        openTypefully: openTypefully,
        currentPage: currentPage,
        page: page,
        reactiveFormSchema: reactiveFormSchema
      }
    }
  });

  var _hoisted_1$3 = {
    key: 0,
    class: "absolute-bottom q-pa-sm text-white",
    style: {"background-color":"#00000088"}
  };
  var _hoisted_2$1 = {
    key: 0,
    class: "text-h6"
  };
  var _hoisted_3 = {
    key: 1,
    class: "text-subtitle2"
  };
  var _hoisted_4 = {
    key: 0,
    class: "absolute-bottom"
  };
  var _hoisted_5 = /*#__PURE__*/vue.createVNode("div", { class: "text-h6" }, "Our Changing Planet", -1);
  var _hoisted_6 = /*#__PURE__*/vue.createVNode("div", { class: "text-subtitle2" }, "by John Doe", -1);
  var _hoisted_7 = /*#__PURE__*/vue.createVNode("div", { class: "q-mb-xs" }, "Make your own form with", -1);

  function render$6(_ctx, _cache, $props, $setup, $data, $options) {
    var _component_q_parallax = vue.resolveComponent("q-parallax");
    var _component_q_img = vue.resolveComponent("q-img");
    var _component_block = vue.resolveComponent("block");
    var _component_q_card_section = vue.resolveComponent("q-card-section");
    var _component_q_card = vue.resolveComponent("q-card");
    var _component_q_form = vue.resolveComponent("q-form");

    return (vue.openBlock(), vue.createBlock("div", {
      class: "flex flex-center",
      style: [_ctx.pageStyle, {"padding-bottom":"60px"}]
    }, [
      vue.createVNode(_component_q_form, {
        action: _ctx.reactiveFormSchema.form.actionUrl,
        method: "post"
      }, {
        default: vue.withCtx(function () { return [
          vue.createVNode("div", {
            class: "col",
            style: _ctx.wrapperStyle
          }, [
            vue.createVNode(_component_q_card, {
              flat: _ctx.reactiveFormSchema.theme.card.flat,
              square: _ctx.reactiveFormSchema.theme.card.square,
              bordered: _ctx.reactiveFormSchema.theme.card.bordered,
              style: _ctx.cardStyle,
              class: "q-my-lg"
            }, {
              default: vue.withCtx(function () { return [
                (_ctx.page.cover && _ctx.page.cover.parallax)
                  ? (vue.openBlock(), vue.createBlock(_component_q_parallax, {
                      key: 0,
                      src: _ctx.page.cover.backgroundImage,
                      height: _ctx.page.cover.height || 180
                    }, {
                      default: vue.withCtx(function () { return [
                        (_ctx.page.cover.header || _ctx.page.cover.subHeader)
                          ? (vue.openBlock(), vue.createBlock("div", _hoisted_1$3, [
                              (_ctx.page.cover.header)
                                ? (vue.openBlock(), vue.createBlock("div", _hoisted_2$1, vue.toDisplayString(_ctx.page.cover.header), 1))
                                : vue.createCommentVNode("", true),
                              (_ctx.page.cover.subHeader)
                                ? (vue.openBlock(), vue.createBlock("div", _hoisted_3, vue.toDisplayString(_ctx.page.cover.subHeader), 1))
                                : vue.createCommentVNode("", true)
                            ]))
                          : vue.createCommentVNode("", true)
                      ]; }),
                      _: 1
                    }, 8, ["src", "height"]))
                  : vue.createCommentVNode("", true),
                (_ctx.page.cover && !_ctx.page.cover.parallax && _ctx.page.cover.backgroundImage)
                  ? (vue.openBlock(), vue.createBlock(_component_q_img, {
                      key: 1,
                      height: _ctx.page.cover.height,
                      src: _ctx.page.cover.backgroundImage
                    }, {
                      default: vue.withCtx(function () { return [
                        (_ctx.page.cover.header || _ctx.page.cover.subHeader)
                          ? (vue.openBlock(), vue.createBlock("div", _hoisted_4, [
                              _hoisted_5,
                              _hoisted_6
                            ]))
                          : vue.createCommentVNode("", true)
                      ]; }),
                      _: 1
                    }, 8, ["height", "src"]))
                  : vue.createCommentVNode("", true),
                vue.createVNode(_component_q_card_section, null, {
                  default: vue.withCtx(function () { return [
                    (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList(_ctx.page.blocks, function (block, idx) {
                      return (vue.openBlock(), vue.createBlock(_component_block, {
                        key: block.name || block.type + idx,
                        "block-schema": block
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
                      }, 1032, ["block-schema"]))
                    }), 128))
                  ]; }),
                  _: 1
                })
              ]; }),
              _: 1
            }, 8, ["flat", "square", "bordered", "style"])
          ], 4)
        ]; }),
        _: 1
      }, 8, ["action"]),
      vue.renderSlot(_ctx.$slots, "afterform"),
      vue.createVNode("div", {
        id: "poweredBy",
        class: "fixed-bottom-right q-ma-md",
        style: {"border":"1px solid #ccc","padding":"8px","cursor":"pointer","border-radius":"5px","box-shadow":"1px 1px 3px rgba(0,0,0,0.1)","background-color":"rgba(255,255,255,0.6)"},
        onClick: _cache[1] || (_cache[1] = function () {
          var args = [], len = arguments.length;
          while ( len-- ) args[ len ] = arguments[ len ];

          return (_ctx.openTypefully && _ctx.openTypefully.apply(_ctx, args));
    })
      }, [
        _hoisted_7,
        vue.createVNode(_component_q_img, {
          src: "typefully-logo-black.svg",
          height: "16px",
          fit: "contain",
          class: "float-right"
        })
      ])
    ], 4))
  }

  script$6.render = render$6;

  var name = "quasar-ui-tyformviewer";
  var version$1 = "0.1.11";
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
    app.component(script$6.name, script$6);
  }

  var VuePlugin = /*#__PURE__*/Object.freeze({
    __proto__: null,
    version: version,
    TyFormViewer: script$6,
    install: install
  });

  var script$5 = {
    name: 'Wizard',
    components: {
      Block: script$7,
      QStepper: quasar.QStepper, QStep: quasar.QStep, QBtn: quasar.QBtn, QStepperNavigation: quasar.QStepperNavigation
    },
    props: {
      steps: Array
    },
    setup: function setup (props) {
      var currentStep = vue.ref(0);
      return {
        currentStep: currentStep
      }
    }
  };

  function render$5(_ctx, _cache, $props, $setup, $data, $options) {
    var _component_block = vue.resolveComponent("block");
    var _component_q_btn = vue.resolveComponent("q-btn");
    var _component_q_stepper_navigation = vue.resolveComponent("q-stepper-navigation");
    var _component_q_step = vue.resolveComponent("q-step");
    var _component_q_stepper = vue.resolveComponent("q-stepper");

    return (vue.openBlock(), vue.createBlock(_component_q_stepper, {
      modelValue: $setup.currentStep,
      "onUpdate:modelValue": _cache[3] || (_cache[3] = function ($event) { return ($setup.currentStep = $event); }),
      ref: "stepper",
      animated: "",
      flat: "",
      class: "bg-transparent"
    }, {
      default: vue.withCtx(function () { return [
        (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList($props.steps, function (step, idx) {
          return (vue.openBlock(), vue.createBlock(_component_q_step, {
            key: step.name || '' + idx ,
            name: idx,
            title: step.title,
            caption: step.caption
          }, {
            navigation: vue.withCtx(function () { return [
              vue.createVNode(_component_q_stepper_navigation, null, {
                default: vue.withCtx(function () { return [
                  vue.createVNode(_component_q_btn, {
                    onClick: _cache[1] || (_cache[1] = function ($event) { return (_ctx.$refs.stepper.next()); }),
                    label: step.nextLabel || idx === $props.steps.length-1 ? 'Finish' : 'Continue'
                  }, null, 8, ["label"]),
                  ($setup.currentStep > 0)
                    ? (vue.openBlock(), vue.createBlock(_component_q_btn, {
                        key: 0,
                        flat: "",
                        onClick: _cache[2] || (_cache[2] = function ($event) { return (_ctx.$refs.stepper.previous()); }),
                        label: "Back",
                        class: "q-ml-sm"
                      }))
                    : vue.createCommentVNode("", true)
                ]; }),
                _: 2
              }, 1024)
            ]; }),
            default: vue.withCtx(function () { return [
              (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList(step.blocks, function (block) {
                return (vue.openBlock(), vue.createBlock(_component_block, {
                  key: block.name,
                  "block-schema": block
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
                }, 1032, ["block-schema"]))
              }), 128))
            ]; }),
            _: 2
          }, 1032, ["name", "title", "caption"]))
        }), 128))
      ]; }),
      _: 1
    }, 8, ["modelValue"]))
  }

  script$5.render = render$5;

  var Wizard = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': script$5
  });

  var script$4 = {
    name: 'Section',
    components: {
      Block: script$7
    },
    props: {
      name: String,
      header: String,
      subHeader: String,
      blocks: Array
    },
    setup: function setup (props) {
      return {
      }
    }
  };

  var _hoisted_1$2 = {
    key: 0,
    class: "text-subtitle1"
  };
  var _hoisted_2 = {
    key: 1,
    class: "text-caption"
  };

  function render$4(_ctx, _cache, $props, $setup, $data, $options) {
    var _component_block = vue.resolveComponent("block");

    return (vue.openBlock(), vue.createBlock("div", {
      class: "ty-section",
      id: $props.name
    }, [
      (!!$props.header)
        ? (vue.openBlock(), vue.createBlock("p", _hoisted_1$2, vue.toDisplayString($props.header), 1))
        : vue.createCommentVNode("", true),
      (!!$props.subHeader)
        ? (vue.openBlock(), vue.createBlock("p", _hoisted_2, vue.toDisplayString($props.subHeader), 1))
        : vue.createCommentVNode("", true),
      (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList($props.blocks, function (block) {
        return (vue.openBlock(), vue.createBlock(_component_block, {
          key: block.name,
          "block-schema": block
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
        }, 1032, ["block-schema"]))
      }), 128))
    ], 8, ["id"]))
  }

  script$4.render = render$4;

  var Section = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': script$4
  });

  var script$3 = {
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
      validations: {
        type: Array,
        default: function () { return []; }
      },
      behavior: {
        type: Object, /* readOnly, clearable, disabled, displayed, counter */
        default: function () { return ({}); }
      }
    },
    setup: function setup (props) {
      var val = vue.ref(null);
      var formSchema = vue.inject('formSchema');
      var id = vue.computed(function () {
        return props.type + '_' + props.name
      });
      return {
        formSchema: formSchema,
        id: id,
        val: val
      }
    }
  };

  function render$3(_ctx, _cache, $props, $setup, $data, $options) {
    var _component_q_input = vue.resolveComponent("q-input");

    return (vue.openBlock(), vue.createBlock("div", null, [
      ($setup.formSchema.theme.inputs.labelStyle==='top')
        ? (vue.openBlock(), vue.createBlock("label", {
            key: 0,
            for: $setup.id
          }, vue.toDisplayString($props.label), 9, ["for"]))
        : vue.createCommentVNode("", true),
      vue.createVNode(_component_q_input, {
        filled: $setup.formSchema.theme.inputs.filled,
        label: $setup.formSchema.theme.inputs.labelStyle !=='top' ? $props.label : undefined,
        rounded: $setup.formSchema.theme.inputs.rounded,
        outlined: $setup.formSchema.theme.inputs.outlined,
        borderless: $setup.formSchema.theme.inputs.borderless,
        square: $setup.formSchema.theme.inputs.square,
        "stack-label": $setup.formSchema.theme.inputs.labelStyle==='stacked',
        dense: $setup.formSchema.theme.inputs.dense,
        clearable: $setup.formSchema.theme.inputs.clearable || $props.behavior && $props.behavior.clearable,
        hint: $props.hint,
        counter: !!$props.behavior.counter,
        placeholder: $props.placeholder,
        for: $setup.id,
        name: $props.name,
        readonly: !!$props.behavior.readOnly,
        disable: !!$props.behavior.disabled,
        type: $props.type,
        modelValue: $setup.val,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) { return ($setup.val = $event); })
      }, null, 8, ["filled", "label", "rounded", "outlined", "borderless", "square", "stack-label", "dense", "clearable", "hint", "counter", "placeholder", "for", "name", "readonly", "disable", "type", "modelValue"])
    ]))
  }

  script$3.render = render$3;

  var TyInput = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': script$3
  });

  var script$2 = {
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
      validations: {
        type: Array,
        default: function () { return []; }
      },
      behavior: {
        type: Object, /* readOnly, clearable, disabled, displayed, counter */
        default: function () { return ({}); }
      },
      options: {
        type: Array,
        default: function () { return []; }
      },
    },
    setup: function setup (props) {
      var val = vue.ref(null);
      var formSchema = vue.inject('formSchema');
      var id = vue.computed(function () {
        return props.type + '_' + props.name
      });
      return {
        formSchema: formSchema,
        id: id,
        val: val
      }
    }
  };

  function render$2(_ctx, _cache, $props, $setup, $data, $options) {
    var _component_q_select = vue.resolveComponent("q-select");

    return (vue.openBlock(), vue.createBlock("div", null, [
      ($setup.formSchema.theme.inputs.labelStyle==='top')
        ? (vue.openBlock(), vue.createBlock("label", {
            key: 0,
            for: $setup.id
          }, vue.toDisplayString($props.label), 9, ["for"]))
        : vue.createCommentVNode("", true),
      vue.createVNode(_component_q_select, {
        filled: $setup.formSchema.theme.inputs.filled,
        label: $setup.formSchema.theme.inputs.labelStyle !=='top' ? $props.label : undefined,
        rounded: $setup.formSchema.theme.inputs.rounded,
        outlined: $setup.formSchema.theme.inputs.outlined,
        borderless: $setup.formSchema.theme.inputs.borderless,
        square: $setup.formSchema.theme.inputs.square,
        "stack-label": $setup.formSchema.theme.inputs.labelStyle==='stacked',
        dense: $setup.formSchema.theme.inputs.dense,
        clearable: $setup.formSchema.theme.inputs.clearable || $props.behavior && $props.behavior.clearable,
        hint: $props.hint,
        counter: !!$props.behavior.counter,
        placeholder: $props.placeholder,
        for: $setup.id,
        readonly: !!$props.behavior.readOnly,
        disable: !!$props.behavior.disabled,
        modelValue: $setup.val,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) { return ($setup.val = $event); }),
        options: $props.options,
        multiple: !!$props.behavior.multiple,
        "use-chips": !!$props.behavior.multiple,
        name: $props.name,
        "transition-show": "scale",
        "transition-hide": "scale"
      }, null, 8, ["filled", "label", "rounded", "outlined", "borderless", "square", "stack-label", "dense", "clearable", "hint", "counter", "placeholder", "for", "readonly", "disable", "modelValue", "options", "multiple", "use-chips", "name"])
    ]))
  }

  script$2.render = render$2;

  var TySelect = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': script$2
  });

  var script$1 = {
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
      validations: {
        type: Array,
        default: function () { return []; }
      },
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
        type: Number
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
      range: Boolean
    },
    setup: function setup (props) {
      var val = vue.ref(props.defaultValue !== undefined ? props.defaultValue : (props.range ? {min:props.min, max:props.max} : 50));
      var formSchema = vue.inject('formSchema');
      var id = vue.computed(function () {
        return props.type + '_' + props.name
      });
      return {
        formSchema: formSchema,
        id: id,
        val: val
      }
    }
  };

  var _hoisted_1$1 = {
    key: 0,
    class: "text-caption q-ml-sm text-grey-8"
  };

  function render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return (vue.openBlock(), vue.createBlock("div", null, [
      vue.createVNode("label", null, vue.toDisplayString($props.label), 1),
      (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.range ? 'q-range' : 'q-slider' ), {
        name: $props.name,
        readonly: !!$props.behavior.readOnly,
        disable: !!$props.behavior.disabled,
        min: $props.min,
        max: $props.max,
        step: $props.step,
        reverse: $props.reverse,
        label: $props.showThumbLabel !== 'off',
        "label-always": $props.showThumbLabel === 'always' ,
        "label-value": $props.thumbLabelPrefix + $setup.val + $props.thumbLabelSuffix,
        "left-label-value": $props.thumbLabelPrefix + $setup.val.min + $props.thumbLabelSuffix,
        "right-label-value": $props.thumbLabelPrefix + $setup.val.max + $props.thumbLabelSuffix,
        snap: $props.snap,
        markers: $props.markers,
        class: "q-mt-lg",
        modelValue: $setup.val,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) { return ($setup.val = $event); })
      }, null, 8, ["name", "readonly", "disable", "min", "max", "step", "reverse", "label", "label-always", "label-value", "left-label-value", "right-label-value", "snap", "markers", "modelValue"])),
      (!!$props.hint)
        ? (vue.openBlock(), vue.createBlock("div", _hoisted_1$1, vue.toDisplayString($props.hint), 1))
        : vue.createCommentVNode("", true)
    ]))
  }

  script$1.render = render$1;

  var TySlider = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': script$1
  });

  var script = {
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
      validations: {
        type: Array,
        default: function () { return []; }
      },
      behavior: {
        type: Object, /* readOnly, clearable, disabled, displayed, counter */
        default: function () { return ({}); }
      }
    },
    setup: function setup (props) {
      var val = vue.ref(props.type === 'radio' ? null : []);
      var formSchema = vue.inject('formSchema');
      return {
        formSchema: formSchema,
        val: val
      }
    }
  };

  var _hoisted_1 = {
    key: 0,
    class: "text-caption q-ml-sm text-grey-8"
  };

  function render(_ctx, _cache, $props, $setup, $data, $options) {
    var _component_q_option_group = vue.resolveComponent("q-option-group");

    return (vue.openBlock(), vue.createBlock("div", null, [
      vue.createVNode("label", null, vue.toDisplayString($props.label), 1),
      vue.createVNode(_component_q_option_group, {
        name: $props.name,
        type: $props.type,
        readonly: !!$props.behavior.readOnly,
        disable: !!$props.behavior.disabled,
        "left-label": $props.labelSide === 'left',
        inline: $props.inline,
        modelValue: $setup.val,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) { return ($setup.val = $event); }),
        options: $props.options
      }, null, 8, ["name", "type", "readonly", "disable", "left-label", "inline", "modelValue", "options"]),
      (!!$props.hint)
        ? (vue.openBlock(), vue.createBlock("div", _hoisted_1, vue.toDisplayString($props.hint), 1))
        : vue.createCommentVNode("", true)
    ]))
  }

  script.render = render;

  var TyOptionGroup = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': script
  });

  return VuePlugin;

})));

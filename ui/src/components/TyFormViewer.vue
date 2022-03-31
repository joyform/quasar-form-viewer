<template>
  <component is="style">
    .q-field--outlined .q-field__control {
      border-radius: {{reactiveFormSchema.theme.inputs.cornersRadius}}px;
    }
    .q-field--outlined .q-field__control {
      background-color: rgba({{reactiveFormSchema.theme.inputs.fill < 0 ? '0,0,0' : '255,255,255'}},{{reactiveFormSchema.theme.inputs.fill/100*(reactiveFormSchema.theme.inputs.fill<0?-1:1)}});
    }
    .ty-signature canvas {
      border-radius: {{reactiveFormSchema.theme.inputs.cornersRadius}}px;
      border: 1px solid #c2c2c2;
      background-color: #fff;
    }
    {{reactiveFormSchema.theme.inputs.textColor ?
      `.ty-select .q-field__inner .q-field__native {
        color: ${reactiveFormSchema.theme.inputs.textColor};
      }` : ''
    }}
    .ty-label {
      font-size: {{(100 + reactiveFormSchema.theme.inputs.labelSize)/100}}em;
      color: {{reactiveFormSchema.theme.inputs.labelTextColor || '#000'}};
    }
    .ty-select .q-field__inner .q-field__native {
      color: {{reactiveFormSchema.theme.inputs.textColor}};
    }
    .min-height-100p {
      min-height: 100%;
    }
    .full-height-100vh {
      min-height:100vh;
    }
    .ty-submit-btn {
      color: {{reactiveFormSchema.theme.buttons.textColor || '#000000'}}
    }
    .ty-back-btn {
      color: {{reactiveFormSchema.theme.buttons.backTextColor || '#000000'}}
    }
    .ty-rating .q-rating .q-rating__icon-container {
      margin-right: 10px
    }
    .ty-hint {
      font-size: 0.85rem
    }
  </component>
  <div :class="{fullscreen: !embedded, 'fit':embedded}" :style="pageStyle" style="z-index: 1"></div>
  <div class="ty-main-page fit relative-position absolute" ref="mainPage" style="z-index:5; bottom:0;top:0;right:0;left:0;">
    <q-form
      :action="reactiveFormSchema.form.actionUrl"
      method="post"
      ref="formComp"
      class="fit"
    >
      <q-tab-panels
          v-model="currentPage"
          animated
          swipeable
          class="bg-transparent fit"
      >
        <q-tab-panel
            v-for="(page, pageIdx) in reactiveFormSchema.pages"
            :key="pageIdx"
            :name="pageIdx"
            :style="wrapperStyle"
            class="q-px-none bg-transparent fit flex "
            :class="tabPanelClasses"
        >
          <q-card
              :style="cardStyle"
              :class="cardClasses"
          >
            <component
                :is="horizontal ? 'q-card-section' : 'div'"
                :horizontal="horizontal"
                :class="coverWrapperClasses"
            >
              <q-img
                  v-if="showCover && page.cover && page.cover.backgroundImage"
                  :height="coverHeight"
                  :src="page.cover.backgroundImage"
                  :class="coverClasses"
                  :style="coverStyle"
                  fit="cover"
              >
                <div class="absolute-bottom q-pa-sm text-white"
                     style="background-color: #00000088"
                     v-if="page.header || page.subHeader">
                  <div class="text-h6" v-if="page.header">{{ page.header }}</div>
                  <div class="text-subtitle2" v-if="page.subHeader">{{ page.subHeader }}</div>
                </div>
              </q-img>
              <div
                  class="q-pa-md"
                  v-if="!showCover && (page.header || page.subHeader)"
              >
                <div class="text-h6" v-if="page.header">{{ page.header }}</div>
                <div class="text-subtitle2" v-if="page.subHeader">{{ page.subHeader }}</div>
              </div>
              <q-card-section :class="formClasses" class="q-py-sm">
                <component :is="horizontal?'q-scroll-area':'div'" :class="{'q-pr-md':horizontal}"
                           style="height: 100%;"
                >
                  <block
                      v-for = "(block, idx) in page.blocks"
                      :key = "block.name || block.type + idx"
                      :block-schema = "block"
                      v-model="reactiveFormData[block.name]"
                      @update:model-value="onUpdate(block.name, $event)"
                  >
                    <template v-slot:beforeblock="{blockSchema, el, hover}">
                      <slot name="beforeblock" :blockSchema="blockSchema" :el="el" :hover="hover"></slot>
                    </template>
                  </block>
                  <q-btn
                      :label="page.buttonLabel"
                      unelevated
                      :class="`shadow-${reactiveFormSchema.theme.buttons.shadow} q-px-${['xs', 'sm', 'md', 'lg', 'xl'][reactiveFormSchema.theme.buttons.padding - 1]}`"
                      no-caps
                      :size="['sm', 'md', 'lg', 'xl'][reactiveFormSchema.theme.buttons.size - 1]"
                      :icon="page.buttonIcon"
                      :style="buttonStyle"
                      :loading="buttonLoading"
                      @click="buttonClicked"
                      class="ty-submit-btn"
                  >
                  </q-btn>
                  <q-btn
                      label="Back"
                      flat
                      no-caps
                      class="q-ml-xl ty-back-btn"
                      v-if="currentPage > 0"
                      :size="['sm', 'md', 'lg', 'xl'][reactiveFormSchema.theme.buttons.size - 1]"
                      @click="currentPage -= 1"
                  >
                  </q-btn>
                </component>
              </q-card-section>
            </component>
          </q-card>
          <div
              v-if="!embedded"
              class="q-py-lg row"
          >&nbsp;</div>
        </q-tab-panel>
      </q-tab-panels>

    </q-form>
    <slot name="afterform"></slot>
  </div>
</template>

<script>
import { defineComponent, ref, computed, provide, reactive, watch } from 'vue';
// import schema from '../sample';
import { openURL, QForm, QCard, QImg, QCardSection } from 'quasar';
import Block from "./Block.vue";
import { useQuasar, setCssVar } from 'quasar'
import { buildValidationRules } from '../utils/utils'

export default defineComponent({
  name: 'TyFormViewer',
  components: {
    Block, QForm, QCard, QImg, QCardSection
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
    embedded: Boolean,
    mobileView: Boolean,
    demo: Boolean
  },
  setup (props) {
    const $q = useQuasar()
    const reactiveFormData = reactive(props.formData)
    const formComp = ref(null)
    const currentPage = ref(0);
    const mainPage = ref(null);
    const buttonLoading = ref(false)
    const reactiveFormSchema = computed(() => props.formSchema)
    const reactiveValidationRules = ref(null)
    watch(
        // maintain formData fields to match the schema
        () => reactiveFormSchema,
        () => {
          reactiveFormSchema.value.pages.forEach(p => {
            p.blocks.forEach(b => {
              //todo: filter out non-input fields
              if (reactiveFormData[b.name] === undefined) {
                reactiveFormData[b.name] = null
              }
            })
          })
          reactiveValidationRules.value = buildValidationRules(reactiveFormData, reactiveFormSchema)
        },
        {immediate:true, deep:true}
    )
    provide('formSchema', reactiveFormSchema);
    const mobile = computed(() => {
      return $q.platform.is.mobile || props.mobileView
    })
    const wrapperStyle = computed(() => {
      const style = {}
      if (reactiveFormSchema.value.theme.card.position === 'left') {
        style.justifyContent = 'flex-start'
      } else if (reactiveFormSchema.value.theme.card.position === 'right') {
        style.justifyContent = 'flex-end'
      } else /*(reactiveFormSchema.value.theme.card.position === 'center')*/ {
        style.justifyContent = 'center'
      }
      return style
    })
    const pageStyle = computed(() => {
      if (reactiveFormSchema.value.theme.page.backgroundType === 'gradient') {
        const grad = reactiveFormSchema.value.theme.page.backgroundGradient
        if (grad.type==='linear') {
          return {backgroundImage: `linear-gradient(${grad.direction}deg, ${grad.color1} ${grad.position1}%, ${grad.color2} ${grad.position2}%)`}
        }
        return {backgroundImage: `radial-gradient(circle at center, ${grad.color1} ${grad.position1}%, ${grad.color2} ${grad.position2}%)`}
      }
      const style = {
        backgroundColor: reactiveFormSchema.value.theme.page.backgroundColor || "#fff",
      }
      if(reactiveFormSchema.value.theme.page.backgroundType === 'image') {
        Object.assign(style, {
          backgroundImage: reactiveFormSchema.value.theme.page.backgroundImage ? `url("${reactiveFormSchema.value.theme.page.backgroundImage}")` : null,
          backgroundSize: "cover",
        })
      }
      return style
    })
    const horizontal = computed(() =>
        (reactiveFormSchema.value.theme.card.cover.position === ('left') || reactiveFormSchema.value.theme.card.cover.position === ('right')) &&
        mainPage.value && mainPage.value.clientWidth >= (reactiveFormSchema.value.theme.card.revertToVerticalIfWidthBelow || 600 )
    )
    const showCover = computed(() =>
        reactiveFormSchema.value.theme.card.cover.position && reactiveFormSchema.value.theme.card.cover.position !== 'none'
    )
    const cardRadius = computed(() => {
      return mobile.value ? 0 : reactiveFormSchema.value.theme.card.cornersRadius
    })
    const cardStyle = computed(() =>({
      backgroundColor: reactiveFormSchema.value.theme.card.backgroundColor || "#fff",
      backdropFilter: reactiveFormSchema.value.theme.card.backdrop,
      width: "100%",
      maxWidth: reactiveFormSchema.value.theme.card.maxWidth + 'px',
      // height:  mainPage.value ? mainPage.value.clientHeight + 'px' : undefined,
      maxHeight: horizontal.value && reactiveFormSchema.value.theme.card.maxHeight ? reactiveFormSchema.value.theme.card.maxHeight + 'px' : undefined,
      borderRadius: cardRadius.value + 'px',
      border: reactiveFormSchema.value.theme.card.border ? `${reactiveFormSchema.value.theme.card.border.width}px solid ${reactiveFormSchema.value.theme.card.border.color}` : 0,
      overflow: 'hidden',
      alignSelf: 'center'
    }))
    const cardClasses = computed(() => {
      const classes = []
      if (reactiveFormSchema.value.theme.card.shadow === 0) {
        classes.push('no-shadow')
      } else {
        classes.push('shadow-' + reactiveFormSchema.value.theme.card.shadow)
      }
      if (!props.embedded && !mobile) {
        classes.push('q-my-lg')
      }
      if (!horizontal.value) {
        classes.push('q-pb-md')
      }
      return classes
    })
    const tabPanelClasses = computed(() => {
      const classes = []
      if (props.embedded) {
        classes.push('min-height-100p')
      } else {
        classes.push('full-height-100vh')
      }
      if (mobile.value) {
        classes.push('q-py-none')
      } else if (horizontal.value) { //&& !mobile
        classes.push('flex-center')
      }
      return classes
    })
    const coverClasses = computed(() => {
      const classes = []
      if (horizontal.value && reactiveFormSchema.value.theme.card.cover.widthCols) {
        classes.push('col-' + reactiveFormSchema.value.theme.card.cover.widthCols)
      }
      return classes
    })
    const coverWrapperClasses = computed(() => {
      const classes = []
      if (horizontal.value) {
        classes.push('row')
        if (reactiveFormSchema.value.theme.card.cover.position === 'right') {
          classes.push('reverse')
        }
      }
      return classes
    })
    const formClasses = computed(() => {
      //in horizontal view, if the cover has col-* class, the form section also has to have one (12 - cover)
      const classes = []
      if (reactiveFormSchema.value.theme.card.cover.widthCols) {
        classes.push('col-' + (12 - reactiveFormSchema.value.theme.card.cover.widthCols))
      }
      return classes
    })
    const coverHeight = computed(() => {
      const borderWidth = reactiveFormSchema.value.theme.card.border ? reactiveFormSchema.value.theme.card.border.width : 0
      const cardHeight = horizontal.value && reactiveFormSchema.value.theme.card.maxHeight ? reactiveFormSchema.value.theme.card.maxHeight : 9999
      const pageHeight = mainPage.value ? mainPage.value.clientHeight : 9999
      const coverHeight = horizontal.value ? 9999 : (reactiveFormSchema.value.theme.card.cover.maxHeight ? reactiveFormSchema.value.theme.card.cover.maxHeight : 180)
      const maxHeight = Math.min(
          cardHeight,
          pageHeight,
          coverHeight) - (borderWidth * (horizontal.value ? 2 : 1))
      const minHeight = horizontal.value && reactiveFormSchema.value.theme.card.minHeight ? reactiveFormSchema.value.theme.card.minHeight : 0
      return Math.max(minHeight, maxHeight) + 'px'
    })
    const coverStyle = computed(() => {
      const style = {}
      // const rd = reactiveFormSchema.value.theme.card.cornersRadius
      if (horizontal.value) {
        if (!reactiveFormSchema.value.theme.card.cover.widthCols && reactiveFormSchema.value.theme.card.width) {
          style.width = reactiveFormSchema.value.theme.card.cover.width + 'px'
        }
      }
      if (cardRadius.value > 0) {
        style.borderRadius = `0`
      }
      return style
    })
    const buttonStyle = computed(() => {
      return {
        borderRadius: reactiveFormSchema.value.theme.buttons.cornersRadius + 'px',
        backgroundColor: reactiveFormSchema.value.theme.buttons.backgroundColor,
        border: reactiveFormSchema.value.theme.buttons.border ? `${reactiveFormSchema.value.theme.buttons.border.width}px solid ${reactiveFormSchema.value.theme.buttons.border.color}` : undefined
      }
    })
    const activeColor = computed(() => {
      return reactiveFormSchema.value.theme.inputs.activeColor || '#1976d2'
    })
    watch(
      () => [activeColor.value, mainPage.value],
      ([newActiveColor]) => {
        if (!mainPage.value) {
          return
        }
        setCssVar('primary', newActiveColor, mainPage.value)
      },
      {immediate:true}
    )
    const buttonClicked = async () => {
      if (reactiveFormSchema.value.pages.length - 1 > currentPage.value) {
        //next
        //todo: validate()
        currentPage.value += 1
      } else {
        //last page
        //todo: validate()
        buttonLoading.value = true
        if (props.demo) {
          function delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
          }
          await delay(1000);
        } else {
          const res = await fetch(reactiveFormSchema.value.form.actionUrl,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(reactiveFormData),
                mode: 'cors'
              })
          const json = await res.json()
          console.log('response', json)
        }
        buttonLoading.value = false
        const message = props.demo ? 'This is a preview. Form was not really submitted. But it was successful' : 'The form has been submitted successfully'
        $q.notify({
          progress: true,
          type: 'positive',
          position: 'center',
          multiLine: true,
          icon: 'thumb_up',
          message
        })
        //todo: move to thankyou page, show validation errors
      }
    }
    const openTypefully = () => openURL('https://typefully.io');
    const onUpdate = (blockName, evt) => {
      console.log(`${blockName} = ${evt} [${typeof evt}] | ${JSON.stringify(evt)}`)
    }
    return {
      mobile,
      wrapperStyle,
      pageStyle,
      cardStyle,
      cardClasses,
      tabPanelClasses,
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
      buttonLoading,
      buttonClicked,
      formComp,
      reactiveFormData,
      onUpdate
    }
  }
})
</script>

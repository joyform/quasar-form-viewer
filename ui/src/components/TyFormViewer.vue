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
  </component>
  <div :class="{fullscreen: !embedded, 'fit':embedded}" :style="pageStyle" style="z-index: 1"></div>
  <div class="ty-main-page fit relative-position absolute" ref="mainPage"  style="z-index:5; bottom:0;top:0;right:0;left:0;">
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
            style="/*wrapperStyle*/"
            class="q-pa-none bg-transparent fit flex flex-center"
            :class="{'min-height-100p': embedded, 'full-height-100vh':!embedded}"
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
<!--                <q-parallax-->
<!--                    v-if="showCover && page.cover && page.cover.parallax"-->
<!--                    :src="page.cover.backgroundImage"-->
<!--                    :height="coverHeight"-->
<!--                    :class="coverClasses"-->
<!--                    :style="coverStyle"-->
<!--                >-->
<!--                  <div-->
<!--                      class="absolute-bottom q-pa-sm text-white"-->
<!--                      style="background-color: #00000088"-->
<!--                      v-if="page.header || page.subHeader"-->
<!--                  >-->
<!--                    <div class="text-h6" v-if="page.header">{{ page.header }}</div>-->
<!--                    <div class="text-subtitle2" v-if="page.subHeader">{{ page.subHeader }}</div>-->
<!--                  </div>-->
<!--                </q-parallax>-->
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
// import { useQuasar } from 'quasar'

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
    embedded: Boolean
  },
  setup (props) {
    const reactiveFormData = reactive(props.formData)
    const formComp = ref(null)
    const currentPage = ref(0);
    const mainPage = ref(null);
    const reactiveFormSchema = reactive(props.formSchema)
    watch(
        // maintain formData fields to match the schema
        () => reactiveFormSchema,
        () => {
          reactiveFormSchema.pages.forEach(p => {
            p.blocks.forEach(b => {
              //todo: filter out non-input fields
              if (reactiveFormData[b.name] === undefined) {
                reactiveFormData[b.name] = null
              }
            })
          })
        },
        {immediate:true}
    )
    // const page = computed(() => reactiveFormSchema.pages[currentPage.value])
    provide('formSchema', reactiveFormSchema);
    // provide('formData', reactiveFormData);
    // const wrapperStyle = computed(() => ({
    //   maxWidth: reactiveFormSchema.theme.card.maxWidth + 'px',
    //   width: '100vw',
    //   maxHeight: reactiveFormSchema.theme.card.maxHeight ? reactiveFormSchema.theme.card.maxHeight + 'px' : undefined,
    //   height: reactiveFormSchema.theme.card.maxHeight ? 'calc(100vh - 80px)' : undefined
    // }));
    const pageStyle = computed(() => {
      if (reactiveFormSchema.theme.page.backgroundType === 'gradient') {
        const grad = reactiveFormSchema.theme.page.backgroundGradient
        if (grad.type==='linear') {
          return {background: `linear-gradient(${grad.direction}deg, ${grad.color1} ${grad.position1}%, ${grad.color2} ${grad.position2}%)`}
        }
        return {background: `radial-gradient(circle at center, ${grad.color1} ${grad.position1}%, ${grad.color2} ${grad.position2}%)`}
      }
      const style = {
        backgroundColor: reactiveFormSchema.theme.page.backgroundColor || "#fff",
      }
      if(reactiveFormSchema.theme.page.backgroundType === 'image') {
        Object.assign(style, {
          backgroundImage: reactiveFormSchema.theme.page.backgroundImage ? `url("${reactiveFormSchema.theme.page.backgroundImage}")` : null,
          backgroundSize: "cover",
        })
      }
      return style
    })
    const horizontal = computed(() =>
        (reactiveFormSchema.theme.card.cover.position === ('left') || reactiveFormSchema.theme.card.cover.position === ('right')) &&
        mainPage.value && mainPage.value.clientWidth >= (reactiveFormSchema.theme.card.revertToVerticalIfWidthBelow || 600 )
    )
    const showCover = computed(() =>
        reactiveFormSchema.theme.card.cover.position !== 'none'
    )
    const cardStyle = computed(() =>({
      backgroundColor: reactiveFormSchema.theme.card.backgroundColor || "#fff",
      backdropFilter: reactiveFormSchema.theme.card.backdrop,
      width: "100%",
      maxWidth: reactiveFormSchema.theme.card.maxWidth + 'px',
      // height:  mainPage.value ? mainPage.value.clientHeight + 'px' : undefined,
      maxHeight: reactiveFormSchema.theme.card.maxHeight ? reactiveFormSchema.theme.card.maxHeight + 'px' : undefined,
      borderRadius: reactiveFormSchema.theme.card.cornersRadius + 'px',
      border: reactiveFormSchema.theme.card.border ? `${reactiveFormSchema.theme.card.border.width}px solid ${reactiveFormSchema.theme.card.border.color}` : 0,
      overflow: 'hidden'
    }))
    const cardClasses = computed(() => {
      const classes = []
      if (reactiveFormSchema.theme.card.shadow === 0) {
        classes.push('no-shadow')
      } else {
        classes.push('shadow-' + reactiveFormSchema.theme.card.shadow)
      }
      return classes
    })

    const coverClasses = computed(() => {
      const classes = []
      if (reactiveFormSchema.theme.card.cover.widthCols) {
        classes.push('col-' + reactiveFormSchema.theme.card.cover.widthCols)
      }
      return classes
    })
    const coverWrapperClasses = computed(() => {
      const classes = []
      if (horizontal.value) {
        classes.push('row')
        if (reactiveFormSchema.theme.card.cover.position === 'right') {
          classes.push('reverse')
        }
      }
      return classes
    })
    const formClasses = computed(() => {
      //in horizontal view, if the cover has col-* class, the form section also has to have one (12 - cover)
      const classes = []
      if (reactiveFormSchema.theme.card.cover.widthCols) {
        classes.push('col-' + (12 - reactiveFormSchema.theme.card.cover.widthCols))
      }
      return classes
    })
    const coverHeight = computed(() => {
      const borderWidth = reactiveFormSchema.theme.card.border ? reactiveFormSchema.theme.card.border.width : 0
      const cardHeight = reactiveFormSchema.theme.card.maxHeight ? reactiveFormSchema.theme.card.maxHeight : 9999
      const pageHeight = mainPage.value ? mainPage.value.clientHeight : 9999
      const coverHeight = horizontal.value ? 9999 : (reactiveFormSchema.theme.card.cover.height ? reactiveFormSchema.theme.card.cover.height : 180)
      return Math.min(
          cardHeight,
          pageHeight,
          coverHeight) - (borderWidth * (horizontal.value ? 2 : 1)) + ''
    })
    const coverStyle = computed(() => {
      const style = {}
      const rd = reactiveFormSchema.theme.card.cornersRadius
      if (horizontal.value) {
        if (!reactiveFormSchema.theme.card.cover.widthCols && reactiveFormSchema.theme.card.width) {
          style.width = reactiveFormSchema.theme.card.cover.width + 'px'
        }
      }
      if (rd > 0) {
        style.borderRadius = `0`
      }
      return style
    })
    const buttonStyle = computed(() => {
      return {
        borderRadius: reactiveFormSchema.theme.buttons.cornersRadius + 'px',
        backgroundColor: reactiveFormSchema.theme.buttons.backgroundColor,
        border: reactiveFormSchema.theme.buttons.border ? `${reactiveFormSchema.theme.buttons.border.width}px solid ${reactiveFormSchema.theme.buttons.border.color}` : undefined
      }
    })
    const buttonClicked = () => {
      if (reactiveFormSchema.pages.length - 1 > currentPage.value) {
        //next
        //todo: validate()
        currentPage.value += 1
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
        }).then(res => {
          return res.json()
        }).then(json => {
          console.log('response', json)
        })

        //todo: move to thankyou page, show validation errors
      }
    }
    const openTypefully = () => openURL('https://typefully.io');
    const onUpdate = (blockName, evt) => {
      console.log(`${blockName} = ${evt} [${typeof evt}] | ${JSON.stringify(evt)}`)
    }
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
})
</script>
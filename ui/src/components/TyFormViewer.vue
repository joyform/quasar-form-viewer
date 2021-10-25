<template>
  <div class="flex flex-center" :style="pageStyle" style="padding-bottom:60px;">
    <q-form
      :action="formSchema.form.actionUrl"
      method="post"
    >
      <div class="col" :style="wrapperStyle">
        <h1 class="text-h4" v-if="page.header">{{page.header}}</h1>
        <p class="text-subtitle2" v-if="page.subHeader">{{page.subHeader}}</p>
        <q-card
          v-for="(section, sectionIdx) in page.sections"
          :key="''+sectionIdx"
          :flat="formSchema.theme.card.flat"
          :square="formSchema.theme.card.square"
          :bordered="formSchema.theme.card.bordered"
          :style="cardStyle"
          class="q-my-lg"
        >
          <q-parallax
            v-if="section.cover && section.cover.parallax"
            :src="section.cover.backgroundImage"
            :height="section.cover.height || 180"
          >
            <div
              class="absolute-bottom q-pa-sm text-white"
              style="background-color: #00000088"
              v-if="section.cover.header || section.cover.subHeader"
            >
              <div class="text-h6" v-if="section.cover.header">{{ section.cover.header }}</div>
              <div class="text-subtitle2" v-if="section.cover.subHeader">{{ section.cover.subHeader }}</div>
            </div>
          </q-parallax>
          <q-img
            v-if="section.cover && !section.cover.parallax && section.cover.backgroundImage"
            :height="section.cover.height"
            :src="section.cover.backgroundImage"
          >
            <div class="absolute-bottom" v-if="section.cover.header || section.cover.subHeader">
              <div class="text-h6">Our Changing Planet</div>
              <div class="text-subtitle2">by John Doe</div>
            </div>
          </q-img>
          <q-card-section>
            <block
              v-for = "(block, idx) in section.blocks"
              :key = "block.name || block.type + idx"
              :block-schema = "block"
            >
              <template v-slot:beforeblock="{blockSchema, el, hover}">
                <slot name="beforeblock" :blockSchema="blockSchema" :el="el" :hover="hover"></slot>
              </template>
            </block>
          </q-card-section>
        </q-card>
      </div>
    </q-form>
    <slot name="afterform"></slot>
    <div
      id="poweredBy"
      class="fixed-bottom-right q-ma-md"
      style="border: 1px solid #ccc;padding:8px;cursor:pointer;border-radius: 5px;box-shadow: 1px 1px 3px rgba(0,0,0,0.1);background-color:rgba(255,255,255,0.6);"
      @click="openTypefully"
    >
      <div class="q-mb-xs">Make your own form with</div>
      <q-img
        src="typefully-logo-black.svg"
        height="16px"
        fit="contain"
        class="float-right"
      ></q-img>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed, provide } from 'vue';
// import schema from '../sample';
import { openURL, QForm, QCard, QParallax,QImg, QCardSection } from 'quasar';
import Block from "./Block.vue";

export default defineComponent({
  name: 'TyFormViewer',
  components: {
    Block, QForm, QCard, QParallax,QImg, QCardSection
  },
  props: {
    formSchema: {
      type: Object,
      default: () => ({})
    }
  },
  setup (props) {
    // const formSchema = reactive(schema);
    const currentPage = ref(0);
    const page = computed(() => props.formSchema.pages[currentPage.value])
    provide('formSchema', props.formSchema);
    const wrapperStyle = computed(() => ({
      maxWidth: props.formSchema.theme.card.maxWidth + 'px',
      width: '100vw'
    }));
    const pageStyle = computed(() => ({
      backgroundColor: props.formSchema.theme.page.backgroundColor || "#fff",
      backgroundImage: props.formSchema.theme.page.backgroundImage ? `url("${props.formSchema.theme.page.backgroundImage}")` : null,
      backgroundSize: "cover",
      backgroundAttachment: "fixed"
    }))
    const cardStyle = computed(() =>({
      backgroundColor: props.formSchema.theme.card.backgroundColor || "#fff",
      backdropFilter: props.formSchema.theme.card.backdrop
    }))
    const openTypefully = () => openURL('https://typefully.io');
    return {
      wrapperStyle,
      pageStyle,
      cardStyle,
      openTypefully,
      currentPage,
      page
    }
  }
})
</script>

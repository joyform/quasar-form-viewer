<template>
  <div
      class="ty-block"
      style="position:relative"
      ref="el"
      @mouseover="hover = true"
      @mouseleave="hover = false"
  >
    <slot name="beforeblock" :blockSchema="blockSchema" :el="el" :hover="hover">
    </slot>
    <component
        :is = "'ty-' + blockSchema.type"
        v-bind="blockSchema"
        class="q-my-md"
    />
  </div>
</template>

<script>
import { defineAsyncComponent, ref } from 'vue';

export default {
  name: 'Block',
  components: {
    TyWizard: defineAsyncComponent(() => import('./blocks/Wizard.vue')),
    TySection: defineAsyncComponent(() => import('./blocks/Section.vue')),
    TyText: defineAsyncComponent(() => import('./blocks/TyInput.vue')),
    TyPassword: defineAsyncComponent(() => import('./blocks/TyInput.vue')),
    TyTextarea: defineAsyncComponent(() => import('./blocks/TyInput.vue')),
    TyEmail: defineAsyncComponent(() => import('./blocks/TyInput.vue')),
    TySearch: defineAsyncComponent(() => import('./blocks/TyInput.vue')),
    TyTel: defineAsyncComponent(() => import('./blocks/TyInput.vue')),
    TyNumber: defineAsyncComponent(() => import('./blocks/TyInput.vue')),
    TyUrl: defineAsyncComponent(() => import('./blocks/TyInput.vue')),
    TySelect: defineAsyncComponent(() => import('./blocks/TySelect.vue')),
    TySlider: defineAsyncComponent(() => import('./blocks/TySlider.vue')),
    TyCheckbox: defineAsyncComponent(() => import('./blocks/TyOptionGroup.vue')),
    TyRadio: defineAsyncComponent(() => import('./blocks/TyOptionGroup.vue')),
    TyToggle: defineAsyncComponent(() => import('./blocks/TyOptionGroup.vue')),
  },
  props: {
    blockSchema: Object
  },

  setup() {
    const el = ref(null);
    const hover = ref(false);
    return {
      el,
      hover
    }
  }
}
</script>




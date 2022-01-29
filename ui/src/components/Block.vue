<template>
  <div
      v-if="behavior.displayed"
      class="ty-block q-mt-lg"
      style="position:relative"
      ref="el"
      @mouseover="hover = true"
      @mouseleave="hover = false"
  >
    <slot name="beforeblock" :blockSchema="schema" :el="el" :hover="hover">
    </slot>
    <component
        :is = "'ty-' + schema.type"
        v-bind="schema"
        v-bind:behavior="behavior"
        class="q-my-md"
        v-model="modelValueRef"
        @update:model-value="onUpdate"
    />
  </div>
</template>

<script>
import { defineAsyncComponent, ref, reactive, computed } from 'vue';

export default {
  name: 'Block',
  components: {
    // TyWizard: defineAsyncComponent(() => import('./blocks/Wizard.vue')),
    // TySection: defineAsyncComponent(() => import('./blocks/Section.vue')),
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
    TyRating: defineAsyncComponent(() => import('./blocks/TyRating.vue')),
    TyCheckbox: defineAsyncComponent(() => import('./blocks/TyOptionGroup.vue')),
    TyRadio: defineAsyncComponent(() => import('./blocks/TyOptionGroup.vue')),
    TyToggle: defineAsyncComponent(() => import('./blocks/TyOptionGroup.vue')),
    TyHtml: defineAsyncComponent(() => import('./blocks/TyHtml.vue')),
    TyTitle: defineAsyncComponent(() => import('./blocks/TyTitle.vue')),
    TyDate: defineAsyncComponent(() => import('./blocks/TyDate.vue')),
    TySignature: defineAsyncComponent(() => import('./blocks/TySignature.vue')),
  },
  props: {
    blockSchema: Object,
    modelValue: [String, Boolean, Number, Array, Object]
  },
  emits: ['update:modelValue'],
  setup(props, {emit}) {
    const el = ref(null);
    const hover = ref(false);
    const schema = reactive(props.blockSchema)
    const modelValueRef = ref(props.modelValue)
    const behavior = computed(() => {
      return {
        readOnly: schema.behavior.readOnly === 'on',
        required: schema.behavior.required === 'on',
        clearable: schema.behavior.clearable === 'on', //TODO - or inherit from theme?
        disabled: schema.behavior.disabled === 'on',
        displayed: schema.behavior.displayed === 'on',
        counter: schema.behavior.counter === 'on',
        multiple: !!schema.behavior.multiple
      }
    })
    const onUpdate = (evt) => {
      emit('update:modelValue', evt)
    }
    return {
      el,
      hover,
      behavior,
      schema,
      modelValueRef,
      onUpdate
    }
  }
}
</script>




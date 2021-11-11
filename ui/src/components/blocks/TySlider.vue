<template>
  <div>
    <label>{{label}}</label>
      <component
        :is="range ? 'q-range' : 'q-slider' "
        :name = "name"
        :readonly = "!!behavior.readOnly"
        :disable = "!!behavior.disabled"
        :min = "min"
        :max = "max"
        :step = "step"
        :reverse = "reverse"
        :label = "showThumbLabel !== 'off'"
        :label-always = "showThumbLabel === 'always' "
        :label-value = "thumbLabelPrefix + val + thumbLabelSuffix"
        :left-label-value = "thumbLabelPrefix + val.min + thumbLabelSuffix"
        :right-label-value = "thumbLabelPrefix + val.max + thumbLabelSuffix"
        :snap = "snap"
        :markers = "markers"
        class="q-mt-lg"
        v-model = "val"
      >
      </component>
      <div class="text-caption q-ml-sm text-grey-8" v-if="!!hint">{{hint}}</div>
  </div>

</template>

<script>
import {inject, computed, ref } from 'vue';

export default {
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
      default: () => []
    },
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
      type: Number
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
    range: Boolean
  },
  setup (props) {
    const val = ref(props.defaultValue !== undefined ? props.defaultValue : (props.range ? {min:props.min, max:props.max} : 50));
    const formSchema = inject('formSchema');
    const id = computed(() => {
      return props.type + '_' + props.name
    });
    return {
      formSchema,
      id,
      val
    }
  }
}
</script>

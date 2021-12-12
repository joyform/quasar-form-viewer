<template>
  <div>
    <label :style="labelStyle" class="ty-label ty-label-top">{{label}}</label>
      <component
        :is="range ? 'q-range' : 'q-slider' "
        :name = "name"
        :readonly = "behavior.readOnly"
        :disable = "behavior.disabled"
        :min = "min"
        :max = "max"
        :step = "step"
        :reverse = "reverse"
        :label = "showThumbLabel !== 'off'"
        :label-always = "showThumbLabel === 'always' "
        :label-value = "thumbLabelPrefix + modelValueRef + thumbLabelSuffix"
        :left-label-value = "thumbLabelPrefix + modelValueRef.min + thumbLabelSuffix"
        :right-label-value = "thumbLabelPrefix + modelValueRef.max + thumbLabelSuffix"
        :snap = "snap"
        :markers = "markers"
        class="q-mt-lg"
        v-model = "modelValueRef"
        @update:model-value = "onUpdate"
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
    modelValue: [Number, Object]
  },
  setup (props, {emit}) {
    const formSchema = inject('formSchema');
    const modelValueRef = ref(props.modelValue)
    if (modelValueRef.value === null) {
      modelValueRef.value = props.defaultValue !== undefined ? props.defaultValue : (props.range ? {min:props.min, max:props.max} : 50)
    }
    const labelStyle = computed(() => {
      return {fontSize: `${(100 + formSchema.theme.inputs.labelSize)/100}em`}
    })
    const id = computed(() => {
      return props.type + '_' + props.name
    });
    const onUpdate = (evt) => {
      emit('update:modelValue', evt)
    }
    return {
      formSchema,
      labelStyle,
      id,
      modelValueRef,
      onUpdate
    }
  }
}
</script>

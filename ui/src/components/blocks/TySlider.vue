<template>
  <div>
    <label class="ty-label ty-label-top">{{label}}</label>
      <component
        :is="componentType"
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
        :left-label-value = "range ? thumbLabelPrefix + modelValueRef.min + thumbLabelSuffix : ''"
        :right-label-value = "range ? thumbLabelPrefix + modelValueRef.max + thumbLabelSuffix : ''"
        :snap = "snap"
        :markers = "markers"
        class="q-mt-lg"
        v-model = "modelValueRef"
        :dark="formSchema.theme.card.dark"
      >
      </component>
      <div :class="formSchema.theme.card.dark ?'text-white':'text-black'" class="ty-hint text-caption q-ml-sm" v-if="!!hint">{{hint}}</div>
  </div>

</template>

<script>
import {inject, computed, ref } from 'vue';
import {QRange} from 'quasar'
import {QSlider} from 'quasar'

export default {
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
    const formSchema = inject('formSchema');
    const modelValueRef = computed({
      get: () => {
        if (props.modelValue === null || props.modelValue === undefined) {
          return props.defaultValue !== undefined && props.defaultValue !== null ?
              props.defaultValue :
              (props.range ? {min:props.min || 0, max:props.max || 100} : 50)
        }
        return props.modelValue
      },
      set: val => {
        emit('update:modelValue', val)
      }
    })
    const id = computed(() => {
      return props.type + '_' + props.name
    });

    const componentType = computed(() => {
      if (props.range) {
        return QRange // 'q-range' //() => import('quasar').QRange
      }
      return QSlider // 'q-slider' //() => import('quasar').QSlider

    })
    return {
      componentType,
      formSchema,
      id,
      modelValueRef,
    }
  }
}
</script>

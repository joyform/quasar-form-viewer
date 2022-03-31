<template>
  <div>
    <label :for="id" v-if="formSchema.theme.inputs.labelStyle==='top'" class="ty-label ty-label-top">{{label}}</label>
    <q-input
      :label = "formSchema.theme.inputs.labelStyle !=='top' ? label : undefined"
      :outlined = "formSchema.theme.inputs.style==='full'"
      :borderless = "formSchema.theme.inputs.borderless"
      :stack-label = "formSchema.theme.inputs.labelStyle==='stacked'"
      :input-style = "inputStyle"
      :dark = "formSchema.theme.inputs.darkMode"
      :dense = "formSchema.theme.inputs.dense"
      :clearable = "behavior.clearable"
      :counter = "behavior.counter"
      :placeholder = "placeholder"
      :for = "id"
      :name = "name"
      :readonly = "behavior.readOnly"
      :disable = "behavior.disabled"
      :type = "type"
      :mask="mask"
      :fill-mask="fillMask"
      v-model = "modelValueRef"
      class = "ty-input"
      bottom-slots
    >
      <template v-slot:append>
        <slot name="append"></slot>
      </template>
      <template v-slot:hint>
        <div class="ty-hint" :class="formSchema.theme.card.dark ?'text-white':'text-black'">{{hint}}</div>
      </template>
    </q-input>
  </div>

</template>

<script>
import { inject, computed, ref, watch } from 'vue';

export default {
  name: 'TyInput',
  components: {
  },
  props: {
    type: {
      type: String,
      required: true,
      validator(value) {
        // The value must match one of these strings
        return ['text', 'password', 'textarea', 'email', 'search', 'tel', 'number', 'url', 'time', 'date'].includes(value)
      }
    },
    name: {
      type: String,
      required: true
    },
    fillMask: Boolean,
    label: String,
    hint: String,
    placeholder: String,
    behavior: {
      type: Object, /* readOnly, clearable, disabled, displayed, counter */
      default: () => ({})
    },
    modelValue: String,
    mask: String
  },
  emits: ['update:modelValue'],
  setup (props, {emit}) {
    const formSchema = inject('formSchema');
    // const formData = inject('formData');
    const modelValueRef = computed({
      get: () => props.modelValue,
      set: (val) => {emit('update:modelValue', val)}
    })
    // const value = ref(formData[props.name]);
    const inputStyle = computed(() => {
      return {color: formSchema.value.theme.inputs.textColor ? formSchema.value.theme.inputs.textColor : undefined}
    })
    const id = computed(() => {
      return props.type + '_' + props.name
    });
    return {
      formSchema,
      id,
      // value,
      modelValueRef,
      inputStyle,
      // valueUpdated,
      // onUpdate
    }
  }
}
</script>

<template>
  <div>
    <label :for="id" v-if="formSchema.theme.inputs.labelStyle==='top'" :style="labelStyle" class="ty-label ty-label-top">{{label}}</label>
    <q-input
      :label = "formSchema.theme.inputs.labelStyle !=='top' ? label : undefined"
      :outlined = "formSchema.theme.inputs.style==='full'"
      :borderless = "formSchema.theme.inputs.borderless"
      :stack-label = "formSchema.theme.inputs.labelStyle==='stacked'"
      :input-style = "inputStyle"
      :dark = "formSchema.theme.inputs.darkMode"
      :dense = "formSchema.theme.inputs.dense"
      :clearable = "behavior.clearable"
      :hint = "hint"
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
    >
      <template v-slot:append>
        <slot name="append"></slot>
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
    const labelStyle = computed(() => {
      return {fontSize: `${(100 + formSchema.value.theme.inputs.labelSize)/100}em`}
    })
    const inputStyle = computed(() => {
      return {color: formSchema.value.theme.inputs.textColor ? formSchema.value.theme.inputs.textColor : undefined}
    })
    const id = computed(() => {
      return props.type + '_' + props.name
    });
    return {
      formSchema,
      labelStyle,
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
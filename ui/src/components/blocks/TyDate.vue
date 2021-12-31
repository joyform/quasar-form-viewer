<template>
  <TyInput
    v-bind="inputModel"
    v-model = "inputModelValue"
  >
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
          <q-date
              v-model="pickerModelValue"
              mask="DD/MM/YYYY"
              :range="range"
          >
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
  </TyInput>
</template>

<script>
import { inject, computed, ref, watch } from 'vue';
import TyInput from './TyInput'

export default {
  name: 'TyDate',
  components: {
    TyInput
  },
  props: {
    type: {
      type: String,
      required: true,
      validator(value) {
        // The value must match one of these strings
        return value === 'date'
      }
    },
    name: {
      type: String,
      required: true
    },
    label: String,
    hint: String,
    placeholder: String,
    behavior: {
      type: Object, /* readOnly, clearable, disabled, displayed, counter */
      default: () => ({})
    },
    modelValue: [String, Object],
    range: Boolean
  },
  emits: ['update:modelValue'],
  setup (props, {emit}) {
    const inputModel = computed(() => ({
      type: 'text',
      mask: props.range ? '##/##/#### - ##/##/####' : '##/##/####',
      label: props.label,
      name: props.name,
      hint: props.hint,
      placeholder: props.placeholder,
      behavior: props.behavior,
      fillMask: true
    }))
    const formSchema = inject('formSchema');
    const pickerModelValue = computed({
      get: () => {
        return props.modelValue
      },
      set: (val) => {emit('update:modelValue', val)}
    })
    const inputModelValue = computed({
      get: () => {
        if (typeof props.modelValue === 'string') {
          return props.modelValue
        }
        const mask = '__/__/____'
        return ((props.modelValue && props.modelValue.from) || mask) + ' - ' + ((props.modelValue && props.modelValue.to) || mask)
      },
      set: (val) => {
        const [from, to] = val.split('-').map(v => v.trim())
        emit('update:modelValue', {from, to})
      }
    })
    return {
      inputModel,
      formSchema,
      inputModelValue,
      pickerModelValue
    }
  }
}
</script>
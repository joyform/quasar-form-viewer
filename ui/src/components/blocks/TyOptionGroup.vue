<template>
  <div>
    <label class="ty-label ty-label-top">{{label}}</label>
    <q-option-group
      :name = "name"
      :type = "type"
      :readonly = "behavior.readOnly"
      :disable = "behavior.disabled"
      :left-label = "labelSide === 'left'"
      :inline = "inline"
      v-model = "modelValueRef"
      @update:model-value = "onUpdate"
      :options = "optionList"
    >
    </q-option-group>
    <div class="text-caption q-ml-sm text-grey-8" v-if="!!hint">{{hint}}</div>
<!--    </q-field>-->
  </div>

</template>

<script>
import { inject, computed, ref } from 'vue';

export default {
  name: 'TyOptionGroup',
  components: {
  },
  props: {
    type: {
      type: String,
      required: true,
      validator(value) {
        return ['radio', 'checkbox', 'toggle'].includes(value)
      }
    },
    name: {
      type: String,
      required: true
    },
    label: String,
    labelSide: {
      type: String,
      default: "right",
      validator(value) {
        return ['left', 'right'].includes(value)
      }
    },
    inline: Boolean,
    options: {
      type: Array,
      default: () => []
    },
    hint: String,
    behavior: {
      type: Object, /* readOnly, clearable, disabled, displayed, counter */
      default: () => ({})
    },
    modelValue: [String, Array]
  },
  emits: ['update:modelValue'],
  setup (props, {emit}) {
    const modelValueRef = ref(props.modelValue)
    if (modelValueRef.value === null && props.type!=='radio') {
      modelValueRef.value = []
    }
    const optionList = computed(() => {
      return props.options.map(o => ({label:o.label, value:o.value || o.label}))
    })
    const onUpdate = (evt) => {
      emit('update:modelValue', evt)
    }
    return {
      modelValueRef,
      optionList,
      onUpdate
    }
  }
}
</script>

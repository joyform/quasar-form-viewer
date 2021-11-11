<template>
  <div>
    <label :for="id" v-if="formSchema.theme.inputs.labelStyle==='top'">{{label}}</label>
    <q-select
      :filled = "formSchema.theme.inputs.filled"
      :label = "formSchema.theme.inputs.labelStyle !=='top' ? label : undefined"
      :rounded = "formSchema.theme.inputs.rounded"
      :outlined = "formSchema.theme.inputs.outlined"
      :borderless = "formSchema.theme.inputs.borderless"
      :square = "formSchema.theme.inputs.square"
      :stack-label = "formSchema.theme.inputs.labelStyle==='stacked'"
      :dense = "formSchema.theme.inputs.dense"
      :clearable = "formSchema.theme.inputs.clearable || behavior && behavior.clearable"
      :hint = "hint"
      :counter = "!!behavior.counter"
      :placeholder = "placeholder"
      :for = "id"
      :readonly = "!!behavior.readOnly"
      :disable = "!!behavior.disabled"
      v-model = "val"
      :options = "options"
      :multiple = "!!behavior.multiple"
      :use-chips = "!!behavior.multiple"
      :name = "name"
      transition-show="scale"
      transition-hide="scale"
    >
    </q-select>
  </div>

</template>

<script>
import { inject, computed, ref } from 'vue';

export default {
  name: 'TySelect',
  components: {
  },
  props: {
    type: {
      type: String /* select */
    },
    name: {
      type: String,
      required: true
    },
    label: String,
    hint: String,
    placeholder: String,
    validations: {
      type: Array,
      default: () => []
    },
    behavior: {
      type: Object, /* readOnly, clearable, disabled, displayed, counter */
      default: () => ({})
    },
    options: {
      type: Array,
      default: () => []
    },
  },
  setup (props) {
    const val = ref(null);
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

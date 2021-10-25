<template>
  <div>
    <label>{{label}}</label>
      <q-option-group
        :name = "name"
        :type = "type"
        :readonly = "!!behavior.readOnly"
        :disable = "!!behavior.disabled"
        :left-label = "labelSide === 'left'"
        :inline = "inline"
        v-model = "val"
        :options = "options"
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
    validations: {
      type: Array,
      default: () => []
    },
    behavior: {
      type: Object, /* readOnly, clearable, disabled, displayed, counter */
      default: () => ({})
    }
  },
  setup (props) {
    const val = ref(props.type === 'radio' ? null : []);
    const formSchema = inject('formSchema');
    return {
      formSchema,
      val
    }
  }
}
</script>

<template>
  <div v-html="refHtml">
  </div>
</template>

<script>
import { inject, computed, ref } from 'vue';

export default {
  name: 'TyHtml',
  components: {
  },
  props: {
    type: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    html: String,
    behavior: {
      type: Object, /* readOnly, clearable, disabled, displayed, counter */
      default: () => ({})
    },
  },
  setup (props) {
    const refHtml = ref(props.html)
    const id = computed(() => {
      return props.type + '_' + props.name
    });
    return {
      id,
      refHtml
    }
  }
}
</script>
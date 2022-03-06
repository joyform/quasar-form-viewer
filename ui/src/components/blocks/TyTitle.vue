<template>
  <div>
    <p
        v-for="(title, idx) in titles"
        :key="title.size+'_'+idx"
        :class="['text-'+title.size||'h3', 'q-py-'+(title.padding||'md'), 'text-'+title.align||'left']"
        :style="{color:(title.color || '#000000')}"
        v-html="escape(title.text)"
    ></p>
  </div>
</template>

<script>
import { inject, computed, ref } from 'vue';

export default {
  name: 'TyTitle',
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
    titles: {
      type: Array,
      default: () => ([])
    },
    behavior: {
      type: Object, /* readOnly, clearable, disabled, displayed, counter */
      default: () => ({})
    },
  },
  setup (props) {
    const id = computed(() => {
      return props.type + '_' + props.name
    });
    const escape = (text) => {
      function replaceMultiple(text, characters){
        for (const [i, each] of characters.entries()) {
          const previousChar = Object.keys(each);
          const newChar = Object.values(each);

          text = text.replaceAll(previousChar, newChar);
        }

        return text
      }
      const characters = [
        {'&': '&amp'},
        {'<': '&lt'},
        {'>': '&gt'},
        {'"': '&quot'},
        {'\'': '&#39'},
        {'\n': '<br>'}
      ]
      return replaceMultiple(text, characters)
    }
    return {
      id,
      escape
    }
  }
}
</script>
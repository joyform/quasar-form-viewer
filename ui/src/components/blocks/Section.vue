<template>
  <div class="ty-section" :id="name">
    <p class="text-subtitle1" v-if="!!header">{{header}}</p>
    <p class="text-caption" v-if="!!subHeader">{{subHeader}}</p>
    <block
      v-for = "block in blocks"
      :key = "block.name"
      :block-schema = "block"
    >
      <template v-slot:beforeblock="{blockSchema, el, hover}">
        <slot name="beforeblock" :blockSchema="blockSchema" :el="el" :hover="hover"></slot>
      </template>
    </block>
  </div>
</template>

<script>
import Block from '../Block.vue'

export default {
  name: 'Section',
  components: {
    Block
  },
  props: {
    name: String,
    header: String,
    subHeader: String,
    blocks: Array
  },
  setup (props) {
    return {
    }
  }
}
</script>

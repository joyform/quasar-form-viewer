<template>
  <q-page class="">
    <ty-form-viewer :formSchema="formSchema" >
    </ty-form-viewer>
  </q-page>
</template>

<style lang="sass" scoped>
.directive-target
  width: 50px
  height: 50px
</style>

<script>

import {defineComponent} from 'vue';
import formSchema from "./formschema";

export default defineComponent({
  name: 'Test5',
  setup() {
    formSchema.theme.card.cover.position = 'left'
    return {
      formSchema
    }
  }
})
</script>

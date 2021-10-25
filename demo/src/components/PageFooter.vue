<template>
  <q-card class="no-shadow bg-transparent q-mt-md no-border">
    <q-card-section class="text-center">
      <q-btn type="a" rounded dense href="https://github.com/typefullyio/quasar-app-extension-tyformviewer" target="__blank" size="md"
             icon="fab fa-github" flat color="primary"></q-btn>
    </q-card-section>
    <q-card-section class="text-center q-pb-none">
      <div class="full-width row justify-center items-center q-my-sm">
        <p class="markdown-copyright">CC-BY / MIT License | Copyright &copy; 2020 - {{ year }} Dan Bar-Shalom</p>
      </div>
    </q-card-section>
    <q-card-section class="text-center q-pt-none">
      <a href="https://www.netlify.com" class="row justify-center">
        <img src="https://www.netlify.com/img/global/badges/netlify-color-accent.svg" alt="Deploys by Netlify"/>
      </a>
    </q-card-section>
  </q-card>
</template>

<script>
import {defineComponent, ref} from 'vue'

const year = (new Date()).getFullYear()

import {
  mdiCharity
} from '@quasar/extras/mdi-v5'

export default defineComponent({
  name: "PageFooter",
  setup() {
    return {
      year,
      mdiCharity
    }
  }
})
</script>

<style scoped>

</style>

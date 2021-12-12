<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { version } from 'ui' // "ui" is aliased in quasar.conf.js

export default {
  name: 'MyLayout',

  setup () {
    return {
      version
    }
  }
}
</script>

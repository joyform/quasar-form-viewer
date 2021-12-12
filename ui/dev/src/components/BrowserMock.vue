<template>
  <q-card class="mock full-width full-height " :class="{fullscreen: fullscreen, 'browser-mock':!fullscreen}">
    <q-card-section class="bg-grey-4 browser-header q-pa-none" >
      <q-toolbar>
        <q-btn dense flat round icon="lens" size="8.5px" color="red" />
        <q-btn dense flat round icon="lens" size="8.5px" color="yellow-9" />
        <q-btn dense flat round icon="lens" size="8.5px" color="green" />
        <q-space></q-space>
        <q-btn unelevated round :icon="fullscreen ? 'close_fullscreen' : 'open_in_full'" @click="fullscreen=!fullscreen"></q-btn>
      </q-toolbar>
    </q-card-section>

    <q-separator />

    <q-card-section class="browser-preview q-pa-none">
      <div class="content-wrapper fit">
        <slot></slot>
      </div>
    </q-card-section>
  </q-card>
</template>

<style scoped>
.mock {
  z-index: 200;
}

.browser-mock {
  height: calc(100% - 80px);
  min-height: 400px
}
.browser-preview {
  overflow: scroll;
  height: calc(100% - 50px)
}
.browser-header {
  height: 50px;
}
.browser-preview .content-wrapper {
}
</style>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'BrowserMock',
  setup() {
    return {
      fullscreen: ref(false)
    }
  }
});
</script>

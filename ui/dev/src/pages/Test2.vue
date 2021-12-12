<template>
  <q-page class="flex flexgrow">
    <div class="q-pa-none q-ma-none flexgrow preview-panel">
      <div class="q-pa-lg mock-container flexgrow">
        <transition name="slide-fade">
          <browser-mock>
            <ty-form-viewer :formSchema="formSchema" embedded >
            </ty-form-viewer>
          </browser-mock>
        </transition>
      </div>
    </div>
  </q-page>
</template>


<script>

import {defineComponent} from 'vue';
import formSchema from "./formschema";
import BrowserMock from "../components/BrowserMock";

export default defineComponent({
  name: 'Test2',
  components: {
    BrowserMock
  },
  setup() {
    return {
      formSchema
    }
  }
})
</script>

<style>
.flexgrow {
  flex-grow: 1!important;
}
</style>
<style lang="scss" scoped>
.preview-panel {
  background-color: #eff4f9;
}

.phone-mock {
  left: calc(50% - 160px);
  position: absolute;
}
.mock-container {
  height: 100%;
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(30px);
  opacity: 0;
}
</style>

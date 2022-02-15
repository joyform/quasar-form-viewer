<template>
  <q-page class="bg-orange-4">
    <q-card
      class=""
      style="width: calc(100vw - 300px); height: calc(100vh - 160px);right:80px;position:absolute;top:50%;transform:translateY(-50%);border-radius: 15px;"
    >
      <q-card-section horizontal class="full-height" style="">
        <q-card-section class="col-6 full-height q-pa-none">
          <q-img class="" style="margin:60px 80px;width:100%;height:calc(100% - 120px);left:-140px;border-radius: 15px;" src="https://images.unsplash.com/photo-1550131694-39660c169871?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"></q-img>
        </q-card-section>
        <q-card-section class="col-6 bg-grey-2 full-height">

        </q-card-section>
      </q-card-section>
    </q-card>
<!--    <ty-form-viewer :formSchema="formSchema" >-->
<!--    </ty-form-viewer>-->
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
  name: 'Test4',
  setup() {
    return {
      formSchema
    }
  }
})
</script>

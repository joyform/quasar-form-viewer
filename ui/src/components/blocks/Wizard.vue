<template>
  <q-stepper
    v-model="currentStep"
    ref="stepper"
    animated
    flat
    class="bg-transparent"
  >
    <q-step
      v-for = "(step, idx) in steps"
      :key = "step.name || '' + idx "
      :name = "idx"
      :title = "step.title"
      :caption = "step.caption"
    >
      <block
        v-for = "block in step.blocks"
        :key = "block.name"
        :block-schema = "block"
      >
        <template v-slot:beforeblock="{blockSchema, el, hover}">
          <slot name="beforeblock" :blockSchema="blockSchema" :el="el" :hover="hover"></slot>
        </template>
      </block>
      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn @click="$refs.stepper.next()" :label="step.nextLabel || idx === steps.length-1 ? 'Finish' : 'Continue'" />
          <q-btn v-if="currentStep > 0" flat @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </template>
    </q-step>
  </q-stepper>
</template>

<script>
import { ref } from 'vue';
import Block from '../Block.vue'
import { QStepper, QStep, QBtn, QStepperNavigation } from 'quasar'

export default {
  name: 'Wizard',
  components: {
    Block,
    QStepper, QStep, QBtn, QStepperNavigation
  },
  props: {
    steps: Array
  },
  setup (props) {
    const currentStep = ref(0);
    return {
      currentStep
    }
  }
}
</script>

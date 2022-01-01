<template>
  <div class="ty-signature">
    <label :style="labelStyle" class="ty-label ty-label-top">{{label}}</label>
    <div class="text-caption q-ml-sm text-grey-8" v-if="!!hint">{{hint}}</div>
    <vue-signature
        ref="signaturePad"
        :options="{ onUpdate }"
        height="250px"
    ></vue-signature>
    <div class="buttons-wrapper q-mt-sm">
<!--      <q-btn unelevated color="grey-4" text-color="grey-9" class="q-mr-md" @click="save">Save</q-btn>-->
      <q-btn unelevated color="grey-4" text-color="grey-9" class="q-mr-md" @click="undo">Undo</q-btn>
      <q-btn unelevated color="grey-4" text-color="grey-9" class="q-mr-md" @click="clear">Clear</q-btn>
    </div>
  </div>

</template>

<script>
import {inject, computed, ref } from 'vue';
import VueSignature  from '../VueSignaturePad.vue'

export default {
  name: 'TySignature',
  components: {
    VueSignature
  },
  props: {
    type: {
      type: String, /* slider */
      required: true
    },
    name: {
      type: String,
      required: true
    },
    label: String,
    hint: String,
    behavior: {
      type: Object, /* readOnly, clearable, disabled, displayed, counter */
      default: () => ({})
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 1
    },
    defaultValue: {
      type: [Number, Object]
    },
    modelValue: {
      type: String
    }
  },
  setup (props, {emit}) {
    const formSchema = inject('formSchema');
    const labelStyle = computed(() => {
      return {fontSize: `${(100 + formSchema.theme.inputs.labelSize)/100}em`}
    })
    const id = computed(() => {
      return props.type + '_' + props.name
    });
    const signaturePad = ref(null)
    const undo = () => {
      signaturePad.value.undoSignature();
    }
    // const save = () => {
    //   const { isEmpty, data } = signaturePad.value.saveSignature();
    //   console.log('isEmpty', isEmpty);
    //   console.log('data', data);
    //   emit("input",data)
    // }
    const clear = () => {
      signaturePad.value.clearSignature();
    }
    const onUpdate = () => {
      const { data } = signaturePad.value.saveSignature();
      emit('update:modelValue', data)
    }
    return {
      undo,
      // save,
      clear,
      onUpdate,
      signaturePad,
      formSchema,
      labelStyle,
      id,
    }
  }
}
</script>

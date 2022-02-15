<template>
  <div class="col ty-rating">
    <label class="ty-label ty-label-top" style="display: block">{{label}}</label>
    <q-rating
        :name = "name"
        :readonly = "behavior.readOnly"
        :disable = "behavior.disabled"
        class="q-mt-md full-width"
        v-model = "modelValueComputed"
        :size = "sizeComputed"
        :icon = "iconProps.icon"
        :icon-selected = "iconProps.iconSelected"
        :no-dimming = "iconProps.noDimming"
        :max = "maxComputed"
    >
<!--      @update:model-value = "onUpdate"-->
    </q-rating>
    <div class="text-caption q-ml-sm text-grey-8" v-if="!!hint">{{hint}}</div>
  </div>

</template>

<script>
import {inject, computed, ref } from 'vue';

export default {
  name: 'TyRating',
  components: {
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
    size: {
      String
    },
    behavior: {
      type: Object, /* readOnly, clearable, disabled, displayed, counter */
      default: () => ({})
    },
    defaultValue: Number,
    shape: {
      type: String,
      validator(value) {
        return ['heart', 'star', 'thumb', 'battery', 'dice', 'emoji', 'gem', 'bulb', 'lemon', 'moon', 'sun', 'hand-spock', 'numeric'].includes(value)
      }
    },
    max: {
      type: Number,
      validator(value) {
        return value >= 2 & value <= 14
      }
    },
    modelValue: {
      type: Number
    }
  },
  setup (props, {emit}) {
    const formSchema = inject('formSchema');
    const modelValueComputed = computed({
      get: () => {
        if (props.modelValue === null || props.modelValue === undefined) {
          return props.defaultValue !== undefined && props.defaultValue !== null ?
              props.defaultValue :
              0
        }
        return props.modelValue
      },
      set: val => {
        emit('update:modelValue', val)
      }
    })
    const id = computed(() => {
      return props.type + '_' + props.name
    });
    const sizeComputed = computed(() => {
      return props.size || '2em'
    })
    const maxComputed = computed(() => {
      return props.max || 5
    })
    const iconProps = computed(() => {
      return {
        heart: {
          icon: 'far fa-heart',
          iconSelected: 'fas fa-heart',
          noDimming: true
        },
        star: {
          icon: 'far fa-star',
          iconSelected: 'fas fa-star',
          noDimming: true
        },
        thumb: {
          icon: 'far fa-thumbs-up',
          iconSelected: 'fas fa-thumbs-up',
          noDimming: true
        },
        battery: {
          icon: ['fas fa-battery-empty', 'fas fa-battery-quarter', 'fas fa-battery-half', 'fas fa-battery-three-quarters', 'fas fa-battery-full'],
          noDimming: false
        },
        dice: {
          icon: ['fas fa-dice-one','fas fa-dice-two','fas fa-dice-three','fas fa-dice-four','fas fa-dice-five','fas fa-dice-six'],
          noDimming: false
        },
        emoji: {
          icon: ['far fa-sad-tear', 'far fa-frown-open', 'far fa-meh', 'far fa-grin-alt', 'far fa-grin-stars'],
          iconSelected: ['fas fa-sad-tear', 'fas fa-frown-open', 'fas fa-meh', 'fas fa-grin-alt', 'fas fa-grin-stars'],
          noDimming: true
        },
        gem: {
          icon: 'far fa-gem',
          iconSelected: 'fas fa-gem',
          noDimming: false
        },
        bulb: {
          icon: 'far fa-lightbulb',
          iconSelected: 'fas fa-lightbulb',
          noDimming: true
        },
        lemon: {
          icon: 'far fa-lemon',
          iconSelected: 'fas fa-lemon',
          noDimming: true
        },
        moon: {
          icon: 'far fa-moon',
          iconSelected: 'fas fa-moon',
          noDimming: true
        },
        sun: {
          icon: 'far fa-sun',
          iconSelected: 'fas fa-sun',
          noDimming: true
        },
        'hand-spock': {
          icon: 'far fa-hand-spock',
          iconSelected: 'fas fa-hand-spock',
          noDimming: true
        },
        numeric: {
          icon: ['mdi-number-1-box-outline'],
          iconSelected: ['mdi-number-1-box'],
          noDimming: true
        },
      }[props.shape || 'star']
    })
    return {
      id,
      modelValueComputed,
      sizeComputed,
      maxComputed,
      iconProps
    }
  }
}
</script>

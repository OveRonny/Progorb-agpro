<script setup>
import { ref, watch, onMounted } from 'vue'
import { useUnitStore } from '../features/products/unitStore'

const props = defineProps({
  modelValue: String,
  placeholder: { type: String, default: 'Velg enhet' }
})

const emit = defineEmits(['update:modelValue'])

const unitStore = useUnitStore()
const selected = ref(props.modelValue)

watch(selected, val => emit('update:modelValue', val))
watch(() => props.modelValue, val => selected.value = val)

onMounted(() => {
  if (unitStore.units.length === 0) {
    unitStore.fetchUnits()
  }
})
</script>

<template>
  
    <select v-model="selected" class="input">
      <option value="" disabled>{{ placeholder }}</option>
      <option v-for="unit in unitStore.units" :key="unit" :value="unit">
        {{ unit }}
      </option>
    </select>  

</template>
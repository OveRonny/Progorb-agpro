<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: [String, Number], 
  productTypes: { type: Array, default: () => [] },
  placeholder: { type: String, default: 'Velg produkt type' }
})

const emit = defineEmits(['update:modelValue'])

const selected = ref(props.modelValue)


watch(selected, (val) => {
  emit('update:modelValue', val)
})

watch(() => props.modelValue, (val) => {
  selected.value = val
})
</script>

<template>
  <select v-model="selected" class="input">
    <option value="" disabled>{{ placeholder }}</option>
    <option v-for="type in productTypes" :key="type.id" :value="type.id">
      {{ type.name }}
    </option>
  </select>
</template>
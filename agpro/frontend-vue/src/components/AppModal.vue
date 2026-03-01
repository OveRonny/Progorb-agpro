<script setup>
import { useModalStore } from '@/shared/stores/modal.store'
import { storeToRefs } from 'pinia'

const modalStore = useModalStore()
const { isOpen, title, message, payload } = storeToRefs(modalStore)
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
    <div class="bg-gray-900 text-white p-6 rounded-xl w-full max-w-md shadow-xl">
      <h2 class="text-xl font-bold mb-4">{{ title }}</h2>
      <p class="mb-4">{{ message }}</p>

      <div v-if="payload" class="bg-gray-800 p-3 rounded mb-4 text-sm">
        <p><strong>ID:</strong> {{ payload.id }}</p>
        <p><strong>Navn:</strong> {{ payload.name }}</p>
      </div>

      <div class="flex justify-end">
        <button
          @click="modalStore.close"
          class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
        >
          OK
        </button>
      </div>
    </div>
  </div>
</template>
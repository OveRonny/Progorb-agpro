import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useModalStore = defineStore('modal', () => {
  const isOpen = ref(false)
  const title = ref('')
  const message = ref('')
  const payload = ref(null)

  const open = (modalTitle, modalMessage, data = null) => {
    title.value = modalTitle
    message.value = modalMessage
    payload.value = data
    isOpen.value = true
  }

  const close = () => {
    isOpen.value = false
    title.value = ''
    message.value = ''
    payload.value = null
  }

  return { isOpen, title, message, payload, open, close }
})
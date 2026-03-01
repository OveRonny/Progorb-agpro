import { defineStore } from 'pinia'
import { ref } from 'vue'
import { unitApi } from '../products/unitApi'

export const useUnitStore = defineStore('units', () => {
  const units = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchUnits = async () => {
    loading.value = true
    error.value = null
    try {
      const res = await unitApi.getAll()
      units.value = res.data    
    } catch (err) {
      error.value = err.message || 'Kunne ikke hente units'
    } finally {
      loading.value = false
    }
  }

  return { units, loading, error, fetchUnits }
})
import {
  defineStore
} from 'pinia'
import {
  ref
} from 'vue'
import {
  customerApi
} from './api'

export const useCustomerStore = defineStore('customers', () => {
  const customers = ref([])
  const loading = ref(false)
  const error = ref(null)


  const fetchCustomers = async () => {
    loading.value = true
    error.value = null
    try {
      const res = await customerApi.getAll()
      customers.value = res.data
    } catch (err) {
      error.value = err.message || 'Noe gikk galt'
    } finally {
      loading.value = false
    }
  }

  const getCustomerById = async (id) => {
    loading.value = true
    error.value = null
    try {
      const res = await customerApi.getById(id)
      return res.data
    } catch (err) {
      error.value = err.message || 'Kunne ikke hente kunden'
    } finally {
      loading.value = false
    }
  }

  const addCustomer = async (customer) => {
    loading.value = true
    error.value = null
    try {
      const res = await customerApi.create(customer)
      customers.value.push(res.data)
    } catch (err) {
      error.value = err.message || 'Noe gikk galt'
    } finally {
      loading.value = false
    }
  }

  const updateCustomer = async (id, customer) => {
    loading.value = true
    error.value = null
    try {
      const res = await customerApi.update(id, customer)
      const index = customers.value.findIndex(c => c.id === id)
      if (index !== -1) customers.value[index] = res.data
    } catch (err) {
      error.value = err.message || 'Feil ved oppdatering'
    } finally {
      loading.value = false
    }
  }

  const deleteCustomer = async (id) => {
    loading.value = true
    error.value = null
    try {
      await customerApi.delete(id)
      customers.value = customers.value.filter(c => c.id !== id)
    } catch (err) {
      error.value = err.message || 'Feil ved sletting'
    } finally {
      loading.value = false
    }
  }

  return {
    customers,
    loading,
    error,
    fetchCustomers,
    getCustomerById,
    addCustomer,
    updateCustomer,
    deleteCustomer
  }
})
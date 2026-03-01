<script setup>
import { onMounted, ref } from 'vue'
import { useCustomerStore } from '../store'
import { storeToRefs } from 'pinia'
import CustomerForm from '../components/CustomerForm.vue'
import CustomersTable from '../components/CustomersTable.vue'

const customerStore = useCustomerStore()
const { customers, loading, error } = storeToRefs(customerStore)

const form = ref(null)

onMounted(() => {
  customerStore.fetchCustomers()
})

const handleEdit = (customer) => {
  if (!form.value) return
  form.value.editCustomer(customer)
}

const handleDelete = async (customer) => {
  if (!confirm(`Er du sikker på at du vil slette ${customer.isPerson ? customer.firstName : customer.companyName}?`)) return

  await customerStore.deleteCustomer(customer.id)
}
</script>
<template>
  <div class="min-h-screen bg-gray-950 text-white p-4 md:p-8">
    <header class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <h1 class="text-3xl font-bold">Kunder</h1>
      <button @click="refresh" class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition">
        Oppdater
      </button>
    </header>

    <div class="flex flex-col gap-8">
      <CustomerForm ref="form" />
      <CustomersTable :customers="customers" @delete="handleDelete" @edit="handleEdit" />
    </div>
  </div>
</template>
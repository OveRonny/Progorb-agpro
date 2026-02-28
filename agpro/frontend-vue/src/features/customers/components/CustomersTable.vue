<template>
    <div class="overflow-x-auto bg-gray-900 rounded-2xl p-4 border border-gray-800 shadow-xl">
        <h2 class="text-xl font-bold text-white mb-4">Kundeliste</h2>

        <table class="min-w-full divide-y divide-gray-700">
            <thead class="bg-gray-800">
                <tr>
                    <th class="px-4 py-2 text-left text-white">Navn / Firma</th>
                    <th class="px-4 py-2 text-left text-white">Email</th>
                    <th class="px-4 py-2 text-left text-white">Telefon</th>
                    <th class="px-4 py-2 text-left text-white">Adresse</th>
                    <th class="px-4 py-2 text-left text-white">Handling</th>
                </tr>
            </thead>

            <tbody class="divide-y divide-gray-700">
                <tr v-for="customer in customers" :key="customer.id" class="hover:bg-gray-800">
                    <td class="px-4 py-2">
                        {{ customer.isPerson ? customer.firstName + ' ' + customer.lastName : customer.companyName }}
                    </td>
                    <td class="px-4 py-2">{{ customer.email }}</td>
                    <td class="px-4 py-2">{{ customer.phone }}</td>
                    <td class="px-4 py-2">{{ customer.billingAddress }}, {{ customer.billingPostal }} {{
                        customer.billingCity }}</td>
                    <td class="px-4 py-2">
                        <button @click="$emit('edit', customer)"
                            class="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-white">
                            Edit
                        </button>
                          <button @click="$emit('delete', customer)"
                            class="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white ml-3">
                            delete
                        </button>
                    </td>                
                </tr>
            </tbody>
        </table>

        <p v-if="customers.length === 0" class="text-gray-400 mt-4 text-center">Ingen kunder</p>
    </div>
</template>

<script setup>
import { useCustomerStore } from '../store'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const customerStore = useCustomerStore()
const { customers, loading, error } = storeToRefs(customerStore)

onMounted(() => {
    customerStore.fetchCustomers()
})
</script>
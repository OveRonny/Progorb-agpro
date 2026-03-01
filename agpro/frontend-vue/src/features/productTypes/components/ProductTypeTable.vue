<template>
    <div class="overflow-x-auto bg-gray-900 rounded-2xl p-4 border border-gray-800 shadow-xl">
        <table class="min-w-full divide-y divide-gray-700">
            <thead class="bg-gray-800">
                <tr>
                    <th class="px-4 py-2 text-left text-white">ID</th>
                    <th class="px-4 py-2 text-left text-white">Produkt type</th>
                    <th class="px-4 py-2 text-left text-white">Handling</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-700">
                <tr v-for="productType in productTypes" :key="productType.id" class="hover:bg-gray-800">
                    <td class="px-4 py-2">
                        {{ productType.id }}
                    </td>
                    <td class="px-4 py-2">
                        {{ productType.name }}
                    </td>
                       <td class="px-4 py-2">
                        <button @click="$emit('edit', productType)"
                            class="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-white">
                            Edit
                        </button>
                          <button @click="$emit('delete', productType)"
                            class="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white ml-3">
                            delete
                        </button>
                    </td>  
                </tr>
            </tbody>
        </table>
        <p v-if="productTypes.length === 0" class="text-gray-400 mt-4 text-center">Ingen produkt typer</p>
    </div>
</template>

<script setup>
import { useProductTypeStore } from '../store';
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const productTypeStore = useProductTypeStore()
const { productTypes, loading, error } = storeToRefs(productTypeStore)

onMounted(() => {
    productTypeStore.fetchProductTypes()
})


</script>
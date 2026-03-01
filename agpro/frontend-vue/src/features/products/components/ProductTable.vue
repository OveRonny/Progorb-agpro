<template>
    <div class="overflow-x-auto bg-gray-900 rounded-2xl p-4 border border-gray-800 shadow-xl">
        <h2 class="text-xl font-bold text-white mb-4">Produkter</h2>

        <table class="min-w-full divide-y divide-gray-700">
            <thead class="bg-gray-800">
                <tr>
                    <th class="px-4 py-2 text-left text-white">Nobb nr</th>
                    <th class="px-4 py-2 text-left text-white">Beskrivelse</th>
                    <th class="px-4 py-2 text-left text-white">Produkt type</th>
                    <th class="px-4 py-2 text-left text-white">Pris</th>
                    <th class="px-4 py-2 text-left text-white">omregningsfaktor</th>
                    <th class="px-4 py-2 text-left text-white">Handling</th>
                </tr>
            </thead>

            <tbody class="divide-y divide-gray-700">
                <tr v-for="product in products" :key="product.id" class="hover:bg-gray-800">
                    <td class="px-4 py-2">{{ product.nobbnr }}</td>
                    <td class="px-4 py-2">{{ product.description }}</td>
                    <td class="px-4 py-2">{{ product.productType?.name }}</td>
                    <td class="px-4 py-2">
                        {{ formatNorwegianDecimal(product.price) }}
                    </td>
                    <td class="px-4 py-2">
                        {{ formatNorwegianDecimal(product.meterPerSquare) }}
                    </td>
                    <td class="px-4 py-2">
                        <button @click="$emit('edit', product)"
                            class="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-white">
                            Edit
                        </button>
                        <button @click="$emit('delete', product)"
                            class="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white ml-3">
                            delete
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <p v-if="products.length === 0" class="text-gray-400 mt-4 text-center">Ingen produkter</p>
    </div>
</template>

<script setup>
import { useProductStore } from '../store';
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { formatNorwegianDecimal } from '@/utils/numberUtils'

const productStore = useProductStore()
const { products, loading, error } = storeToRefs(productStore)

onMounted(() => {
    productStore.fetchProducts()
})

</script>
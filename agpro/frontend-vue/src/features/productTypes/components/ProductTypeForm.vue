<template>
    <form @submit.prevent="handleSubmit">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex flex-col">
                <label for="name" class="text-gray-400 mb-1">Produkt type</label>
                <input v-model="name" type="text" id="name" class="input" required />
            </div>
        </div>

        <button type="submit" class="px-6 py-3 md:py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-white ">
            {{ editingProductType ? (loading ? "Oppdaterer..." : "Oppdater") : (loading ? "Lagrer..." : "Lagre produkt type")}}
            
        </button>
    </form>
</template>

<script setup>
import { ref } from 'vue'
import { useProductTypeStore } from '../store'

const editingProductType = ref(null)
const productTypeStore = useProductTypeStore()

const name = ref('')

const loading = ref(false)
const error = ref('')
const success = ref('')

const editProductType = (productType) => {
    editingProductType.value = productType
    name.value = productType.name
}

const handleSubmit = async () => {
    loading.value = true
    error.value = ''
    success.value = ''

    try {
        const productType = {
            name: name.value
        }

        if (editingProductType.value) {
            await productTypeStore.updateProductType(editingProductType.value.id, productType)
        } else {
            await productTypeStore.addProductType(productType)
        }

        name.value = ''
        editingProductType.value = null


    } catch (err) {
        error.value = err.message || 'Noe gikk galt'
    } finally {
        loading.value = false
    }
}
defineExpose({ editProductType })
</script>

<style scoped>
.input {
  width: 100%;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background-color: #1f2937; /* bg-gray-800 */
  border: 1px solid #374151; /* border-gray-700 */
  color: white;
}
.input::placeholder {
  color: #9ca3af;
}
.input:focus {
  outline: none;
  box-shadow: 0 0 0 2px #3b82f6; /* focus:ring-blue-500 */
}
</style>
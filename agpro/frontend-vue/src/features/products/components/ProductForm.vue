<template>
    <form @submit.prevent="handleSubmit"
        class="w-full max-w-5xl mx-auto bg-gray-900 p-6 md:p-8 rounded-2xl shadow-xl border border-gray-800 space-y-6">

        <h2 class="text-2xl md:text-3xl font-bold text-white text-center mb-4">Nytt produkt</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex flex-col">
                <label for="nobbnr" class="text-gray-400 mb-1">Nobb nr</label>
                <input v-model="nobbnr" type="text" id="nobbnr" class="input" required />
            </div>
            <div class="flex flex-col">
                <label for="description" class="text-gray-400 mb-1">Beskrivelse</label>
                <input v-model="description" type="text" id="description" class="input" required />
            </div>
            <div class="flex flex-col">
                <label for="price" class="text-gray-400 mb-1">Pris</label>
                <input v-model="priceStr" type="text" id="price" class="input" required />
            </div>
            <div class="flex flex-col">
                <label for="meterPerSquare" class="text-gray-400 mb-1">Meter per kvadrat</label>
                <input v-model="meterPerSquareStr" type="text" id="meterPerSquare" class="input" required />
            </div>
            <div class="flex flex-col">
                <label for="productType" class="text-gray-400 mb-1">Produkt type</label>
                <ProductTypeDropdown v-model="productTypeId" id="productType" :productTypes="productTypeStore.productTypes"
                    placeholder="Velg produkt type" />
            </div>
            <div class="flex flex-col">
                <label for="enhet" class="text-gray-400 mb-1">Enhet</label>
                <UnitsDropdown v-model="selectedUnit" id="enhet" placeholder="Velg enhet" />
            </div>

        </div>

        <button type="submit" class="px-6 py-3 md:py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-white ">
            {{ editingProduct ? (loading ? "Oppdaterer..." : "Oppdater") : (loading ? "Lagrer..." : "Lagre Produkt") }}
        </button>

    </form>
</template>


<script setup>
import { onMounted, ref, computed } from 'vue'
import { useProductStore } from '../store'
import ProductTypeDropdown from '../../../components/ProductTypeDropdown.vue'
import { useProductTypeStore } from '../../productTypes/store'
import UnitsDropdown from '../../../components/UnitsDropdown.vue'
import { parseNorwegianDecimal, formatNorwegianDecimal } from '../../../utils/numberUtils'

const editingProduct = ref(null)
const productStore = useProductStore()
const productTypeStore = useProductTypeStore()
const productTypeId = ref('')
const selectedUnit = ref('')

const meterPerSquare = computed({
    get: () => parseNorwegianDecimal(meterPerSquareStr.value),
    set: val => {
        meterPerSquareStr.value = formatNorwegianDecimal(val)
    }
})

const price = computed({
    get: () => parseNorwegianDecimal(priceStr.value),
    set: val => {
        priceStr.value = formatNorwegianDecimal(val)
    }
})

onMounted(() => {
    productTypeStore.fetchProductTypes()
})

const nobbnr = ref('')
const description = ref('')
const priceStr = ref('')
const meterPerSquareStr = ref('')

const loading = ref(false)
const error = ref('')
const success = ref('')

const editProduct = (product) => {
    editingProduct.value = product
    nobbnr.value = product.nobbnr
    description.value = product.description
    price.value = product.price ?? 0
    meterPerSquare.value = product.meterPerSquare ?? 0
    productTypeId.value = product.productTypeId
    selectedUnit.value = product.unit
}


const handleSubmit = async () => {
    loading.value = true
    error.value = ''
    success.value = ''
    try {
        const product = {
            id: editingProduct.value?.id,
            nobbnr: nobbnr.value,
            description: description.value,
            price: price.value,
            meterPerSquare: meterPerSquare.value,
            productTypeId: productTypeId.value,
            unit: selectedUnit.value
        }

        if (editingProduct.value) {
            await productStore.updateProduct(editingProduct.value.id, product)
        } else {
            await productStore.addProduct(product)
        }

        nobbnr.value = ''
        description.value = ''
        priceStr.value = ''
        meterPerSquareStr.value = ''
        editingProduct.value = null
        productTypeId.value = ''
        selectedUnit.value = ''

    } catch (err) {
        error.value = err.message || 'Noe gikk galt'
    } finally {
        loading.value = false
    }
}
defineExpose({ editProduct })
</script>

<style scoped>
.input {
    width: 100%;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    background-color: #1f2937;
    /* bg-gray-800 */
    border: 1px solid #374151;
    /* border-gray-700 */
    color: white;
}

.input::placeholder {
    color: #9ca3af;
}

.input:focus {
    outline: none;
    box-shadow: 0 0 0 2px #3b82f6;
    /* focus:ring-blue-500 */
}
</style>
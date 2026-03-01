<script setup>
import { onMounted, ref } from 'vue'
import { useProductTypeStore } from '../store'
import { storeToRefs } from 'pinia'
import ProductTypeForm from '../components/ProductTypeForm.vue';
import ProductTypeTable from '../components/ProductTypeTable.vue';

const productTypeStore = useProductTypeStore()
const { productTypes, loading, error } = storeToRefs(productTypeStore)

const form = ref(null)

onMounted(() => {
    productTypeStore.fetchProductTypes()
})

const handleEdit = (productType) => {
    if (!form.value) return
    form.value.editProductType(productType)
}

const handleDelete = async (productType) => {
    if (!confirm(`Er du sikker på å slette ${productType.name}`)) return

    await productTypeStore.deleteProductType(productType.id)
}

</script>


<template>
    <div class="min-h-screen bg-gray-950 text-white p-4 md:p-8">
        <header class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h1 class="text-3xl font-bold">Produkt typer</h1>
            <button @click="refresh" class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition">
                Oppdater
            </button>
        </header>


        <div class="flex flex-col gap-8">
            <ProductTypeForm ref="form" />
            <ProductTypeTable :productTypes="productTypes" @delete="handleDelete" @edit="handleEdit" />
        </div>
    </div>
</template>
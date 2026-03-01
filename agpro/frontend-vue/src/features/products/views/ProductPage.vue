<script setup>
import { onMounted, ref } from 'vue'
import { useProductStore } from '../store'
import { storeToRefs } from 'pinia'
import ProductForm from '../components/ProductForm.vue'
import ProductTable from '../components/ProductTable.vue'

const productStore = useProductStore()
const { products, loading, error } = storeToRefs(productStore)


const form = ref(null)

onMounted(() => {
    productStore.fetchProducts()
})

const handleEdit = (product) => {
    if(!form.value) return
    form.value.editProduct(product)
}

const handleDelete = async (product) => {
    if(!confirm(`Er du sikker på at du vil slette ${product}`)) return

    await productStore.deleteProduct(product.id)
}

</script>


<template>
    <div class="min-h-screen bg-gray-950 text-white p-4 md:p-8">
        <div class="flex flex-col gap-8">
            <ProductForm ref="form" />
            <ProductTable :products="products" @edit="handleEdit" @delete="handleDelete" />
        </div>
    </div>
</template>
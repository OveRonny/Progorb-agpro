import {
    defineStore
} from 'pinia'
import {
    ref
} from 'vue'
import {
    productApi
} from './api'

export const useProductStore = defineStore('products', () => {
    const products = ref([])
    const loading = ref(false)
    const error = ref(null)

    const fetchProducts = async () => {
        loading.value = true
        error.value = null
        try {
            const res = await productApi.getAll()
            products.value = res.data
        } catch (err) {
            error.value = err.message || 'Noe gikk galt'
        } finally {
            loading.value = false
        }
    }

    const getProductById = async (id) => {
        loading.value = true
        error.value = null
        try {
            const res = await productApi.getById(id)
            return res.data
        } catch (err) {
            error.value = err.message || 'Kunne ikke hente produkt'
        } finally {
            loading.value = false
        }
    }

    const addProduct = async (product) => {
        loading.value = true
        error.value = null
        try {
            const res = await productApi.create(product)
            products.value.push(res.data)
        } catch (err) {
            error.value = err.message || 'Noe gikk galt'
        } finally {
            loading.value = false
        }
    }

    const updateProduct = async (id, product) => {
        loading.value = true
        error.value = null
        try {
            const res = await productApi.update(id, product)
            const index = products.value.findIndex(c => c.id === id)
            if (index !== -1) products.value[index] = res.data
        } catch (err) {
            error.value = err.message || 'Feil ved oppdatering'
        } finally {
            loading.value = false
        }
    }

    const deleteProduct = async (id) => {
        loading.value = true
        error.value = null
        try {
            await productApi.delete(id)
            products.value = products.value.filter(c => c.id !== id)
        } catch (err) {
            error.value = err.message || 'Feil ved sletting'
        } finally {
            loading.value = false
        }
    }


    return {
        products,
        loading,
        error,
        fetchProducts,
        getProductById,
        addProduct,
        updateProduct,
        deleteProduct
    }

})
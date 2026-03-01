import {
    defineStore
} from 'pinia'
import {
    ref
} from 'vue'
import {
    productTypeApi
} from './api'
import {
    useModalStore
} from '@/shared/stores/modal.store'



export const useProductTypeStore = defineStore('productTypes', () => {
    const productTypes = ref([])
    const loading = ref(false)
    const error = ref(null)

    const fetchProductTypes = async () => {
        loading.value = true
        error.value = null

        try {
            const res = await productTypeApi.getAll()
            productTypes.value = res.data
        } catch (err) {
            error.value = err.message || 'Noe gikk galt'
        } finally {
            loading.value = false
        }
    }

    const getProductTypeById = async (id) => {
        loading.value = true
        error.value = null
        try {
            const res = await productTypeApi.getById(id)
            return res.data
        } catch (err) {
            error.value = err.message || 'Kunne ikke hente Produkt type'
        } finally {
            loading.value = false
        }
    }

    const addProductType = async (productType) => {
        const modalStore = useModalStore()
        loading.value = true
        error.value = null
        try {
            const res = await productTypeApi.create(productType)
            if (res.data.status === "alreadyExists") {
                modalStore.open(
                    "Element finnes allerede",
                    res.data.message,
                    res.data.value
                )
                return
            }
            productTypes.value.push(res.data.value)
        } catch (err) {
            error.value = err.message || 'Noe gikk galt'
        } finally {
            loading.value = false
        }
    }

    const updateProductType = async (id, productType) => {

        loading.value = true
        error.value = null
        try {
            const res = await productTypeApi.update(id, productType)

            const index = productTypes.value.findIndex(c => c.id === id)
            if (index !== -1) productTypes.value[index] = res.data
        } catch (err) {
            error.value = err.message || 'Feil ved oppdatering'
        } finally {
            loading.value = false
        }
    }

    const deleteProductType = async (id) => {
        loading.value = true
        error.value = null
        try {
            await productTypeApi.delete(id)
            productTypes.value = productTypes.value.filter(c => c.id !== id)
        } catch (err) {
            error.value = err.message || 'Feil ved sletting'
        } finally {
            loading.value = false
        }
    }

    return {
        productTypes,
        loading,
        error,
        fetchProductTypes,
        getProductTypeById,
        addProductType,
        updateProductType,
        deleteProductType
    }

})
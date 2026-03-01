import api from '@/shared/api/axiosInstance'

export const productTypeApi = {
    getAll() {
        return api.get('/product-types')
    },
    getById(id) {
        return api.get(`/product-types/${id}`)
    },
    create(productType) {
        return api.post('/product-types', productType)
    },
    update(id, product) {
        return api.put(`/product-types/${id}`, product)
    },
    delete(id) {
        return api.delete(`/product-types/${id}`)
    }
}



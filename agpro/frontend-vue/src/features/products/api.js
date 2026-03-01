import api from '@/shared/api/axiosInstance'

export const productApi = {
    getAll() {
        return api.get('/products')
    },
    getById(id) {
        return api.get(`/products/${id}`)
    },
    create(product) {
        return api.post('/products', product)
    },
    update(id, product) {
        return api.put(`/products/${id}`, product)
    },
    delete(id) {
        return api.delete(`/products/${id}`)
    }
}
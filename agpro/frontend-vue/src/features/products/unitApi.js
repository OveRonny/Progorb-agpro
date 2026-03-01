import api from '@/shared/api/axiosInstance'

export const unitApi = {
    getAll() {
        return api.get('/products/units')
    }
}
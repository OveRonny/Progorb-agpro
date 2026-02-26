import {
    apiRequest
} from '../../helpers/apiHelper.js';

const API_URL = 'http://localhost:3000/product-types';

export class ProductTypeModel {
    static async getAll() {
        return await apiRequest(API_URL);
    }

    static async getById(id) {
        return await apiRequest(`${API_URL}/${id}`);
    }

    static async create(data) {
    try {
        const res = await apiRequest(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        // Backend sender alltid { status, value, message }
        return res;

    } catch (err) {
        // Hvis nettverksfeil etc.
        return { status: 'failure', value: null, message: err.message };
    }
}

    static async update(id, data) {
        return await apiRequest(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }

    static async delete(id) {
        return await apiRequest(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
    }
}
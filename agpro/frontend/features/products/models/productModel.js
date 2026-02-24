import {
    apiRequest
} from '../../helpers/apiHelper.js';

const API_URL = 'http://localhost:3000/products';

export class ProductModel {
    static async getProducts() {
        return await apiRequest(API_URL);
    }

    static async addProduct(productData) {
        return await apiRequest(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        });
    }

    static async updateProduct(id, productData) {
        return await apiRequest(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        });
    }

    static async deleteProduct(id) {
        return await apiRequest(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
    }

    static async getUnits() {
        try {
            const res = await fetch(`${API_URL}/units`);
            if (!res.ok) throw new Error("Kunne ikke hente units");
            return await res.json();
        } catch (err) {
            console.error(err);
            return [];
        }
    }
}
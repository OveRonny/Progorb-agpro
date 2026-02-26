import {
    ProductTypeModel
} from '../models/productTypeModel.js';
import {
    ProductTypeListView
} from '../views/productTypeListView.js';
import {
    ProductTypeFormView
} from '../views/productTypeFormView.js'
import {
    AppController
} from '../../../controllers/appController.js';
import {
    ProductTypeModalView
} from '../views/productTypeModalView.js';

export const ProductTypeController = {

    async showProductTypes() {
        const appDiv = document.getElementById('app');
        try {
            const productTypes = await ProductTypeModel.getAll();
            appDiv.innerHTML = ProductTypeFormView.render() +
                ProductTypeListView.render(productTypes);
                
            this.setupEditButtons(productTypes);
            this.setupDeleteButtons(productTypes);
            this.setupForm();           
        } catch (err) {
            appDiv.innerHTML = `<p style="color:red">${err.message}</p>
                                <button id="go-login">Go to Login</button>`;
            document.getElementById('go-login').addEventListener('click', () => {
                AppController.showLogin();
            });
        }
    },

    setupForm() {
        const toggleBtn = document.getElementById('toggle-product-form');
        const formContainer = document.getElementById('product-type-form');

        toggleBtn.addEventListener('click', () => {
            formContainer.classList.toggle('hidden');
        });

        formContainer.addEventListener('submit', async (e) => {
            e.preventDefault();
            const id = formContainer.dataset.id;
            const productData = {
                name: document.getElementById('name').value
            };

            try {
                if (id) {
                    await ProductTypeModel.update(id, productData);
                } else {
                    await ProductTypeModel.create(productData);
                }
                this.showProductTypes();
            } catch (err) {
                alert('error');
            }
        });

    },

    setupEditButtons(productTypes) {
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.id;
                const productType = productTypes.find(p => p.id == id);
                this.fillForm(productType);
            });
        });
    },

    setupDeleteButtons() {
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', async () => {
                const id = btn.dataset.id;
                if (confirm('Are you sure you want to delete this product?')) {
                    try {
                        await ProductTypeModel.delete(id);
                        this.showProductTypes();
                    } catch (err) {
                        alert('Error deleting product type: ' + err.message);
                    }
                }
            });
        });
    },

    fillForm(productType) {
        const formContainer = document.getElementById('product-type-form');
        formContainer.dataset.id = productType.id;
        document.getElementById('name').value = productType.name;
        document.getElementById('submit-btn').textContent = "Oppdater";
        formContainer.classList.remove('hidden');
    },


}
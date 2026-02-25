import {
    ProductModel
} from "../models/productModel.js";
import {
    ProductListView
} from "../views/productListView.js";
import {
    ProductFormView
} from "../views/productFormView.js";
import {
    AppController
} from "../../../controllers/appController.js";
import {
    ProductTypeModel
} from '../../productTypes/models/productTypeModel.js';
import {
    ProductTypeController
} from '../../productTypes/controllers/productTypeController.js';
import {
    ProductTypeModalView
} from '../../productTypes/views/productTypeModalView.js';

export const ProductController = {

    async showProducts() {
        const appDiv = document.getElementById("app");
        appDiv.innerHTML = "";

        try {
            const products = await ProductModel.getProducts();

            const productFormView = ProductFormView.render();
            appDiv.appendChild(productFormView);

            const productListView = ProductListView.render(products);
            appDiv.appendChild(productListView);

            await ProductFormView.loadUnits();
            await ProductFormView.fillProductTypes(() => {
                console.log("Legg til ny produkt type!");
            });

            this.setupForm();
            this.setupEditButtons(products);
            this.setupDeleteButtons();
        } catch (error) {
            appDiv.innerHTML = `<p style="color:red">${err.message}</p>
                            <button id="go-login">Go to Login</button>`;
            document.getElementById('go-login').addEventListener('click', () => {
                AppController.showLogin();
            });
        }

    },

    setupForm() {
        const toggleBtn = document.getElementById('toggle-product-form');
        const formContainer = document.getElementById('product-form');


        toggleBtn.addEventListener('click', () => {
            formContainer.classList.toggle('hidden');
        });

        formContainer.addEventListener('submit', async (e) => {
            e.preventDefault();
            const id = document.getElementById('product-form').dataset.id || '';
            const productData = {
                nobbnr: document.getElementById('nobbnr').value,
                description: document.getElementById('description').value,
                price: parseFloat(document.getElementById('price').value),
                meterPerSquare: parseFloat(document.getElementById('meterPerSquare').value),
                unit: document.getElementById('unit').value,
                productTypeId: parseInt(document.getElementById('productType').value)
            };

            try {
                if (id) {
                    await ProductModel.updateProduct(id, productData);
                } else {
                    await ProductModel.addProduct(productData);
                }
                this.showProducts();
            } catch (err) {
                alert('Error saving product: ' + err.message);
            }
        });
    },

    setupEditButtons(products) {
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.id;

                const product = products.find(p => p.id == id);
                if (!product) return;
                this.fillForm(product);
            });
        });
    },

    setupDeleteButtons() {
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', async () => {
                const id = btn.dataset.id;
                if (confirm('Are you sure you want to delete this product?')) {
                    try {
                        await ProductModel.deleteProduct(id);
                        this.showProducts();
                    } catch (err) {
                        alert('Error deleting product: ' + err.message);
                    }
                }
            });
        });

    },

    fillForm(product) {
        const formContainer = document.getElementById('product-form');
        formContainer.dataset.id = product.id;
        document.getElementById('nobbnr').value = product.nobbnr;
        document.getElementById('description').value = product.description || '';
        document.getElementById('price').value = product.price != null ? product.price : '';
        document.getElementById('meterPerSquare').value = product.meterPerSquare != null ? product.meterPerSquare : '';
        document.getElementById('unit').value = product.unit || '';
        document.getElementById('productType').value = product.productTypeId || '';
        document.getElementById('submit-btn').textContent = "Oppdater";
        formContainer.classList.remove('hidden');
    }


}
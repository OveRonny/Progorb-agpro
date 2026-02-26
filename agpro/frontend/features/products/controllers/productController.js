import { ProductFormController } from './productFormController.js';
import { ProductListController } from './productListController.js';
import { ProductModel } from '../models/productModel.js';

export const ProductController = {
    async showProducts() {
        const appDiv = document.getElementById("app");
        appDiv.innerHTML = "";

        const formContainer = document.createElement("div");
        const listContainer = document.createElement("div");

        appDiv.appendChild(formContainer);
        appDiv.appendChild(listContainer);

        const refreshProducts = async () => {
            const products = await ProductModel.getProducts();
            ProductListController.render(products);
        };

        ProductFormController.init(formContainer, refreshProducts);
        ProductListController.init(listContainer, product => {
            if (product) ProductFormController.fillForm(product);
            else refreshProducts();
        });

        await ProductFormController.loadUnits();
        await ProductFormController.initProductTypeSelect();

        await refreshProducts();
    }
};